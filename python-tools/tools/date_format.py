# -*- coding: utf-8 -*-
def date_format(date, lang):
    """Get format date by language.

    Args:
        date (datetime/date): Date.
        lang (str): Language.

    Returns:
        str: Return string date in different languages.

    """
    formats = {
        "af-ZA": "{:%Y/%m/%d}",
        "am-ET": "{:%-d/%-m/%Y}",
        "ar-AE": "{:%d/%m/%Y}",
        "ar-BH": "{:%d/%m/%Y}",
        "ar-DZ": "{:%d-%m-%Y}",
        "ar-EG": "{:%d/%m/%Y}",
        "ar-IQ": "{:%d/%m/%Y}",
        "ar-JO": "{:%d/%m/%Y}",
        "ar-KW": "{:%d/%m/%Y}",
        "ar-LB": "{:%d/%m/%Y}",
        "ar-LY": "{:%d/%m/%Y}",
        "ar-MA": "{:%d-%m-%Y}",
        "ar-OM": "{:%d/%m/%Y}",
        "ar-QA": "{:%d/%m/%Y}",
        "ar-SA": "{:%d/%m/%y}",
        "ar-SY": "{:%d/%m/%Y}",
        "ar-TN": "{:%d-%m-%Y}",
        "ar-YE": "{:%d/%m/%Y}",
        "arn-CL": "{:%d-%m-%Y}",
        "as-IN": "{:%d-%m-%Y}",
        "az-Cyrl-AZ": "{:%d.%m.%Y}",
        "az-Latn-AZ": "{:%d.%m.%Y}",
        "ba-RU": "{:%d.%m.%y}",
        "be-BY": "{:%d.%m.%Y}",
        "bg-BG": "{:%d.%-m.%Y}",
        "bn-BD": "{:%d-%m-%y}",
        "bn-IN": "{:%d-%m-%y}",
        "bo-CN": "{:%Y/%-m/%-d}",
        "br-FR": "{:%d/%m/%Y}",
        "bs-Cyrl-BA": "{:%-d.%-m.%Y}",
        "bs-Latn-BA": "{:%-d.%-m.%Y}",
        "ca-ES": "{:%d/%m/%Y}",
        "co-FR": "{:%d/%m/%Y}",
        "cs-CZ": "{:%-d.%-m.%Y}",
        "cy-GB": "{:%d/%m/%Y}",
        "da-DK": "{:%d-%m-%Y}",
        "de-AT": "{:%d.%m.%Y}",
        "de-CH": "{:%d.%m.%Y}",
        "de-DE": "{:%d.%m.%Y}",
        "de-LI": "{:%d.%m.%Y}",
        "de-LU": "{:%d.%m.%Y}",
        "dsb-DE": "{:%-d. %-m. %Y}",
        "dv-MV": "{:%d/%m/%y}",
        "el-GR": "{:%-d/%-m/%Y}",
        "en-029": "{:%m/%d/%Y}",
        "en-AU": "{:%-d-%m-%Y}",
        "en-BZ": "{:%d/%m/%Y}",
        "en-CA": "{:%d/%m/%Y}",
        "en-GB": "{:%d/%m/%Y}",
        "en-IE": "{:%d/%m/%Y}",
        "en-IN": "{:%d-%m-%Y}",
        "en-JM": "{:%d/%m/%Y}",
        "en-MY": "{:%-d/%-m/%Y}",
        "en-NZ": "{:%-d-%m-%Y}",
        "en-PH": "{:%-m/%-d/%Y}",
        "en-SG": "{:%-d/%-m/%Y}",
        "en-TT": "{:%d/%m/%Y}",
        "en-US": "{:%-m/%-d/%Y}",
        "en-ZA": "{:%Y/%m/%d}",
        "en-ZW": "{:%-m/%-d/%Y}",
        "es-AR": "{:%d/%m/%Y}",
        "es-BO": "{:%d/%m/%Y}",
        "es-CL": "{:%d-%m-%Y}",
        "es-CO": "{:%d/%m/%Y}",
        "es-CR": "{:%d/%m/%Y}",
        "es-DO": "{:%d/%m/%Y}",
        "es-EC": "{:%d/%m/%Y}",
        "es-ES": "{:%d/%m/%Y}",
        "es-GT": "{:%d/%m/%Y}",
        "es-HN": "{:%d/%m/%Y}",
        "es-MX": "{:%d/%m/%Y}",
        "es-NI": "{:%d/%m/%Y}",
        "es-PA": "{:%m/%d/%Y}",
        "es-PE": "{:%d/%m/%Y}",
        "es-PR": "{:%d/%m/%Y}",
        "es-PY": "{:%d/%m/%Y}",
        "es-SV": "{:%d/%m/%Y}",
        "es-US": "{:%-m/%-d/%Y}",
        "es-UY": "{:%d/%m/%Y}",
        "es-VE": "{:%d/%m/%Y}",
        "et-EE": "{:%-d.%m.%Y}",
        "eu-ES": "{:%Y/%m/%d}",
        "fa-IR": "{:%m/%d/%Y}",
        "fi-FI": "{:%-d.%-m.%Y}",
        "fil-PH": "{:%-m/%-d/%Y}",
        "fo-FO": "{:%d-%m-%Y}",
        "fr-BE": "{:%-d-%m-%Y}",
        "fr-CA": "{:%Y-%m-%d}",
        "fr-CH": "{:%d.%m.%Y}",
        "fr-FR": "{:%d/%m/%Y}",
        "fr-LU": "{:%d/%m/%Y}",
        "fr-MC": "{:%d/%m/%Y}",
        "fy-NL": "{:%-d-%-m-%Y}",
        "ga-IE": "{:%d/%m/%Y}",
        "gd-GB": "{:%d/%m/%Y}",
        "gl-ES": "{:%d/%m/%y}",
        "gsw-FR": "{:%d/%m/%Y}",
        "gu-IN": "{:%d-%m-%y}",
        "ha-Latn-NG": "{:%-d/%-m/%Y}",
        "he-IL": "{:%d/%m/%Y}",
        "hi-IN": "{:%d-%m-%Y}",
        "hr-BA": "{:%-d.%-m.%Y.}",
        "hr-HR": "{:%-d.%-m.%Y}",
        "hsb-DE": "{:%-d. %-m. %Y}",
        "hu-HU": "{:%Y. %m. %d.}",
        "hy-AM": "{:%d.%m.%Y}",
        "id-ID": "{:%d/%m/%Y}",
        "ig-NG": "{:%-d/%-m/%Y}",
        "ii-CN": "{:%Y/%-m/%-d}",
        "is-IS": "{:%-d.%-m.%Y}",
        "it-CH": "{:%d.%m.%Y}",
        "it-IT": "{:%d/%m/%Y}",
        "iu-Cans-CA": "{:%-d/%-m/%Y}",
        "iu-Latn-CA": "{:%-d-%m-%Y}",
        "ja-JP": "{:%Y/%m/%d}",
        "ka-GE": "{:%d.%m.%Y}",
        "kk-KZ": "{:%d.%m.%Y}",
        "kl-GL": "{:%d-%m-%Y}",
        "km-KH": "{:%Y-%m-%d}",
        "kn-IN": "{:%d-%m-%y}",
        "ko-KR": "{:%Y-%m-%d}",
        "kok-IN": "{:%d-%m-%Y}",
        "ky-KG": "{:%d.%m.%y}",
        "lb-LU": "{:%d/%m/%Y}",
        "lo-LA": "{:%d/%m/%Y}",
        "lt-LT": "{:%Y.%m.%d}",
        "lv-LV": "{:%Y.%m.%d.}",
        "mi-NZ": "{:%d/%m/%Y}",
        "mk-MK": "{:%d.%m.%Y}",
        "ml-IN": "{:%d-%m-%y}",
        "mn-MN": "{:%y.%m.%d}",
        "mn-Mong-CN": "{:%Y/%-m/%-d}",
        "moh-CA": "{:%-m/%-d/%Y}",
        "mr-IN": "{:%d-%m-%Y}",
        "ms-BN": "{:%d/%m/%Y}",
        "ms-MY": "{:%d/%m/%Y}",
        "mt-MT": "{:%d/%m/%Y}",
        "nb-NO": "{:%d.%m.%Y}",
        "ne-NP": "{:%-m/%-d/%Y}",
        "nl-BE": "{:%-d-%m-%Y}",
        "nl-NL": "{:%-d-%-m-%Y}",
        "nn-NO": "{:%d.%m.%Y}",
        "nso-ZA": "{:%Y/%m/%d}",
        "oc-FR": "{:%d/%m/%Y}",
        "or-IN": "{:%d-%m-%y}",
        "pa-IN": "{:%d-%m-%y}",
        "pl-PL": "{:%Y-%m-%d}",
        "prs-AF": "{:%d/%m/%y}",
        "ps-AF": "{:%d/%m/%y}",
        "pt-BR": "{:%d/%m/%Y}",
        "pt-PT": "{:%d-%m-%Y}",
        "qut-GT": "{:%d/%m/%Y}",
        "quz-BO": "{:%d/%m/%Y}",
        "quz-EC": "{:%d/%m/%Y}",
        "quz-PE": "{:%d/%m/%Y}",
        "rm-CH": "{:%d/%m/%Y}",
        "ro-RO": "{:%d.%m.%Y}",
        "ru-RU": "{:%d.%m.%Y}",
        "rw-RW": "{:%-m/%-d/%Y}",
        "sa-IN": "{:%d-%m-%Y}",
        "sah-RU": "{:%m.%d.%Y}",
        "se-FI": "{:%-d.%-m.%Y}",
        "se-NO": "{:%d.%m.%Y}",
        "se-SE": "{:%Y-%m-%d}",
        "si-LK": "{:%Y-%m-%d}",
        "sk-SK": "{:%-d. %-m. %Y}",
        "sl-SI": "{:%-d.%-m.%Y}",
        "sma-NO": "{:%d.%m.%Y}",
        "sma-SE": "{:%Y-%m-%d}",
        "smj-NO": "{:%d.%m.%Y}",
        "smj-SE": "{:%Y-%m-%d}",
        "smn-FI": "{:%-d.%-m.%Y}",
        "sms-FI": "{:%-d.%-m.%Y}",
        "sq-AL": "{:%Y-%m-%d}",
        "sr-Cyrl-BA": "{:%-d.%-m.%Y}",
        "sr-Cyrl-CS": "{:%-d.%-m.%Y}",
        "sr-Cyrl-ME": "{:%-d.%-m.%Y}",
        "sr-Cyrl-RS": "{:%-d.%-m.%Y}",
        "sr-Latn-BA": "{:%-d.%-m.%Y}",
        "sr-Latn-CS": "{:%-d.%-m.%Y}",
        "sr-Latn-ME": "{:%-d.%-m.%Y}",
        "sr-Latn-RS": "{:%-d.%-m.%Y}",
        "sv-FI": "{:%-d.%-m.%Y}",
        "sv-SE": "{:%Y-%m-%d}",
        "sw-KE": "{:%-m/%-d/%Y}",
        "syr-SY": "{:%d/%m/%Y}",
        "ta-IN": "{:%d-%m-%Y}",
        "te-IN": "{:%d-%m-%y}",
        "tg-Cyrl-TJ": "{:%d.%m.%y}",
        "th-TH": "{:%-d/%-m/%Y}",
        "tk-TM": "{:%d.%m.%y}",
        "tn-ZA": "{:%Y/%m/%d}",
        "tr-TR": "{:%d.%m.%Y}",
        "tt-RU": "{:%d.%m.%Y}",
        "tzm-Latn-DZ": "{:%d-%m-%Y}",
        "ug-CN": "{:%Y-%-m-%-d}",
        "uk-UA": "{:%d.%m.%Y}",
        "ur-PK": "{:%d/%m/%Y}",
        "uz-Cyrl-UZ": "{:%d.%m.%Y}",
        "uz-Latn-UZ": "{:%d/%m %Y}",
        "vi-VN": "{:%d/%m/%Y}",
        "wo-SN": "{:%d/%m/%Y}",
        "xh-ZA": "{:%Y/%m/%d}",
        "yo-NG": "{:%-d/%-m/%Y}",
        "zh-CN": "{:%Y/%-m/%-d}",
        "zh-HK": "{:%-d/%-m/%Y}",
        "zh-MO": "{:%-d/%-m/%Y}",
        "zh-SG": "{:%-d/%-m/%Y}",
        "zh-TW": "{:%Y/%-m/%-d}",
        "zu-ZA": "{:%Y/%m/%d}",
    }
    return formats[lang].format(date)
