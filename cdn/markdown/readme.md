# Typora

https://typora.io/

https://typora.io/#windows

# JSON editor

chrome-extension://lhkmoheomjbkfloacpgllgjcamhihfaj/index.html



# shape shit data

http://10.1.5.203/http-report/query?{%22Page%22:{%22PageNo%22:%221%22,%22PageSize%22:%221%22},%22EndDate%22:%222011-03-11%22,%22MarketType%22:%22HSLS%22,%22DatePerformType%22:[%22RBX%22,%22JYZBX%22],%22SecuType%22:%22All%22,%22ApiName%22:%22JYTopic.StockSecondaryMarket.StockMarketPeform%22,%22WriteType%22:%22json%22}

## string

> output url => test url

> "a0".toUpperCase()  === "A0"

```js

[
    {
        "name": "JYTopic.StockSecondaryMarket.StockMarketPeform",
        "attributes": {
            "numfound": "1",
            "columns": "{\"cols\":[{\"name\":\"交易日期\",\"value\":\"a0\"},{\"name\":\"证券代码\",\"value\":\"a1\"},{\"name\":\"证券简称\",\"value\":\"a2\"},{\"name\":\"总市值(亿元)\",\"value\":\"a3\"},{\"name\":\"流通市值(亿元)\",\"value\":\"a4\"},{\"name\":\"市盈率\",\"value\":\"a5\"},{\"name\":\"市净率\",\"value\":\"a6\"},{\"name\":\"日表现\",\"cols\":[{\"name\":\"收盘价\",\"value\":\"ClosePrice\"},{\"name\":\"涨跌幅(%)\",\"value\":\"ChangePCT\"},{\"name\":\"振幅(%)\",\"value\":\"RangePCT\"},{\"name\":\"换手率(%)\",\"value\":\"TurnoverRate\"},{\"name\":\"成交量(万股)\",\"value\":\"TurnoverVolume\"},{\"name\":\"成交额(万元)\",\"value\":\"TurnoverValue\"},{\"name\":\"前收盘价\",\"value\":\"PrevClosePrice\"},{\"name\":\"开盘价\",\"value\":\"OpenPrice\"},{\"name\":\"最高价\",\"value\":\"HighPrice\"},{\"name\":\"最低价\",\"value\":\"LowPrice\"},{\"name\":\"均价\",\"value\":\"AvgPrice\"}]},{\"name\":\"近一周表现\",\"cols\":[{\"name\":\"涨跌幅(%)\",\"value\":\"ChangePCTRW\"},{\"name\":\"振幅(%)\",\"value\":\"RangePCTRW\"},{\"name\":\"换手率(%)\",\"value\":\"TurnoverRateRW\"},{\"name\":\"日均换手率(%)\",\"value\":\"TurnoverRatePerDayRW\"},{\"name\":\"成交量(万股)\",\"value\":\"TurnoverVolumeRW\"},{\"name\":\"成交额(万元)\",\"value\":\"TurnoverValueRW\"},{\"name\":\"日均成交额(万元)\",\"value\":\"TurnoverValuePerDayRW\"},{\"name\":\"最高价\",\"value\":\"HighPriceRW\"},{\"name\":\"最低价\",\"value\":\"LowPriceRW\"},{\"name\":\"收盘最高价\",\"value\":\"HighestClosePriceRW\"},{\"name\":\"收盘最低价\",\"value\":\"LowestClosePriceRW\"},{\"name\":\"均价\",\"value\":\"AvgPriceRW\"}]},{\"name\":\"证监会行业\",\"value\":\"a8\"},{\"name\":\"申万行业\",\"value\":\"a7\"}]}"
        },
        "columnMeta": {
            "a0": "DATE",
            "a1": "STRING",
            "a2": "STRING",
            "a3": "DOUBLE",
            "a4": "DOUBLE",
            "a5": "DOUBLE",
            "a6": "DOUBLE",
            "a7": "STRING",
            "a8": "STRING",
            "closeprice": "DOUBLE",
            "changepct": "DOUBLE",
            "rangepct": "DOUBLE",
            "turnoverrate": "DOUBLE",
            "turnovervolume": "DOUBLE",
            "turnovervalue": "DOUBLE",
            "prevcloseprice": "DOUBLE",
            "openprice": "DOUBLE",
            "highprice": "DOUBLE",
            "lowprice": "DOUBLE",
            "avgprice": "DOUBLE",
            "changepctrw": "DOUBLE",
            "rangepctrw": "DOUBLE",
            "turnoverraterw": "DOUBLE",
            "turnoverrateperdayrw": "DOUBLE",
            "turnovervolumerw": "DOUBLE",
            "turnovervaluerw": "DOUBLE",
            "turnovervalueperdayrw": "DOUBLE",
            "highpricerw": "DOUBLE",
            "lowpricerw": "DOUBLE",
            "highestclosepricerw": "DOUBLE",
            "lowestclosepricerw": "DOUBLE",
            "avgpricerw": "DOUBLE"
        },
        "rows": [
            [
                "2011-03-11",
                "000001.SZ",
                "平安银行",
                559.3447088,
                498.41004102,
                8.9013,
                1.6849,
                "货币金融服务",
                "银行",
                16.05,
                -1.24,
                1.6,
                0.7412,
                2301.6686,
                37190.1339,
                16.25,
                16.18,
                16.29,
                16.03,
                16.1579,
                -2.1341,
                5.7317,
                7.0431,
                1.1739,
                21871.4176,
                362364.3027,
                60394.0504,
                16.97,
                16.03,
                16.74,
                16.05,
                16.5679
            ]
        ]
    }
]

```

## json

> JSON.parse(columns);

```js

{
    "cols": [
        {
            "name": "交易日期",
            "value": "a0"
        },
        {
            "name": "证券代码",
            "value": "a1"
        },
        {
            "name": "证券简称",
            "value": "a2"
        },
        {
            "name": "总市值(亿元)",
            "value": "a3"
        },
        {
            "name": "流通市值(亿元)",
            "value": "a4"
        },
        {
            "name": "市盈率",
            "value": "a5"
        },
        {
            "name": "市净率",
            "value": "a6"
        },
        {
            "name": "申万行业",
            "value": "a7"
        },
        {
            "name": "证监会行业",
            "value": "a8"
        },
        {
            "name": "日表现",
            "cols": [
                { "name": "收盘价", "value": "ClosePrice" },
                { "name": "涨跌幅(%)", "value": "ChangePCT" },
                { "name": "振幅(%)", "value": "RangePCT" },
                { "name": "换手率(%)", "value": "TurnoverRate" },
                { "name": "成交量(万股)", "value": "TurnoverVolume" },
                { "name": "成交额(万元)", "value": "TurnoverValue" },
                { "name": "前收盘价", "value": "PrevClosePrice" },
                { "name": "开盘价", "value": "OpenPrice" },
                { "name": "最高价", "value": "HighPrice" },
                { "name": "最低价", "value": "LowPrice" },
                { "name": "均价", "value": "AvgPrice" }
            ]
        },
        {
            "name": "近一周表现",
            "cols": [
                { "name": "涨跌幅(%)", "value": "ChangePCTRW" },
                { "name": "振幅(%)", "value": "RangePCTRW" },
                { "name": "换手率(%)", "value": "TurnoverRateRW" },
                { "name": "日均换手率(%)", "value": "TurnoverRatePerDayRW" },
                { "name": "成交量(万股)", "value": "TurnoverVolumeRW" },
                { "name": "成交额(万元)", "value": "TurnoverValueRW" },
                { "name": "日均成交额(万元)", "value": "TurnoverValuePerDayRW" },
                { "name": "最高价", "value": "HighPriceRW" },
                { "name": "最低价", "value": "LowPriceRW" },
                { "name": "收盘最高价", "value": "HighestClosePriceRW" },
                { "name": "收盘最低价", "value": "LowestClosePriceRW" },
                { "name": "均价", "value": "AvgPriceRW" }
            ]
        }
    ]
}

```

## output

> JSON to Array

```js

{
    "Properties": {
        "A0": {
            "Description": "交易日期",
            "type": "DATE"
        },
        "A1": {
            "Description": "证券代码",
            "type": "STRING"
        },
        "A2": {
            "Description": "证券简称",
            "type": "STRING"
        },
        "A3": {
            "Description": "总市值(亿元)",
            "type": "DOUBLE"
        },
        "A4": {
            "Description": "流通市值(亿元)",
            "type": "DOUBLE"
        },
        "A5": {
            "Description": "市盈率",
            "type": "DOUBLE"
        },
        "A6": {
            "Description": "市净率",
            "type": "DOUBLE"
        },
        "A7": {
            "Description": "申万行业",
            "type": "STRING"
        },
        "A8": {
            "Description": "证监会行业",
            "type": "STRING"
        },
        "日表现": {
            "ClosePrice": {
                "Description": "收盘价",
                "type": "DOUBLE"
            },
            "ChangePCT": {
                "Description": "涨跌幅(%)",
                "type": "DOUBLE"
            },
            "RangePCT": {
                "Description": "振幅(%)",
                "type": "DOUBLE"
            },
            "TurnoverRate": {
                "Description": "换手率(%)",
                "type": "DOUBLE"
            },
            "TurnoverVolume": {
                "Description": "成交量(万股)",
                "type": "DOUBLE"
            },
            "TurnoverValue": {
                "Description": "成交额(万元)",
                "type": "DOUBLE"
            },
            "PrevClosePrice": {
                "Description": "前收盘价",
                "type": "DOUBLE"
            },
            "OpenPrice": {
                "Description": "开盘价",
                "type": "DOUBLE"
            },
            "HighPrice": {
                "Description": "最高价",
                "type": "DOUBLE"
            },
            "LowPrice": {
                "Description": "最低价",
                "type": "DOUBLE"
            },
            "AvgPrice": {
                "Description": "均价",
                "type": "DOUBLE"
            }
        },
        "近一周表现": {
            "ChangePCTRW": {
                "Description": "涨跌幅(%)",
                "type": "DOUBLE"
            },
            "RangePCTRW": {
                "Description": "振幅(%)",
                "type": "DOUBLE"
            },
            "TurnoverRateRW": {
                "Description": "换手率(%)",
                "type": "DOUBLE"
            },
            "TurnoverRatePerDayRW": {
                "Description": "日均换手率(%)",
                "type": "DOUBLE"
            },
            "TurnoverVolumeRW": {
                "Description": "成交量(万股)",
                "type": "DOUBLE"
            },
            "TurnoverValueRW": {
                "Description": "成交额(万元)",
                "type": "DOUBLE"
            },
            "TurnoverValuePerDayRW": {
                "Description": "日均成交额(万元)",
                "type": "DOUBLE"
            },
            "HighPriceRW": {
                "Description": "最高价",
                "type": "DOUBLE"
            },
            "LowPriceRW": {
                "Description": "最低价",
                "type": "DOUBLE"
            },
            "HighestClosePriceRW": {
                "Description": "收盘最高价",
                "type": "DOUBLE"
            },
            "LowestClosePriceRW": {
                "Description": "收盘最低价",
                "type": "DOUBLE"
            },
            "AvgPriceRW": {
                "Description": "均价",
                "type": "DOUBLE"
            }
        }
    }
}

```

