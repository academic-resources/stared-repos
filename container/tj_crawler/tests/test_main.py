from unittest.mock import Mock

import pytest
from asynctest import CoroutineMock, patch
from fastapi.testclient import TestClient

from crawler_api.main import app, http_async_session, shutdown_event, startup

from tests.fixtures import CRAWLER_RESPONSE


@pytest.fixture
def client():
    http_async_session.start()
    return TestClient(app)


def test_return_404_for_invalid_url(client):
    response = client.post('/not-found')
    assert response.status_code == 404
    assert response.json() == {'detail': 'Not Found'}


def test_return_405_for_method_not_allowed(client):
    response = client.get('/legal-process')
    assert response.status_code == 405
    assert response.json() == {'detail': 'Method Not Allowed'}


def test_request_body_validation_on_legal_process_url(client):
    data = {'number': '1234567-12.1234.1.12.1234'}
    response = client.post('/legal-process', json=data)
    assert response.status_code == 422
    expected_payload = {
        'detail': [
            {
                'loc': ['body', 'number'],
                'msg': 'Invalid Number. The check digit (DV) is not correct',
                'type': 'assertion_error'
            }
        ]
    }
    assert response.json() == expected_payload


def test_required_request_body_validation_on_legal_process_url(client):
    data = {}
    response = client.post('/legal-process', json=data)
    assert response.status_code == 422
    expected_payload = {
        'detail': [
            {
                'loc': ['body', 'number'],
                'msg': 'field required',
                'type': 'value_error.missing'
            }
        ]
    }
    assert response.json() == expected_payload


def test_legal_process_url_response(client):
    crawler_mock = Mock()
    crawler_mock().execute = CoroutineMock(return_value=[CRAWLER_RESPONSE])
    with patch('crawler_api.main.COURTS', {"12": crawler_mock}):
        data = {'number': '1234567-69.1234.1.12.1234'}
        response = client.post('/legal-process', json=data)
    assert response.status_code == 200
    expected_payload = {
        'degrees': [CRAWLER_RESPONSE]
    }
    assert response.json() == expected_payload


def test_select_crawler_by_courts_on_legal_process(client):
    crawler_mock = Mock()
    crawler_mock().execute = CoroutineMock(return_value=[CRAWLER_RESPONSE])
    with patch('crawler_api.main.COURTS', {"12": None, "23": crawler_mock}):
        data = {'number': '1234567-63.1234.1.23.1234'}
        client.post('/legal-process', json=data)
    crawler_mock().execute.assert_called_once_with(number='1234567-63.1234.1.23.1234')


def test_return_404_for_empty_crawler_result_on_legal_process(client):
    crawler_mock = Mock()
    crawler_mock().execute = CoroutineMock(return_value=[])
    with patch('crawler_api.main.COURTS', {"12": None, "23": crawler_mock}):
        data = {'number': '1234567-63.1234.1.23.1234'}
        response = client.post('/legal-process', json=data)
    assert response.status_code == 404
    assert response.json() == {"detail": "Legal Process not found"}


def test_return_422_for_crawler_not_implemented_result_on_legal_process(client):
    crawler_mock = Mock()
    crawler_mock().execute = CoroutineMock(return_value=[])
    with patch('crawler_api.main.COURTS', {"12": crawler_mock}):
        data = {'number': '1234567-63.1234.1.23.1234'}
        response = client.post('/legal-process', json=data)
    assert response.status_code == 422
    assert response.json() == {"detail": "Crawler not implemented"}


@patch('crawler_api.main.http_async_session')
def test_event_startup(mock_http_async_session):
    startup()
    mock_http_async_session.start.assert_called_once()


@pytest.mark.asyncio
@patch('crawler_api.main.http_async_session')
async def test_event_shutdown_event(mock_http_async_session):
    mock_http_async_session.stop = CoroutineMock()
    await shutdown_event()
    mock_http_async_session.stop.assert_called_once()
