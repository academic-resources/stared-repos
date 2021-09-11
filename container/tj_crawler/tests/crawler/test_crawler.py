from crawler_api.crawlers import COURTS, TJALCrawler, TJMSCrawler


def test_crawlers_map():
    expected = {
        '02': TJALCrawler,
        '12': TJMSCrawler
    }
    assert COURTS == expected
