import pytest

from crawler_api.crawlers.helper import sanitize_string


@pytest.mark.parametrize(
    'string',
    (
        '\r\r\r\r\r\n\n\n\n\n\nTest\n\n\n',
        '\r\r\r\n\n\nTest\n\n\n\r\r',
        '    \r\r\r\r\r\n\n\n\n\n\nTest\n\n\n   ',
        '\r\r\r\r\r\n\n\n\n\n\nTest\n\n\n   ',
        '     \nTest   ',
    )
)
def test_sanitize_string(string):
    assert sanitize_string(string) == 'Test'
