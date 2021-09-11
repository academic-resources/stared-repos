import os

import pytest
from asynctest import Mock
from parsel import Selector

from crawler_api.crawlers import TJMSCrawler


@pytest.fixture
def tjms_first_degree():
    path = os.path.dirname(__file__)
    with open(f'{path}/fixtures/tjms_first_degree.html') as f:
        return Selector(text=f.read())


@pytest.fixture
def tjms_second_degree_html():
    path = os.path.dirname(__file__)
    with open(f'{path}/fixtures/tjms_second_degree.html') as f:
        return Selector(text=f.read())


@pytest.fixture
def tjms_crawler():
    return TJMSCrawler(Mock())


def test_tjms_parse_first_degree_legal_process_detail(tjms_crawler, tjms_first_degree):
    result = tjms_crawler.parse_legal_process_detail(tjms_first_degree)
    expected_result = {
        'class': 'Procedimento Comum Cível',
        'area': 'Cível',
        'subject': 'Enquadramento',
        'distribution': '30/07/2018 às 12:39 - Automática',
        'judge': 'Zidiel Infantino Coutinho',
        'value': 'R$ 10.000,00'
    }
    assert expected_result == result


def test_tjms_parse_second_degree_legal_process_detail(tjms_crawler, tjms_second_degree_html):
    result = tjms_crawler.parse_legal_process_detail(tjms_second_degree_html)
    expected_result = {
        'class': 'Apelação Cível',
        'area': 'Cível',
        'subject': 'Obrigação de Fazer / Não Fazer',
        'distribution': None,
        'judge': None,
        'value': '10.000,00'
    }
    assert expected_result == result


def test_tjms_crawler_parse_legal_process_detail_return_empty_value(tjms_crawler):
    result = tjms_crawler.parse_legal_process_detail(Selector(text='<html></html>'))
    expected_result = {
        'class': None,
        'area': None,
        'subject': None,
        'distribution': None,
        'judge': None,
        'value': None
    }
    assert expected_result == result


def test_tjms_crawler_parse(tjms_crawler, tjms_second_degree_html):
    result = tjms_crawler.parse(tjms_second_degree_html, 'Test')
    expected_result = {
        'class': 'Apelação Cível',
        'degree': 'Test',
        'area': 'Cível', 'subject': 'Obrigação de Fazer / Não Fazer',
        'distribution': None,
        'judge': None,
        'value': '10.000,00',
        'parties_involved': [
            {
                'type': 'Apelante',
                'name': 'Leidi Silva Ormond Galvão',
                'representatives': [
                    {
                        'type': 'Advogada',
                        'name': 'Adriana Catelan Skowronski'
                    },
                    {
                        'type': 'Advogada',
                        'name': 'Ana Silvia Pessoa Salgado Moura'
                    }
                ]
            },
            {
                'type': 'Apelado',
                'name': 'Estado de Mato Grosso do Sul',
                'representatives': [
                    {
                        'type': 'Proc. do Estado',
                        'name': 'Nathália dos Santos Paes de Barros'
                    }
                ]
            }
        ],
        'updates': [
            {
                'date': '08/10/2020',
                'description': 'Publicação de Pauta de Julgamento  DJ º 4593 de 08 de outubro de 2020'
            },
            {
                'date': '07/10/2020',
                'description': 'Certidão de Inclusão em Pauta   SEASE - certidão de intimação'
            },
            {
                'date': '06/10/2020',
                'description': 'Certidão   SEASE - Certidão de Julgamento'
            }
        ]
    }
    assert expected_result == result


def test_tjms_crawler_parse_not_found_data(tjms_crawler):
    result = tjms_crawler.parse(Selector(text='<table><tbody><tr></tr></tbody></table>'))
    assert result is None
