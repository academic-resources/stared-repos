package metrics

import (
	"fmt"
	"regexp"
	"strings"
	"sync"
	"time"

	"github.com/prometheus/alertmanager/api/metrics"

	"github.com/grafana/grafana/pkg/api/response"
	"github.com/grafana/grafana/pkg/api/routing"
	"github.com/grafana/grafana/pkg/models"
	apimodels "github.com/grafana/grafana/pkg/services/ngalert/api/tooling/definitions"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promauto"
	"gopkg.in/macaron.v1"
)

const (
	GrafanaBackend = "grafana"
	ProxyBackend   = "proxy"
)

// ProvideService is a Metrics factory.
func ProvideService() *Metrics {
	return NewMetrics(prometheus.DefaultRegisterer)
}

// ProvideServiceForTest is a Metrics factory used for test.
func ProvideServiceForTest() *Metrics {
	return NewMetrics(prometheus.NewRegistry())
}

type Metrics struct {
	*metrics.Alerts
	// Registerer is for use by subcomponents which register their own metrics.
	Registerer           prometheus.Registerer
	AlertState           *prometheus.GaugeVec
	RequestDuration      *prometheus.HistogramVec
	ActiveConfigurations prometheus.Gauge
	EvalTotal            *prometheus.CounterVec
	EvalFailures         *prometheus.CounterVec
	EvalDuration         *prometheus.SummaryVec
	GroupRules           *prometheus.GaugeVec
}

func NewMetrics(r prometheus.Registerer) *Metrics {
	return &Metrics{
		Registerer: r,
		Alerts:     metrics.NewAlerts("v2", r),
		AlertState: promauto.With(r).NewGaugeVec(prometheus.GaugeOpts{
			Namespace: "grafana",
			Subsystem: "alerting",
			Name:      "alerts",
			Help:      "How many alerts by state.",
		}, []string{"state"}),
		RequestDuration: promauto.With(r).NewHistogramVec(
			prometheus.HistogramOpts{
				Namespace: "grafana",
				Subsystem: "alerting",
				Name:      "request_duration_seconds",
				Help:      "Histogram of requests to the Alerting API",
				Buckets:   prometheus.DefBuckets,
			},
			[]string{"method", "route", "status_code", "backend"},
		),
		ActiveConfigurations: promauto.With(r).NewGauge(prometheus.GaugeOpts{
			Namespace: "grafana",
			Subsystem: "alerting",
			Name:      "active_configurations",
			Help:      "The number of active, non default alertmanager configurations for grafana managed alerts",
		}),
		// TODO: once rule groups support multiple rules, consider partitioning
		// on rule group as well as tenant, similar to loki|cortex.
		EvalTotal: promauto.With(r).NewCounterVec(
			prometheus.CounterOpts{
				Namespace: "grafana",
				Subsystem: "alerting",
				Name:      "rule_evaluations_total",
				Help:      "The total number of rule evaluations.",
			},
			[]string{"user"},
		),
		// TODO: once rule groups support multiple rules, consider partitioning
		// on rule group as well as tenant, similar to loki|cortex.
		EvalFailures: promauto.With(r).NewCounterVec(
			prometheus.CounterOpts{
				Namespace: "grafana",
				Subsystem: "alerting",
				Name:      "rule_evaluation_failures_total",
				Help:      "The total number of rule evaluation failures.",
			},
			[]string{"user"},
		),
		EvalDuration: promauto.With(r).NewSummaryVec(
			prometheus.SummaryOpts{
				Namespace:  "grafana",
				Subsystem:  "alerting",
				Name:       "rule_evaluation_duration_seconds",
				Help:       "The duration for a rule to execute.",
				Objectives: map[float64]float64{0.5: 0.05, 0.9: 0.01, 0.99: 0.001},
			},
			[]string{"user"},
		),
		// TODO: once rule groups support multiple rules, consider partitioning
		// on rule group as well as tenant, similar to loki|cortex.
		GroupRules: promauto.With(r).NewGaugeVec(
			prometheus.GaugeOpts{
				Namespace: "grafana",
				Subsystem: "alerting",
				Name:      "rule_group_rules",
				Help:      "The number of rules.",
			},
			[]string{"user"},
		),
	}
}

// multi-thread safety and stable ordering of prometheus registries.
type OrgRegistries struct {
	regsMu sync.Mutex
	regs   map[int64]prometheus.Registerer
}

func NewOrgRegistries() *OrgRegistries {
	return &OrgRegistries{
		regs: make(map[int64]prometheus.Registerer),
	}
}

func (m *OrgRegistries) GetOrCreateOrgRegistry(orgID int64) prometheus.Registerer {
	m.regsMu.Lock()
	defer m.regsMu.Unlock()

	orgRegistry, ok := m.regs[orgID]
	if !ok {
		reg := prometheus.NewRegistry()
		m.regs[orgID] = reg
		return reg
	}
	return orgRegistry
}

func (m *OrgRegistries) RemoveOrgRegistry(org int64) {
	m.regsMu.Lock()
	defer m.regsMu.Unlock()
	delete(m.regs, org)
}

// Instrument wraps a middleware, instrumenting the request latencies.
func Instrument(
	method,
	path string,
	action interface{},
	metrics *Metrics,
) macaron.Handler {
	normalizedPath := MakeLabelValue(path)

	return func(c *models.ReqContext) {
		start := time.Now()
		var res response.Response
		val, err := c.Invoke(action)
		if err == nil && val != nil && len(val) > 0 {
			res = val[0].Interface().(response.Response)
		} else {
			res = routing.ServerError(err)
		}

		// TODO: We could look up the datasource type via our datasource service
		var backend string
		recipient := c.Params("Recipient")
		if recipient == apimodels.GrafanaBackend.String() || recipient == "" {
			backend = GrafanaBackend
		} else {
			backend = ProxyBackend
		}

		ls := prometheus.Labels{
			"method":      method,
			"route":       normalizedPath,
			"status_code": fmt.Sprint(res.Status()),
			"backend":     backend,
		}
		res.WriteTo(c)
		metrics.RequestDuration.With(ls).Observe(time.Since(start).Seconds())
	}
}

var invalidChars = regexp.MustCompile(`[^a-zA-Z0-9]+`)

// MakeLabelValue normalizes a path template
func MakeLabelValue(path string) string {
	// Convert non-alnums to underscores.
	result := invalidChars.ReplaceAllString(path, "_")

	// Trim leading and trailing underscores.
	result = strings.Trim(result, "_")

	// Make it all lowercase
	result = strings.ToLower(result)

	// Special case.
	if result == "" {
		result = "root"
	}
	return result
}
