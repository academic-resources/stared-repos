# all the imports
import os
import time
import psycopg2
import psycopg2.extras
from psycopg2 import ProgrammingError
from flask import Flask, request, g, abort, render_template, escape

# create our apod application
app = Flask(__name__)

# Load default config and override config from an environment variable
app.config.update(
    dict(SECRET_KEY="development-key", DATABASE="apod", HOST="localhost", PORT=5432)
)
app.config.from_envvar("FLASKR_SETTINGS", silent=True)


def connect_db():
    """Connects to the specific database."""
    conn = psycopg2.connect(
        database=app.config["DATABASE"],
        host=app.config["HOST"],
        port=app.config["PORT"],
    )
    conn.autocommit = True
    return conn


def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, "pg_db"):
        g.pg_db = connect_db()
    return g.pg_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, "pg_db"):
        g.pg_db.close()


@app.route("/")
def show_entries():
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)

    cur.execute(
        "SELECT msg_id, title, lang, date::date, text FROM apod ORDER BY date DESC LIMIT 10"
    )
    entries = cur.fetchall()
    return render_template("show_apods.html", entries=entries)


@app.route("/search", methods=["GET"])
def search():
    if not "pattern" in request.args:
        abort(404)

    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)

    order = request.args.get("order")
    faceted = request.args.get("faceted")
    rank_func = request.args.get("rank_func")

    # Prepare the query
    if faceted == "on":
        query = (
            "WITH ap AS (SELECT \n"
            "   msg_id, \n"
            "   COALESCE(title, '') AS title, \n"
            "   lang, \n"
            "   name, \n"
            "   RANK() OVER ( \n"
            "       PARTITION BY name \n"
            "       ORDER BY {0}, msg_id \n"
            "   ) AS rank, \n"
            "   COUNT(*) OVER (PARTITION BY name) cnt \n"
            "   FROM apod \n"
            "   LEFT JOIN sections AS sects on sect_id = ANY(apod.sections) \n"
            "   WHERE fts @@ to_tsquery('apod_conf', %(pat)s) \n"
            " ),\n"
            " lst AS (SELECT \n"
            "   name, \n"
            "   jsonb_build_object(\n"
            "     'count', cnt, \n"
            "     'results', jsonb_agg(\n"
            "       jsonb_build_object(\n"
            "         'msg_id', msg_id, \n"
            "         'title', title, \n"
            "         'lang', lang \n"
            "   ))) AS data \n"
            "   FROM ap \n"
            "   WHERE rank <= 10 AND cnt > 0 \n"
            "   GROUP BY name, cnt) \n"
            " SELECT jsonb_object_agg(COALESCE(name, 'Without section'), data) \n"
            " FROM lst \n"
        )
    else:
        query = (
            "SELECT msg_id, title, lang, date, \n"
            "  ts_headline('apod_conf', text, ts_q) AS text \n"
            " FROM (SELECT msg_id, title, lang, date::date, text, \n"
            "       to_tsquery('apod_conf', %(pat)s) AS ts_q \n"
            "       FROM apod \n"
            "       WHERE fts @@ to_tsquery('apod_conf', %(pat)s) \n"
            "       ORDER BY {0} \n"
            "       LIMIT 10) AS entries"
        )

    if order == "rank":
        if rank_func == "ts_rank":
            query = query.format("ts_rank(fts, to_tsquery('apod_conf', %(pat)s)) DESC")
        elif rank_func == "ts_rank_cd":
            query = query.format(
                "ts_rank_cd(fts, to_tsquery('apod_conf', %(pat)s)) DESC"
            )
        else:
            query = query.format("fts <=> to_tsquery('apod_conf', %(pat)s)")
    else:
        query = query.format("date DESC")

    # Prepare the query
    query_text = cur.mogrify(query, {"pat": request.args["pattern"]})

    entries = None
    hints = None
    error = None
    query_time = None

    try:
        # Show time to user
        starttime = time.time()
        cur.execute(query_text)
        query_time = "%0.2f" % ((time.time() - starttime) * 1000)

        if faceted:
            entries = cur.fetchone()[0]
            no_entries = entries == None
        else:
            entries = cur.fetchall()
            no_entries = cur.rowcount == 0

        # There is no result. So show hints to user
        if no_entries:
            query = "SELECT word FROM words WHERE word %% %s"
            cur.execute(query, [request.args["pattern"]])
            hints = cur.fetchall()
    except ProgrammingError as e:
        error = e.pgerror

    query_text = query_text.decode("utf-8")

    return render_template(
        "show_apods.html",
        order=order,
        rank_func=rank_func,
        faceted=faceted,
        entries=entries,
        hints=hints,
        error=error,
        pattern=escape(request.args["pattern"]),
        query_text=escape(query_text),
        query_time=query_time,
    )


@app.route("/apod/<int:apod_id>/<lang>")
def show_apod(apod_id, lang):
    db = get_db()
    cur = db.cursor(cursor_factory=psycopg2.extras.DictCursor)

    query = (
        "SELECT title, date::date, text " " FROM apod WHERE msg_id = %s AND lang = %s"
    )

    cur.execute(query, [apod_id, lang])

    if cur.rowcount == 0:
        abort(404)

    entry = cur.fetchone()
    return render_template("show_apod.html", entry=entry)
