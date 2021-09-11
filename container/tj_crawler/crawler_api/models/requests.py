import re

from pydantic import BaseModel, Field, validator

LEGAL_PROCESS_NUMBER_PATTERN = re.compile(r'^\d{7}-\d{2}\.\d{4}\.\d{1}\.\d{2}\.\d{4}$')


class LegalProcess(BaseModel):
    number: str = Field(description='Valid format: XXXXXXXX-XX-XXXX.XX.XXXX', example='1234567-12.1234.1.12.1234')

    @property
    def court(self):
        return self.number[18:20]

    @validator('number')
    def check_number(cls, value):
        is_full_match = LEGAL_PROCESS_NUMBER_PATTERN.fullmatch(value.upper())
        if not is_full_match:
            raise ValueError('Invalid number format. Example: 1234567-12.1234.1.12.1234')
        return value

    @validator('number')
    def check_digit_validation(cls, value):
        """
        Check whether the check digit is correct.
        Legal Process Number = 'NNNNNNN-DV.AAAA.J.TR.OOOO'
        NNNNNNNAAAAJTROOOO Mod 97 Base 10 == DV
        :param value:
        :return: value
        """
        legal_process_id = int(value[:7])
        check_digit = int(value[8:10])
        year = value[11:15]
        segment = value[16:17]
        unit = value[18:20]
        court = value[21:]
        r1 = round(legal_process_id % 97)
        r2 = round(int(f'{r1}{year}{segment}{unit}') % 97)
        r3 = round(int(f'{r2}{court}00') % 97)
        check_digit_calculated = 98 - (r3 % 97)
        assert int(check_digit) == check_digit_calculated, 'Invalid Number. The check digit (DV) is not correct'
        return value
