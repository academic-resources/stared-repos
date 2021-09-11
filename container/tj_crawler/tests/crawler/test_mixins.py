import os

import pytest
from parsel import Selector

from crawler_api.crawlers.mixins import SoftplanTJCrawlerMixin


@pytest.fixture
def softplan_crawler():
    return SoftplanTJCrawlerMixin()


@pytest.fixture
def softplan_updates():
    path = os.path.dirname(__file__)
    with open(f'{path}/fixtures/softplan_updates.html') as f:
        return Selector(text=f.read()).css("tbody")[0]


@pytest.fixture
def softplan_parties_involved_html():
    path = os.path.dirname(__file__)
    with open(f'{path}/fixtures/softplan_parties_involved.html') as f:
        return Selector(text=f.read()).css("table")[0]


def test_softplan_crawler_parse_parties_involved(softplan_crawler, softplan_parties_involved_html):
    result = softplan_crawler.parse_parties_involved(softplan_parties_involved_html)
    expected_result = [
        {
            'type': 'Autor',
            'name': 'José Carlos Cerqueira Souza Filho',
            'representatives': [
                {
                    'type': 'Advogado',
                    'name': 'Vinicius Faria de Cerqueira'
                }
            ]
        },
        {
            'type': 'Ré',
            'name': 'Cony Engenharia Ltda.',
            'representatives': [
                {
                    'type': 'Advogado',
                    'name': 'Marcus Vinicius Cavalcante Lins Filho'
                },
                {
                    'type': 'Advogado',
                    'name': 'Thiago Maia Nobre Rocha'
                },
            ]
        },
    ]
    assert expected_result == result


def test_softplan_crawler_parse_parties_involved_return_empty_value(softplan_crawler):
    selector = Selector(text='<table id="tablePartesPrincipais"><tr><td></td><td></td></tr></table>')
    result = softplan_crawler.parse_parties_involved(selector)
    expected_result = [
        {
            'type': None,
            'name': None,
            'representatives': []
        }
    ]
    assert expected_result == result


def test_softplan_crawler_parse_parties_involved_xpath_not_found(softplan_crawler):
    selector = Selector(text='<table><tr><td></td><td></td></tr></table>')
    result = softplan_crawler.parse_parties_involved(selector)
    assert result == []


def test_softplan_crawler_parse_updates(softplan_crawler, softplan_updates):
    result = softplan_crawler.parse_updates(softplan_updates)
    expected_result = [
        {'date': '23/09/2020', 'description': 'Conclusos'},
        {'date': '16/08/2020', 'description': 'Visto em Autoinspeção   Despacho Visto em Autoinspeção'},
        {'date': '11/05/2020', 'description': 'Documento  Nº Protocolo: WMAC.20.70092549-0 Data: 11/05/2020 13:28'},
        {'date': '10/12/2019', 'description': 'Conclusos'},
    ]
    assert expected_result == result


def test_softplan_crawler_parse_updates_return_empty_value(softplan_crawler):
    selector = Selector(text='<table><tbody><tr><td></td><td></td></tr></tbody></table>')
    result = softplan_crawler.parse_updates(selector)
    assert result == []


def test_softplan_crawler_parse_updates_xpath_not_found(softplan_crawler):
    selector = Selector(text='<tbody id="tabelaTodasMovimentacoes"><tr><td></td><td></td></tr></tbody>')
    result = softplan_crawler.parse_updates(selector)
    expected_result = [{'date': None, 'description': ''}]
    assert expected_result == result
