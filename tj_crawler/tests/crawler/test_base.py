from unittest.mock import Mock

import pytest
from asynctest import CoroutineMock, call
from parsel import Selector

from crawler_api.crawlers.base import BaseCrawler


@pytest.fixture
def fake_crawler():
    class FakeCrawler(BaseCrawler):
        paths = {'one': 'localhost/{id}', 'two': '127.0.0.1/{id}'}
        parse = Mock()
    session = CoroutineMock()
    session.get.return_value.__aenter__.return_value.text = CoroutineMock(return_value='<html><h1>Test</h1></html>')
    return FakeCrawler(session)


@pytest.mark.asyncio
async def test_session_call_on_execute(fake_crawler):
    await fake_crawler.execute(id=123)
    calls = [call('localhost/123'), call('127.0.0.1/123')]
    fake_crawler.session.get.assert_has_calls(calls, any_order=True)


@pytest.mark.asyncio
async def test_session_call_on_execute_with_multiple_kwargs(fake_crawler):
    fake_crawler.paths = {'one': 'localhost/{id}/{name}', 'two': '127.0.0.1/{id}'}
    await fake_crawler.execute(id=123, name='987')
    calls = [call('localhost/123/987'), call('127.0.0.1/123')]
    fake_crawler.session.get.assert_has_calls(calls, any_order=True)


@pytest.mark.asyncio
async def test_parser_call_for_each_request_on_execute(fake_crawler):
    await fake_crawler.execute(id=123, name='987')
    args1, args2 = fake_crawler.parse.call_args_list
    assert isinstance(args1[0][0], Selector)
    assert args1[0][0].get(), '<html><h1>Test</h1></html>'
    assert args1[1] == {'_id': 'one'}
    assert isinstance(args2[0][0], Selector)
    assert args2[0][0].get(), '<html><h1>Test</h1></html>'
    assert args2[1] == {'_id': 'two'}


def test_type_error_when_create_a_instance_without_implement_abstract_method():
    class FakeCrawler(BaseCrawler):
        urls = ['localhost/{id}', '127.0.0.1/{id}']
    with pytest.raises(TypeError) as error:
        FakeCrawler(Mock())
    assert str(error.value) == "Can't instantiate abstract class FakeCrawler with abstract methods parse"


def test_raise_exception_for_parse_method():
    with pytest.raises(NotImplementedError):
        BaseCrawler.parse(Mock(), data=None, _id=None)


@pytest.mark.asyncio
async def test_return_of_execute(fake_crawler):
    fake_crawler.parse = Mock(side_effect=['One', 'Two'])
    result = await fake_crawler.execute(id=123, name='987')
    assert list(result) == ['One', 'Two']


@pytest.mark.asyncio
async def test_execute_ignore_empty_results(fake_crawler):
    fake_crawler.parse = Mock(side_effect=['One', '', None, []])
    result = await fake_crawler.execute(id=123, name='987')
    assert list(result) == ['One']
