import pytest
from aiohttp import ClientSession
from asynctest import CoroutineMock, Mock

from crawler_api.session import HttpAsyncSession


@pytest.fixture
def http_async_session():
    return HttpAsyncSession()


def test_start_http_async_session(http_async_session):
    http_async_session.start()
    assert isinstance(http_async_session.session, ClientSession)


@pytest.mark.asyncio
async def test_stop_http_async_session(http_async_session):
    fake_session = Mock()
    fake_session.close = CoroutineMock()
    http_async_session.session = fake_session
    await http_async_session.stop()
    assert http_async_session.session is None
    fake_session.close.assert_called_once()


def test_call_http_async_session(http_async_session):
    http_async_session.session = Mock()
    http_async_session().get(url='test')
    http_async_session.session.get.assert_called_once_with(url='test')


def test_assert_error_for_invalid_session_call_http_async_session(http_async_session):
    with pytest.raises(AssertionError):
        http_async_session().get(url='test')
