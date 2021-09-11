import asyncio
from abc import ABC, abstractmethod

from parsel import Selector


class BaseCrawler(ABC):
    paths = {}

    def __init__(self, session):
        self.session = session

    async def execute(self, **kwargs):
        task = [self._start_request(_id, url, **kwargs) for _id, url in self.paths.items()]
        result = await asyncio.gather(*task)
        return (item for item in result if item)

    async def _start_request(self, _id, url, **kwargs):
        async with self.session.get(url.format(**kwargs)) as response:
            data = await response.text()
        return self.parse(Selector(text=data), _id=_id)

    @abstractmethod
    def parse(self, data, _id):
        raise NotImplementedError
