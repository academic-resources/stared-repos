from typing import Optional

from aiohttp import ClientSession


class HttpAsyncSession:
    session: Optional[ClientSession] = None

    def start(self):
        self.session = ClientSession()

    async def stop(self):
        await self.session.close()
        self.session = None

    def __call__(self) -> ClientSession:
        assert self.session is not None
        return self.session
