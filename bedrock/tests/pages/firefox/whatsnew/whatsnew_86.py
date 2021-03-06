# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.

from selenium.webdriver.common.by import By

from pages.base import BasePage
from pages.regions.send_to_device import SendToDevice


class FirefoxWhatsNew86Page(BasePage):

    _URL_TEMPLATE = "/{locale}/firefox/86.0/whatsnew/all/"

    _qrcode_locator = (By.CSS_SELECTOR, ".wnp-qr-code-wrapper > svg")

    @property
    def send_to_device(self):
        return SendToDevice(self)

    @property
    def is_qrcode_displayed(self):
        return self.is_element_displayed(*self._qrcode_locator)
