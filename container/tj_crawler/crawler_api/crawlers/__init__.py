from crawler_api.crawlers.tjal import TJALCrawler
from crawler_api.crawlers.tjms import TJMSCrawler

COURTS = {
    '02': TJALCrawler,
    '12': TJMSCrawler
}
