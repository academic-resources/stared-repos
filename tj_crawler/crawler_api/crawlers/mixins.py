import re

from crawler_api.crawlers.helper import sanitize_string


class SoftplanTJCrawlerMixin:
    def parse_parties_involved(self, data):
        trs = data.xpath('//table[@id="tableTodasPartes"]|//table[@id="tablePartesPrincipais"]')
        trs = trs and trs[-1]
        parties_involved = []
        for tr in trs.css('tr'):
            td_label, td_value = tr.xpath('./td')
            type_ = td_label.xpath('./span/text()').get()
            td_value.xpath('br').remove()

            all_types = map(sanitize_string, td_value.xpath('span/text()').getall())

            all_texts = map(sanitize_string, td_value.xpath('text()').getall())
            all_texts = list(filter(lambda x: x and True, all_texts))

            representatives = [
                {
                    "type": item and re.sub(':|&nbsp', '', item),
                    "name": all_texts[index]
                }
                for index, item in enumerate(filter(lambda x: x and True, all_types), start=1)
            ]
            item = {
                'type': type_ and type_.strip().replace(":", ""),
                'name': (all_texts and all_texts[0]) or None,
                "representatives": representatives
            }
            parties_involved.append(item)
        return parties_involved

    def parse_updates(self, table):
        data = table.xpath('//tbody[@id="tabelaTodasMovimentacoes"]|//tbody[@id="tabelaUltimasMovimentacoes"]')
        data = data and data[-1]
        return [
            {
                'date': sanitize_string(row.xpath('.//td[1]/text()').get()),
                'description': " ".join(
                    map(
                        sanitize_string,
                        row.xpath('.//td[3]/*/text()|.//td[3]/text()').getall()
                    )
                ).strip()
            }
            for row in data.css('tr')
        ]
