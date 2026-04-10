### GET /crowdfunding-offerings-latest

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve the most recent crowdfunding campaigns.

```APIDOC
## GET /stable/crowdfunding-offerings-latest

### Description
Discover recently launched crowdfunding campaigns and their financial details.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/crowdfunding-offerings-latest

### Parameters
#### Query Parameters
- **page** (integer) - Optional - Page number for pagination
- **limit** (integer) - Optional - Number of results per page

### Response
#### Success Response (200)
- **data** (array) - List of recent crowdfunding campaigns.
```

---

### GET /ratings-snapshot

Source: https://site.financialmodelingprep.com/developer/docs

Get a comprehensive snapshot of financial ratings for a company based on key financial ratios.

```APIDOC
## GET /ratings-snapshot

### Description
Provides a quick assessment of a company's financial health and performance based on key financial ratios.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/ratings-snapshot

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol

### Response
#### Success Response (200)
- **rating** (object) - Financial health rating data

### Response Example
{
  "symbol": "AAPL",
  "rating": "A+"
}
```

---

### GET /fmp-articles

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves the latest articles from Financial Modeling Prep.

```APIDOC
## GET /fmp-articles

### Description
Access the latest articles from Financial Modeling Prep including headlines, snippets, and publication URLs.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/fmp-articles

### Parameters
#### Query Parameters
- **page** (integer) - Optional - Page number for pagination
- **limit** (integer) - Optional - Number of articles to return

### Response
#### Success Response (200)
- **articles** (array) - List of article objects

### Response Example
{
  "articles": [
    {
      "title": "Market Update",
      "snippet": "Summary of the market...",
      "url": "https://example.com/article"
    }
  ]
}
```

---

### GET /profile-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve comprehensive company profile data in bulk.

```APIDOC
## GET /stable/profile-bulk

### Description
Access essential company information including market cap, sector, and industry for multiple companies.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/profile-bulk

### Parameters
#### Query Parameters
- **part** (string) - Required - The data partition index to retrieve

### Response
#### Success Response (200)
- **data** (array) - Bulk list of company profiles.
```

---

### GET /quote

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves real-time price quotes for a specific cryptocurrency.

```APIDOC
## GET /stable/quote

### Description
Access real-time quotes for cryptocurrencies including current, high, low, and open prices.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/quote

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The cryptocurrency symbol (e.g., BTCUSD)

### Response
#### Success Response (200)
- **price** (number) - Current price
- **change** (number) - Price change

#### Response Example
{
  "symbol": "BTCUSD",
  "price": 60000.00
}
```

---

### All Index Quotes API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-index-quotes

This example demonstrates the JSON response structure for the All Index Quotes API, showing real-time data for a stock index including its symbol, price, change, and volume. The 'short' parameter can be set to 'true' to receive a more concise response.

```json
[{ "symbol": "^DJBGIE", "price": 4155.76, "change": 1.09, "volume": 0 }]
```

---

### GET /quote

Source: https://site.financialmodelingprep.com/developer/docs

Access real-time price quotes for specific commodities.

```APIDOC
## GET /quote

### Description
Access real-time price quotes for commodities traded worldwide.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/quote

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The commodity symbol (e.g., GCUSD)

### Request Example
https://financialmodelingprep.com/stable/quote?symbol=GCUSD

### Response
#### Success Response (200)
- **symbol** (string) - Commodity symbol
- **price** (number) - Current market price
- **change** (number) - Price change

#### Response Example
{
  "symbol": "GCUSD",
  "price": 2000.50,
  "change": 5.20
}
```

---

### GET /biggest-gainers

Source: https://site.financialmodelingprep.com/developer/docs

Track the stocks with the largest price increases.

```APIDOC
## GET /stable/biggest-gainers

### Description
Identify companies that are leading the market with significant price surges.

### Method
GET

### Endpoint
/stable/biggest-gainers

### Response
#### Success Response (200)
- **data** (array) - List of top gaining stocks

### Response Example
{
  "data": [{"symbol": "AAPL", "change": "+5%"}]
}
```

---

### Batch Aftermarket Quote API Request Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-aftermarket-quote

This example demonstrates how to construct a request to the Batch Aftermarket Quote API to retrieve aftermarket quotes for a specified stock symbol. The API requires the stock symbol(s) as a query parameter.

```HTTP
https://financialmodelingprep.com/stable/batch-aftermarket-quote?_symbols_=AAPL
```

---

### GET /stable/price-target-summary-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Provides a comprehensive overview of price targets for all listed symbols over multiple timeframes.

```APIDOC
## GET /stable/price-target-summary-bulk

### Description
Retrieves price target data across different periods to help investors compare current prices to projected targets.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/price-target-summary-bulk

### Response
#### Success Response (200)
- **symbol** (string) - Stock ticker symbol
- **lastMonthAvgPriceTarget** (string) - Average price target for the last month
- **lastYearAvgPriceTarget** (string) - Average price target for the last year

#### Response Example
[
  {
    "symbol": "A",
    "lastMonthAvgPriceTarget": "0",
    "lastYearAvgPriceTarget": "142.17"
  }
]
```

---

### GET /news/crypto

Source: https://site.financialmodelingprep.com/developer/docs

Search for cryptocurrency news by coin symbol.

```APIDOC
## GET /news/crypto

### Description
Retrieve news related to specific coins or tokens by entering their name or symbol.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/news/crypto

### Parameters
#### Query Parameters
- **symbols** (string) - Required - Crypto symbol (e.g., BTCUSD)
```

---

### GET /key-metrics

Source: https://site.financialmodelingprep.com/developer/docs

Access essential financial metrics like P/E ratio and net income to evaluate company performance.

```APIDOC
## GET /key-metrics

### Description
Access essential financial metrics for a company to evaluate performance.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/key-metrics

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL)

### Response
#### Success Response (200)
- **metrics** (object) - Key financial metrics data

### Response Example
{
  "symbol": "AAPL",
  "peRatio": 25.5
}
```

---

### GET /market-capitalization-batch

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves market capitalization data for multiple companies in a single request.

```APIDOC
## GET /market-capitalization-batch

### Description
Allows users to compare the market size of various companies simultaneously by providing a comma-separated list of symbols.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/market-capitalization-batch

### Parameters
#### Query Parameters
- **symbols** (string) - Required - Comma-separated list of stock symbols (e.g., AAPL,MSFT,GOOG)

### Response
#### Success Response (200)
- **array** (list) - List of objects containing symbol and marketCap

### Response Example
[
  {"symbol": "AAPL", "marketCap": 2500000000000},
  {"symbol": "MSFT", "marketCap": 2000000000000}
]
```

---

### GET /executive-compensation-benchmark

Source: https://site.financialmodelingprep.com/developer/docs

Access average executive compensation data across various industries.

```APIDOC
## GET /executive-compensation-benchmark

### Description
Provides essential insights for comparing executive pay by industry, helping you understand compensation trends and benchmarks.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/executive-compensation-benchmark

### Parameters
None

### Response
#### Success Response (200)
- **benchmarks** (array) - Average compensation data grouped by industry.

### Response Example
{
  "benchmarks": [
    {
      "industry": "Technology",
      "averageSalary": 500000
    }
  ]
}
```

---

### GET /stable/etf-holder-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves detailed information about assets and shares held by ETFs.

```APIDOC
## GET /stable/etf-holder-bulk

### Description
Provides insights into the weight each asset carries within an ETF and key financial information.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/etf-holder-bulk

### Parameters
#### Query Parameters
- **part** (string) - Required - The partition index for the bulk data.

### Response
#### Success Response (200)
- **symbol** (string) - ETF symbol
- **asset** (string) - Underlying asset symbol
- **weightPercentage** (string) - Weight of the asset in the ETF

#### Response Example
[
  {
    "symbol": "EXCH.AS",
    "asset": "009150.KS",
    "weightPercentage": "0.09611"
  }
]
```

---

### GET /governance-executive-compensation

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve comprehensive compensation data for company executives.

```APIDOC
## GET /governance-executive-compensation

### Description
Provides detailed information on salaries, stock awards, total compensation, and other relevant financial data, including filing details.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/governance-executive-compensation

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ticker symbol of the company.

### Response
#### Success Response (200)
- **compensationData** (array) - Detailed compensation breakdown per executive.

### Response Example
{
  "symbol": "AAPL",
  "compensation": [
    {
      "name": "Tim Cook",
      "salary": 3000000,
      "stockAwards": 50000000
    }
  ]
}
```

---

### Batch Aftermarket Quote API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-aftermarket-quote

This is an example of the JSON response received from the Batch Aftermarket Quote API. It includes details such as the stock symbol, bid size and price, ask size and price, trading volume, and a timestamp for the aftermarket quote.

```JSON
[ {
  "symbol": "AAPL",
  "bidSize": 1,
  "bidPrice": 232.45,
  "askSize": 3,
  "askPrice": 232.64,
  "volume": 41647042,
  "timestamp": 1738715334311
} ]
```

---

### Balance Sheet Growth Bulk API Example (Python)

Source: https://site.financialmodelingprep.com/developer/docs

This snippet demonstrates how to fetch balance sheet growth data for a specific year and period using the Financial Modeling Prep API. It requires the 'requests' library for making HTTP requests. The output is expected to be in JSON format.

```python
import requests

api_key = "YOUR_API_KEY"
url = f"https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?_year_=2025&_period_=Q1&apikey={api_key}"

response = requests.get(url)
data = response.json()

print(data)
```

---

### GET /stable/key-metrics-ttm-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves trailing twelve months (TTM) financial metrics for all companies in the database.

```APIDOC
## GET /stable/key-metrics-ttm-bulk

### Description
Retrieves trailing twelve months (TTM) data for all companies. Provides critical financial ratios and metrics based on the latest financial reports.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/key-metrics-ttm-bulk

### Response
#### Success Response (200)
- **symbol** (string) - Stock ticker symbol
- **altmanZScore** (string) - Altman Z-Score value
- **piotroskiScore** (string) - Piotroski score
- **marketCap** (string) - Total market capitalization

#### Response Example
[
  {
    "symbol": "000001.SZ",
    "altmanZScore": "0.2915",
    "piotroskiScore": "5",
    "marketCap": "236751980000"
  }
]
```

---

### GET /institutional-ownership/latest

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves the most recent institutional ownership filings.

```APIDOC
## GET /institutional-ownership/latest

### Description
Retrieves the most recent SEC filings related to institutional ownership.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/institutional-ownership/latest

### Parameters
#### Query Parameters
- **page** (integer) - Optional - Page number for pagination.
- **limit** (integer) - Optional - Number of records to return.

### Response
#### Success Response (200)
- **filings** (array) - List of recent institutional filings.
```

---

### GET /stable/upgrades-downgrades-consensus-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Provides a comprehensive view of analyst ratings and consensus recommendations across all symbols.

```APIDOC
## GET /stable/upgrades-downgrades-consensus-bulk

### Description
Retrieve bulk data for analyst upgrades, downgrades, and consensus recommendations.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/upgrades-downgrades-consensus-bulk

### Response
#### Success Response (200)
- **symbol** (string) - Stock ticker symbol
- **buy** (string) - Number of buy ratings
- **hold** (string) - Number of hold ratings
- **consensus** (string) - Overall consensus recommendation

#### Response Example
[
  {
    "symbol": "AAPL",
    "buy": "1",
    "hold": "1",
    "consensus": "Buy"
  }
]
```

---

### Balance Sheet Growth Bulk API Example (JavaScript)

Source: https://site.financialmodelingprep.com/developer/docs

This snippet shows how to retrieve balance sheet growth data using JavaScript's Fetch API. It targets a specific year and period and expects a JSON response. Ensure you replace 'YOUR_API_KEY' with your actual API key.

```javascript
const apiKey = "YOUR_API_KEY";
const year = 2025;
const period = "Q1";

fetch(
  `https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?_year_=${year}&_period_=${period}&apikey=${apiKey}`,
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
```

---

### GET /news/general-latest

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves the latest general news articles from various sources.

```APIDOC
## GET /news/general-latest

### Description
Access the latest general news articles from a variety of sources.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/news/general-latest

### Parameters
#### Query Parameters
- **page** (integer) - Optional - Page number
- **limit** (integer) - Optional - Number of results
```

---

### GET /quote

Source: https://site.financialmodelingprep.com/developer/docs/quickstart

Retrieve real-time stock quote data for a specific symbol.

```APIDOC
## GET /quote

### Description
Get real-time stock quote data for a given symbol.

### Method
GET

### Endpoint
/quote

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL).

### Request Example
https://financialmodelingprep.com/stable/quote?symbol=AAPL&apikey=YOUR_API_KEY

### Response
#### Success Response (200)
- **price** (number) - The current stock price.
- **volume** (number) - The trading volume.
- **symbol** (string) - The ticker symbol.
```

---

### GET /historical-chart/1min

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve 1-minute interval historical price data for commodities.

```APIDOC
## GET /historical-chart/1min

### Description
Track real-time, short-term price movements for commodities using 1-minute interval data.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-chart/1min

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The commodity symbol (e.g., GCUSD)

### Request Example
https://financialmodelingprep.com/stable/historical-chart/1min?symbol=GCUSD

### Response
#### Success Response (200)
- **date** (string) - Timestamp of the interval
- **open** (number) - Opening price
- **close** (number) - Closing price

#### Response Example
[
  {
    "date": "2023-10-27 10:00:00",
    "open": 2000.00,
    "close": 2000.10
  }
]
```

---

### Available Sectors API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-sectors

This snippet demonstrates the expected JSON response format when querying the Available Sectors API. It returns a list of objects, where each object contains a 'sector' key with the name of an industry sector. This format is consistent across API calls.

```json
[
  {
    "sector": "Basic Materials"
  }
]
```

---

### GET /news/stock

Source: https://site.financialmodelingprep.com/developer/docs

Search for stock-related news by ticker symbol.

```APIDOC
## GET /news/stock

### Description
Search for stock-related news by entering a ticker symbol or company name.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/news/stock

### Parameters
#### Query Parameters
- **symbols** (string) - Required - Ticker symbol (e.g., AAPL)
```

---

### GET /historical-sector-pe

Source: https://site.financialmodelingprep.com/developer/docs

Access historical price-to-earnings (P/E) ratios for various sectors.

```APIDOC
## GET /stable/historical-sector-pe

### Description
Analyze how sector valuations have evolved over time to understand long-term trends.

### Method
GET

### Endpoint
/stable/historical-sector-pe

### Parameters
#### Query Parameters
- **sector** (string) - Required - The name of the sector (e.g., Energy)

### Response
#### Success Response (200)
- **data** (array) - Historical P/E ratio data points

### Response Example
{
  "data": [{"date": "2024-02-01", "pe": 15.5}]
}
```

---

### GET /income-statement

Source: https://site.financialmodelingprep.com/developer/docs/quickstart

Retrieve real-time income statement data for public companies.

```APIDOC
## GET /income-statement

### Description
Get real-time income statement data for public companies, private companies, and ETFs.

### Method
GET

### Endpoint
/income-statement

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol.

### Request Example
https://financialmodelingprep.com/stable/income-statement?symbol=AAPL&apikey=YOUR_API_KEY

### Response
#### Success Response (200)
- **revenue** (number) - Total revenue for the period.
- **netIncome** (number) - Net income for the period.
- **date** (string) - The date of the financial statement.
```

---

### GET /exchange-market-hours

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve trading hours for a specific stock exchange.

```APIDOC
## GET /exchange-market-hours

### Description
Retrieve the opening and closing times for a specific stock exchange to assist in trading strategy planning.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/exchange-market-hours

### Parameters
#### Query Parameters
- **exchange** (string) - Required - The ticker symbol of the exchange (e.g., NASDAQ)

### Request Example
https://financialmodelingprep.com/stable/exchange-market-hours?exchange=NASDAQ

### Response
#### Success Response (200)
- **opening_time** (string) - Market opening time
- **closing_time** (string) - Market closing time

#### Response Example
{
  "exchange": "NASDAQ",
  "opening_time": "09:30:00",
  "closing_time": "16:00:00"
}
```

---

### Fetch Latest 8-K SEC Filings (Example)

Source: https://site.financialmodelingprep.com/developer/docs/stable/8k-latest

This snippet demonstrates how to fetch the latest 8-K SEC filings using the FMP API. It requires specifying a date range and optionally a page number and limit. The response is a JSON array containing details of each filing.

```json
[
  {
    "symbol": "BROS",
    "cik": "0001866581",
    "filingDate": "2024-03-01 00:00:00",
    "acceptedDate": "2024-02-29 21:43:41",
    "formType": "8-K",
    "hasFinancials": false,
    "link": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/0001628280-24-008098-index.htm",
    "finalLink": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/exhibit11-8xkfeb2024.htm"
  }
]
```

---

### GET /sector-performance-snapshot

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves a snapshot of market sector performance based on average changes.

```APIDOC
## GET /stable/sector-performance-snapshot

### Description
Get a snapshot of sector performance to analyze how different industries are performing in the market.

### Method
GET

### Endpoint
/stable/sector-performance-snapshot

### Parameters
#### Query Parameters
- **date** (string) - Optional - The date for the snapshot (YYYY-MM-DD)

### Response
#### Success Response (200)
- **data** (array) - List of sectors with performance metrics

### Response Example
{
  "data": [{"sector": "Energy", "changesPercentage": "1.2%"}]
}
```

---

### GET /stable/dowjones-constituent

Source: https://site.financialmodelingprep.com/developer/docs

Access data on the Dow Jones Industrial Average using the Dow Jones API. Track current values, analyze trends, and get detailed information about the companies that make up this important stock index.

```APIDOC
## GET /stable/dowjones-constituent

### Description
Access data on the Dow Jones Industrial Average. Track current values, analyze trends, and get detailed information about the companies that make up this important stock index.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/dowjones-constituent

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **sector** (string) - The company's sector.
- **subIndustry** (string) - The company's sub-industry.
- **headQuarter** (string) - The company's headquarters location.
- **dateAdded** (string) - The date the company was added to the index.
- **cik** (string) - The Central Index Key assigned by the SEC.

#### Response Example
{
  "example": "[
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "sector": "Technology",
      "subIndustry": "Technology Hardware, Storage & Peripherals",
      "headQuarter": "Cupertino, California",
      "dateAdded": "2015-03-19",
      "cik": "0000320193"
    },
    {
      "symbol": "MSFT",
      "name": "Microsoft Corporation",
      "sector": "Technology",
      "subIndustry": "Software - Infrastructure",
      "headQuarter": "Redmond, Washington",
      "dateAdded": "1997-11-03",
      "cik": "0000789019"
    }
  ]"
}
```

---

### GET /batch-aftermarket-quote

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-aftermarket-quote

Retrieve real-time aftermarket quotes for multiple stocks.

```APIDOC
## GET /batch-aftermarket-quote

### Description
Retrieve real-time aftermarket quotes for multiple stocks. This endpoint provides bid and ask prices, volume, and timestamps for post-market trading.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-aftermarket-quote

### Parameters
#### Query Parameters
- **symbols** (string) - Required - Comma-separated list of stock symbols (e.g., AAPL,MSFT)

### Request Example
GET https://financialmodelingprep.com/stable/batch-aftermarket-quote?symbols=AAPL

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol
- **bidSize** (number) - Current bid size
- **bidPrice** (number) - Current bid price
- **askSize** (number) - Current ask size
- **askPrice** (number) - Current ask price
- **volume** (number) - Trading volume
- **timestamp** (number) - Unix timestamp of the quote

#### Response Example
[
  {
    "symbol": "AAPL",
    "bidSize": 1,
    "bidPrice": 232.45,
    "askSize": 3,
    "askPrice": 232.64,
    "volume": 41647042,
    "timestamp": 1738715334311
  }
]
```

---

### All Shares Float API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-shares-float

This snippet demonstrates the JSON response structure for the All Shares Float API. It includes sample data for a company's symbol, date, free float percentage, float shares count, and outstanding shares count. This data is crucial for understanding a company's market liquidity.

```json
[
  {
    "symbol": "6898.HK",
    "date": "2025-02-04 17:27:01",
    "freeFloat": 33.2536,
    "floatShares": 318128880,
    "outstandingShares": 956675009
  }
]
```

---

### GET /forex-quote

Source: https://site.financialmodelingprep.com/developer/docs

Endpoints for retrieving real-time and historical currency exchange rate data.

```APIDOC
## GET /stable/quote

### Description
Retrieve real-time forex quotes for specific currency pairs.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/quote

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The currency pair symbol (e.g., EURUSD)

### Response
#### Success Response (200)
- **price** (number) - Current exchange rate
- **change** (number) - Price change

### Response Example
{
  "symbol": "EURUSD",
  "price": 1.0850,
  "change": 0.0012
}
```

---

### GET /dividends

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves dividend data for a specific stock symbol.

```APIDOC
## GET /stable/dividends

### Description
Provides essential dividend data for individual stock symbols, including record dates, payment dates, and declaration dates.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/dividends

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL).

### Response
#### Success Response (200)
- **symbol** (string) - Stock symbol
- **date** (string) - Dividend date
- **dividend** (number) - Dividend amount

### Response Example
{
  "symbol": "AAPL",
  "date": "2023-05-15",
  "dividend": 0.24
}
```

---

### GET /stable/_ratios-ttm-bulk_

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves trailing twelve months (TTM) financial ratios for stocks in bulk. This endpoint returns data in CSV format.

```APIDOC
## GET /stable/_ratios-ttm-bulk_

### Description
This endpoint provides an efficient way to retrieve trailing twelve months (TTM) financial ratios for stocks. It includes detailed metrics such as profitability, liquidity, efficiency, leverage, and valuation ratios based on the most recent financial reports.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_ratios-ttm-bulk_

### Parameters
None specified.

### Request Example
GET https://financialmodelingprep.com/stable/_ratios-ttm-bulk_

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol.
- **marketCap** (string) - Market capitalization.
- **enterpriseValueTTM** (string) - Enterprise value over the trailing twelve months.
- **evToSalesTTM** (string) - Enterprise value to sales ratio.
- **returnOnEquityTTM** (string) - Return on equity ratio.
- **freeCashFlowYieldTTM** (string) - Free cash flow yield.

#### Response Example
[
  {
    "symbol": "000001.SZ",
    "marketCap": "249171756000",
    "enterpriseValueTTM": "-496959244000",
    "evToSalesTTM": "-2.95816117050406",
    "returnOnEquityTTM": "0.09082717681735725",
    "freeCashFlowYieldTTM": "0.6585898925077207"
  }
]
```

---

### GET /historical-chart

Source: https://site.financialmodelingprep.com/developer/docs

Endpoints for accessing historical and intraday forex price data.

```APIDOC
## GET /stable/historical-chart/1min

### Description
Access real-time 1-minute intraday forex data for a specific currency pair.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-chart/1min

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The currency pair symbol (e.g., EURUSD)

### Response
#### Success Response (200)
- **date** (string) - Timestamp of the interval
- **close** (number) - Closing price for the minute

### Response Example
[
  {
    "date": "2023-10-27 10:00:00",
    "close": 1.0855
  }
]
```

---

### GET /price-target-consensus

Source: https://site.financialmodelingprep.com/developer/docs

Access high, low, median, and consensus price targets from analysts.

```APIDOC
## GET /price-target-consensus

### Description
Provides a comprehensive view of market expectations for future stock prices through analyst consensus.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/price-target-consensus

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol

### Response
#### Success Response (200)
- **consensus** (object) - High, low, median, and average price targets

### Response Example
{
  "symbol": "AAPL",
  "targetHigh": 200,
  "targetLow": 150,
  "targetConsensus": 175
}
```

---

### GET /financial-growth

Source: https://site.financialmodelingprep.com/developer/docs

Analyze the growth of key financial statement items across income, balance sheet, and cash flow statements.

```APIDOC
## GET /stable/financial-growth

### Description
Analyze the growth of key financial statement items across income, balance sheet, and cash flow statements to understand trends.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/financial-growth

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL)

### Response
#### Success Response (200)
- **growthData** (object) - Financial growth metrics over time
```

---

### GET /sec-profile

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves a full company profile including business descriptions, executive details, and financial data.

```APIDOC
## GET /sec-profile

### Description
Get detailed company information, including business description, executive team, and contact details.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/sec-profile

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol

### Response
#### Success Response (200)
- **profile** (object) - Detailed company profile data

### Response Example
{
  "symbol": "AAPL",
  "companyName": "Apple Inc.",
  "description": "..."
}
```

---

### Balance Sheet Growth Data JSON Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-growth-bulk

This is an example of the JSON response structure for the Balance Sheet Statement Growth Bulk API. It includes various growth metrics for a company's balance sheet items, such as cash, receivables, and equity, over a specified period.

```json
[
  {
    "symbol": "000001.SZ",
    "date": "2025-03-31",
    "fiscalYear": "2025",
    "period": "Q1",
    "reportedCurrency": "CNY",
    "growthCashAndCashEquivalents": "0.09574482145872953",
    "growthShortTermInvestments": "0",
    "growthCashAndShortTermInvestments": "0.09574482145872953",
    "growthNetReceivables": "0",
    "growthInventory": "0",
    "growthOtherCurrentAssets": "0",
    "growthTotalCurrentAssets": "0.09574482145872953",
    "growthPropertyPlantEquipmentNet": "-0.06373337231398918",
    "growthGoodwill": "0",
    "growthIntangibleAssets": "-0.03270278935556268",
    "growthGoodwillAndIntangibleAssets": "-0.01477618426770969",
    "growthLongTermInvestments": "-0.0774117797082201",
    "growthTaxAssets": "0",
    "growthOtherNonCurrentAssets": "0.07678934705504345",
    "growthTotalNonCurrentAssets": "-0.01112505367669385",
    "growthOtherAssets": "0.001488576544346165",
    "growthTotalAssets": "0.001488576544346165",
    "growthAccountPayables": "0",
    "growthShortTermDebt": "0",
    "growthTaxPayables": "-0.0279424216765453",
    "growthDeferredRevenue": "0",
    "growthOtherCurrentLiabilities": "0.12022416350749959",
    "growthTotalCurrentLiabilities": "0",
    "growthLongTermDebt": "0",
    "growthDeferredRevenueNonCurrent": "0",
    "growthDeferredTaxLiabilitiesNonCurrent": "0",
    "growthOtherNonCurrentLiabilities": "0",
    "growthOtherLiabilities": "-0.0005084911577141635",
    "growthTotalLiabilities": "-0.0005084911577141635",
    "growthPreferredStock": "0",
    "growthCommonStock": "0",
    "growthRetainedEarnings": "0.049325752755485314",
    "growthAccumulatedOtherComprehensiveIncomeLoss": "0",
    "growthOthertotalStockholdersEquity": "-0.0035208940994345805",
    "growthTotalStockholdersEquity": "0.022774946346510602",
    "growthMinorityInterest": "0",
    "growthTotalEquity": "0.022774946346510602",
    "growthTotalLiabilitiesAndStockholdersEquity": "0.001488576544346165",
    "growthTotalInvestments": "-0.0774117797082201",
    "growthTotalDebt": "0",
    "growthNetDebt": "-0.09574482145872953",
    "growthAccountsReceivables": "0",
    "growthOtherReceivables": "0",
    "growthPrepaids": "0",
    "growthTotalPayables": "-0.12022416350749959",
    "growthOtherPayables": "-0.12022416350749959",
    "growthAccruedExpenses": "0",
    "growthCapitalLeaseObligationsCurrent": "0",
    "growthAdditionalPaidInCapital": "0",
    "growthTreasuryStock": "0"
  }
]
```

---

### GET /search-name

Source: https://site.financialmodelingprep.com/developer/docs/quickstart

Search for a company by name to retrieve its ticker symbol.

```APIDOC
## GET /search-name

### Description
Search for any company to find its stock ticker symbol.

### Method
GET

### Endpoint
/search-name

### Parameters
#### Query Parameters
- **query** (string) - Required - The name of the company to search for.

### Request Example
https://financialmodelingprep.com/stable/search-name?query=apple&apikey=YOUR_API_KEY

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol.
- **name** (string) - The company name.
```

---

### GET /stable/shares-float-all

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-shares-float

Retrieves the float and outstanding shares data for all available companies. This endpoint supports pagination to manage large datasets.

```APIDOC
## GET /stable/shares-float-all

### Description
Retrieve comprehensive shares float data for all available companies, including free float, float shares, and outstanding shares to analyze market liquidity.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/shares-float-all

### Parameters
#### Query Parameters
- **page** (number) - Optional - The page number for pagination (default: 0).
- **limit** (number) - Optional - The number of records to return per request (maximum 5000).

### Request Example
GET https://financialmodelingprep.com/stable/shares-float-all?page=0&limit=1000

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol.
- **date** (string) - The timestamp of the data.
- **freeFloat** (number) - The number of shares available for public trading.
- **floatShares** (number) - The total number of shares floating on the market.
- **outstandingShares** (number) - The total number of shares outstanding.

#### Response Example
[
  {
    "symbol": "6898.HK",
    "date": "2025-02-04 17:27:01",
    "freeFloat": 33.2536,
    "floatShares": 318128880,
    "outstandingShares": 956675009
  }
]
```

---

### GET /mergers-acquisitions-search

Source: https://site.financialmodelingprep.com/developer/docs

Search for specific mergers and acquisitions data by company name.

```APIDOC
## GET /mergers-acquisitions-search

### Description
Retrieve detailed information on M&A activity, including acquiring and targeted companies, transaction dates, and links to official SEC filings.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/mergers-acquisitions-search

### Parameters
#### Query Parameters
- **name** (string) - Required - The name of the company to search for M&A activity.

### Response
#### Success Response (200)
- **data** (array) - List of M&A transactions.

### Response Example
{
  "results": [
    {
      "company": "Apple",
      "target": "Example Corp",
      "date": "2023-01-01",
      "sec_link": "https://sec.gov/example"
    }
  ]
}
```

---

### GET /cryptocurrency-list

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves a comprehensive list of all cryptocurrencies traded on exchanges worldwide.

```APIDOC
## GET /stable/cryptocurrency-list

### Description
Access a comprehensive list of all cryptocurrencies traded on exchanges worldwide.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/cryptocurrency-list

### Response
#### Success Response (200)
- **data** (array) - List of cryptocurrency objects

#### Response Example
{
  "symbol": "BTCUSD",
  "name": "Bitcoin",
  "currency": "USD"
}
```

---

### GET /grades

Source: https://site.financialmodelingprep.com/developer/docs

Access the latest stock grades and analyst actions for specific symbols.

```APIDOC
## GET /grades

### Description
Track recent grading actions such as upgrades, downgrades, or maintained ratings from top financial institutions.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/grades

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol

### Response
#### Success Response (200)
- **grades** (array) - List of recent analyst actions

### Response Example
{
  "symbol": "AAPL",
  "grades": []
}
```

---

### GET /profile

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves detailed financial and operational profile data for a specific company using its stock symbol.

```APIDOC
## GET /profile

### Description
Access detailed company profile data including market capitalization, stock price, and industry information.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/profile

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL)

### Response
#### Success Response (200)
- **symbol** (string) - Stock ticker
- **price** (number) - Current stock price
- **marketCap** (number) - Company market capitalization

### Response Example
{
  "symbol": "AAPL",
  "price": 150.00,
  "marketCap": 2500000000000
}
```

---

### GET /insider-trading/reporting-name

Source: https://site.financialmodelingprep.com/developer/docs

Search for insider trades conducted by a specific individual.

```APIDOC
## GET /insider-trading/reporting-name

### Description
Search for insider trading activity by the reporting individual's name.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/insider-trading/reporting-name

### Parameters
#### Query Parameters
- **name** (string) - Required - The name of the reporting person.
```

---

### GET /insider-trading/latest

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves the most recent insider trading activities across all companies.

```APIDOC
## GET /insider-trading/latest

### Description
Access the latest insider trading activity to track buying and selling trends.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/insider-trading/latest

### Parameters
#### Query Parameters
- **page** (integer) - Optional - Page number for pagination.
- **limit** (integer) - Optional - Number of records to return.

### Response
#### Success Response (200)
- **data** (array) - List of recent insider transactions.

#### Response Example
{
  "symbol": "AAPL",
  "transactionDate": "2023-10-27",
  "reportingName": "John Doe",
  "type": "P-Purchase"
}
```

---

### Acquisition Ownership API Response Example (JSON)

Source: https://site.financialmodelingprep.com/developer/docs/stable/acquisition-ownership

This snippet demonstrates the structure of the response received from the Acquisition Ownership API. It includes details about reporting persons, ownership percentages, and links to SEC filings. The data is crucial for understanding shifts in corporate control.

```json
[
  {
    "cik": "0000320193",
    "symbol": "AAPL",
    "filingDate": "2024-02-14",
    "acceptedDate": "2024-02-14",
    "cusip": "037833100",
    "nameOfReportingPerson": "National Indemnity Company",
    "citizenshipOrPlaceOfOrganization": "State of Nebraska",
    "soleVotingPower": "0",
    "sharedVotingPower": "755059877",
    "soleDispositivePower": "0",
    "sharedDispositivePower": "755059877",
    "amountBeneficiallyOwned": "755059877",
    "percentOfClass": "4.8",
    "typeOfReportingPerson": "IC, EP, IN, CO",
    "url": "https://www.sec.gov/Archives/edgar/data/320193/000119312524036431/d751537dsc13ga.htm"
  }
]
```

---

### GET /delisted-companies

Source: https://site.financialmodelingprep.com/developer/docs

Accesses a list of companies that have been delisted from US exchanges.

```APIDOC
## GET /delisted-companies

### Description
Provides a comprehensive list of delisted companies to help identify potential financial troubles or risky stocks.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/delisted-companies

### Parameters
#### Query Parameters
- **page** (integer) - Optional - Page number for pagination
- **limit** (integer) - Optional - Number of results per page

### Response
#### Success Response (200)
- **data** (array) - List of delisted company objects

### Response Example
{
  "data": [
    {"symbol": "OLDCO", "companyName": "Old Company Inc", "delistedDate": "2023-01-01"}
  ]
}
```

---

### GET /historical-price-eod/light

Source: https://site.financialmodelingprep.com/developer/docs

Access simplified stock chart data including date, price, and trading volume.

```APIDOC
## GET /stable/historical-price-eod/light

### Description
Provides essential charting information including date, price, and trading volume.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-price-eod/light

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol
- **from** (date) - Optional - Start date (YYYY-MM-DD)
- **to** (date) - Optional - End date (YYYY-MM-DD)

### Response
#### Success Response (200)
- **data** (array) - List of price and volume records

#### Response Example
[
  { "symbol": "AAPL", "date": "2025-02-04", "price": 232.8, "volume": 44489128 }
]
```

---

### GET /discounted-cash-flow

Source: https://site.financialmodelingprep.com/developer/docs

Endpoints for calculating company valuation using standard and levered DCF models.

```APIDOC
## GET /stable/discounted-cash-flow

### Description
Estimate the intrinsic value of a company based on expected future cash flows and discount rates.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/discounted-cash-flow

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ticker symbol of the company (e.g., AAPL)

### Response
#### Success Response (200)
- **dcf** (number) - The calculated DCF value

### Response Example
{
  "symbol": "AAPL",
  "dcf": 150.25
}
```

---

### GET /stable/batch-index-quotes

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-index-quotes

Retrieves real-time quotes for all available stock indexes in a single batch request.

```APIDOC
## GET /stable/batch-index-quotes

### Description
Retrieves real-time quotes for all available stock indexes, including major and minor benchmarks, in a single API call.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-index-quotes

### Parameters
#### Query Parameters
- **short** (boolean) - Optional - If set to true, returns a condensed version of the index data.

### Request Example
GET https://financialmodelingprep.com/stable/batch-index-quotes?short=true

### Response
#### Success Response (200)
- **symbol** (string) - The index ticker symbol.
- **price** (number) - The current real-time price of the index.
- **change** (number) - The price change of the index.
- **volume** (number) - The trading volume of the index.

#### Response Example
[
  {
    "symbol": "^DJBGIE",
    "price": 4155.76,
    "change": 1.09,
    "volume": 0
  }
]
```

---

### GET /api/v3/quote-short/{symbol}

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-quote

Retrieves real-time, non-delayed price quotes for US ETFs, including performance metrics.

```APIDOC
## GET /api/v3/quote-short/{symbol}

### Description
Provides real-time, non-delayed price quotes for US ETFs, including price, volume, and performance changes.

### Method
GET

### Endpoint
/api/v3/quote-short/{symbol}

### Parameters
#### Path Parameters
- **symbol** (string) - Required - The ETF ticker symbol.

### Response
#### Success Response (200)
- **symbol** (string) - The ETF symbol.
- **price** (float) - Current price.
- **volume** (integer) - Current volume.
- **changesPercentage** (float) - Percentage change.

#### Response Example
{
  "symbol": "SPY",
  "price": 450.20,
  "changesPercentage": 0.5
}
```

---

### Balance Sheet Statement Bulk API Request Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

This example demonstrates how to construct a request URL for the Balance Sheet Statement Bulk API. It requires specifying the year and period for which the data is needed. The API returns a JSON array of balance sheet data for multiple companies.

```HTTP
https://financialmodelingprep.com/stable/balance-sheet-statement-bulk?_year_ =2025&_period_ =Q1
```

---

### GET /insider-trading/search

Source: https://site.financialmodelingprep.com/developer/docs

Search for specific insider trading activities by company symbol.

```APIDOC
## GET /insider-trading/search

### Description
Search insider trading activity by company or symbol.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/insider-trading/search

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol.
- **page** (integer) - Optional - Page number.
- **limit** (integer) - Optional - Number of records to return.
```

---

### GET /stable/_available-sectors_

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-sectors

Retrieves a list of available industry sectors. This API helps users categorize and filter companies based on their respective sectors, enabling deeper analysis and more focused queries across different industries.

````APIDOC
## GET /stable/_available-sectors_

### Description
Retrieves a list of available industry sectors. This API helps users categorize and filter companies based on their respective sectors, enabling deeper analysis and more focused queries across different industries.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_available-sectors_

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **sector** (string) - The name of the industry sector.

#### Response Example
```json
[
  {
    "sector": "Basic Materials"
  }
]
````

````

--------------------------------

### Batch Forex Quotes API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-forex-quotes

This snippet demonstrates the JSON response structure for the Batch Forex Quotes API. It includes sample data for a forex pair, showing the symbol, current price, change, and volume. This format is useful for parsing and integrating real-time forex data into applications.

```json
[ { "symbol": "AEDAUD", "price": 0.41372, "change": 0.00153892, "volume": 0 } ]
````

---

### Connect to Financial Modeling Prep via FastMCP in Python

Source: https://site.financialmodelingprep.com/developer/docs/mcp-server

This snippet demonstrates how to initialize an MCP client using the FastMCP library to interact with Financial Modeling Prep tools. It covers listing available tools and executing a specific tool call to retrieve stock data.

```python
import asyncio
from fastmcp import Client

async def main():
    client = Client("https://financialmodelingprep.com/mcp?apikey=FMP_API_KEY")
    async with client:
        # List available tools
        print(await client.list_tools())
        # Call a specific tool
        print(await client.call_tool("quote", {"symbol": "AAPL"}))

asyncio.run(main())
```

---

### GET /financial-reports-json

Source: https://site.financialmodelingprep.com/developer/docs

Access comprehensive annual reports on Form 10-K in JSON format.

```APIDOC
## GET /stable/financial-reports-json

### Description
Obtain detailed information about a company’s financial performance and risk factors from SEC 10-K filings.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/financial-reports-json

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol
- **year** (integer) - Required - The fiscal year
- **period** (string) - Required - The reporting period (e.g., FY)

### Response
#### Success Response (200)
- **report** (object) - Detailed 10-K financial data
```

---

### As Reported Income Statements API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-income-statements

This JSON object represents a sample response from the As Reported Income Statements API, detailing a company's reported income statement data for a specific fiscal year and period. It includes key financial metrics such as revenue, cost of goods sold, gross profit, operating expenses, operating income, taxes, and net income.

```json
[
  {
    "symbol": "AAPL",
    "fiscalYear": 2024,
    "period": "FY",
    "reportedCurrency": null,
    "date": "2024-09-27",
    "data": {
      "revenuefromcontractwithcustomerexcludingassessedtax": 391035000000,
      "costofgoodsandservicessold": 210352000000,
      "grossprofit": 180683000000,
      "researchanddevelopmentexpense": 31370000000,
      "sellinggeneralandadministrativeexpense": 26097000000,
      "operatingexpenses": 57467000000,
      "operatingincomeloss": 123216000000,
      "nonoperatingincomeexpense": 269000000,
      "incomelossfromcontinuingoperationsbeforeincometaxesextraordinaryitemsnoncontrollinginterest": 123485000000,
      "incometaxexpensebenefit": 29749000000,
      "netincomeloss": 93736000000,
      "earningspersharebasic": 6.11,
      "earningspersharediluted": 6.08,
      "weightedaveragenumberofsharesoutstandingbasic": 15343783000,
      "weightedaveragenumberofdilutedsharesoutstanding": 15408095000,
      "othercomprehensiveincomelossforeigncurrencytransactionandtranslationadjustmentnetoftax": 395000000,
      "othercomprehensiveincomelossderivativeinstrumentgainlossbeforereclassificationaftertax": -832000000,
      "othercomprehensiveincomelossderivativeinstrumentgainlossreclassificationaftertax": 1337000000,
      "othercomprehensiveincomelossderivativeinstrumentgainlossafterreclassificationandtax": -2169000000,
      "othercomprehensiveincomeunrealizedholdinggainlossonsecuritiesarisingduringperiodnetoftax": 5850000000,
      "othercomprehensiveincomelossreclassificationadjustmentfromaociforsaleofsecuritiesnetoftax": -204000000,
      "othercomprehensiveincomelossavailableforsalesecuritiesadjustmentnetoftax": 6054000000,
      "othercomprehensiveincomelossnetoftaxportionattributabletoparent": 4280000000,
      "comprehensiveincomenetoftax": 98016000000
    }
  }
]
```

---

### GET /esg-disclosures

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve ESG disclosure information for a specific company symbol.

```APIDOC
## GET /stable/esg-disclosures

### Description
Access ESG disclosure data to align investments with values based on company performance.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/esg-disclosures

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company (e.g., AAPL)

### Response
#### Success Response (200)
- **data** (object) - ESG disclosure details for the requested symbol.
```

---

### GET /key-executives

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve detailed information on company executives including titles and demographics.

```APIDOC
## GET /key-executives

### Description
Provides essential data about key executives, including their name, title, compensation, and other demographic details such as gender and year of birth.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/key-executives

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ticker symbol of the company.

### Response
#### Success Response (200)
- **executives** (array) - List of key company executives.

### Response Example
{
  "symbol": "AAPL",
  "executives": [
    {
      "name": "Tim Cook",
      "title": "CEO",
      "yearOfBirth": 1960
    }
  ]
}
```

---

### All Industry Classification API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-industry-classification

This code snippet demonstrates the structure of the response received from the All Industry Classification API. It includes details such as company symbol, name, CIK, SIC code, industry title, business address, and phone number.

```json
[
  {
    "symbol": "0Q16.L",
    "name": "BANK OF AMERICA CORP /DE/",
    "cik": "0000070858",
    "sicCode": "6021",
    "industryTitle": "NATIONAL COMMERCIAL BANKS",
    "businessAddress": "['BANK OF AMERICA CORPORATE CENTER', 'CHARLOTTE NC 28255']",
    "phoneNumber": "7043868486"
  }
]
```

---

### GET /cash-flow-statement-growth-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves bulk growth data for cash flow statements for a specific year and period.

```APIDOC
## GET /cash-flow-statement-growth-bulk

### Description
The Cash Flow Statement Growth Bulk API allows you to retrieve bulk growth data for cash flow statements, enabling you to track changes in cash flows over time.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/cash-flow-statement-growth-bulk

### Parameters
#### Query Parameters
- **year** (string) - Required - The fiscal year (e.g., 2025)
- **period** (string) - Required - The fiscal period (Q1, Q2, Q3, Q4, or FY)

### Response
#### Success Response (200)
- **symbol** (string) - Stock ticker symbol
- **date** (string) - Report date
- **growthNetIncome** (number) - Growth percentage of net income

#### Response Example
[
  {
    "symbol": "000001.SZ",
    "date": "2025-03-31",
    "growthNetIncome": "0"
  }
]
```

---

### GET /market-capitalization-batch

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-market-cap

Retrieves market capitalization data for a list of provided stock symbols in a single batch request.

```APIDOC
## GET /market-capitalization-batch

### Description
Retrieve market capitalization data for multiple companies in a single request to compare valuations and market size.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/market-capitalization-batch

### Parameters
#### Query Parameters
- **symbols** (string) - Required - A comma-separated list of stock symbols (e.g., AAPL,MSFT,GOOG)

### Request Example
https://financialmodelingprep.com/stable/market-capitalization-batch?symbols=AAPL,MSFT,GOOG

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol
- **date** (string) - The date of the market cap data
- **marketCap** (number) - The calculated market capitalization value

#### Response Example
[
  {
    "symbol": "AAPL",
    "date": "2025-02-04",
    "marketCap": 3500823120000
  }
]
```

---

### GET /earnings

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves earnings report data for a specific stock symbol.

```APIDOC
## GET /stable/earnings

### Description
Gain access to key financial data for a specific stock symbol, including earnings report dates, EPS estimates, and revenue projections.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/earnings

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL).

### Response
#### Success Response (200)
- **symbol** (string) - Stock symbol
- **date** (string) - Earnings date
- **eps** (number) - Earnings per share

### Response Example
{
  "symbol": "AAPL",
  "date": "2023-04-27",
  "eps": 1.52
}
```

---

### GET /senate-trades

Source: https://site.financialmodelingprep.com/developer/docs

Monitors the trading activity of U.S. Senators for specific assets.

```APIDOC
## GET /stable/senate-trades

### Description
Access detailed information on trades made by Senators, including dates, assets, and amounts.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/senate-trades

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol to filter trades (e.g., AAPL)

### Response
#### Success Response (200)
- **trades** (array) - List of senate trade disclosures

#### Response Example
{
  "symbol": "AAPL",
  "senator": "John Doe",
  "transaction": "Purchase"
}
```

---

### GET /institutional-ownership/symbol-positions-summary

Source: https://site.financialmodelingprep.com/developer/docs

Provides a snapshot of institutional holdings for a specific stock symbol.

```APIDOC
## GET /institutional-ownership/symbol-positions-summary

### Description
Tracks metrics like number of investors, share changes, and total investment value for a specific stock.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/institutional-ownership/symbol-positions-summary

### Parameters
#### Query Parameters
- **symbol** (string) - Required - Stock ticker symbol.
- **year** (integer) - Required - Filing year.
- **quarter** (integer) - Required - Filing quarter.
```

---

### GET /stable/batch-quote-short

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-quote-short

Retrieves a snapshot of real-time stock data for one or more symbols.

```APIDOC
## GET /stable/batch-quote-short

### Description
Provides a quick snapshot of key stock data such as current price, change, and volume for multiple companies in one streamlined request.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-quote-short

### Parameters
#### Query Parameters
- **symbols** (string) - Required - A comma-separated list of stock symbols (e.g., AAPL,MSFT).

### Request Example
https://financialmodelingprep.com/stable/batch-quote-short?symbols=AAPL

### Response
#### Success Response (200)
- **symbol** (string) - The ticker symbol of the stock.
- **price** (number) - The current market price.
- **change** (number) - The price change value.
- **volume** (number) - The trading volume.

#### Response Example
[
  {
    "symbol": "AAPL",
    "price": 232.8,
    "change": 4.79,
    "volume": 44489128
  }
]
```

---

### GET /insider-trading/statistics

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve statistical data regarding insider transactions for a specific symbol.

```APIDOC
## GET /insider-trading/statistics

### Description
Analyze insider trading activity with key statistics including total purchases and sales.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/insider-trading/statistics

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol.
```

---

### GET /historical-chart/{interval}

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves intraday stock price data at specified intervals (1min, 5min, 15min, 30min).

```APIDOC
## GET /historical-chart/{interval}

### Description
Retrieve real-time or historical stock data in specific intraday intervals (1min, 5min, 15min, 30min) including open, high, low, close, and volume.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-chart/{interval}

### Parameters
#### Path Parameters
- **interval** (string) - Required - The time interval (1min, 5min, 15min, 30min)

#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol
- **from** (date) - Optional - Start date
- **to** (date) - Optional - End date
- **nonadjusted** (boolean) - Optional - Whether to return non-adjusted data

### Response
#### Success Response (200)
- **date** (string) - Timestamp of the interval
- **open** (number) - Opening price
- **high** (number) - High price
- **low** (number) - Low price
- **close** (number) - Closing price
- **volume** (number) - Trading volume

### Response Example
[
  {
    "date": "2025-02-04 15:59:00",
    "open": 233.01,
    "low": 232.72,
    "high": 233.13,
    "close": 232.79,
    "volume": 720121
  }
]
```

---

### GET /historical-chart/{interval}

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve historical stock price and volume data at specific time intervals (1-hour or 4-hour).

```APIDOC
## GET /historical-chart/{interval}

### Description
Access stock price movements (open, high, low, close) and volume data over specified hourly intervals.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-chart/{interval}?symbol={symbol}

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL).
- **from** (date) - Optional - Start date for historical data.
- **to** (date) - Optional - End date for historical data.
- **nonadjusted** (boolean) - Optional - Set to true to retrieve non-adjusted data.

### Response
#### Success Response (200)
- **date** (string) - The timestamp of the interval.
- **open** (number) - Opening price.
- **low** (number) - Lowest price during the interval.
- **high** (number) - Highest price during the interval.
- **close** (number) - Closing price.
- **volume** (number) - Trading volume.

### Response Example
[
  {
    "date": "2025-02-04 15:30:00",
    "open": 232.29,
    "low": 232.01,
    "high": 233.13,
    "close": 232.79,
    "volume": 3476320
  }
]
```

---

### Balance Sheet Statement Bulk API Response Example

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

This is an example of the JSON response structure for the Balance Sheet Statement Bulk API. It includes detailed financial data points such as cash, assets, liabilities, equity, and debt for a specific company and period. The data is crucial for in-depth financial analysis.

```JSON
[ { "date": "2025-03-31", "symbol": "MTLRP.ME", "reportedCurrency": "RUB", "cik": "0000000000", "filingDate": "2025-05-31", "acceptedDate": "2025-03-31 07:00:00", "fiscalYear": "2025", "period": "Q1", "cashAndCashEquivalents": "1985000", "shortTermInvestments": "0", "cashAndShortTermInvestments": "1985000", "netReceivables": "9666577000", "accountsReceivables": "9666577000", "otherReceivables": "0", "inventory": "4520000", "prepaids": "0", "otherCurrentAssets": "27293000", "totalCurrentAssets": "9700830000", "propertyPlantEquipmentNet": "194000", "goodwill": "0", "intangibleAssets": "5665000", "goodwillAndIntangibleAssets": "5665000", "longTermInvestments": "237373355000", "taxAssets": "791813000", "otherNonCurrentAssets": "0", "totalNonCurrentAssets": "238171027000", "otherAssets": "0", "totalAssets": "247871857000", "totalPayables": "3861497000", "accountPayables": "3861497000", "otherPayables": "0", "accruedExpenses": "0", "shortTermDebt": "4842848000", "capitalLeaseObligationsCurrent": "0", "taxPayables": "2484576000", "deferredRevenue": "0", "otherCurrentLiabilities": "146647000", "totalCurrentLiabilities": "8851455000", "longTermDebt": "178923999000", "capitalLeaseObligationsNonCurrent": "0", "deferredRevenueNonCurrent": "0", "deferredTaxLiabilitiesNonCurrent": "737391000", "otherNonCurrentLiabilities": "52574304000", "totalNonCurrentLiabilities": "232235780000", "otherLiabilities": "0", "capitalLeaseObligations": "0", "totalLiabilities": "244087635000", "treasuryStock": "0", "preferredStock": "0", "commonStock": "5550277000", "retainedEarnings": "-5066509000", "additionalPaidInCapital": "6023340000", "accumulatedOtherComprehensiveIncomeLoss": "0", "otherTotalStockholdersEquity": "0", "totalStockholdersEquity": "6784622000", "totalEquity": "6784622000", "minorityInterest": "0", "totalLiabilitiesAndTotalEquity": "247871857000", "totalInvestments": "237373355000", "totalDebt": "183766847000", "netDebt": "183764862000" } ]
```

---

### GET /api/v3/batch-aftermarket-quote

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-quote

Retrieves aftermarket and pre-market trade data for multiple symbols in a single request.

```APIDOC
## GET /api/v3/batch-aftermarket-quote

### Description
Retrieves pre-market and after-market trade data. Supports batch requests up to 1,000 symbols.

### Method
GET

### Endpoint
/api/v3/batch-aftermarket-quote

### Parameters
#### Query Parameters
- **symbols** (string) - Required - Comma-separated list of symbols (max 1,000).

### Response
#### Success Response (200)
- **data** (array) - List of aftermarket quote objects.

#### Response Example
{
  "data": [
    {
      "symbol": "AAPL",
      "price": 176.00
    }
  ]
}
```

---

### Stock Batch Quote Short API Response Example (JSON)

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-quote-short

This snippet demonstrates the expected JSON response format for the Stock Batch Quote Short API. It includes the symbol, current price, price change, and trading volume for a requested stock.

```json
[{ "symbol": "AAPL", "price": 232.8, "change": 4.79, "volume": 44489128 }]
```

---

### GET /stable/batch-index-quotes

Source: https://site.financialmodelingprep.com/developer/docs

The All Index Quotes API provides real-time quotes for a wide range of stock indexes, from major market benchmarks to niche indexes. This API allows users to track market performance across multiple indexes in a single request, giving them a broad view of the financial markets.

```APIDOC
## GET /stable/batch-index-quotes

### Description
Provides real-time quotes for a wide range of stock indexes. This API allows users to track market performance across multiple indexes in a single request, giving them a broad view of the financial markets.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-index-quotes

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock market index symbol.
- **name** (string) - The name of the stock market index.
- **price** (number) - The current price of the index.
- **change** (number) - The change in price.
- **changesPercentage** (number) - The percentage change in price.
- **dayLow** (number) - The lowest price during the trading day.
- **dayHigh** (number) - The highest price during the trading day.
- **volume** (number) - The trading volume for the index.
- **avgVolume** (number) - The average trading volume.
- **open** (number) - The opening price of the index.
- **previousClose** (number) - The previous day's closing price.
- **eps** (number) - Earnings per share.
- **peRatio** (number) - Price-to-earnings ratio.
- **marketCap** (number) - Market capitalization.
- **lastUpdated** (string) - The timestamp of the last update.

#### Response Example
{
  "example": "[
    {
      "symbol": "^GSPC",
      "name": "S&P 500",
      "price": 4150.48,
      "change": 20.58,
      "changesPercentage": 0.50,
      "dayLow": 4130.10,
      "dayHigh": 4160.20,
      "volume": 1800000000,
      "avgVolume": 1750000000,
      "open": 4135.00,
      "previousClose": 4129.90,
      "eps": 200.50,
      "peRatio": 20.70,
      "marketCap": 35000000000000,
      "lastUpdated": "2023-10-27T16:00:00.000Z"
    },
    {
      "symbol": "^DJI",
      "name": "Dow Jones Industrial Average",
      "price": 33000.50,
      "change": 150.20,
      "changesPercentage": 0.46,
      "dayLow": 32900.00,
      "dayHigh": 33100.00,
      "volume": 150000000,
      "avgVolume": 145000000,
      "open": 32900.00,
      "previousClose": 32850.30,
      "eps": 1500.00,
      "peRatio": 22.00,
      "marketCap": 10000000000000,
      "lastUpdated": "2023-10-27T16:00:00.000Z"
    }
  ]"
}
```

---

### GET /commitment-of-traders-report

Source: https://site.financialmodelingprep.com/developer/docs

Access comprehensive Commitment of Traders (COT) reports to assess market sentiment.

```APIDOC
## GET /stable/commitment-of-traders-report

### Description
Provides detailed information about long and short positions across various sectors.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/commitment-of-traders-report

### Response
#### Success Response (200)
- **data** (array) - List of COT report entries.
```

---

### GET /institutional-ownership/extract

Source: https://site.financialmodelingprep.com/developer/docs

Extracts detailed data from official SEC filings for a specific CIK.

```APIDOC
## GET /institutional-ownership/extract

### Description
Extracts detailed data such as company shares and security details from official SEC filings.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/institutional-ownership/extract

### Parameters
#### Query Parameters
- **cik** (string) - Required - The CIK identifier of the institution.
- **year** (integer) - Required - Filing year.
- **quarter** (integer) - Required - Filing quarter (1-4).
```

---

### GET /cash-flow-statement-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves bulk cash flow statement data for a specified fiscal year and period.

```APIDOC
## GET /cash-flow-statement-bulk

### Description
This endpoint returns bulk cash flow statement data for companies. The response is provided in CSV format, allowing for efficient analysis of operating, investing, and financing activities.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/cash-flow-statement-bulk

### Parameters
#### Query Parameters
- **year** (string) - Required - The fiscal year for which to retrieve data (e.g., 2025).
- **period** (string) - Required - The fiscal period (e.g., Q1, Q2, Q3, Q4, FY).

### Request Example
GET https://financialmodelingprep.com/stable/cash-flow-statement-bulk?year=2025&period=Q1

### Response
#### Success Response (200)
- **symbol** (string) - The ticker symbol of the company.
- **date** (string) - The date of the report.
- **fiscalYear** (string) - The fiscal year of the report.
- **period** (string) - The fiscal period (e.g., Q1).
- **growthCashAndCashEquivalents** (string) - Growth rate of cash and cash equivalents.

#### Response Example
[
  {
    "symbol": "000001.SZ",
    "date": "2025-03-31",
    "fiscalYear": "2025",
    "period": "Q1",
    "reportedCurrency": "CNY",
    "growthCashAndCashEquivalents": "0.09574482145872953"
  }
]
```

---

### GET /earning-call-transcript

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves the full earnings call transcript for a specific company and period.

```APIDOC
## GET /stable/earning-call-transcript

### Description
Access the full transcript of a company’s earnings call to analyze management's communication and financial strategy.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/earning-call-transcript

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol.
- **year** (integer) - Required - The fiscal year.
- **quarter** (integer) - Required - The fiscal quarter (1-4).

### Response
#### Success Response (200)
- **symbol** (string) - Stock symbol
- **transcript** (string) - Full text of the earnings call

### Response Example
{
  "symbol": "AAPL",
  "transcript": "...transcript content..."
}
```

---

### GET /eod-bulk

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves end-of-day stock price data for multiple symbols in bulk for a specific date.

```APIDOC
## GET /eod-bulk

### Description
The EOD Bulk API allows users to retrieve end-of-day stock price data for multiple symbols in bulk.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/eod-bulk

### Parameters
#### Query Parameters
- **date** (string) - Required - The date for the EOD data (YYYY-MM-DD)

### Response
#### Success Response (200)
- **data** (array) - List of EOD stock records

#### Response Example
[
  {
    "symbol": "AAPL",
    "close": 150.00,
    "date": "2024-10-22"
  }
]
```

---

### GET /stable/quote

Source: https://site.financialmodelingprep.com/developer/docs

Access real-time stock index quotes. Stay updated with the latest price changes, daily highs and lows, volume, and other key metrics for major stock indices around the world.

```APIDOC
## GET /stable/quote

### Description
Access real-time stock index quotes. Stay updated with the latest price changes, daily highs and lows, volume, and other key metrics for major stock indices around the world.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/quote

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock market index symbol (e.g., "^GSPC").

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock market index symbol.
- **name** (string) - The name of the stock market index.
- **price** (number) - The current price of the index.
- **change** (number) - The change in price.
- **changesPercentage** (number) - The percentage change in price.
- **dayLow** (number) - The lowest price during the trading day.
- **dayHigh** (number) - The highest price during the trading day.
- **volume** (number) - The trading volume for the index.
- **avgVolume** (number) - The average trading volume.
- **open** (number) - The opening price of the index.
- **previousClose** (number) - The previous day's closing price.
- **eps** (number) - Earnings per share.
- **peRatio** (number) - Price-to-earnings ratio.
- **marketCap** (number) - Market capitalization.
- **lastUpdated** (string) - The timestamp of the last update.

#### Response Example
{
  "example": "{
    \"symbol\": \"^GSPC\",
    \"name\": \"S&P 500\",
    \"price\": 4150.48,
    \"change\": 20.58,
    \"changesPercentage\": 0.50,
    \"dayLow\": 4130.10,
    \"dayHigh\": 4160.20,
    \"volume\": 1800000000,
    \"avgVolume\": 1750000000,
    \"open\": 4135.00,
    \"previousClose\": 4129.90,
    \"eps\": 200.50,
    \"peRatio\": 20.70,
    \"marketCap\": 35000000000000,
    \"lastUpdated\": \"2023-10-27T16:00:00.000Z\"
  }"
}
```

---

### GET /financial-scores

Source: https://site.financialmodelingprep.com/developer/docs

Assess a company's financial health using metrics like Altman Z-Score and Piotroski Score.

```APIDOC
## GET /financial-scores

### Description
Assess a company's financial strength using the Financial Health Scores API.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/financial-scores

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL)

### Response
#### Success Response (200)
- **altmanZScore** (number) - The Altman Z-Score value
- **piotroskiScore** (number) - The Piotroski Score value
```

---

### GET /batch-quote

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-quote

Retrieve real-time stock quotes for multiple symbols in a single API call.

```APIDOC
## GET /batch-quote

### Description
Retrieve multiple real-time stock quotes in a single request. This endpoint is designed for efficient portfolio monitoring and tracking multiple assets simultaneously.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-quote

### Parameters
#### Query Parameters
- **symbols** (string) - Required - Comma-separated list of stock symbols (e.g., AAPL,MSFT).

### Request Example
GET https://financialmodelingprep.com/stable/batch-quote?symbols=AAPL

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol.
- **name** (string) - Company name.
- **price** (number) - Current market price.
- **changePercentage** (number) - Percentage change in price.
- **change** (number) - Absolute change in price.
- **volume** (number) - Trading volume.
- **marketCap** (number) - Total market capitalization.
- **timestamp** (number) - Unix timestamp of the data.

#### Response Example
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 232.8,
    "changePercentage": 2.1008,
    "change": 4.79,
    "volume": 44489128,
    "dayLow": 226.65,
    "dayHigh": 233.13,
    "yearHigh": 260.1,
    "yearLow": 164.08,
    "marketCap": 3500823120000,
    "priceAvg50": 240.2278,
    "priceAvg200": 219.98755,
    "exchange": "NASDAQ",
    "open": 227.2,
    "previousClose": 228.01,
    "timestamp": 1738702801
  }
]
```

---

### GET /stable/_actively-trading-list_

Source: https://site.financialmodelingprep.com/developer/docs/stable/actively-trading-list

Retrieves a list of all actively trading companies and financial instruments. This endpoint is useful for real-time market monitoring and identifying investment opportunities.

```APIDOC
## GET /stable/_actively-trading-list_

### Description
Retrieves a list of all companies and financial instruments that are currently being traded on public exchanges. This endpoint is essential for real-time market monitoring, identifying investment opportunities, and filtering securities based on exchange, industry, or region.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_actively-trading-list_

### Parameters
#### Query Parameters
- **exchange** (string) - Optional - Filter securities by a specific stock exchange (e.g., NASDAQ, NYSE).
- **industry** (string) - Optional - Filter securities by industry sector.
- **region** (string) - Optional - Filter securities by geographical region.

### Request Example
```

GET https://financialmodelingprep.com/stable/_actively-trading-list_?exchange=NASDAQ

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol of the company or instrument.
- **name** (string) - The name of the company or financial instrument.

#### Response Example
```json
[
  {
    "symbol": "6898.HK",
    "name": "China Aluminum Cans Holdings Limited"
  }
]
````

````

--------------------------------

### GET /stable/quote-short

Source: https://site.financialmodelingprep.com/developer/docs

Access concise stock index quotes. This API provides a snapshot of the current price, change, and volume for stock indexes, making it ideal for users who need a quick overview of market movements.

```APIDOC
## GET /stable/quote-short

### Description
Access concise stock index quotes. This API provides a snapshot of the current price, change, and volume for stock indexes, making it ideal for users who need a quick overview of market movements.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/quote-short

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock market index symbol (e.g., "^GSPC").

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock market index symbol.
- **name** (string) - The name of the stock market index.
- **price** (number) - The current price of the index.
- **change** (number) - The change in price.
- **volume** (number) - The trading volume for the index.
- **lastUpdated** (string) - The timestamp of the last update.

#### Response Example
{
  "example": "{
    \"symbol\": \"^GSPC\",
    \"name\": \"S&P 500\",
    \"price\": 4150.48,
    \"change\": 20.58,
    \"volume\": 1800000000,
    \"lastUpdated\": \"2023-10-27T16:00:00.000Z\"
  }"
}
````

---

### GET /sec-filings-8k

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves the latest 8-K SEC filings for publicly traded companies within a specified date range.

```APIDOC
## GET /sec-filings-8k

### Description
Fetch the most recent 8-K filings to monitor significant company events like mergers or leadership changes.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/sec-filings-8k

### Parameters
#### Query Parameters
- **from** (string) - Optional - Start date (YYYY-MM-DD)
- **to** (string) - Optional - End date (YYYY-MM-DD)
- **page** (integer) - Optional - Page number for pagination
- **limit** (integer) - Optional - Number of results per page

### Response
#### Success Response (200)
- **filings** (array) - List of 8-K filing objects

### Response Example
{
  "filings": [
    {
      "symbol": "AAPL",
      "formType": "8-K",
      "acceptedDate": "2024-02-01",
      "link": "https://www.sec.gov/..."
    }
  ]
}
```

---

### GET /batch-aftermarket-trade

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-aftermarket-trade

Retrieves real-time aftermarket trading data for multiple stocks in a single request.

```APIDOC
## GET /batch-aftermarket-trade

### Description
Retrieve real-time aftermarket trading data for multiple stocks with the FMP Batch Aftermarket Trade API. Track post-market trade prices, volumes, and timestamps across several companies simultaneously.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-aftermarket-trade

### Parameters
#### Query Parameters
- **symbols** (string) - Required - Comma-separated list of stock symbols (e.g., AAPL,MSFT)

### Request Example
GET https://financialmodelingprep.com/stable/batch-aftermarket-trade?symbols=AAPL

### Response
#### Success Response (200)
- **symbol** (string) - The stock ticker symbol
- **price** (number) - The price of the trade
- **tradeSize** (number) - The number of shares traded
- **timestamp** (number) - The timestamp of the trade in milliseconds

#### Response Example
[
  {
    "symbol": "AAPL",
    "price": 232.53,
    "tradeSize": 132,
    "timestamp": 1738715334311
  }
]
```

---

### GET /historical-price-eod/non-split-adjusted

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves end-of-day stock price and volume data without adjustments for stock splits.

```APIDOC
## GET /historical-price-eod/non-split-adjusted

### Description
Access stock price and volume data without adjustments for stock splits. Get accurate insights into stock performance including open, high, low, close, and volume.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-price-eod/non-split-adjusted

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL)
- **from** (date) - Optional - Start date for data retrieval
- **to** (date) - Optional - End date for data retrieval

### Response
#### Success Response (200)
- **symbol** (string) - Ticker symbol
- **date** (string) - Date of the record
- **open** (number) - Opening price
- **high** (number) - High price
- **low** (number) - Low price
- **close** (number) - Closing price
- **volume** (number) - Trading volume

### Response Example
[
  {
    "symbol": "AAPL",
    "date": "2025-02-04",
    "open": 227.2,
    "high": 233.13,
    "low": 226.65,
    "close": 232.8,
    "volume": 44489128
  }
]
```

---

### Retrieve Historical Price Data with FMPPRICE

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Example of a function call that returns an array of data. This function may trigger a #SPILL error if there is insufficient empty space in the adjacent cells to display the returned values.

```Excel/Google Sheets Formula
=FMPPRICE("AAPL", "close", 3)
```

---

### Retrieve Real-Time Price Data

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Demonstrates the use of the FMPPRICE function to fetch live market data for stocks and ETFs. This function is optimized for refreshing multiple securities simultaneously.

```Excel/Google Sheets
=FMPPRICE("AAPL", "price")
```

---

### GET /stable/_all-industry-classification_

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-industry-classification

Retrieves a comprehensive list of companies classified by industry, including their SIC codes, business addresses, and contact details.

```APIDOC
## GET /stable/_all-industry-classification_

### Description
Retrieves a list of companies with their respective industry classification details, including SIC codes, industry titles, and business contact information.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_all-industry-classification_

### Parameters
#### Query Parameters
- **page** (number) - Optional - The page number for pagination.
- **limit** (number) - Optional - The number of records to return per request.

### Request Example
GET https://financialmodelingprep.com/stable/_all-industry-classification_?page=0&limit=100

### Response
#### Success Response (200)
- **symbol** (string) - Stock ticker symbol.
- **name** (string) - Company name.
- **cik** (string) - Central Index Key.
- **sicCode** (string) - Standard Industrial Classification code.
- **industryTitle** (string) - Title of the industry.
- **businessAddress** (array) - List of address components.
- **phoneNumber** (string) - Company contact phone number.

#### Response Example
[
  {
    "symbol": "0Q16.L",
    "name": "BANK OF AMERICA CORP /DE/",
    "cik": "0000070858",
    "sicCode": "6021",
    "industryTitle": "NATIONAL COMMERCIAL BANKS",
    "businessAddress": ["BANK OF AMERICA CORPORATE CENTER", "CHARLOTTE NC 28255"],
    "phoneNumber": "7043868486"
  }
]
```

---

### GET /stable/_insider-trading-transaction-type_

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-transaction-types

Retrieves a list of all available insider transaction types, such as awards, purchases, and sales.

```APIDOC
## GET /stable/_insider-trading-transaction-type_

### Description
Retrieves a comprehensive list of all transaction types used to classify insider trading activities, including acquisitions, dispositions, and corporate actions.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_insider-trading-transaction-type_

### Parameters
None

### Request Example
GET https://financialmodelingprep.com/stable/_insider-trading-transaction-type_

### Response
#### Success Response (200)
- **transactionType** (string) - The classification label for the insider transaction.

#### Response Example
[
  {
    "transactionType": "A-Award"
  }
]
```

---

### GET /income-statement-as-reported

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-income-statements

Retrieves the income statement for a specific company as it was officially reported in their financial filings.

```APIDOC
## GET /income-statement-as-reported

### Description
Retrieve income statements as they were reported by the company with the As Reported Income Statements API. Access raw financial data directly from official company filings.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/income-statement-as-reported

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ticker symbol of the company (e.g., AAPL).
- **limit** (number) - Optional - The number of records to return (max 1000).
- **period** (string) - Optional - The reporting period, either 'annual' or 'quarter'.

### Request Example
https://financialmodelingprep.com/stable/income-statement-as-reported?symbol=AAPL&limit=5

### Response
#### Success Response (200)
- **symbol** (string) - Ticker symbol
- **fiscalYear** (number) - The fiscal year of the report
- **period** (string) - The reporting period (e.g., FY, Q1)
- **data** (object) - The raw financial data fields as reported in the filing

#### Response Example
{
  "symbol": "AAPL",
  "fiscalYear": 2024,
  "period": "FY",
  "data": {
    "revenuefromcontractwithcustomerexcludingassessedtax": 391035000000,
    "grossprofit": 180683000000,
    "netincomeloss": 93736000000
  }
}
```

---

### Fetch Financial Data using FMP Function in Excel

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on-explorer

Demonstrates how to use the FMP function in Excel to retrieve financial data for a given stock symbol and data point. Supports various period formats including specific years, quarters, 'LQ' (Last Quarter), and 'TTM' (Trailing Twelve Months).

```excel
=FMP("AAPL", "Date", 2023)

```

```excel
=FMP("AAPL", "Date", 2023, "Q2")

```

```excel
=FMP("AAPL", "Date", "LQ-1")

```

```excel
=FMP("AAPL", "Date", "TTM")

```

---

### GET /stable/historical-chart/1min

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve 1-minute interval intraday data for stock indexes using the Intraday 1-Minute Price Data API. This API provides granular price information, helping users track short-term price movements and trading volume within each minute.

```APIDOC
## GET /stable/historical-chart/1min

### Description
Retrieve 1-minute interval intraday data for stock indexes. This API provides granular price information, helping users track short-term price movements and trading volume within each minute.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-chart/1min

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock market index symbol (e.g., "^GSPC").

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The timestamp of the data point.
- **open** (number) - The opening price for the minute.
- **high** (number) - The highest price for the minute.
- **low** (number) - The lowest price for the minute.
- **close** (number) - The closing price for the minute.
- **volume** (number) - The trading volume for the minute.

#### Response Example
{
  "example": "{
    \"date\": \"2023-10-27T09:30:00.000Z\",
    \"open\": 4135.00,
    \"high\": 4135.50,
    \"low\": 4134.80,
    \"close\": 4135.20,
    \"volume\": 150000
  }"
}
```

---

### GET /stable/index-list

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve a comprehensive list of stock market indexes across global exchanges. This API provides essential information such as the symbol, name, exchange, and currency for each index.

```APIDOC
## GET /stable/index-list

### Description
Retrieve a comprehensive list of stock market indexes across global exchanges. This API provides essential information such as the symbol, name, exchange, and currency for each index.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/index-list

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock market index symbol.
- **name** (string) - The name of the stock market index.
- **exchange** (string) - The exchange where the index is listed.
- **currency** (string) - The currency of the index.

#### Response Example
{
  "example": "[
    {
      "symbol": "^GSPC",
      "name": "S&P 500",
      "exchange": "NASDAQ",
      "currency": "USD"
    },
    {
      "symbol": "^DJI",
      "name": "Dow Jones Industrial Average",
      "exchange": "NASDAQ",
      "currency": "USD"
    }
  ]"
}
```

---

### GET /stable/historical-chart/5min

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve 5-minute interval intraday price data for stock indexes using the Intraday 5-Minute Price Data API. This API provides crucial insights into price movements and trading volume within 5-minute windows, ideal for traders who require short-term data.

```APIDOC
## GET /stable/historical-chart/5min

### Description
Retrieve 5-minute interval intraday price data for stock indexes. This API provides crucial insights into price movements and trading volume within 5-minute windows, ideal for traders who require short-term data.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-chart/5min

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock market index symbol (e.g., "^GSPC").

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The timestamp of the data point.
- **open** (number) - The opening price for the 5-minute interval.
- **high** (number) - The highest price for the 5-minute interval.
- **low** (number) - The lowest price for the 5-minute interval.
- **close** (number) - The closing price for the 5-minute interval.
- **volume** (number) - The trading volume for the 5-minute interval.

#### Response Example
{
  "example": "{
    \"date\": \"2023-10-27T09:30:00.000Z\",
    \"open\": 4135.00,
    \"high\": 4137.80,
    \"low\": 4134.50,
    \"close\": 4137.20,
    \"volume\": 750000
  }"
}
```

---

### GET /analyst-estimates

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve analyst financial estimates for specific stock symbols, including revenue and EPS projections.

```APIDOC
## GET /analyst-estimates

### Description
Retrieve projected financial figures like revenue and earnings per share (EPS) as forecasted by industry analysts.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/analyst-estimates

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL)
- **period** (string) - Optional - The time period (e.g., annual, quarterly)
- **page** (integer) - Optional - Page number for pagination
- **limit** (integer) - Optional - Number of results per page

### Response
#### Success Response (200)
- **estimates** (array) - List of financial estimates

### Response Example
{
  "symbol": "AAPL",
  "estimates": []
}
```

---

### Stock Quote API

Source: https://site.financialmodelingprep.com/developer/docs

Access real-time stock quotes with the FMP Stock Quote API. Get up-to-the-minute prices, changes, and volume data for individual stocks.

```APIDOC
## GET /stable/quote

### Description
Access real-time stock quotes for a specific stock symbol.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/quote

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol to retrieve quotes for (e.g., AAPL).

### Request Example
```

https://financialmodelingprep.com/stable/quote?symbol=AAPL

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **price** (number) - The current stock price.
- **volume** (integer) - The trading volume.
- **change** (number) - The price change.

#### Response Example
```json
{
  "symbol": "AAPL",
  "price": 170.50,
  "volume": 50000000,
  "change": 1.25
}
````

````

--------------------------------

### GET /sec-filings-search/symbol

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves SEC filings for a specific company identified by its stock ticker symbol.

```APIDOC
## GET /sec-filings-search/symbol

### Description
Search and retrieve regulatory filings such as 8-K, 10-K, and 10-Q reports for a specific company using its stock symbol.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/sec-filings-search/symbol

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol (e.g., AAPL)
- **from** (string) - Optional - Start date
- **to** (string) - Optional - End date

### Response
#### Success Response (200)
- **filings** (array) - List of regulatory filings for the symbol

### Response Example
{
  "symbol": "AAPL",
  "filings": []
}
````

---

### FMPPRICE Function for Price Data

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Obtains live and historical price data, including open, close, and dividend information. Supports single or multiple tickers and parameters. Optional parameters include the number of days, start date, and end date for historical data retrieval.

```Excel Formula
=FMPPRICE("ticker/s", "parameter/s", number of days to end, "start date", "end date")
```

```Excel Formula
=FMPPRICE("TSLA","Price")
```

```Excel Formula
=FMPPRICE("AAPL", "Close",,"01/01/2022", "01/30/2022")
```

```Excel Formula
=FMPPRICE("AMZN", "Open", 2)
```

```Excel Formula
=SUM(FMPPRICE("AAPL", "Close", , "01/28/2022"))
```

---

### Sample JSON Response for Balance Sheet Growth

Source: https://site.financialmodelingprep.com/developer/docs

This is a sample JSON object representing a single record from the Balance Sheet Growth Bulk API. It includes various financial metrics for a company for a specific fiscal period.

```json
[
  {
    "date": "2025-03-31",
    "symbol": "MTLRP.ME",
    "reportedCurrency": "RUB",
    "cik": "0000000000",
    "filingDate": "2025-05-31",
    "acceptedDate": "2025-03-31 07:00:00",
    "fiscalYear": "2025",
    "period": "Q1",
    "cashAndCashEquivalents": "1985000",
    "shortTermInvestments": "0",
    "cashAndShortTermInvestments": "1985000",
    "netReceivables": "9666577000",
    "accountsReceivables": "9666577000",
    "otherReceivables": "0",
    "inventory": "4520000",
    "prepaids": "0",
    "otherCurrentAssets": "27293000",
    "totalCurrentAssets": "9700830000",
    "propertyPlantEquipmentNet": "194000",
    "goodwill": "0",
    "intangibleAssets": "5665000",
    "goodwillAndIntangibleAssets": "5665000",
    "longTermInvestments": "237373355000",
    "taxAssets": "791813000",
    "otherNonCurrentAssets": "0",
    "totalNonCurrentAssets": "238171027000",
    "otherAssets": "0",
    "totalAssets": "247871857000",
    "totalPayables": "3861497000",
    "accountPayables": "3861497000",
    "otherPayables": "0",
    "accruedExpenses": "0",
    "shortTermDebt": "4842848000",
    "capitalLeaseObligationsCurrent": "0",
    "taxPayables": "2484576000",
    "deferredRevenue": "0",
    "otherCurrentLiabilities": "146647000",
    "totalCurrentLiabilities": "8851455000",
    "longTermDebt": "178923999000",
    "capitalLeaseObligationsNonCurrent": "0",
    "deferredRevenueNonCurrent": "0",
    "deferredTaxLiabilitiesNonCurrent": "737391000",
    "otherNonCurrentLiabilities": "52574304000",
    "totalNonCurrentLiabilities": "232235780000",
    "otherLiabilities": "0",
    "capitalLeaseObligations": "0",
    "totalLiabilities": "244087635000",
    "treasuryStock": "0",
    "preferredStock": "0",
    "commonStock": "5550277000",
    "retainedEarnings": "-5066509000",
    "additionalPaidInCapital": "6023340000",
    "accumulatedOtherComprehensiveIncomeLoss": "0",
    "otherTotalStockholdersEquity": "0",
    "totalStockholdersEquity": "6784622000",
    "totalEquity": "6784622000",
    "minorityInterest": "0",
    "totalLiabilitiesAndTotalEquity": "247871857000",
    "totalInvestments": "237373355000",
    "totalDebt": "183766847000",
    "netDebt": "183764862000"
  }
]
```

---

### Generate Financial Data Formula

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Demonstrates the syntax for the FMP function used to retrieve specific financial metrics for a given ticker, period, and parameter.

```Excel/Google Sheets
=FMP("AAPL", "Revenue", 2021)
```

---

### Example JSON Response for Available Transcript Symbols API

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-transcript-symbols

This snippet demonstrates the expected JSON response format for the Available Transcript Symbols API. It includes the stock symbol, company name, and the number of available transcripts for each company.

```json
[
  {
    "symbol": "MCUJF",
    "companyName": "Medicure Inc.",
    "noOfTranscripts": "16"
  }
]
```

---

### GET /stable/nasdaq-constituent

Source: https://site.financialmodelingprep.com/developer/docs

Access comprehensive data for the Nasdaq index with the Nasdaq Index API. Monitor real-time movements and track the historical performance of companies listed on this prominent stock exchange.

```APIDOC
## GET /stable/nasdaq-constituent

### Description
Access comprehensive data for the Nasdaq index. Monitor real-time movements and track the historical performance of companies listed on this prominent stock exchange.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/nasdaq-constituent

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **sector** (string) - The company's sector.
- **subIndustry** (string) - The company's sub-industry.
- **headQuarter** (string) - The company's headquarters location.
- **dateAdded** (string) - The date the company was added to the index.
- **cik** (string) - The Central Index Key assigned by the SEC.

#### Response Example
{
  "example": "[
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "sector": "Technology",
      "subIndustry": "Technology Hardware, Storage & Peripherals",
      "headQuarter": "Cupertino, California",
      "dateAdded": "1994-06-13",
      "cik": "0000320193"
    },
    {
      "symbol": "GOOGL",
      "name": "Alphabet Inc.",
      "sector": "Communication Services",
      "subIndustry": "Interactive Media & Services",
      "headQuarter": "Mountain View, California",
      "dateAdded": "2004-08-19",
      "cik": "0001652044"
    }
  ]"
}
```

---

### Get 1 Hour Interval Stock Chart Data

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve hourly stock price and volume data for a specified symbol. This API is useful for analyzing intraday stock movements. Requires a 'symbol' query parameter.

```json
[
  {
    "date": "2025-02-04 15:30:00",
    "open": 232.29,
    "low": 232.01,
    "high": 233.13,
    "close": 232.79,
    "volume": 3476320
  }
]
```

---

### GET /stable/historical-price-eod/full

Source: https://site.financialmodelingprep.com/developer/docs

Access full historical end-of-day prices for stock indexes using the Detailed Historical Price Data API. This API provides comprehensive information, including open, high, low, close prices, volume, and additional metrics for detailed financial analysis.

```APIDOC
## GET /stable/historical-price-eod/full

### Description
Access full historical end-of-day prices for stock indexes. This API provides comprehensive information, including open, high, low, close prices, volume, and additional metrics for detailed financial analysis.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-price-eod/full

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock market index symbol (e.g., "^GSPC").

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The date of the historical data.
- **open** (number) - The opening price for the day.
- **high** (number) - The highest price for the day.
- **low** (number) - The lowest price for the day.
- **close** (number) - The closing price for the day.
- **adjClose** (number) - The adjusted closing price for the day.
- **volume** (number) - The trading volume for the day.
- **unadjustedVolume** (number) - The unadjusted trading volume for the day.
- **change** (number) - The change in price from the previous day.
- **changePercent** (number) - The percentage change in price from the previous day.
- **vwap** (number) - Volume Weighted Average Price.
- **label** (string) - A formatted date string (e.g., "Oct 27, 2023").
- **changeOverTime** (number) - The cumulative change over time.

#### Response Example
{
  "example": "{
    \"date\": \"2023-10-27T00:00:00.000Z\",
    \"open\": 4135.00,
    \"high\": 4160.20,
    \"low\": 4130.10,
    \"close\": 4150.48,
    \"adjClose\": 4150.48,
    \"volume\": 1800000000,
    \"unadjustedVolume\": 1800000000,
    \"change\": 20.58,
    \"changePercent\": 0.0050,
    \"vwap\": 4145.20,
    \"label\": \"Oct 27, 2023\",
    \"changeOverTime\": 0.0050
  }"
}
```

---

### Full Forex Quote API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve real-time quotes for multiple forex currency pairs with the FMP Batch Forex Quote API. Get real-time price changes and updates for a variety of forex pairs in a single request.

```APIDOC
## GET /stable/batch-forex-quotes

### Description
Retrieve real-time quotes for multiple forex currency pairs.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-forex-quotes

### Parameters
#### Query Parameters
- **symbols** (string) - Optional - A comma-separated list of forex symbols (e.g., EURUSD, GBPUSD).

### Request Example
```

https://financialmodelingprep.com/stable/batch-forex-quotes?symbols=EURUSD,GBPUSD

````

### Response
#### Success Response (200)
- **symbol** (string) - The forex symbol.
- **price** (number) - The current price.
- **change** (number) - The price change.

#### Response Example
```json
[
  {
    "symbol": "EURUSD",
    "price": 1.0750,
    "change": 0.0010
  },
  {
    "symbol": "GBPUSD",
    "price": 1.2400,
    "change": 0.0015
  }
]
````

````

--------------------------------

### GET /technical-indicators/adx

Source: https://site.financialmodelingprep.com/developer/docs/stable/average-directional-index

Retrieves the Average Directional Index (ADX) technical indicator for a given stock symbol, period, and timeframe.

```APIDOC
## GET /technical-indicators/adx

### Description
Retrieves the Average Directional Index (ADX) for a specified symbol. This endpoint helps in identifying the strength of a trend.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/technical-indicators/adx

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ticker symbol of the company (e.g., AAPL).
- **periodLength** (number) - Required - The number of periods to use for the calculation.
- **timeframe** (string) - Required - The interval for the data (e.g., 1min, 5min, 15min, 30min, 1hour, 4hour, 1day).
- **from** (date) - Optional - Start date for the data range (YYYY-MM-DD).
- **to** (date) - Optional - End date for the data range (YYYY-MM-DD).

### Request Example
https://financialmodelingprep.com/stable/technical-indicators/adx?symbol=AAPL&periodLength=10&timeframe=1day

### Response
#### Success Response (200)
- **date** (string) - The date and time of the record.
- **open** (number) - Opening price.
- **high** (number) - High price.
- **low** (number) - Low price.
- **close** (number) - Closing price.
- **volume** (number) - Trading volume.
- **adx** (number) - The calculated ADX value.

#### Response Example
[
  {
    "date": "2025-02-04 00:00:00",
    "open": 227.2,
    "high": 233.13,
    "low": 226.65,
    "close": 232.8,
    "volume": 44489128,
    "adx": 26.414065772772613
  }
]
````

---

### Stock Batch Quote Short API

Source: https://site.financialmodelingprep.com/developer/docs

Access real-time, short-form quotes for multiple stocks with the FMP Stock Batch Quote Short API. Get a quick snapshot of key stock data such as current price, change, and volume for several companies in one streamlined request.

```APIDOC
## GET /stable/batch-quote-short

### Description
Retrieve short-form real-time stock quotes for multiple stock symbols in a single request.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-quote-short

### Parameters
#### Query Parameters
- **symbols** (string) - Required - A comma-separated list of stock symbols (e.g., AAPL,GOOG,MSFT).

### Request Example
```

https://financialmodelingprep.com/stable/batch-quote-short?symbols=AAPL,GOOG,MSFT

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **price** (number) - The current stock price.
- **volume** (integer) - The trading volume.
- **change** (number) - The price change.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "price": 170.50,
    "volume": 50000000,
    "change": 1.25
  },
  {
    "symbol": "GOOG",
    "price": 130.00,
    "volume": 20000000,
    "change": 0.75
  }
]
````

````

--------------------------------

### GET /sec-filings-8k

Source: https://site.financialmodelingprep.com/developer/docs/stable/8k-latest

Retrieves the latest 8-K SEC filings within a specified date range, supporting pagination and result limiting.

```APIDOC
## GET /sec-filings-8k

### Description
Retrieve the most recent 8-K filings submitted to the SEC. This endpoint allows filtering by date range and supports pagination.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/sec-filings-8k

### Parameters
#### Query Parameters
- **from** (string) - Required - Start date for the filings (YYYY-MM-DD).
- **to** (string) - Required - End date for the filings (YYYY-MM-DD).
- **page** (number) - Optional - Page number for pagination (default 0).
- **limit** (number) - Optional - Number of records to return (max 1000).

### Request Example
https://financialmodelingprep.com/stable/sec-filings-8k?from=2024-01-01&to=2024-03-01&page=0&limit=100

### Response
#### Success Response (200)
- **symbol** (string) - Stock ticker symbol.
- **cik** (string) - Central Index Key.
- **filingDate** (string) - Date of the filing.
- **acceptedDate** (string) - Date the filing was accepted by the SEC.
- **formType** (string) - Type of form (e.g., 8-K).
- **hasFinancials** (boolean) - Indicates if the filing contains financial data.
- **link** (string) - URL to the SEC filing index page.
- **finalLink** (string) - URL to the specific filing document.

#### Response Example
[
  {
    "symbol": "BROS",
    "cik": "0001866581",
    "filingDate": "2024-03-01 00:00:00",
    "acceptedDate": "2024-02-29 21:43:41",
    "formType": "8-K",
    "hasFinancials": false,
    "link": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/0001628280-24-008098-index.htm",
    "finalLink": "https://www.sec.gov/Archives/edgar/data/1866581/000162828024008098/exhibit11-8xkfeb2024.htm"
  }
]
````

---

### Get 4 Hour Interval Stock Chart Data

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve stock price and volume data in 4-hour intervals for a specified symbol. This API helps in tracking longer intraday trends. Requires a 'symbol' query parameter.

```json
[
  {
    "date": "2025-02-04 15:30:00",
    "open": 232.29,
    "low": 232.01,
    "high": 233.13,
    "close": 232.37,
    "volume": 15079381
  }
]
```

---

### GET /stable/historical-price-eod/light

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve end-of-day historical prices for stock indexes using the Historical Price Data API. This API provides essential data such as date, price, and volume, enabling detailed analysis of price movements over time.

```APIDOC
## GET /stable/historical-price-eod/light

### Description
Retrieve end-of-day historical prices for stock indexes. This API provides essential data such as date, price, and volume, enabling detailed analysis of price movements over time.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-price-eod/light

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock market index symbol (e.g., "^GSPC").

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The date of the historical data.
- **close** (number) - The closing price for the day.
- **volume** (number) - The trading volume for the day.
- **unadjustedVolume** (number) - The unadjusted trading volume for the day.
- **change** (number) - The change in price from the previous day.
- **changePercent** (number) - The percentage change in price from the previous day.
- **vwap** (number) - Volume Weighted Average Price.
- **label** (string) - A formatted date string (e.g., "Oct 27, 2023").
- **changeOverTime** (number) - The cumulative change over time.

#### Response Example
{
  "example": "{
    \"date\": \"2023-10-27T00:00:00.000Z\",
    \"close\": 4150.48,
    \"volume\": 1800000000,
    \"unadjustedVolume\": 1800000000,
    \"change\": 20.58,
    \"changePercent\": 0.0050,
    \"vwap\": 4145.20,
    \"label\": \"Oct 27, 2023\",
    \"changeOverTime\": 0.0050
  }"
}
```

---

### GET /api/v3/quote/{symbol}

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-quote

Retrieves real-time stock quotes during regular market hours. Note that this endpoint does not include pre-market or after-market data.

```APIDOC
## GET /api/v3/quote/{symbol}

### Description
Retrieves the latest real-time stock quote for a specific symbol during regular market trading hours.

### Method
GET

### Endpoint
/api/v3/quote/{symbol}

### Parameters
#### Path Parameters
- **symbol** (string) - Required - The ticker symbol of the stock (e.g., AAPL).

### Response
#### Success Response (200)
- **symbol** (string) - The ticker symbol.
- **price** (float) - The current price.
- **volume** (integer) - The trading volume.

#### Response Example
{
  "symbol": "AAPL",
  "price": 175.50,
  "volume": 50000000
}
```

---

### GET /stable/historical-nasdaq-constituent

Source: https://site.financialmodelingprep.com/developer/docs

Access historical data for the Nasdaq index using the Historical Nasdaq API. Analyze changes in the index composition and view how it has evolved over time, including company additions and removals.

```APIDOC
## GET /stable/historical-nasdaq-constituent

### Description
Access historical data for the Nasdaq index. Analyze changes in the index composition and view how
```

---

### GET /balance-sheet-statement-growth

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-growth

Retrieves year-over-year growth data for balance sheet items for a specified company.

```APIDOC
## GET /balance-sheet-statement-growth

### Description
Provides year-over-year growth metrics for key balance sheet components, allowing for the analysis of asset expansion, liability evolution, and equity shifts.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement-growth

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ticker symbol of the company (e.g., AAPL).
- **limit** (number) - Optional - The number of records to return (max 1000).
- **period** (string) - Optional - The reporting period (e.g., Q1, Q2, Q3, Q4, FY, annual, quarter).

### Request Example
https://financialmodelingprep.com/stable/balance-sheet-statement-growth?symbol=AAPL

### Response
#### Success Response (200)
- **symbol** (string) - The company ticker symbol.
- **date** (string) - The date of the financial report.
- **fiscalYear** (string) - The fiscal year of the report.
- **period** (string) - The reporting period.
- **growthTotalAssets** (number) - The percentage growth of total assets.
- **growthTotalLiabilities** (number) - The percentage growth of total liabilities.
- **growthTotalEquity** (number) - The percentage growth of total equity.

#### Response Example
[
  {
    "symbol": "AAPL",
    "date": "2024-09-28",
    "fiscalYear": "2024",
    "period": "FY",
    "growthTotalAssets": 0.03516,
    "growthTotalLiabilities": 0.06057,
    "growthTotalEquity": -0.08360
  }
]
```

---

### GET /stable/historical-chart/1hour

Source: https://site.financialmodelingprep.com/developer/docs

Access 1-hour interval intraday data for stock indexes using the Intraday 1-Hour Price Data API. This API provides detailed price movements and volume within hourly intervals, making it ideal for tracking medium-term market trends during the trading day.

```APIDOC
## GET /stable/historical-chart/1hour

### Description
Access 1-hour interval intraday data for stock indexes. This API provides detailed price movements and volume within hourly intervals, making it ideal for tracking medium-term market trends during the trading day.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-chart/1hour

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock market index symbol (e.g., "^GSPC").

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The timestamp of the data point.
- **open** (number) - The opening price for the hour.
- **high** (number) - The highest price for the hour.
- **low** (number) - The lowest price for the hour.
- **close** (number) - The closing price for the hour.
- **volume** (number) - The trading volume for the hour.

#### Response Example
{
  "example": "{
    \"date\": \"2023-10-27T10:00:00.000Z\",
    \"open\": 4138.00,
    \"high\": 4145.50,
    \"low\": 4137.00,
    \"close\": 4144.80,
    \"volume\": 5000000
  }"
}
```

---

### GET /stable/cash-flow-statement-as-reported

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-cashflow-statements

Retrieves as-reported cash flow statements for a specified company symbol. This endpoint allows analysis of operational, investment, and financing cash flows directly from official company filings.

````APIDOC
## GET /stable/cash-flow-statement-as-reported

### Description
Retrieves as-reported cash flow statements for a specified company symbol. This endpoint allows analysis of operational, investment, and financing cash flows directly from official company filings.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/cash-flow-statement-as-reported

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company (e.g., AAPL).
- **limit** (number) - Optional - Limits the number of records returned (e.g., 5). Maximum 1000 records per request.
- **period** (string) - Optional - Specifies the period for the data ('annual' or 'quarter').

### Request Example
```json
{
  "example": "https://financialmodelingprep.com/stable/cash-flow-statement-as-reported?_symbol_=AAPL&period=annual&limit=5"
}
````

### Response

#### Success Response (200)

- **symbol** (string) - The stock symbol.
- **fiscalYear** (number) - The fiscal year of the statement.
- **period** (string) - The reporting period (e.g., 'FY', 'Q1').
- **reportedCurrency** (string) - The currency in which the data is reported.
- **date** (string) - The date of the report.
- **data** (object) - An object containing various cash flow metrics:
  - **cashcashequivalentsrestrictedcashandrestrictedcashequivalents** (number) - Cash and cash equivalents, including restricted cash.
  - **netincomeloss** (number) - Net income or loss for the period.
  - **depreciationdepletionandamortization** (number) - Depreciation, depletion, and amortization expenses.
  - **sharebasedcompensation** (number) - Expenses related to share-based compensation.
  - **othernoncashincomeexpense** (number) - Other non-cash income or expense items.
  - **increasedecreaseinaccountsreceivable** (number) - Changes in accounts receivable.
  - **increasedecreaseinotherreceivables** (number) - Changes in other receivables.
  - **increasedecreaseininventories** (number) - Changes in inventories.
  - **increasedecreaseinotheroperatingassets** (number) - Changes in other operating assets.
  - **increasedecreaseinaccountspayable** (number) - Changes in accounts payable.
  - **increasedecreaseinotheroperatingliabilities** (number) - Changes in other operating liabilities.
  - **netcashprovidedbyusedinoperatingactivities** (number) - Net cash flow from operating activities.
  - **paymentstoacquireavailableforsalesecuritiesdebt** (number) - Payments to acquire available-for-sale securities.
  - **proceedsfrommaturitiesprepaymentsandcallsofavailableforsalesecurities** (number) - Proceeds from maturities, prepayments, and calls of available-for-sale securities.
  - **proceedsfromsaleofavailableforsalesecuritiesdebt** (number) - Proceeds from the sale of available-for-sale securities.
  - **paymentstoacquirepropertyplantandequipment** (number) - Payments to acquire property, plant, and equipment.
  - **paymentsforproceedsfromotherinvestingactivities** (number) - Payments related to other investing activities.
  - **netcashprovidedbyusedininvestingactivities** (number) - Net cash flow from investing activities.
  - **paymentsrelatedtotaxwithholdingforsharebasedcompensation** (number) - Tax payments related to share-based compensation.
  - **paymentsofdividends** (number) - Dividend payments.
  - **paymentsforrepurchaseofcommonstock** (number) - Payments for the repurchase of common stock.
  - **repaymentsoflongtermdebt** (number) - Repayments of long-term debt.
  - **proceedsfromrepaymentsofcommercialpaper** (number) - Proceeds from repayment of commercial paper.
  - **proceedsfrompaymentsforotherfinancingactivities** (number) - Proceeds from other financing activities.
  - **netcashprovidedbyusedinfinancingactivities** (number) - Net cash flow from financing activities.
  - **cashcashequivalentsrestrictedcashandrestrictedcashequivalentsperiodincreasedecreaseincludingexchangerateeffect** (number) - Period increase or decrease in cash, cash equivalents, restricted cash, and restricted cash equivalents, including exchange rate effects.
  - **incometaxespaidnet** (number) - Net income taxes paid.

#### Response Example

```json
{
  "example": [
    {
      "symbol": "AAPL",
      "fiscalYear": 2024,
      "period": "FY",
      "reportedCurrency": null,
      "date": "2024-09-27",
      "data": {
        "cashcashequivalentsrestrictedcashandrestrictedcashequivalents": 29943000000,
        "netincomeloss": 93736000000,
        "depreciationdepletionandamortization": 11445000000,
        "sharebasedcompensation": 11688000000,
        "othernoncashincomeexpense": 2266000000,
        "increasedecreaseinaccountsreceivable": 3788000000,
        "increasedecreaseinotherreceivables": 1356000000,
        "increasedecreaseininventories": 1046000000,
        "increasedecreaseinotheroperatingassets": 11731000000,
        "increasedecreaseinaccountspayable": 6020000000,
        "increasedecreaseinotheroperatingliabilities": 15552000000,
        "netcashprovidedbyusedinoperatingactivities": 118254000000,
        "paymentstoacquireavailableforsalesecuritiesdebt": 48656000000,
        "proceedsfrommaturitiesprepaymentsandcallsofavailableforsalesecurities": 51211000000,
        "proceedsfromsaleofavailableforsalesecuritiesdebt": 11135000000,
        "paymentstoacquirepropertyplantandequipment": 9447000000,
        "paymentsforproceedsfromotherinvestingactivities": 1308000000,
        "netcashprovidedbyusedininvestingactivities": 2935000000,
        "paymentsrelatedtotaxwithholdingforsharebasedcompensation": 5600000000,
        "paymentsofdividends": 15234000000,
        "paymentsforrepurchaseofcommonstock": 94949000000,
        "repaymentsoflongtermdebt": 9958000000,
        "proceedsfromrepaymentsofcommercialpaper": 3960000000,
        "proceedsfrompaymentsforotherfinancingactivities": -361000000,
        "netcashprovidedbyusedinfinancingactivities": -121983000000,
        "cashcashequivalentsrestrictedcashandrestrictedcashequivalentsperiodincreasedecreaseincludingexchangerateeffect": -794000000,
        "incometaxespaidnet": 26102000000
      }
    }
  ]
}
```

````

--------------------------------

### GET /balance-sheet-statement

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement

Retrieves the balance sheet statement for a specified company symbol, allowing for detailed financial structure analysis.

```APIDOC
## GET /balance-sheet-statement

### Description
Retrieve detailed balance sheet information for a publicly traded company. This endpoint provides data on assets, liabilities, and shareholder equity to assist in financial health assessments.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ticker symbol of the company (e.g., AAPL).
- **limit** (number) - Optional - The number of records to return (max 1000).
- **period** (string) - Optional - The reporting period, options: Q1, Q2, Q3, Q4, FY, annual, quarter.

### Request Example
https://financialmodelingprep.com/stable/balance-sheet-statement?symbol=AAPL

### Response
#### Success Response (200)
- **date** (string) - The date of the balance sheet statement.
- **symbol** (string) - The company ticker symbol.
- **totalAssets** (number) - The total value of all company assets.
- **totalLiabilities** (number) - The total value of all company liabilities.
- **totalStockholdersEquity** (number) - The total equity belonging to shareholders.

#### Response Example
[
  {
    "date": "2024-09-28",
    "symbol": "AAPL",
    "totalAssets": 364980000000,
    "totalLiabilities": 308030000000,
    "totalStockholdersEquity": 56950000000
  }
]
````

---

### FMPPRICE Function

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Retrieves live price data, historical price data, dividend payment information, etc. Supports multiple tickers and parameters.

```APIDOC
## FMPPRICE Function

### Description
This function is best used for obtaining live price data, historical price data, dividend payment information, etc (see data available per function).

### Syntax
`=FMPPRICE("ticker/s", "parameter/s", number of days to end, "start date", "end date")`

### Parameters
#### Ticker/s
- **ticker/s** (string) - Required: The symbol/s of the company you are looking to get data. It can be hardcoded i.e "AAPL" or a cell reference i.e. A1:A20.

#### Parameter/s
- **parameter/s** (string) - Required: The data you are looking to get with the function. This accepts multiple parameters or a single parameter. It can be hard coded i.e. "Price", or a cell reference i.e. B1:D1.

#### Number of days to end
- **number of days to end** (number) - Optional: For historical price data you can select the number of days to get data for. For example, 5 will return the last 5 days of historical price data. It can be hard coded i.e. 5, or a cell reference i.e. B2.

#### Start Date
- **start date** (string) - Optional: For historical stock price data you can select a specific start date. The start date must be in a date format from a cell or follow the "mm/dd/yyyy" format. It can be hard coded i.e. "01/30/2022", or a cell reference i.e. B1. If you only enter a start date this will return the historical attribute you are looking for for that specific date.

#### End date
- **end date** (string) - Optional: For historical stock price data you can select a specific end date. The end date must be in a date format from a cell or follow the "mm/dd/yyyy" format. It can be hard coded i.e. "01/30/2022", or a cell reference i.e. B1.

### Examples
- `=FMPPRICE("TSLA","Price")`
- `=FMPPRICE("AAPL", "Close",,"01/01/2022", "01/30/2022")`
- `=FMPPRICE("AMZN", "Open", 2)`

### Tips
- When requesting a lot of data, enter multiple tickers, parameters and periods in the function using cell references.
- For numbers in the function like 5 you don't need to use quotes (" ") only for text like "Close", "Dividend", etc.
- Use the SUM function to get only one value for historical stock data. For example `=SUM(FMPPRICE("AAPL", "Close", , "01/28/2022"))`
```

---

### Stock Quote Short API

Source: https://site.financialmodelingprep.com/developer/docs

Get quick snapshots of real-time stock quotes with the FMP Stock Quote Short API. Access key stock data like current price, volume, and price changes for instant market insights.

```APIDOC
## GET /stable/quote-short

### Description
Get a short snapshot of real-time stock quotes for a specific stock symbol.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/quote-short

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol to retrieve quotes for (e.g., AAPL).

### Request Example
```

https://financialmodelingprep.com/stable/quote-short?symbol=AAPL

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **price** (number) - The current stock price.
- **volume** (integer) - The trading volume.
- **change** (number) - The price change.

#### Response Example
```json
{
  "symbol": "AAPL",
  "price": 170.50,
  "volume": 50000000,
  "change": 1.25
}
````

````

--------------------------------

### GET /stable/sp500-constituent

Source: https://site.financialmodelingprep.com/developer/docs

Access detailed data on the S&P 500 index using the S&P 500 Index API. Track the performance and key information of the companies that make up this major stock market index.

```APIDOC
## GET /stable/sp500-constituent

### Description
Access detailed data on the S&P 500 index. Track the performance and key information of the companies that make up this major stock market index.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/sp500-constituent

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **sector** (string) - The company's sector.
- **subIndustry** (string) - The company's sub-industry.
- **headQuarter** (string) - The company's headquarters location.
- **dateAdded** (string) - The date the company was added to the index.
- **cik** (string) - The Central Index Key assigned by the SEC.

#### Response Example
{
  "example": "[
    {
      "symbol": "AAPL",
      "name": "Apple Inc.",
      "sector": "Technology",
      "subIndustry": "Technology Hardware, Storage & Peripherals",
      "headQuarter": "Cupertino, California",
      "dateAdded": "2015-01-01",
      "cik": "0000320193"
    },
    {
      "symbol": "MSFT",
      "name": "Microsoft Corporation",
      "sector": "Technology",
      "subIndustry": "Software - Infrastructure",
      "headQuarter": "Redmond, Washington",
      "dateAdded": "1994-06-13",
      "cik": "0000789019"
    }
  ]"
}
````

---

### GET /stable/historical-sp500-constituent

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve historical data for the S&P 500 index using the Historical S&P 500 API. Analyze past changes in the index, including additions and removals of companies, to understand trends and performance over time.

```APIDOC
## GET /stable/historical-sp500-constituent

### Description
Retrieve historical data for the S&P 500 index. Analyze past changes in the index, including additions and removals of companies, to understand trends and performance over time.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/historical-sp500-constituent

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The date of the change.
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **action** (string) - The type of action (e.g., 'Added', 'Removed').

#### Response Example
{
  "example": "[
    {
      "date": "2023-01-01",
      "symbol": "XYZ",
      "name": "XYZ Corporation",
      "action": "Added"
    },
    {
      "date": "2023-03-15",
      "symbol": "ABC",
      "name": "ABC Company",
      "action": "Removed"
    }
  ]"
}
```

---

### ETF Price Quotes API

Source: https://site.financialmodelingprep.com/developer/docs

Get real-time price quotes for exchange-traded funds (ETFs) with the FMP ETF Price Quotes API. Track current prices, performance changes, and key data for a wide variety of ETFs.

```APIDOC
## GET /stable/batch-etf-quotes

### Description
Retrieve real-time price quotes for multiple Exchange Traded Funds (ETFs).

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-etf-quotes

### Parameters
#### Query Parameters
- **symbols** (string) - Optional - A comma-separated list of ETF symbols.

### Request Example
```

https://financialmodelingprep.com/stable/batch-etf-quotes?symbols=SPY,QQQ

````

### Response
#### Success Response (200)
- **symbol** (string) - The ETF symbol.
- **price** (number) - The current price.
- **change** (number) - The price change.

#### Response Example
```json
[
  {
    "symbol": "SPY",
    "price": 420.00,
    "change": 2.50
  },
  {
    "symbol": "QQQ",
    "price": 350.75,
    "change": 3.00
  }
]
````

````

--------------------------------

### Full Commodities Quotes API

Source: https://site.financialmodelingprep.com/developer/docs

Get up-to-the-minute quotes for commodities with the FMP Real-Time Commodities Quotes API. Track the latest prices, changes, and volumes for a wide range of commodities, including oil, gold, and agricultural products.

```APIDOC
## GET /stable/batch-commodity-quotes

### Description
Retrieve real-time quotes for multiple commodities.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-commodity-quotes

### Parameters
#### Query Parameters
- **symbols** (string) - Optional - A comma-separated list of commodity symbols (e.g., XAUUSD, WTI).

### Request Example
````

https://financialmodelingprep.com/stable/batch-commodity-quotes?symbols=XAUUSD,WTI

````

### Response
#### Success Response (200)
- **symbol** (string) - The commodity symbol.
- **price** (number) - The current price.
- **change** (number) - The price change.
- **volume** (integer) - The trading volume.

#### Response Example
```json
[
  {
    "symbol": "XAUUSD",
    "price": 1980.50,
    "change": 10.20,
    "volume": 100000
  },
  {
    "symbol": "WTI",
    "price": 85.00,
    "change": 0.50,
    "volume": 50000
  }
]
````

````

--------------------------------

### Available Transcript Symbols API FAQs

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-transcript-symbols

Frequently asked questions regarding the Screener API, symbol access, WebSocket subscriptions, Symbol Changes endpoint, and transcript ordering.

```APIDOC
## Available Transcript Symbols API FAQs

### Description
This section addresses common questions related to the Financial Modeling Prep API, including:
- Differences between Legacy and Stable Screener API versions.
- How to request access to symbols not currently available.
- Correct procedure for subscribing to symbols via WebSocket.
- Understanding the Symbol Changes endpoint and historical ticker data.
- Process for requesting the addition of new stock symbols.
- Stability and ordering of transcripts from the "Latest Earnings Transcripts" API.
- Limits on the number of symbols subscribable via a single WebSocket connection.

### Method
N/A (Informational FAQs)

### Endpoint
N/A (Informational FAQs)

### Parameters
N/A

### Request Example
N/A

### Response
N/A
````

---

### Economics and Market Data APIs

Source: https://site.financialmodelingprep.com/developer/docs

Endpoints for retrieving treasury rates, economic indicators, and market risk premiums.

```APIDOC
## GET /treasury-rates
### Description
Access latest and historical Treasury rates for all maturities.
### Endpoint
https://financialmodelingprep.com/stable/treasury-rates

## GET /economic-indicators
### Description
Access real-time and historical economic data for indicators like GDP, unemployment, and inflation.
### Parameters
- **name** (string) - Required - The name of the economic indicator (e.g., GDP).
### Endpoint
https://financialmodelingprep.com/stable/economic-indicators?name=GDP

## GET /economic-calendar
### Description
Access a comprehensive calendar of upcoming economic data releases.
### Endpoint
https://financialmodelingprep.com/stable/economic-calendar

## GET /market-risk-premium
### Description
Access the market risk premium for specific dates.
### Endpoint
https://financialmodelingprep.com/stable/market-risk-premium
```

---

### Price Target Summary Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

Provides a comprehensive overview of price targets for all listed symbols over multiple timeframes.

```APIDOC
## GET /api/price-target-summary-bulk

### Description
Provides a comprehensive overview of price targets for all listed symbols across multiple timeframes. This API helps users quickly retrieve price target data to aid in investment decisions.

### Method
GET

### Endpoint
/api/price-target-summary-bulk

### Parameters
#### Query Parameters
- **symbol** (string) - Optional - The stock symbol to retrieve price targets for. If not provided, data for multiple symbols may be returned.
- **limit** (integer) - Optional - The number of results to return.
- **offset** (integer) - Optional - The offset for pagination.

### Request Example
```

GET /api/price-target-summary-bulk?symbol=NVDA&limit=50

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **targetHigh** (number) - The highest price target.
- **targetLow** (number) - The lowest price target.
- **targetConsensus** (number) - The consensus price target.
- **publishedDate** (string) - The date the price target was published.
- **updatedDate** (string) - The date the price target was last updated.

#### Response Example
```json
{
  "symbol": "NVDA",
  "targetHigh": 250.00,
  "targetLow": 150.00,
  "targetConsensus": 205.50,
  "publishedDate": "2023-01-15",
  "updatedDate": "2023-01-20"
}
````

````

--------------------------------

### Retrieve Historical Price Data with FMPPRICE

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Fetches historical open and close prices for securities. Supports specific date ranges and single or multiple tickers.

```Excel/Google Sheets Formula
=FMPPRICE("AAPL", "Close", 30)
=FMPPRICE("AMZN", "close", , "01/01/2019", "01/10/2019")
````

---

### Fetch As Reported Balance Statements (JSON)

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-balance-statements

This snippet demonstrates how to retrieve as-reported balance sheet data for a specific company symbol. It requires a company symbol as a query parameter and returns a JSON object containing detailed financial data.

```json
[
  {
    "symbol": "AAPL",
    "fiscalYear": 2024,
    "period": "FY",
    "reportedCurrency": null,
    "date": "2024-09-27",
    "data": {
      "cashandcashequivalentsatcarryingvalue": 29943000000,
      "marketablesecuritiescurrent": 35228000000,
      "accountsreceivablenetcurrent": 33410000000,
      "nontradereceivablescurrent": 32833000000,
      "inventorynet": 7286000000,
      "otherassetscurrent": 14287000000,
      "assetscurrent": 152987000000,
      "marketablesecuritiesnoncurrent": 91479000000,
      "propertyplantandequipmentnet": 45680000000,
      "otherassetsnoncurrent": 74834000000,
      "assetsnoncurrent": 211993000000,
      "assets": 364980000000,
      "accountspayablecurrent": 68960000000,
      "otherliabilitiescurrent": 78304000000,
      "contractwithcustomerliabilitycurrent": 8249000000,
      "commercialpaper": 10000000000,
      "longtermdebtcurrent": 10912000000,
      "liabilitiescurrent": 176392000000,
      "longtermdebtnoncurrent": 85750000000,
      "otherliabilitiesnoncurrent": 45888000000,
      "liabilitiesnoncurrent": 131638000000,
      "liabilities": 308030000000,
      "commonstocksharesoutstanding": 15116786000,
      "commonstocksharesissued": 15116786000,
      "commonstocksincludingadditionalpaidincapital": 83276000000,
      "retainedearningsaccumulateddeficit": -19154000000,
      "accumulatedothercomprehensiveincomelossnetoftax": -7172000000,
      "stockholdersequity": 56950000000,
      "liabilitiesandstockholdersequity": 364980000000,
      "commonstockparorstatedvaluepershare": 0.00001,
      "commonstocksharesauthorized": 50400000000
    }
  }
]
```

---

### Extract Financial Data (JSON)

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-financial-statements

This snippet demonstrates how to parse a JSON response containing detailed financial data for a company. It includes information such as revenue, cost of goods sold, gross profit, operating expenses, net income, and various balance sheet items. The data is typically obtained from financial data providers and is crucial for financial analysis and modeling.

```json
{
  "symbol": "AAPL",
  "fiscalYear": 2024,
  "period": "FY",
  "reportedCurrency": null,
  "date": "2024-09-27",
  "data": {
    "documenttype": "10-K",
    "documentannualreport": "true",
    "currentfiscalyearenddate": "--09-28",
    "documentperiodenddate": "2024-09-28",
    "documenttransitionreport": "false",
    "entityfilenumber": "001-36743",
    "entityregistrantname": "Apple Inc.",
    "entityincorporationstatecountrycode": "CA",
    "entitytaxidentificationnumber": "94-2404110",
    "entityaddressaddressline1": "One Apple Park Way",
    "entityaddresscityortown": "Cupertino",
    "entityaddressstateorprovince": "CA",
    "entityaddresspostalzipcode": 95014,
    "cityareacode": 408,
    "localphonenumber": "996-1010",
    "security12btitle": "3.600% Notes due 2042",
    "tradingsymbol": "AAPL",
    "notradingsymbolflag": "true",
    "securityexchangename": "NASDAQ",
    "entitywellknownseasonedissuer": "Yes",
    "entityvoluntaryfilers": "No",
    "entitycurrentreportingstatus": "Yes",
    "entityinteractivedatacurrent": "Yes",
    "entityfilercategory": "Large Accelerated Filer",
    "entitysmallbusiness": "false",
    "entityemerginggrowthcompany": "false",
    "icfrauditorattestationflag": "true",
    "documentfinstmterrorcorrectionflag": "false",
    "entityshellcompany": "false",
    "amendmentflag": "false",
    "documentfiscalyearfocus": 2024,
    "documentfiscalperiodfocus": "FY",
    "entitycentralindexkey": 320193,
    "auditorname": "Ernst & Young LLP",
    "auditorlocation": "San Jose, California",
    "auditorfirmid": 42,
    "revenuefromcontractwithcustomerexcludingassessedtax": 391035000000,
    "costofgoodsandservicessold": 210352000000,
    "grossprofit": 180683000000,
    "researchanddevelopmentexpense": 31370000000,
    "sellinggeneralandadministrativeexpense": 26097000000,
    "operatingexpenses": 57467000000,
    "operatingincomeloss": 123216000000,
    "nonoperatingincomeexpense": 269000000,
    "incomelossfromcontinuingoperationsbeforeincometaxesextraordinaryitemsnoncontrollinginterest": 123485000000,
    "incometaxexpensebenefit": 29749000000,
    "netincomeloss": 93736000000,
    "earningspersharebasic": 6.11,
    "earningspersharediluted": 6.08,
    "weightedaveragenumberofsharesoutstandingbasic": 15343783000,
    "weightedaveragenumberofdilutedsharesoutstanding": 15408095000,
    "othercomprehensiveincomelossforeigncurrencytransactionandtranslationadjustmentnetoftax": 395000000,
    "othercomprehensiveincomelossderivativeinstrumentgainlossbeforereclassificationaftertax": -832000000,
    "othercomprehensiveincomelossderivativeinstrumentgainlossreclassificationaftertax": 1337000000,
    "othercomprehensiveincomelossderivativeinstrumentgainlossafterreclassificationandtax": -2169000000,
    "othercomprehensiveincomeunrealizedholdinggainlossonsecuritiesarisingduringperiodnetoftax": 5850000000,
    "othercomprehensiveincomelossreclassificationadjustmentfromaociforsaleofsecuritiesnetoftax": -204000000,
    "othercomprehensiveincomelossavailableforsalesecuritiesadjustmentnetoftax": 6054000000,
    "othercomprehensiveincomelossnetoftaxportionattributabletoparent": 4280000000,
    "comprehensiveincomenetoftax": 98016000000,
    "cashandcashequivalentsatcarryingvalue": 29943000000,
    "marketablesecuritiescurrent": 35228000000,
    "accountsreceivablenetcurrent": 33410000000,
    "nontradereceivablescurrent": 32833000000,
    "inventorynet": 7286000000,
    "otherassetscurrent": 14287000000,
    "assetscurrent": 152987000000,
    "marketablesecuritiesnoncurrent": 91479000000,
    "propertyplantandequipmentnet": 45680000000,
    "otherassetsnoncurrent": 74834000000,
    "assetsnoncurrent": 211993000000,
    "assets": 364980000000,
    "accountspayablecurrent": 68960000000,
    "otherliabilitiescurrent": 78304000000,
    "contractwithcustomerliabilitycurrent": 8249000000,
    "commercialpaper": 10000000000,
    "longtermdebtcurrent": 10912000000,
    "liabilitiescurrent": 176392000000,
    "longtermdebtnoncurrent": 85750000000,
    "otherliabilitiesnoncurrent": 45888000000,
    "liabilitiesnoncurrent": 131638000000,
    "liabilities": 308030000000,
    "co": null
  }
}
```

---

### Retrieve Intraday Stock Chart Data

Source: https://site.financialmodelingprep.com/developer/docs

Fetches intraday price and volume data at specific intervals (1, 5, 15, or 30 minutes). Useful for building real-time charts and short-term trading analysis.

```json
[
  {
    "date": "2025-02-04 15:59:00",
    "open": 233.01,
    "low": 232.72,
    "high": 233.13,
    "close": 232.79,
    "volume": 720121
  }
]
```

---

### WebSocket Subscription

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-transcript-symbols

Instructions for subscribing to symbols on the Financial Modeling Prep WebSocket, emphasizing lowercase symbol usage.

````APIDOC
## WebSocket Subscription

### Description
To subscribe to a symbol on the Financial Modeling Prep WebSocket, use the instructions provided in the main documentation and always subscribe to a symbol in lowercase. For example, to subscribe to Apple Inc., use "aapl".

### Method
WebSocket Connection

### Endpoint
(Refer to WebSocket documentation for specific endpoint)

### Parameters
#### Subscription Message Format
- **symbol** (string) - Required - The stock symbol in lowercase (e.g., "aapl").

### Request Example
(Example of a subscription message payload)
```json
{
  "event": "subscribe",
  "symbol": "aapl"
}
````

### Response

(Details on WebSocket message responses would be in the main WebSocket documentation)

#### Success Response

(Example of a data message)

```json
{
  "symbol": "aapl",
  "price": 170.5,
  "timestamp": 1678886400
}
```

````

--------------------------------

### Retrieve ETF and Fund Data using FMPFUNDS

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

The FMPFUNDS function allows users to fetch specific financial metrics for ETFs and funds. It supports single or multiple tickers and parameters, which can be passed as hardcoded strings or cell references to optimize performance.

```Excel/Google Sheets
=FMPFUNDS("SPY","Expense Ratio")
=FMPFUNDS("PICK","Nav")
````

---

### Retrieve Historical Stock Chart Data

Source: https://site.financialmodelingprep.com/developer/docs

Fetches simplified stock chart data including date, price, and volume. Requires a symbol and optional date range parameters.

```json
[
  {
    "symbol": "AAPL",
    "date": "2025-02-04",
    "price": 232.8,
    "volume": 44489128
  }
]
```

---

### Latest 8-K SEC Filings API FAQs

Source: https://site.financialmodelingprep.com/developer/docs/stable/8k-latest

Frequently Asked Questions about the Latest 8-K SEC Filings API, covering data availability, content, update frequency, and use cases.

```APIDOC
## Latest 8-K SEC Filings API FAQs

### Description
This section addresses common questions regarding the Latest 8-K SEC Filings API, including data scope, update frequency, and compatibility.

### Q&A

**Q: Can I access filing links for International stocks?**
**A:** At the moment, filing links are available only for U.S.-based companies. International companies are not supported for SEC filing link access.

**Q: What information does the Latest 8-K SEC Filings API provide?**
**A:** The API provides real-time data on 8-K filings, including the company symbol, CIK, filing date, form type, and direct links to the filing documents.

**Q: How frequently is the 8-K data updated?**
**A:** The data is updated in real-time as companies submit their 8-K filings to the SEC.

**Q: What types of events are disclosed in 8-K filings?**
**A:** 8-K filings disclose significant corporate events such as mergers, acquisitions, bankruptcies, changes in control, and other material developments that may impact the company and its investors.

**Q: How can investors benefit from the 8-K SEC Filings API?**
**A:** Investors can use this API to stay informed of important corporate events that could affect stock prices and market sentiment, allowing them to make timely and informed decisions.

**Q: Is the data provided by the 8-K API reliable?**
**A:** Yes, the data is sourced directly from the SEC, ensuring accuracy and reliability.

**Q: Is the FMP 8-K API compatible with Open AI?**
**A:** Yes, the 8-K SEC Filings API is fully compatible with OpenAI, allowing seamless integration for automation, analysis, and AI-driven workflows.
```

---

### Retrieve Historical Price Data via FMPPRICE

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Fetches historical closing prices for financial instruments using the FMPPRICE function. Supports both a specific number of days or a defined date range as input parameters.

```Excel/Google Sheets Formula
=FMPPRICE("USDCAD", "Close", 10)
=FMPPRICE("USDCAD", "Close", "01/01/2024", "01/30/2024")
=FMPPRICE("ZMUSD", "Close", 10)
=FMPPRICE("ZMUSD", "Close", "01/01/2024", "01/30/2024")
=FMPPRICE("^GSPC", "Close", 10)
=FMPPRICE("^GSPC", "Close", "01/01/2024", "01/30/2024")
```

---

### Retrieve Annual and Quarterly Dividends with FMP

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Fetches annual sum of dividends or specific quarterly dividend payments for stocks and ETFs.

```Excel/Google Sheets Formula
=FMP("AAPL", "Dividend", 2022)
=FMP("AAPL", "dividend", "LQ")
```

---

### Authorization

Source: https://site.financialmodelingprep.com/developer/docs

All API requests must be authorized using an API key. Authorization can be done using either request headers or URL query parameters.

```APIDOC
## Authorization

All API requests must be authorized using an API key. Authorization can be done using either request headers or URL query parameters.

### Header Authorization

Include your API key in the request header as: **apikey: YOUR_API_KEY**

### URL Query Authorization

To authorize your requests, append **?apikey=YOUR_API_KEY** at the end of every request.

_Note: When adding the API key to your requests, ensure to use**& apikey=** if other query parameters already exist in the endpoint._
```

---

### Balance Sheet Growth Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

Retrieve growth data across multiple companies' balance sheets for detailed financial position analysis over time.

```APIDOC
## GET /api/balance-sheet-growth-bulk

### Description
Retrieves growth data across multiple companies' balance sheets, enabling detailed analysis of how financial positions have changed over time.

### Method
GET

### Endpoint
/api/balance-sheet-growth-bulk

### Parameters
#### Query Parameters
- **symbol** (string) - Optional - The stock symbol to retrieve balance sheet growth data for. If not provided, data for multiple symbols may be returned.
- **limit** (integer) - Optional - The number of results to return.
- **offset** (integer) - Optional - The offset for pagination.

### Request Example
```

GET /api/balance-sheet-growth-bulk?symbol=MSFT&limit=10

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **date** (string) - The date of the balance sheet data.
- **totalAssetsGrowth** (number) - The growth percentage of total assets.
- **totalLiabilitiesGrowth** (number) - The growth percentage of total liabilities.
- **totalEquityGrowth** (number) - The growth percentage of total equity.

#### Response Example
```json
{
  "symbol": "MSFT",
  "date": "2022-12-31",
  "totalAssetsGrowth": 5.2,
  "totalLiabilitiesGrowth": 3.1,
  "totalEquityGrowth": 7.0
}
````

````

--------------------------------

### Retrieve Balance Sheet Growth Data Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-growth-bulk

This API endpoint allows users to fetch balance sheet growth data for multiple companies. It requires a year and period as query parameters. The response is a JSON array containing detailed growth metrics for each company.

```curl
curl "https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?_year_ =2025&_period_ =Q1"
````

```javascript
fetch(
  "https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?_year_ =2025&_period_ =Q1",
)
  .then((response) => response.json())
  .then((data) => console.log(data));
```

```python
import requests

url = "https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?_year_ =2025&_period_ =Q1"
response = requests.get(url)
data = response.json()
print(data)
```

---

### Financial Scores Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

Provides key financial scores and metrics for multiple companies, including Altman Z-Score, Piotroski Score, and more.

```APIDOC
## GET /api/financial-scores-bulk

### Description
Provides key financial scores and metrics for multiple companies, including the Altman Z-Score, Piotroski Score, working capital, total assets, retained earnings, EBIT, market capitalization, liabilities, and revenue.

### Method
GET

### Endpoint
/api/financial-scores-bulk

### Parameters
#### Query Parameters
- **symbol** (string) - Optional - The stock symbol to retrieve financial scores for. If not provided, data for multiple symbols may be returned.
- **limit** (integer) - Optional - The number of results to return.
- **offset** (integer) - Optional - The offset for pagination.

### Request Example
```

GET /api/financial-scores-bulk?symbol=GOOG&limit=5

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **date** (string) - The date of the financial scores.
- **altmanZScore** (number) - The Altman Z-Score.
- ** PiotroskiScore** (number) - The Piotroski Score.
- **workingCapital** (number) - The working capital.
- **totalAssets** (number) - The total assets.
- **retainedEarnings** (number) - The retained earnings.
- **ebit** (number) - Earnings Before Interest and Taxes.
- **marketCap** (number) - The market capitalization.
- **liabilities** (number) - The total liabilities.
- **revenue** (number) - The total revenue.

#### Response Example
```json
{
  "symbol": "GOOG",
  "date": "2022-12-31",
  "altmanZScore": 5.8,
  " PiotroskiScore": 7,
  "workingCapital": 50000000000,
  "totalAssets": 300000000000,
  "retainedEarnings": 100000000000,
  "ebit": 70000000000,
  "marketCap": 1500000000000,
  "liabilities": 120000000000,
  "revenue": 280000000000
}
````

````

--------------------------------

### ETF Holder Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

Quickly retrieve detailed information about assets and shares held by Exchange-Traded Funds (ETFs).

```APIDOC
## GET /api/etf-holder-bulk

### Description
Retrieves detailed information about the assets and shares held by Exchange-Traded Funds (ETFs). This API provides insights into the weight each asset constitutes within an ETF.

### Method
GET

### Endpoint
/api/etf-holder-bulk

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ETF symbol to retrieve holdings for.
- **date** (string) - Optional - The specific date for which to retrieve holdings (YYYY-MM-DD). Defaults to the latest available date.

### Request Example
````

GET /api/etf-holder-bulk?symbol=SPY

````

### Response
#### Success Response (200)
- **symbol** (string) - The ETF symbol.
- **date** (string) - The date of the holdings data.
- **holdingSymbol** (string) - The symbol of the asset held by the ETF.
- **holdingName** (string) - The name of the asset held by the ETF.
- **quantity** (integer) - The number of shares held.
- **weightPercentage** (number) - The percentage weight of the holding in the ETF.

#### Response Example
```json
{
  "symbol": "SPY",
  "date": "2023-01-31",
  "holdingSymbol": "AAPL",
  "holdingName": "Apple Inc.",
  "quantity": 35000000,
  "weightPercentage": 4.5
}
````

````

--------------------------------

### Access Treasury Rates Data

Source: https://site.financialmodelingprep.com/developer/docs

Access the latest and historical Treasury rates for all maturities. This API provides key benchmark interest rate data for economic analysis.

--------------------------------

### Retrieve Batch Market Capitalization Data

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-market-cap

This endpoint retrieves current market capitalization for a comma-separated list of stock symbols. It requires a symbols parameter and returns an array of objects containing the symbol, date, and market capitalization value.

```HTTP
GET https://financialmodelingprep.com/stable/market-capitalization-batch?symbols=AAPL,MSFT,GOOG
````

```JSON
[
  {
    "symbol": "AAPL",
    "date": "2025-02-04",
    "marketCap": 3500823120000
  }
]
```

---

### Batch Aftermarket Trade API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve real-time aftermarket trading data for multiple stocks with the FMP Batch Aftermarket Trade API. Track post-market trade prices, volumes, and timestamps across several companies simultaneously.

```APIDOC
## GET /stable/batch-aftermarket-trade

### Description
Retrieve real-time aftermarket trading data for multiple stock symbols.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-aftermarket-trade

### Parameters
#### Query Parameters
- **symbols** (string) - Required - A comma-separated list of stock symbols (e.g., AAPL,GOOG,MSFT).

### Request Example
```

https://financialmodelingprep.com/stable/batch-aftermarket-trade?symbols=AAPL,GOOG,MSFT

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **price** (number) - The trade price.
- **size** (integer) - The trade size.
- **time** (string) - The timestamp of the trade.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "price": 170.60,
    "size": 100,
    "time": "2023-10-27T20:05:00Z"
  },
  {
    "symbol": "GOOG",
    "price": 130.10,
    "size": 50,
    "time": "2023-10-27T20:10:00Z"
  }
]
````

````

--------------------------------

### Fundraisers APIs

Source: https://site.financialmodelingprep.com/developer/docs/cycle-times-stable

Access data on crowdfunding campaigns and equity offerings.

```APIDOC
## Latest Crowdfunding Campaigns

### Description
Retrieves the latest crowdfunding campaigns.

### Method
GET

### Endpoint
/api/fundraisers/crowdfunding/latest

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **campaignId** (string) - The unique identifier for the campaign.
- **companyName** (string) - The name of the company running the campaign.
- **offeringType** (string) - The type of offering (e.g., equity, debt).
- **startDate** (string) - The start date of the campaign.

#### Response Example
{
  "campaignId": "cf_12345",
  "companyName": "Tech Startup Inc.",
  "offeringType": "equity",
  "startDate": "2024-01-15"
}

## Crowdfunding Campaign Search

### Description
Searches for crowdfunding campaigns based on criteria.

### Method
GET

### Endpoint
/api/fundraisers/crowdfunding/search

### Parameters
- **query** (string) - Search query (e.g., company name, industry).

### Request Example
None

### Response
#### Success Response (200)
- **campaignId** (string) - The unique identifier for the campaign.
- **companyName** (string) - The name of the company running the campaign.
- **offeringType** (string) - The type of offering.

#### Response Example
{
  "campaignId": "cf_67890",
  "companyName": "Green Energy Solutions",
  "offeringType": "equity"
}

## Crowdfunding By CIK

### Description
Retrieves crowdfunding campaigns associated with a specific CIK (Central Index Key).

### Method
GET

### Endpoint
/api/fundraisers/crowdfunding/cik/{cik}

### Parameters
- **cik** (string) - The Central Index Key of the company.

### Request Example
None

### Response
#### Success Response (200)
- **campaignId** (string) - The unique identifier for the campaign.
- **companyName** (string) - The name of the company running the campaign.

#### Response Example
{
  "campaignId": "cf_11223",
  "companyName": "BioTech Innovations"
}

## Equity Offering Updates

### Description
Provides updates on equity offerings.

### Method
GET

### Endpoint
/api/fundraisers/equity-offering/updates

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **offeringId** (string) - The unique identifier for the offering.
- **companyName** (string) - The name of the company.
- **status** (string) - The current status of the offering (e.g., filed, effective, closed).
- **filingDate** (string) - The date the offering was filed.

#### Response Example
{
  "offeringId": "eo_abcde",
  "companyName": "Cloud Services Corp
````

---

### Balance Sheet Statement Growth Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-growth-bulk

Retrieves growth data across multiple companies' balance sheets for trend analysis, comparative insights, and long-term financial health assessment.

````APIDOC
## GET /stable/balance-sheet-statement-growth-bulk

### Description
Retrieves growth data across multiple companies' balance sheets, enabling detailed analysis of how financial positions have changed over time. This API is useful for trend analysis, comparative insights, and long-term financial health assessment.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk

### Parameters
#### Query Parameters
- **_year_** (string) - Required - The year for which to retrieve balance sheet growth data (e.g., 2025).
- **_period_** (string) - Required - The period for which to retrieve balance sheet growth data (e.g., Q1, Q2, Q3, Q4, FY).

### Request Example
```json
{
  "request": "GET https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?_year_=2025&_period_=Q1"
}
````

### Response

#### Success Response (200)

- **symbol** (string) - The stock symbol of the company.
- **date** (string) - The date of the balance sheet statement.
- **fiscalYear** (string) - The fiscal year of the balance sheet.
- **period** (string) - The period of the balance sheet (e.g., Q1, Q2, Q3, Q4, FY).
- **reportedCurrency** (string) - The currency in which the financial data is reported.
- **growthCashAndCashEquivalents** (string) - Growth rate of cash and cash equivalents.
- **growthShortTermInvestments** (string) - Growth rate of short-term investments.
- **growthCashAndShortTermInvestments** (string) - Growth rate of cash and short-term investments.
- **growthNetReceivables** (string) - Growth rate of net receivables.
- **growthInventory** (string) - Growth rate of inventory.
- **growthOtherCurrentAssets** (string) - Growth rate of other current assets.
- **growthTotalCurrentAssets** (string) - Growth rate of total current assets.
- **growthPropertyPlantEquipmentNet** (string) - Growth rate of net property, plant, and equipment.
- **growthGoodwill** (string) - Growth rate of goodwill.
- **growthIntangibleAssets** (string) - Growth rate of intangible assets.
- **growthGoodwillAndIntangibleAssets** (string) - Growth rate of goodwill and intangible assets.
- **growthLongTermInvestments** (string) - Growth rate of long-term investments.
- **growthTaxAssets** (string) - Growth rate of tax assets.
- **growthOtherNonCurrentAssets** (string) - Growth rate of other non-current assets.
- **growthTotalNonCurrentAssets** (string) - Growth rate of total non-current assets.
- **growthOtherAssets** (string) - Growth rate of other assets.
- **growthTotalAssets** (string) - Growth rate of total assets.
- **growthAccountPayables** (string) - Growth rate of account payables.
- **growthShortTermDebt** (string) - Growth rate of short-term debt.
- **growthTaxPayables** (string) - Growth rate of tax payables.
- **growthDeferredRevenue** (string) - Growth rate of deferred revenue.
- **growthOtherCurrentLiabilities** (string) - Growth rate of other current liabilities.
- **growthTotalCurrentLiabilities** (string) - Growth rate of total current liabilities.
- **growthLongTermDebt** (string) - Growth rate of long-term debt.
- **growthDeferredRevenueNonCurrent** (string) - Growth rate of non-current deferred revenue.
- **growthDeferredTaxLiabilitiesNonCurrent** (string) - Growth rate of non-current deferred tax liabilities.
- **growthOtherNonCurrentLiabilities** (string) - Growth rate of other non-current liabilities.
- **growthTotalNonCurrentLiabilities** (string) - Growth rate of total non-current liabilities.
- **growthOtherLiabilities** (string) - Growth rate of other liabilities.
- **growthTotalLiabilities** (string) - Growth rate of total liabilities.
- **growthPreferredStock** (string) - Growth rate of preferred stock.
- **growthCommonStock** (string) - Growth rate of common stock.
- **growthRetainedEarnings** (string) - Growth rate of retained earnings.
- **growthAccumulatedOtherComprehensiveIncomeLoss** (string) - Growth rate of accumulated other comprehensive income (loss).
- **growthOthertotalStockholdersEquity** (string) - Growth rate of other total stockholders' equity.
- **growthTotalStockholdersEquity** (string) - Growth rate of total stockholders' equity.
- **growthMinorityInterest** (string) - Growth rate of minority interest.
- **growthTotalEquity** (string) - Growth rate of total equity.
- **growthTotalLiabilitiesAndStockholdersEquity** (string) - Growth rate of total liabilities and stockholders' equity.
- **growthTotalInvestments** (string) - Growth rate of total investments.
- **growthTotalDebt** (string) - Growth rate of total debt.
- **growthNetDebt** (string) - Growth rate of net debt.
- **growthAccountsReceivables** (string) - Growth rate of accounts receivables.
- **growthOtherReceivables** (string) - Growth rate of other receivables.
- **growthPrepaids** (string) - Growth rate of prepaids.
- **growthTotalPayables** (string) - Growth rate of total payables.
- **growthOtherPayables** (string) - Growth rate of other payables.
- **growthAccruedExpenses** (string) - Growth rate of accrued expenses.
- **growthCapitalLeaseObligationsCurrent** (string) - Growth rate of current capital lease obligations.
- **growthAdditionalPaidInCapital** (string) - Growth rate of additional paid-in capital.
- **growthTreasuryStock** (string) - Growth rate of treasury stock.

#### Response Example

```json
[
  {
    "symbol": "000001.SZ",
    "date": "2025-03-31",
    "fiscalYear": "2025",
    "period": "Q1",
    "reportedCurrency": "CNY",
    "growthCashAndCashEquivalents": "0.09574482145872953",
    "growthShortTermInvestments": "0",
    "growthCashAndShortTermInvestments": "0.09574482145872953",
    "growthNetReceivables": "0",
    "growthInventory": "0",
    "growthOtherCurrentAssets": "0",
    "growthTotalCurrentAssets": "0.09574482145872953",
    "growthPropertyPlantEquipmentNet": "-0.06373337231398918",
    "growthGoodwill": "0",
    "growthIntangibleAssets": "-0.03270278935556268",
    "growthGoodwillAndIntangibleAssets": "-0.01477618426770969",
    "growthLongTermInvestments": "-0.0774117797082201",
    "growthTaxAssets": "0",
    "growthOtherNonCurrentAssets": "0.07678934705504345",
    "growthTotalNonCurrentAssets": "-0.01112505367669385",
    "growthOtherAssets": "0.001488576544346165",
    "growthTotalAssets": "0.001488576544346165",
    "growthAccountPayables": "0",
    "growthShortTermDebt": "0",
    "growthTaxPayables": "-0.0279424216765453",
    "growthDeferredRevenue": "0",
    "growthOtherCurrentLiabilities": "0.12022416350749959",
    "growthTotalCurrentLiabilities": "0",
    "growthLongTermDebt": "0",
    "growthDeferredRevenueNonCurrent": "0",
    "growthDeferredTaxLiabilitiesNonCurrent": "0",
    "growthOtherNonCurrentLiabilities": "0",
    "growthTotalNonCurrentLiabilities": "0",
    "growthOtherLiabilities": "-0.0005084911577141635",
    "growthTotalLiabilities": "-0.0005084911577141635",
    "growthPreferredStock": "0",
    "growthCommonStock": "0",
    "growthRetainedEarnings": "0.049325752755485314",
    "growthAccumulatedOtherComprehensiveIncomeLoss": "0",
    "growthOthertotalStockholdersEquity": "-0.0035208940994345805",
    "growthTotalStockholdersEquity": "0.022774946346510602",
    "growthMinorityInterest": "0",
    "growthTotalEquity": "0.022774946346510602",
    "growthTotalLiabilitiesAndStockholdersEquity": "0.001488576544346165",
    "growthTotalInvestments": "-0.0774117797082201",
    "growthTotalDebt": "0",
    "growthNetDebt": "-0.09574482145872953",
    "growthAccountsReceivables": "0",
    "growthOtherReceivables": "0",
    "growthPrepaids": "0",
    "growthTotalPayables": "-0.12022416350749959",
    "growthOtherPayables": "-0.12022416350749959",
    "growthAccruedExpenses": "0",
    "growthCapitalLeaseObligationsCurrent": "0",
    "growthAdditionalPaidInCapital": "0",
    "growthTreasuryStock": "0"
  }
]
```

````

--------------------------------

### Available Exchanges API

Source: https://site.financialmodelingprep.com/developer/docs

Access a complete list of supported stock exchanges using the FMP Available Exchanges API. This API provides a comprehensive overview of global stock exchanges, allowing users to identify where securities are traded and filter data by specific exchanges for further analysis.

```APIDOC
## GET /stable/available-exchanges

### Description
Retrieves a complete list of supported stock exchanges globally.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/available-exchanges

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **exchange** (string) - The name of the stock exchange.
- **code** (string) - The exchange code.

#### Response Example
```json
[
  {
    "exchange": "NASDAQ",
    "code": "XNAS"
  }
]
````

````

--------------------------------

### Stock Rating Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves comprehensive rating data for multiple stocks in a single request, including overall ratings, DCF recommendations, and more.

```APIDOC
## GET /stable/_rating-bulk_

### Description
This endpoint provides comprehensive rating data for multiple stocks in a single request. Retrieve key financial ratings and recommendations such as overall ratings, DCF recommendations, and more for multiple companies at once.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_rating-bulk_

### Parameters
#### Query Parameters
- **apikey** (string) - Required - Your unique API key.

### Request Example
````

https://financialmodelingprep.com/stable/_rating-bulk_?apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
Returns a CSV file containing rating data for multiple stocks. The sample response below represents an individual record:
- **symbol** (string) - The stock symbol.
- **date** (string) - The date of the rating.
- **rating** (string) - The overall rating for the stock.
- **discountedCashFlowScore** (string) - The score for discounted cash flow.
- **returnOnEquityScore** (string) - The score for return on equity.
- **returnOnAssetsScore** (string) - The score for return on assets.
- **debtToEquityScore** (string) - The score for debt to equity.
- **priceToEarningsScore** (string) - The score for price to earnings.
- **priceToBookScore** (string) - The score for price to book.

#### Response Example
```json
[
  {
    "symbol": "000001.SZ",
    "date": "2025-07-09",
    "rating": "B+",
    "discountedCashFlowScore": "5",
    "returnOnEquityScore": "3",
    "returnOnAssetsScore": "2",
    "debtToEquityScore": "1",
    "priceToEarningsScore": "4",
    "priceToBookScore": "4"
  }
]
````

````

--------------------------------

### Market Performance APIs

Source: https://site.financialmodelingprep.com/developer/docs/cycle-times-stable

Retrieve snapshots and historical data for market sector and industry performance, including PE ratios and biggest movers.

```APIDOC
## Market Sector Performance Snapshot

### Description
Provides a snapshot of market sector performance.

### Method
GET

### Endpoint
/api/market/performance/sector/snapshot

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **sector** (string) - The name of the sector.
- **changesPercentage** (number) - The percentage change in the sector's performance.

#### Response Example
{
  "sector": "Technology",
  "changesPercentage": 1.5
}

## Industry Performance Snapshot

### Description
Provides a snapshot of industry performance.

### Method
GET

### Endpoint
/api/market/performance/industry/snapshot

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **industry** (string) - The name of the industry.
- **changesPercentage** (number) - The percentage change in the industry's performance.

#### Response Example
{
  "industry": "Software",
  "changesPercentage": 2.1
}

## Historical Market Sector Performance

### Description
Retrieves historical performance data for market sectors.

### Method
GET

### Endpoint
/api/market/performance/sector/historical

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The date of the performance data.
- **sector** (string) - The name of the sector.
- **changesPercentage** (number) - The percentage change in the sector's performance.

#### Response Example
{
  "date": "2023-10-27",
  "sector": "Technology",
  "changesPercentage": 1.2
}

## Historical Industry Performance

### Description
Retrieves historical performance data for industries.

### Method
GET

### Endpoint
/api/market/performance/industry/historical

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The date of the performance data.
- **industry** (string) - The name of the industry.
- **changesPercentage** (number) - The percentage change in the industry's performance.

#### Response Example
{
  "date": "2023-10-27",
  "industry": "Software",
  "changesPercentage": 1.8
}

## Sector PE Snapshot

### Description
Provides a snapshot of Sector Price-to-Earnings (PE) ratios.

### Method
GET

### Endpoint
/api/market/performance/sector/pe/snapshot

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **sector** (string) - The name of the sector.
- **peRatio** (number) - The Price-to-Earnings ratio for the sector.

#### Response Example
{
  "sector": "Technology",
  "peRatio": 25.5
}

## Industry PE Snapshot

### Description
Provides a snapshot of Industry Price-to-Earnings (PE) ratios.

### Method
GET

### Endpoint
/api/market/performance/industry/pe/snapshot

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **industry** (string) - The name of the industry.
- **peRatio** (number) - The Price-to-Earnings ratio for the industry.

#### Response Example
{
  "industry": "Software",
  "peRatio": 30.2
}

## Historical Sector PE

### Description
Retrieves historical Sector Price-to-Earnings (PE) ratios.

### Method
GET

### Endpoint
/api/market/performance/sector/pe/historical

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The date of the PE data.
- **sector** (string) - The name of the sector.
- **peRatio** (number) - The Price-to-Earnings ratio for the sector.

#### Response Example
{
  "date": "2023-10-27",
  "sector": "Technology",
  "peRatio": 24.8
}

## Historical Industry PE

### Description
Retrieves historical Industry Price-to-Earnings (PE) ratios.

### Method
GET

### Endpoint
/api/market/performance/industry/pe/historical

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **date** (string) - The date of the PE data.
- **industry** (string) - The name of the industry.
- **peRatio** (number) - The Price-to-Earnings ratio for the industry.

#### Response Example
{
  "date": "2023-10-27",
  "industry": "Software",
  "peRatio": 29.5
}

## Biggest Stock Gainers

### Description
Lists the biggest stock gainers in the market.

### Method
GET

### Endpoint
/api/market/performance/gainers

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The name of the company.
- **price** (number) - The current stock price.
- **changesPercentage** (number) - The percentage change in stock price.

#### Response Example
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "price": 170.00,
  "changesPercentage": 2.5
}

## Biggest Stock Losers

### Description
Lists the biggest stock losers in the market.

### Method
GET

### Endpoint
/api/market/performance/losers

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The name of the company.
- **price** (number) - The current stock price.
- **changesPercentage** (number) - The percentage change in stock price.

#### Response Example
{
  "symbol": "GOOG",
  "name": "Alphabet Inc.",
  "price": 120.00,
  "changesPercentage": -1.8
}

## Top Traded Stocks

### Description
Lists the stocks with the highest trading volume.

### Method
GET

### Endpoint
/api/market/performance/top-traded

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The name of the company.
- **volume** (number) - The trading volume.

#### Response Example
{
  "symbol": "TSLA",
  "name": "Tesla, Inc.",
  "volume": 50000000
}
````

---

### Available Exchanges API

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-exchanges

Retrieve a complete list of supported stock exchanges worldwide. This API provides exchange names, country information, and data delay status, useful for filtering financial data.

````APIDOC
## GET /stable/_available-exchanges_

### Description
Retrieves a comprehensive list of all supported stock exchanges globally. This endpoint provides essential information for filtering financial data by exchange, including exchange name, country, and data delay.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_available-exchanges_

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **exchange** (string) - The short code for the exchange.
- **name** (string) - The full name of the exchange.
- **countryName** (string) - The name of the country where the exchange is located.
- **countryCode** (string) - The code for the country where the exchange is located.
- **symbolSuffix** (string) - Any suffix applied to symbols traded on this exchange.
- **delay** (string) - The data delay status for the exchange (e.g., "Real-time").

#### Response Example
```json
[
  {
    "exchange": "AMEX",
    "name": "New York Stock Exchange Arca",
    "countryName": "United States of America",
    "countryCode": "US",
    "symbolSuffix": "N/A",
    "delay": "Real-time"
  }
]
````

````

--------------------------------

### Stock Peers Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves a comprehensive list of peer companies for all stocks in the database. This allows for comparison of a stock's performance with its closest competitors.

```APIDOC
## Stock Peers Bulk API

### Description
Retrieves a comprehensive list of peer companies for all stocks in the database. This allows for comparison of a stock's performance with its closest competitors.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_peers-bulk_

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
This endpoint returns the response as a CSV file. The provided sample response represents an individual record.
```json
[
  {
    "symbol": "000001.SZ",
    "peers": "600036.SS"
  }
]
````

````

--------------------------------

### As Reported Balance Statements API

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-balance-statements

Retrieve unadjusted balance sheet data for a given company symbol. This API provides detailed financial information on assets, liabilities, and equity as reported by the company.

```APIDOC
## GET /stable/balance-sheet-statement-as-reported

### Description
Retrieves unadjusted balance sheet data as reported by companies. This includes detailed insights into assets, liabilities, and equity.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement-as-reported

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol of the company (e.g., AAPL).
- **limit** (number) - Optional - The maximum number of records to retrieve. Maximum 1000 records per request.
- **period** (string) - Optional - The period for the balance sheet data. Accepted values are 'annual' or 'quarter'.

### Request Example
```json
{
  "example": "https://financialmodelingprep.com/stable/balance-sheet-statement-as-reported?symbol=AAPL&limit=5&period=annual"
}
````

### Response

#### Success Response (200)

- **symbol** (string) - The stock ticker symbol.
- **fiscalYear** (number) - The fiscal year of the reported data.
- **period** (string) - The period of the reported data (e.g., 'FY', 'Q1').
- **reportedCurrency** (string) - The currency in which the data is reported.
- **date** (string) - The date of the balance sheet statement.
- **data** (object) - An object containing various balance sheet items:
  - **cashAndCashEquivalentsatCarryingValue** (number) - Cash and cash equivalents at carrying value.
  - **marketablesecuritiescurrent** (number) - Current marketable securities.
  - **accountsreceivablenetcurrent** (number) - Net current accounts receivable.
  - **nontradereceivablescurrent** (number) - Current non-trade receivables.
  - **inventorynet** (number) - Net inventory.
  - **otherassetscurrent** (number) - Other current assets.
  - **assetscurrent** (number) - Total current assets.
  - **marketablesecuritiesnoncurrent** (number) - Non-current marketable securities.
  - **propertyplantandequipmentnet** (number) - Net property, plant, and equipment.
  - **otherassetsnoncurrent** (number) - Other non-current assets.
  - **assetsnoncurrent** (number) - Total non-current assets.
  - **assets** (number) - Total assets.
  - **accountspayablecurrent** (number) - Current accounts payable.
  - **otherliabilitiescurrent** (number) - Other current liabilities.
  - **contractwithcustomerliabilitycurrent** (number) - Current contract with customer liability.
  - **commercialpaper** (number) - Commercial paper.
  - **longtermdebtcurrent** (number) - Current long-term debt.
  - **liabilitiescurrent** (number) - Total current liabilities.
  - **longtermdebtnoncurrent** (number) - Non-current long-term debt.
  - **otherliabilitiesnoncurrent** (number) - Other non-current liabilities.
  - **liabilitiesnoncurrent** (number) - Total non-current liabilities.
  - **liabilities** (number) - Total liabilities.
  - **commonstocksharesoutstanding** (number) - Common stock shares outstanding.
  - **commonstocksharesissued** (number) - Common stock shares issued.
  - **commonstocksincludingadditionalpaidincapital** (number) - Common stock including additional paid-in capital.
  - **retainedearningsaccumulateddeficit** (number) - Retained earnings (accumulated deficit).
  - **accumulatedothercomprehensiveincomelossnetoftax** (number) - Accumulated other comprehensive income (loss), net of tax.
  - **stockholdersequity** (number) - Total stockholder equity.
  - **liabilitiesandstockholdersequity** (number) - Total liabilities and stockholder equity.
  - **commonstockparorstatedvaluepershare** (number) - Par or stated value per share of common stock.
  - **commonstocksharesauthorized** (number) - Authorized shares of common stock.

#### Response Example

```json
{
  "example": "[ { \"symbol\": \"AAPL\", \"fiscalYear\": 2024, \"period\": \"FY\", \"reportedCurrency\": null, \"date\": \"2024-09-27\", \"data\": { \"cashandcashequivalentsatcarryingvalue\": 29943000000, \"marketablesecuritiescurrent\": 35228000000, \"accountsreceivablenetcurrent\": 33410000000, \"nontradereceivablescurrent\": 32833000000, \"inventorynet\": 7286000000, \"otherassetscurrent\": 14287000000, \"assetscurrent\": 152987000000, \"marketablesecuritiesnoncurrent\": 91479000000, \"propertyplantandequipmentnet\": 45680000000, \"otherassetsnoncurrent\": 74834000000, \"assetsnoncurrent\": 211993000000, \"assets\": 364980000000, \"accountspayablecurrent\": 68960000000, \"otherliabilitiescurrent\": 78304000000, \"contractwithcustomerliabilitycurrent\": 8249000000, \"commercialpaper\": 10000000000, \"longtermdebtcurrent\": 10912000000, \"liabilitiescurrent\": 176392000000, \"longtermdebtnoncurrent\": 85750000000, \"otherliabilitiesnoncurrent\": 45888000000, \"liabilitiesnoncurrent\": 131638000000, \"liabilities\": 308030000000, \"commonstocksharesoutstanding\": 15116786000, \"commonstocksharesissued\": 15116786000, \"commonstocksincludingadditionalpaidincapital\": 83276000000, \"retainedearningsaccumulateddeficit\": -19154000000, \"accumulatedothercomprehensiveincomelossnetoftax\": -7172000000, \"stockholdersequity\": 56950000000, \"liabilitiesandstockholdersequity\": 364980000000, \"commonstockparorstatedvaluepershare\": 0.00001, \"commonstocksharesauthorized\": 50400000000 } } ]"
}
```

````

--------------------------------

### Earnings Surprises Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

Retrieve bulk data on annual earnings surprises to analyze company performance against earnings estimates.

```APIDOC
## GET /api/earnings-surprises-bulk

### Description
Retrieves bulk data on annual earnings surprises for multiple companies, allowing for analysis of companies that have beaten, missed, or met their earnings estimates.

### Method
GET

### Endpoint
/api/earnings-surprises-bulk

### Parameters
#### Query Parameters
- **symbol** (string) - Optional - The stock symbol to retrieve data for. If not provided, data for multiple symbols may be returned.
- **limit** (integer) - Optional - The number of results to return.
- **offset** (integer) - Optional - The offset for pagination.

### Request Example
````

GET /api/earnings-surprises-bulk?symbol=AAPL&limit=100

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **date** (string) - The date of the earnings surprise.
- **eps** (number) - The Earnings Per Share.
- **surprise** (number) - The earnings surprise amount.
- **surprisePercentage** (number) - The earnings surprise percentage.

#### Response Example
```json
{
  "symbol": "AAPL",
  "date": "2023-01-27",
  "eps": 1.88,
  "surprise": 0.25,
  "surprisePercentage": 15.2
}
````

````

--------------------------------

### Track Cryptocurrency Prices with FMPPRICE

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Utilize the FMPPRICE function to retrieve real-time or historical cryptocurrency data within spreadsheet applications. The function supports specific tickers, timeframes, and historical lookback periods.

```Excel/Google Sheets Formula
=FMPPRICE("BTCUSD", "Close", 10)
=FMPPRICE("BTCUSD", "Close", "01/01/2024", "01/30/2024")
````

---

### Income Statement Growth Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Provides access to growth data for income statements across multiple companies. Track and analyze growth trends over time for key financial metrics such as revenue, net income, and operating income, enabling a better understanding of corporate performance trends.

```APIDOC
## GET /income-statement-growth-bulk

### Description
Retrieves bulk income statement growth data for companies.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/income-statement-growth-bulk

### Parameters
#### Query Parameters
- **_year_** (string) - Required - The year for which to retrieve data (e.g., 2025).
- **_period_** (string) - Required - The period for which to retrieve data (e.g., Q1, Q2, Q3, Q4, FY).

### Request Example
```

https://financialmodelingprep.com/stable/income-statement-growth-bulk?_year_=2025&_period_=Q1

````

### Response
#### Success Response (200)
Returns the response as a CSV file. The provided sample response represents an individual record.
```json
[
  {
    "symbol": "000001.SZ",
    "date": "2025-03-31",
    "fiscalYear": "2025",
    "period": "Q1",
    "reportedCurrency": "CNY",
    "growthRevenue": "-0.04159070191431176",
    "growthCostOfRevenue": "0",
    "growthGrossProfit": "-0.04159070191431176",
    "growthGrossProfitRatio": "0",
    "growthResearchAndDevelopmentExpenses": "0",
    "growthGeneralAndAdministrativeExpenses": "1.7466809598416757",
    "growthSellingAndMarketingExpenses": "0",
    "growthOtherExpenses": "-0.9860376183912135",
    "growthOperatingExpenses": "-0.095830920671685",
    "growthCostAndExpenses": "-0.095830920671685",
    "growthInterestIncome": "-0.003105727849505302",
    "growthInterestExpense": "-0.08421879522057303",
    "growthDepreciationAndAmortization": "0",
    "growthEBITDA": "0",
    "growthOperatingIncome": "-0.018874787810201278",
    "growthIncomeBeforeTax": "1.4139262224764084",
    "growthIncomeTaxExpense": "0.2582392776523702",
    "growthNetIncome": "1.9495710399665203",
    "growthEPS": "1.6956521739130435",
    "growthEPSDiluted": "1.6956521739130435",
    "growthWeightedAverageShsOut": "0.09825852256371011",
    "growthWeightedAverageShsOutDil": "0.09825852256371011",
    "growthEBIT": "1",
    "growthNonOperatingIncomeExcludingInterest": "-0.5659209985158163",
    "growthNetInterestIncome": "0.09080465272126753",
    "growthTotalOtherIncomeExpensesNet": "0.5835023664638269",
    "growthNetIncomeFromContinuingOperations": "1.9495710399665203",
    "growthOtherAdjustmentsToNetIncome": "0",
    "growthNetIncomeDeductions": "0"
  }
]
````

````

--------------------------------

### Batch Aftermarket Quote API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve real-time aftermarket quotes for multiple stocks with the FMP Batch Aftermarket Quote API. Access bid and ask prices, volume, and other relevant data for several companies during post-market trading.

```APIDOC
## GET /stable/batch-aftermarket-quote

### Description
Retrieve real-time aftermarket quotes for multiple stock symbols.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-aftermarket-quote

### Parameters
#### Query Parameters
- **symbols** (string) - Required - A comma-separated list of stock symbols (e.g., AAPL,GOOG,MSFT).

### Request Example
````

https://financialmodelingprep.com/stable/batch-aftermarket-quote?symbols=AAPL,GOOG,MSFT

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **bid** (number) - The bid price.
- **ask** (number) - The ask price.
- **volume** (integer) - The aftermarket volume.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "bid": 170.55,
    "ask": 170.65,
    "volume": 50000
  },
  {
    "symbol": "GOOG",
    "bid": 130.05,
    "ask": 130.15,
    "volume": 25000
  }
]
````

````

--------------------------------

### Stock Batch Quote API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve multiple real-time stock quotes in a single request with the FMP Stock Batch Quote API. Access current prices, volume, and detailed data for multiple companies at once, making it easier to track large portfolios or monitor multiple stocks simultaneously.

```APIDOC
## GET /stable/batch-quote

### Description
Retrieve real-time stock quotes for multiple stock symbols in a single request.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-quote

### Parameters
#### Query Parameters
- **symbols** (string) - Required - A comma-separated list of stock symbols (e.g., AAPL,GOOG,MSFT).

### Request Example
````

https://financialmodelingprep.com/stable/batch-quote?symbols=AAPL,GOOG,MSFT

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **price** (number) - The current stock price.
- **volume** (integer) - The trading volume.
- **change** (number) - The price change.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "price": 170.50,
    "volume": 50000000,
    "change": 1.25
  },
  {
    "symbol": "GOOG",
    "price": 130.00,
    "volume": 20000000,
    "change": 0.75
  }
]
````

````

--------------------------------

### Available Sectors API

Source: https://site.financialmodelingprep.com/developer/docs

Access a complete list of industry sectors using the FMP Available Sectors API. This API helps users categorize and filter companies based on their respective sectors, enabling deeper analysis and more focused queries across different industries.

```APIDOC
## GET /stable/available-sectors

### Description
Retrieves a complete list of industry sectors.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/available-sectors

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **sector** (string) - The name of the industry sector.

#### Response Example
```json
[
  {
    "sector": "Technology"
  },
  {
    "sector": "Healthcare"
  }
]
````

````

--------------------------------

### Stock Price Change API

Source: https://site.financialmodelingprep.com/developer/docs

Track stock price fluctuations in real-time with the FMP Stock Price Change API. Monitor percentage and value changes over various time periods, including daily, weekly, monthly, and long-term.

```APIDOC
## GET /stable/stock-price-change

### Description
Track real-time stock price changes for a specific stock symbol over various periods.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/stock-price-change

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol to retrieve price changes for (e.g., AAPL).

### Request Example
````

https://financialmodelingprep.com/stable/stock-price-change?symbol=AAPL

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **changes** (object) - An object containing price changes for different periods.
  - **day** (number) - Daily price change.
  - **week** (number) - Weekly price change.
  - **month** (number) - Monthly price change.
  - **year** (number) - Yearly price change.

#### Response Example
```json
{
  "symbol": "AAPL",
  "changes": {
    "day": 1.25,
    "week": 3.50,
    "month": 5.00,
    "year": 15.00
  }
}
````

````

--------------------------------

### Batch Forex Quotes API

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-forex-quotes

Retrieve real-time quotes for multiple forex pairs simultaneously. This endpoint is designed for bulk data retrieval, allowing users to monitor numerous currency pairs efficiently.

```APIDOC
## GET /_batch-forex-quotes_

### Description
Retrieves real-time quotes for multiple forex pairs in a single request. This API is ideal for tracking global exchange rates and monitoring price changes across different markets efficiently.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_batch-forex-quotes_

### Parameters
#### Query Parameters
- **short** (boolean) - Optional - If true, returns a shorter response format.

### Request Example
````

GET https://financialmodelingprep.com/stable/_batch-forex-quotes_?symbol=EURUSD,GBPUSD,USDJPY&short=true

````

### Response
#### Success Response (200)
- **symbol** (string) - The currency pair symbol (e.g., "AEDAUD").
- **price** (number) - The current real-time price of the currency pair.
- **change** (number) - The change in price since the last trading period.
- **volume** (number) - The trading volume for the currency pair.

#### Response Example
```json
[
  {
    "symbol": "AEDAUD",
    "price": 0.41372,
    "change": 0.00153892,
    "volume": 0
  }
]
````

````

--------------------------------

### Retrieve All Exchange Market Hours Data

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-exchange-market-hours

This endpoint returns a JSON array containing the opening and closing hours, time zones, and current operational status for global stock exchanges. It is used to monitor market availability across different regions.

```json
[
  {
    "exchange": "ASX",
    "name": "Australian Stock Exchange",
    "openingHour": "10:00 AM +10:00",
    "closingHour": "04:00 PM +10:00",
    "timezone": "Australia/Sydney",
    "isMarketOpen": false
  }
]
````

---

### EOD Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

Retrieve end-of-day stock price data for multiple symbols in bulk, ideal for valuation analysis.

```APIDOC
## GET /api/eod-bulk

### Description
Retrieves end-of-day stock price data for multiple symbols in bulk. This API is suitable for financial analysts, traders, and investors needing to assess valuations.

### Method
GET

### Endpoint
/api/eod-bulk

### Parameters
#### Query Parameters
- **symbols** (string) - Required - A comma-separated list of stock symbols (e.g., "AAPL,MSFT,GOOG").
- **from** (string) - Optional - The start date for the data in YYYY-MM-DD format.
- **to** (string) - Optional - The end date for the data in YYYY-MM-DD format.

### Request Example
```

GET /api/eod-bulk?symbols=AAPL,MSFT&from=2023-01-01&to=2023-01-31

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **date** (string) - The date of the end-of-day data.
- **open** (number) - The opening price.
- **high** (number) - The highest price.
- **low** (number) - The lowest price.
- **close** (number) - The closing price.
- **adjustedClose** (number) - The adjusted closing price.
- **volume** (integer) - The trading volume.

#### Response Example
```json
{
  "symbol": "AAPL",
  "date": "2023-01-03",
  "open": 129.87,
  "high": 130.90,
  "low": 124.17,
  "close": 125.07,
  "adjustedClose": 124.45,
  "volume": 112117500
}
````

````

--------------------------------

### Retrieve Batch Aftermarket Trade Data

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-aftermarket-trade

This endpoint fetches real-time aftermarket trading data for a comma-separated list of stock symbols. It returns a JSON array containing the symbol, price, trade size, and timestamp for each requested ticker.

```JSON
[
  {
    "symbol": "AAPL",
    "price": 232.53,
    "tradeSize": 132,
    "timestamp": 1738715334311
  }
]
````

---

### Retrieve Analyst Estimates with FMP

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Accesses financial metric estimates (revenue, EBITDA, etc.) from top financial analysts for specific years.

```Excel/Google Sheets Formula
=FMP("AAPL", "Estimated Revenue AVG", {2029, 2028, 2027})
```

---

### Balance Sheet Statement Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Provides comprehensive access to balance sheet data across multiple companies. It enables users to analyze financial positions by retrieving key figures such as total assets, liabilities, and equity. Ideal for comparing the financial health and stability of different companies on a large scale.

```APIDOC
## GET /balance-sheet-statement-bulk

### Description
Retrieves bulk balance sheet statement data for companies.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement-bulk

### Parameters
#### Query Parameters
- **_year_** (string) - Required - The year for which to retrieve data (e.g., 2025).
- **_period_** (string) - Required - The period for which to retrieve data (e.g., Q1, Q2, Q3, Q4, FY).

### Request Example
```

https://financialmodelingprep.com/stable/balance-sheet-statement-bulk?_year_=2025&_period_=Q1

````

### Response
#### Success Response (200)
Returns the response as a CSV file. The provided sample response represents an individual record.
```json
[
  {
    "date": "2025-03-31",
    "symbol": "000001.SZ",
    "reportedCurrency": "CNY",
    "cik": "0000000000",
    "filingDate": "2025-03-31",
    "acceptedDate": "2025-03-31 00:00:00",
    "fiscalYear": "2025",
    "period": "Q1",
    "revenue": "33644000000",
    "costOfRevenue": "0",
    "grossProfit": "33644000000",
    "researchAndDevelopmentExpenses": "0",
    "generalAndAdministrativeExpenses": "9055000000",
    "sellingAndMarketingExpenses": "0",
    "sellingGeneralAndAdministrativeExpenses": "9055000000",
    "otherExpenses": "314000000",
    "operatingExpenses": "9369000000",
    "costAndExpenses": "9369000000",
    "netInterestIncome": "22788000000",
    "interestIncome": "44938000000",
    "interestExpense": "22150000000",
    "depreciationAndAmortization": "0",
    "ebitda": "16802000000",
    "ebit": "0",
    "nonOperatingIncomeExcludingInterest": "24275000000",
    "operatingIncome": "24275000000",
    "totalOtherIncomeExpensesNet": "-7392000000",
    "incomeBeforeTax": "16883000000",
    "incomeTaxExpense": "2787000000",
    "netIncomeFromContinuingOperations": "14096000000",
    "netIncomeFromDiscontinuedOperations": "0",
    "otherAdjustmentsToNetIncome": "0",
    "netIncome": "14096000000",
    "netIncomeDeductions": "0",
    "bottomLineNetIncome": "14096000000",
    "eps": "0.62",
    "epsDiluted": "0.62",
    "weightedAverageShsOut": "22735483871",
    "weightedAverageShsOutDil": "22735483871"
  }
]
````

````

--------------------------------

### Aftermarket Trade API

Source: https://site.financialmodelingprep.com/developer/docs

Track real-time trading activity occurring after regular market hours with the FMP Aftermarket Trade API. Access key details such as trade prices, sizes, and timestamps for trades executed during the post-market session.

```APIDOC
## GET /stable/aftermarket-trade

### Description
Track real-time aftermarket trading activity for a specific stock symbol.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/aftermarket-trade

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol to retrieve aftermarket trades for (e.g., AAPL).

### Request Example
````

https://financialmodelingprep.com/stable/aftermarket-trade?symbol=AAPL

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **price** (number) - The trade price.
- **size** (integer) - The trade size.
- **time** (string) - The timestamp of the trade.

#### Response Example
```json
{
  "symbol": "AAPL",
  "price": 170.60,
  "size": 100,
  "time": "2023-10-27T20:05:00Z"
}
````

````

--------------------------------

### Retrieve Stock Batch Quotes via API

Source: https://site.financialmodelingprep.com/developer/docs/stable/batch-quote

This endpoint returns a JSON array containing real-time market data for the requested stock symbols. It requires a 'symbols' query parameter and provides fields such as price, volume, market cap, and moving averages.

```JSON
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "price": 232.8,
    "changePercentage": 2.1008,
    "change": 4.79,
    "volume": 44489128,
    "dayLow": 226.65,
    "dayHigh": 233.13,
    "yearHigh": 260.1,
    "yearLow": 164.08,
    "marketCap": 3500823120000,
    "priceAvg50": 240.2278,
    "priceAvg200": 219.98755,
    "exchange": "NASDAQ",
    "open": 227.2,
    "previousClose": 228.01,
    "timestamp": 1738702801
  }
]
````

---

### FMP Function

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Retrieves financial data, key metrics, revenue segments, analyst estimates, and more. Supports multiple tickers, parameters, and periods.

```APIDOC
## FMP Function

### Description
This function is best used for obtaining financials, key metrics, revenue segments, analyst estimates, etc. (see data available per function).

### Syntax
`=FMP("ticker/s", "parameter/s", "period/s", ["quarter"], [divisor])`

### Parameters
#### Ticker/s
- **ticker/s** (string) - Required: The symbol/s of the company you are looking to get data for. It can be hardcoded i.e "AAPL" or a cell reference i.e. A1.

#### Parameter/s
- **parameter/s** (string) - Required: The data you are looking to get with the function. This accepts multiple parameters or a single parameter. It can be hard coded i.e. "Revenue", or a cell reference i.e B1:D1.

#### Period/s
- **period/s** (string) - Required: The year or time period you would like to select. This accepts multiple periods or a single period. It can be hard coded i.e. 2020, or a cell reference i.e. B1:D1. The periods include specific years like: **2020, "TTM"** (Trailing Twelve Months), **"LY", "LY-1"** etc (The latest fiscal year of data available, the previous and so on), **"LQ", "LQ-1"** etc (The latest fiscal quarter of data available, the previous and so on).

#### Quarter
- **quarter** (string) - Optional: The quarter you are looking to get data for (only for quarterly data). It can be hard coded i.e. "Q2", or a cell reference i.e. B1.

#### Divisor
- **divisor** (number) - Optional: If you would like to get the output in millions, billions or any other data unit, you can use this parameter to get the data in that format. It can be hard coded i.e. 1000000, or a cell reference i.e. B1.

### Examples
- `=FMP("AAPL","ROE","TTM")`
- `=FMP("TSLA", "Revenue", "LY",,1000000)`
- `=FMP("AAPL","Free Cash Flow",2019,"Q3")`

### Tips
- When requesting a lot of data, enter multiple tickers, parameters and periods in the function using cell references.
- Use the divisor parameter instead of dividing every cell by a value.
- For numbers in the function like 2020 you don't need to use quotes (" ") only for text like "Revenue", tickers etc.

### Large Data Requests
Instead of making many function requests at once, you can get data faster by using ranges in the functions. All you need to do is **enter a range of tickers** instead of a singular ticker, **enter a range of parameters** instead of a single parameter or **enter a range of periods** instead of a single period. You can see how it works in this example:
As you can see, the function is getting all these key metrics for multiple companies across the different periods in a single function call. This saves you a lot of time and makes your spreadsheet faster.
```

---

### Financial Ratios API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement

Analyze a company's financial performance using the Financial Ratios API. This API provides detailed profitability, liquidity, and efficiency ratios.

```APIDOC
## GET /api/financial-ratios

### Description
Retrieves detailed financial ratios for a company, including profitability, liquidity, and efficiency metrics.

### Method
GET

### Endpoint
/api/financial-ratios

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **period** (string) - Optional - The period for the ratios (e.g., 'annual', 'quarter'). Defaults to 'annual'.

### Request Example
```

GET /api/financial-ratios?symbol=AAPL&period=annual

````

### Response
#### Success Response (200)
- **ratios** (object) - An object containing various financial ratios.
  - **currentRatio** (number) - The current ratio.
  - **quickRatio** (number) - The quick ratio.
  - **debtToEquity** (number) - The debt-to-equity ratio.
  - **returnOnEquity** (number) - The return on equity.
  - ... (other ratios)

#### Response Example
```json
{
  "ratios": {
    "currentRatio": 1.5,
    "quickRatio": 1.2,
    "debtToEquity": 0.8,
    "returnOnEquity": 0.25
  }
}
````

````

--------------------------------

### All Exchange Market Hours API

Source: https://site.financialmodelingprep.com/developer/docs/stable/all-exchange-market-hours

Retrieve the market hours for all exchanges globally. This endpoint allows you to check when different markets are active, providing details such as exchange name, opening and closing hours, timezone, and current market status.

```APIDOC
## GET /stable/_all-exchange-market-hours_

### Description
Retrieves the market hours for all exchanges, including their opening and closing times, timezone, and whether the market is currently open.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_all-exchange-market-hours_

### Parameters
#### Query Parameters
None

### Request Example
````

GET https://financialmodelingprep.com/stable/_all-exchange-market-hours_

````

### Response
#### Success Response (200)
- **exchange** (string) - The stock exchange ticker symbol.
- **name** (string) - The full name of the stock exchange.
- **openingHour** (string) - The opening hour of the exchange in HH:MM AM/PM format with timezone offset.
- **closingHour** (string) - The closing hour of the exchange in HH:MM AM/PM format with timezone offset.
- **timezone** (string) - The timezone of the exchange (e.g., "Australia/Sydney").
- **isMarketOpen** (boolean) - Indicates whether the market is currently open.

#### Response Example
```json
[
  {
    "exchange": "ASX",
    "name": "Australian Stock Exchange",
    "openingHour": "10:00 AM +10:00",
    "closingHour": "04:00 PM +10:00",
    "timezone": "Australia/Sydney",
    "isMarketOpen": false
  }
]
````

````

--------------------------------

### Commodities APIs

Source: https://site.financialmodelingprep.com/developer/docs/cycle-times-stable

Access real-time and historical data for commodities, including quotes, charts, and lists.

```APIDOC
## Commodities List

### Description
Retrieves a list of available commodities.

### Method
GET

### Endpoint
/api/commodities/list

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The commodity symbol.
- **name** (string) - The name of the commodity.

#### Response Example
{
  "symbol": "XAUUSD",
  "name": "Gold"
}

## Commodities Quote

### Description
Provides real-time quote data for a specific commodity.

### Method
GET

### Endpoint
/api/commodities/quote

### Parameters
- **symbol** (string) - The commodity symbol (e.g., XAUUSD for Gold).

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The commodity symbol.
- **bid** (number) - The current bid price.
- **ask** (number) - The current ask price.
- **open** (number) - The opening price.
- **high** (number) - The highest price.
- **low** (number) - The lowest price.
- **volume** (number) - The trading volume.
- **timestamp** (number) - The timestamp of the quote.

#### Response Example
{
  "symbol": "XAUUSD",
  "bid": 1980.50,
  "ask": 1981.00,
  "open": 1975.00,
  "high": 1985.00,
  "low": 1970.00,
  "volume": 10000,
  "timestamp": 1678886400
}

## Commodities Quote Short

### Description
Provides a concise real-time quote for a specific commodity.

### Method
GET

### Endpoint
/api/commodities/quote/short

### Parameters
- **symbol** (string) - The commodity symbol (e.g., XAUUSD for Gold).

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The commodity symbol.
- **bid** (number) - The current bid price.
- **ask** (number) - The current ask price.
- **changesPercentage** (number) - The percentage change in price.

#### Response Example
{
  "symbol": "XAUUSD",
  "bid": 1980.50,
  "ask": 1981.00,
  "changesPercentage": 0.25
}

## All Commodities Quotes

### Description
Retrieves real-time quotes for all supported commodities.

### Method
GET

### Endpoint
/api/commodities/quotes

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The commodity symbol.
- **bid** (number) - The current bid price.
- **ask** (number) - The current ask price.
- **changesPercentage** (number) - The percentage change in price.

#### Response Example
[
  {
    "symbol": "XAUUSD",
    "bid": 1980.50,
    "ask": 1981.00,
    "changesPercentage": 0.25
  },
  {
    "symbol": "XAGUSD",
    "bid": 22.50,
    "ask": 22.55,
    "changesPercentage": 0.10
  }
]

## Light Chart

### Description
Provides light chart data for commodities over a specified interval.

### Method
GET

### Endpoint
/api/commodities/chart/light

### Parameters
- **symbol** (string) - The commodity symbol.
- **interval** (string) - The interval for the chart data (e.g., 5min, 15min, 1hour, 1day, 1week, 1month).

### Request Example
None

### Response
#### Success Response (200)
- **timestamp** (number) - The timestamp for the data point.
- **open** (number) - The opening price.
- **high** (number) - The highest price.
- **low** (number) - The lowest price.
- **close** (number) - The closing price.
- **volume** (number) - The trading volume.

#### Response Example
{
  "timestamp": 1678886400,
  "open": 1975.00,
  "high": 1985.00,
  "low": 1970.00,
  "close": 1980.50,
  "volume": 10000
}

## Full Chart

### Description
Provides detailed chart data for commodities over a specified interval.

### Method
GET

### Endpoint
/api/commodities/chart/full

### Parameters
- **symbol** (string) - The commodity symbol.
- **interval** (string) - The interval for the chart data (e.g., 5min, 15min, 1hour, 1day, 1week, 1month).

### Request Example
None

### Response
#### Success Response (200)
- **timestamp** (number) - The timestamp for the data point.
- **open** (number) - The opening price.
- **high** (number) - The highest price.
- **low** (number) - The lowest price.
- **close** (number) - The closing price.
- **volume** (number) - The trading volume.

#### Response Example
{
  "timestamp": 1678886400,
  "open": 1975.00,
  "high": 1985.00,
  "low": 1970.00,
  "close": 1980.50,
  "volume": 10000
}

## 1-Minute Interval Commodities Chart

### Description
Provides 1-minute interval chart data for commodities.

### Method
GET

### Endpoint
/api/commodities/chart/1min

### Parameters
- **symbol** (string) - The commodity symbol.

### Request Example
None

### Response
#### Success Response (200)
- **timestamp** (number) - The timestamp for the data point.
- **open** (number) - The opening price.
- **high** (number) - The highest price.
- **low** (number) - The lowest price.
- **close** (number) - The closing price.
- **volume** (number) - The trading volume.

#### Response Example
{
  "timestamp": 1678886400,
  "open": 1975.00,
  "high": 1985.00,
  "low": 1970.00,
  "close": 1980.50,
  "volume": 10000
}

## 5-Minute Interval Commodities Chart

### Description
Provides 5-minute interval chart data for commodities.

### Method
GET

### Endpoint
/api/commodities/chart/5min

### Parameters
- **symbol** (string) - The commodity symbol.

### Request Example
None

### Response
#### Success Response (200)
- **timestamp** (number) - The timestamp for the data point.
- **open** (number) - The opening price.
- **high** (number) - The highest price.
- **low** (number) - The lowest price.
- **close** (number) - The closing price.
- **volume** (number) - The trading volume.

#### Response Example
{
  "timestamp": 1678886400,
  "open": 1975.00,
  "high": 1985.00,
  "low": 1970.00,
  "close": 1980.50,
  "volume": 10000
}

## 1-Hour Interval Commodities Chart

### Description
Provides 1-hour interval chart data for commodities.

### Method
GET

### Endpoint
/api/commodities/chart/1hour

### Parameters
- **symbol** (string) - The commodity symbol.

### Request Example
None

### Response
#### Success Response (200)
- **timestamp** (number) - The timestamp for the data point.
- **open** (number) - The opening price.
- **high** (number) - The highest price.
- **low** (number) - The lowest price.
- **close** (number) - The closing price.
- **volume** (number) - The trading volume.

#### Response Example
{
  "timestamp": 1678886400,
  "open": 1975.00,
  "high": 1985.00,
  "low": 1970.00,
  "close": 1980.50,
  "volume": 10000
}
````

---

### Retrieve Segment and Geographic Revenue with FMP

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Provides revenue breakdowns by business segment or geographic region for SEC-reporting companies. Supports annual and quarterly periods.

```Excel/Google Sheets Formula
=FMP("AAPL", "segment revenues", 2020)
=FMP("AAPL", "geographic revenues", "LQ-2")
```

---

### Balance Sheet Statement Bulk API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-bulk

Retrieves bulk balance sheet statements for specified years and periods. Ideal for large-scale financial analysis and comparison.

````APIDOC
## GET /balance-sheet-statement-bulk

### Description
Retrieves bulk balance sheet statements for specified years and periods. This endpoint allows for the analysis of assets, liabilities, and equity across multiple companies, facilitating financial health assessments and historical tracking.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement-bulk

### Parameters
#### Query Parameters
- **year** (string) - Required - The fiscal year for which to retrieve balance sheet data (e.g., "2025").
- **period** (string) - Required - The reporting period for the balance sheet data (e.g., "Q1", "Q2", "Q3", "Q4", "FY").

### Request Example
```json
{
  "example": "https://financialmodelingprep.com/stable/balance-sheet-statement-bulk?_year_=2025&_period_=Q1"
}
````

### Response

#### Success Response (200)

- **date** (string) - The date of the balance sheet statement.
- **symbol** (string) - The stock symbol of the company.
- **reportedCurrency** (string) - The currency in which the financial data is reported.
- **cik** (string) - The Central Index Key assigned to the company.
- **filingDate** (string) - The date when the filing was made.
- **acceptedDate** (string) - The date when the filing was accepted.
- **fiscalYear** (string) - The fiscal year of the report.
- **period** (string) - The reporting period (e.g., Q1, Q2, Q3, Q4, FY).
- **cashAndCashEquivalents** (string) - Cash and cash equivalents.
- **shortTermInvestments** (string) - Short-term investments.
- **cashAndShortTermInvestments** (string) - Total cash and short-term investments.
- **netReceivables** (string) - Net receivables.
- **accountsReceivables** (string) - Accounts receivables.
- **otherReceivables** (string) - Other receivables.
- **inventory** (string) - Inventory.
- **prepaids** (string) - Prepaid expenses.
- **otherCurrentAssets** (string) - Other current assets.
- **totalCurrentAssets** (string) - Total current assets.
- **propertyPlantEquipmentNet** (string) - Net property, plant, and equipment.
- **goodwill** (string) - Goodwill.
- **intangibleAssets** (string) - Intangible assets.
- **goodwillAndIntangibleAssets** (string) - Goodwill and intangible assets.
- **longTermInvestments** (string) - Long-term investments.
- **taxAssets** (string) - Tax assets.
- **otherNonCurrentAssets** (string) - Other non-current assets.
- **totalNonCurrentAssets** (string) - Total non-current assets.
- **otherAssets** (string) - Other assets.
- **totalAssets** (string) - Total assets.
- **totalPayables** (string) - Total payables.
- **accountPayables** (string) - Accounts payables.
- **otherPayables** (string) - Other payables.
- **accruedExpenses** (string) - Accrued expenses.
- **shortTermDebt** (string) - Short-term debt.
- **capitalLeaseObligationsCurrent** (string) - Current capital lease obligations.
- **taxPayables** (string) - Tax payables.
- **deferredRevenue** (string) - Deferred revenue.
- **otherCurrentLiabilities** (string) - Other current liabilities.
- **totalCurrentLiabilities** (string) - Total current liabilities.
- **longTermDebt** (string) - Long-term debt.
- **capitalLeaseObligationsNonCurrent** (string) - Non-current capital lease obligations.
- **deferredRevenueNonCurrent** (string) - Non-current deferred revenue.
- **deferredTaxLiabilitiesNonCurrent** (string) - Non-current deferred tax liabilities.
- **otherNonCurrentLiabilities** (string) - Other non-current liabilities.
- **totalNonCurrentLiabilities** (string) - Total non-current liabilities.
- **otherLiabilities** (string) - Other liabilities.
- **capitalLeaseObligations** (string) - Capital lease obligations.
- **totalLiabilities** (string) - Total liabilities.
- **treasuryStock** (string) - Treasury stock.
- **preferredStock** (string) - Preferred stock.
- **commonStock** (string) - Common stock.
- **retainedEarnings** (string) - Retained earnings.
- **additionalPaidInCapital** (string) - Additional paid-in capital.
- **accumulatedOtherComprehensiveIncomeLoss** (string) - Accumulated other comprehensive income (loss).
- **otherTotalStockholdersEquity** (string) - Other total stockholders' equity.
- **totalStockholdersEquity** (string) - Total stockholders' equity.
- **totalEquity** (string) - Total equity.
- **minorityInterest** (string) - Minority interest.
- **totalLiabilitiesAndTotalEquity** (string) - Total liabilities and total equity.
- **totalInvestments** (string) - Total investments.
- **totalDebt** (string) - Total debt.
- **netDebt** (string) - Net debt.

#### Response Example

```json
[
  {
    "date": "2025-03-31",
    "symbol": "MTLRP.ME",
    "reportedCurrency": "RUB",
    "cik": "0000000000",
    "filingDate": "2025-05-31",
    "acceptedDate": "2025-03-31 07:00:00",
    "fiscalYear": "2025",
    "period": "Q1",
    "cashAndCashEquivalents": "1985000",
    "shortTermInvestments": "0",
    "cashAndShortTermInvestments": "1985000",
    "netReceivables": "9666577000",
    "accountsReceivables": "9666577000",
    "otherReceivables": "0",
    "inventory": "4520000",
    "prepaids": "0",
    "otherCurrentAssets": "27293000",
    "totalCurrentAssets": "9700830000",
    "propertyPlantEquipmentNet": "194000",
    "goodwill": "0",
    "intangibleAssets": "5665000",
    "goodwillAndIntangibleAssets": "5665000",
    "longTermInvestments": "237373355000",
    "taxAssets": "791813000",
    "otherNonCurrentAssets": "0",
    "totalNonCurrentAssets": "238171027000",
    "otherAssets": "0",
    "totalAssets": "247871857000",
    "totalPayables": "3861497000",
    "accountPayables": "3861497000",
    "otherPayables": "0",
    "accruedExpenses": "0",
    "shortTermDebt": "4842848000",
    "capitalLeaseObligationsCurrent": "0",
    "taxPayables": "2484576000",
    "deferredRevenue": "0",
    "otherCurrentLiabilities": "146647000",
    "totalCurrentLiabilities": "8851455000",
    "longTermDebt": "178923999000",
    "capitalLeaseObligationsNonCurrent": "0",
    "deferredRevenueNonCurrent": "0",
    "deferredTaxLiabilitiesNonCurrent": "737391000",
    "otherNonCurrentLiabilities": "52574304000",
    "totalNonCurrentLiabilities": "232235780000",
    "otherLiabilities": "0",
    "capitalLeaseObligations": "0",
    "totalLiabilities": "244087635000",
    "treasuryStock": "0",
    "preferredStock": "0",
    "commonStock": "5550277000",
    "retainedEarnings": "-5066509000",
    "additionalPaidInCapital": "6023340000",
    "accumulatedOtherComprehensiveIncomeLoss": "0",
    "otherTotalStockholdersEquity": "0",
    "totalStockholdersEquity": "6784622000",
    "totalEquity": "6784622000",
    "minorityInterest": "0",
    "totalLiabilitiesAndTotalEquity": "247871857000",
    "totalInvestments": "237373355000",
    "totalDebt": "183766847000",
    "netDebt": "183764862000"
  }
]
```

````

--------------------------------

### Earnings Transcript List API

Source: https://site.financialmodelingprep.com/developer/docs

Access available earnings transcripts for companies with the FMP Earnings Transcript List API. Retrieve a list of companies with earnings transcripts, along with the total number of transcripts available for each company.

```APIDOC
## GET /stable/earnings-transcript-list

### Description
Retrieves a list of companies that have available earnings transcripts, along with the total number of transcripts for each.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/earnings-transcript-list

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **total_transcripts** (integer) - The total number of earnings transcripts available for the company.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "total_transcripts": 50
  }
]
````

````

--------------------------------

### Retrieve Dividend History with FMPPRICE

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Retrieves comprehensive dividend data including ex-dates, payment dates, and declaration dates. Can be filtered by specific date ranges.

```Excel/Google Sheets Formula
=FMPPRICE("AAPL", "dividend")
=FMPPRICE("aapl", "dividend", , "01/01/2017", "01/01/2022")
````

---

### Stock Directory API

Source: https://site.financialmodelingprep.com/developer/docs

Easily retrieve a comprehensive list of financial symbols with the FMP Company Symbols List API. Access a broad range of stock symbols and other tradable financial instruments from various global exchanges, helping you explore the full range of available securities.

````APIDOC
## GET /stable/stock-list

### Description
Retrieves a comprehensive list of financial symbols from various global exchanges.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/stock-list

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **exchange** (string) - The exchange the stock is traded on.
- **assetType** (string) - The type of asset.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "exchange": "NASDAQ",
    "assetType": "Stock"
  }
]
````

````

--------------------------------

### Retrieve Available Exchanges List

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-exchanges

This endpoint returns a JSON array containing details about supported stock exchanges, including their full names, country of origin, and real-time data status. It is primarily used to identify valid exchange codes for filtering other financial data queries.

```json
[
  {
    "exchange": "AMEX",
    "name": "New York Stock Exchange Arca",
    "countryName": "United States of America",
    "countryCode": "US",
    "symbolSuffix": "N/A",
    "delay": "Real-time"
  }
]
````

---

### Balance Sheet Statement Growth Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves growth data across multiple companies' balance sheets for a specified year and period. The response is provided as a CSV file, with individual records represented as JSON objects.

````APIDOC
## GET /balance-sheet-statement-growth-bulk

### Description
Retrieves growth data across multiple companies' balance sheets, enabling detailed analysis of how financial positions have changed over time. The response is provided as a CSV file.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk

### Parameters
#### Query Parameters
- **year** (string) - Required - The year for which to retrieve balance sheet data (e.g., "2025").
- **period** (string) - Required - The period for which to retrieve balance sheet data (e.g., "Q1", "Q2", "Q3", "Q4", "FY").

### Request Example
```json
{
  "example": "https://financialmodelingprep.com/stable/balance-sheet-statement-growth-bulk?_year_ =2025&_period_ =Q1"
}
````

### Response

#### Success Response (200)

- **Response Format**: CSV file.
- **Individual Record Example**:

```json
{
  "date": "2025-03-31",
  "symbol": "MTLRP.ME",
  "reportedCurrency": "RUB",
  "cik": "0000000000",
  "filingDate": "2025-05-31",
  "acceptedDate": "2025-03-31 07:00:00",
  "fiscalYear": "2025",
  "period": "Q1",
  "cashAndCashEquivalents": "1985000",
  "shortTermInvestments": "0",
  "cashAndShortTermInvestments": "1985000",
  "netReceivables": "9666577000",
  "accountsReceivables": "9666577000",
  "otherReceivables": "0",
  "inventory": "4520000",
  "prepaids": "0",
  "otherCurrentAssets": "27293000",
  "totalCurrentAssets": "9700830000",
  "propertyPlantEquipmentNet": "194000",
  "goodwill": "0",
  "intangibleAssets": "5665000",
  "goodwillAndIntangibleAssets": "5665000",
  "longTermInvestments": "237373355000",
  "taxAssets": "791813000",
  "otherNonCurrentAssets": "0",
  "totalNonCurrentAssets": "238171027000",
  "otherAssets": "0",
  "totalAssets": "247871857000",
  "totalPayables": "3861497000",
  "accountPayables": "3861497000",
  "otherPayables": "0",
  "accruedExpenses": "0",
  "shortTermDebt": "4842848000",
  "capitalLeaseObligationsCurrent": "0",
  "taxPayables": "2484576000",
  "deferredRevenue": "0",
  "otherCurrentLiabilities": "146647000",
  "totalCurrentLiabilities": "8851455000",
  "longTermDebt": "178923999000",
  "capitalLeaseObligationsNonCurrent": "0",
  "deferredRevenueNonCurrent": "0",
  "deferredTaxLiabilitiesNonCurrent": "737391000",
  "otherNonCurrentLiabilities": "52574304000",
  "totalNonCurrentLiabilities": "232235780000",
  "otherLiabilities": "0",
  "capitalLeaseObligations": "0",
  "totalLiabilities": "244087635000",
  "treasuryStock": "0",
  "preferredStock": "0",
  "commonStock": "5550277000",
  "retainedEarnings": "-5066509000",
  "additionalPaidInCapital": "6023340000",
  "accumulatedOtherComprehensiveIncomeLoss": "0",
  "otherTotalStockholdersEquity": "0",
  "totalStockholdersEquity": "6784622000",
  "totalEquity": "6784622000",
  "minorityInterest": "0",
  "totalLiabilitiesAndTotalEquity": "247871857000",
  "totalInvestments": "237373355000",
  "totalDebt": "183766847000",
  "netDebt": "183764862000"
}
```

````

--------------------------------

### Available Transcript Symbols API

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-transcript-symbols

Retrieves a list of companies that have earnings call transcripts available, along with the number of transcripts for each company. This is useful for identifying companies with historical earnings discussion data for financial analysis.

```APIDOC
## GET /stable/_earnings-transcript-list_

### Description
Retrieves a list of stock symbols for companies that have earnings call transcripts available. It also provides the count of available transcripts for each company, facilitating the identification of companies with rich historical earnings data for analysis.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_earnings-transcript-list_

### Parameters
#### Query Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol of the company.
- **companyName** (string) - The name of the company.
- **noOfTranscripts** (string) - The number of available earnings call transcripts for the company.

#### Response Example
```json
[
  {
    "symbol": "MCUJF",
    "companyName": "Medicure Inc.",
    "noOfTranscripts": "16"
  }
]
````

````

--------------------------------

### Aftermarket Quote API

Source: https://site.financialmodelingprep.com/developer/docs

Access real-time aftermarket quotes for stocks with the FMP Aftermarket Quote API. Track bid and ask prices, volume, and other relevant data outside of regular trading hours.

```APIDOC
## GET /stable/aftermarket-quote

### Description
Access real-time aftermarket quotes for a specific stock symbol.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/aftermarket-quote

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol to retrieve aftermarket quotes for (e.g., AAPL).

### Request Example
````

https://financialmodelingprep.com/stable/aftermarket-quote?symbol=AAPL

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **bid** (number) - The bid price.
- **ask** (number) - The ask price.
- **volume** (integer) - The aftermarket volume.

#### Response Example
```json
{
  "symbol": "AAPL",
  "bid": 170.55,
  "ask": 170.65,
  "volume": 50000
}
````

````

--------------------------------

### Available Industries API

Source: https://site.financialmodelingprep.com/developer/docs

Access a comprehensive list of industries where stock symbols are available using the FMP Available Industries API. This API helps users filter and categorize companies based on their industry for more focused research and analysis.

```APIDOC
## GET /stable/available-industries

### Description
Retrieves a comprehensive list of industries for which stock symbols are available.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/available-industries

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **industry** (string) - The name of the industry.

#### Response Example
```json
[
  {
    "industry": "Software - Infrastructure"
  },
  {
    "industry": "Biotechnology"
  }
]
````

````

--------------------------------

### Earnings Surprises Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves bulk data on annual earnings surprises, enabling quick analysis of which companies have beaten, missed, or met their earnings estimates. Provides actual versus estimated earnings per share (EPS) for multiple companies at once.

```APIDOC
## Earnings Surprises Bulk API

### Description
Retrieves bulk data on annual earnings surprises, enabling quick analysis of which companies have beaten, missed, or met their earnings estimates. Provides actual versus estimated earnings per share (EPS) for multiple companies at once.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/earnings-surprises-bulk

### Parameters
#### Query Parameters
- **year** (string) - Required - The year for which to retrieve earnings surprises (e.g., 2025).

### Request Example
`https://financialmodelingprep.com/stable/earnings-surprises-bulk?_year_ =2025`

### Response
#### Success Response (200)
This endpoint returns the response as a CSV file. The provided sample response represents an individual record.
```json
[
  {
    "symbol": "AMKYF",
    "date": "2025-07-09",
    "epsActual": "0.3631",
    "epsEstimated": "0.3615",
    "lastUpdated": "2025-07-09"
  }
]
````

````

--------------------------------

### Income Statement Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves detailed income statement data in bulk. This API is designed for large-scale data analysis, providing comprehensive insights into a company's financial performance, including revenue, gross profit, expenses, and net income.

```APIDOC
## Income Statement Bulk API

### Description
Retrieves detailed income statement data in bulk. This API is designed for large-scale data analysis, providing comprehensive insights into a company's financial performance, including revenue, gross profit, expenses, and net income.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/income-statement-bulk

### Parameters
#### Query Parameters
- **year** (string) - Required - The year for which to retrieve income statement data (e.g., 2025).
- **period** (string) - Required - The period for which to retrieve income statement data (e.g., Q1, Q2, Q3, Q4, FY).

### Request Example
`https://financialmodelingprep.com/stable/income-statement-bulk?_year_ =2025&_period_ =Q1`

### Response
#### Success Response (200)
This endpoint returns the response as a CSV file. The provided sample response represents an individual record.
```json
[
  {
    "symbol": "000001.SZ",
    "grossProfitMarginTTM": "1.1622776732779352",
    "ebitMarginTTM": "0.22525536322293388",
    "ebitdaMarginTTM": "0.2018381390033096",
    "operatingProfitMarginTTM": "0.4658682349579752",
    "pretaxProfitMarginTTM": "0.3160551441700993",
    "continuousOperationsProfitMarginTTM": "0.25995857044215337",
    "netProfitMarginTTM": "0.25995857044215337",
    "bottomLineProfitMarginTTM": "0.25995857044215337",
    "receivablesTurnoverTTM": "0",
    "payablesTurnoverTTM": "0",
    "inventoryTurnoverTTM": "0",
    "fixedAssetTurnoverTTM": "13.114441842310695",
    "assetTurnoverTTM": "0.029075827062555015",
    "currentRatioTTM": "0",
    "quickRatioTTM": "0",
    "solvencyRatioTTM": "0.008534174446189174",
    "cashRatioTTM": "0",
    "priceToEarningsRatioTTM": "6.68445715569793",
    "priceToEarningsGrowthRatioTTM": "-3.6096068640768793",
    "forwardPriceToEarningsGrowthRatioTTM": "2.4481492401413427",
    "priceToBookRatioTTM": "0.576796465809228",
    "priceToSalesRatioTTM": "1.483200528584014",
    "priceToFreeCashFlowRatioTTM": "1.518395607609901",
    "priceToOperatingCashFlowRatioTTM": "1.7523793147342828",
    "debtToAssetsRatioTTM": "0",
    "debtToEquityRatioTTM": "0",
    "debtToCapitalRatioTTM": "0",
    "longTermDebtToCapitalRatioTTM": "0",
    "financialLeverageRatioTTM": "11.416164801466868",
    "workingCapitalTurnoverRatioTTM": "0.23544250931631752",
    "operatingCashFlowRatioTTM": "0",
    "operatingCashFlowSalesRatioTTM": "0.991612895545132",
    "freeCashFlowOperatingCashFlowRatioTTM": "0.9850828696116743",
    "debtServiceCoverageRatioTTM": "0.24758322210087771",
    "interestCoverageRatioTTM": "0.7914088096104842",
    "shortTermOperatingCashFlowCoverageRatioTTM": "0",
    "operatingCashFlowCoverageRatioTTM": "0",
    "capitalExpenditureCoverageRatioTTM": "67.03702213279678",
    "dividendPaidAndCapexCoverageRatioTTM": "6.192364879934577",
    "dividendPayoutRatioTTM": "0.5590996519509067",
    "dividendYieldTTM": "0.10335",
    "enterpriseValueTTM": "-496959244000",
    "revenuePerShareTTM": "7.389154370023568",
    "netIncomePerShareTTM": "1.9208740068077172",
    "interestDebtPerShareTTM": "4.349676503966586",
    "cashPerShareTTM": "32.81790720767194",
    "bookValuePerShareTTM": "22.260885357516656",
    "tangibleBookValuePerShareTTM": "21.662613507347245",
    "shareholdersEquityPerShareTTM": "22.260885357516656",
    "operatingCashFlowPerShareTTM": "7.327180760489036",
    "capexPerShareTTM": "0.10930051078304583",
    "freeCashFlowPerShareTTM": "7.21788024970599",
    "netIncomePerEBTTTM": "0.8225101702576465",
    "ebtPerEbitTTM": "0.6784217520188082",
    "priceToFairValueTTM": "0.576796465809228",
    "debtToMarketCapTTM": "0",
    "effectiveTaxRateTTM": "0.17748982974235347",
    "enterpriseValueMultipleTTM": "-14.656106051669223",
    "dividendPerShareTTM": "1.327"
  }
]
````

````

--------------------------------

### DCF Valuations Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves discounted cash flow (DCF) valuations for multiple symbols in one request, providing implied price movement and percentage differences.

```APIDOC
## GET /stable/_dcf-bulk_

### Description
This endpoint enables users to quickly retrieve discounted cash flow (DCF) valuations for multiple symbols in one request. Access the implied price movement and percentage differences for all listed companies.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_dcf-bulk_

### Parameters
#### Query Parameters
- **apikey** (string) - Required - Your unique API key.

### Request Example
````

https://financialmodelingprep.com/stable/_dcf-bulk_?apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
Returns a CSV file containing DCF valuations for multiple symbols. The sample response below represents an individual record:
- **symbol** (string) - The stock symbol.
- **date** (string) - The date of the valuation.
- **dcf** (string) - The calculated Discounted Cash Flow valuation.
- **Stock Price** (string) - The current stock price.

#### Response Example
```json
[
  {
    "symbol": "000002.SZ",
    "date": "2025-07-09",
    "dcf": "179.6654688379575",
    "Stock Price": "6.54"
  }
]
````

````

--------------------------------

### Market Hours APIs

Source: https://site.financialmodelingprep.com/developer/docs/cycle-times-stable

Retrieve information about global exchange market hours and holidays.

```APIDOC
## Global Exchange Market Hours

### Description
Provides the market hours for global stock exchanges.

### Method
GET

### Endpoint
/api/market/hours/global

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **exchange** (string) - The name of the exchange.
- **open** (string) - The opening time of the market.
- **close** (string) - The closing time of the market.

#### Response Example
{
  "exchange": "NYSE",
  "open": "09:30",
  "close": "16:00"
}

## Holidays By Exchange

### Description
Lists the holidays for specific stock exchanges.

### Method
GET

### Endpoint
/api/market/hours/holidays

### Parameters
- **exchange** (string) - The stock exchange symbol (e.g., NYSE, NASDAQ).

### Request Example
None

### Response
#### Success Response (200)
- **exchange** (string) - The name of the exchange.
- **date** (string) - The date of the holiday.
- **name** (string) - The name of the holiday.

#### Response Example
{
  "exchange": "NYSE",
  "date": "2024-01-01",
  "name": "New Year's Day"
}

## All Exchange Market Hours

### Description
Retrieves market hours for all supported exchanges.

### Method
GET

### Endpoint
/api/market/hours/all

### Parameters
None

### Request Example
None

### Response
#### Success Response (200)
- **exchange** (string) - The name of the exchange.
- **open** (string) - The opening time of the market.
- **close** (string) - The closing time of the market.

#### Response Example
{
  "exchange": "NASDAQ",
  "open": "09:30",
  "close": "16:00"
}
````

---

### Full Index Quotes API

Source: https://site.financialmodelingprep.com/developer/docs

Track real-time movements of major stock market indexes with the FMP Stock Market Index Quotes API. Access live quotes for global indexes and monitor changes in their performance.

```APIDOC
## GET /stable/batch-index-quotes

### Description
Retrieve real-time quotes for multiple stock market indexes.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-index-quotes

### Parameters
#### Query Parameters
- **symbols** (string) - Optional - A comma-separated list of index symbols (e.g., ^GSPC, ^IXIC).

### Request Example
```

https://financialmodelingprep.com/stable/batch-index-quotes?symbols=^GSPC,^IXIC

````

### Response
#### Success Response (200)
- **symbol** (string) - The index symbol.
- **price** (number) - The current index value.
- **change** (number) - The change in index value.

#### Response Example
```json
[
  {
    "symbol": "^GSPC",
    "price": 4150.00,
    "change": 25.50
  },
  {
    "symbol": "^IXIC",
    "price": 12800.00,
    "change": 80.00
  }
]
````

````

--------------------------------

### Available Industries API

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-industries

Retrieves a list of available industries where stock symbols are listed. This API is useful for filtering and categorizing companies by their industry for focused research.

```APIDOC
## GET /stable/_available-industries_

### Description
Retrieves a comprehensive list of industries where stock symbols are available. This API helps users filter and categorize companies based on their industry for more focused research and analysis.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_available-industries_

### Parameters
#### Query Parameters
None

#### Request Body
None

### Response
#### Success Response (200)
- **industry** (string) - The name of the industry.

#### Response Example
```json
[
  {
    "industry": "Steel"
  }
]
````

````

--------------------------------

### Financial Scores Bulk API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves a wide range of key financial scores and metrics for multiple symbols, offering insights into company performance and financial health.

```APIDOC
## GET /stable/_scores-bulk_

### Description
This endpoint allows users to quickly retrieve a wide range of key financial scores and metrics for multiple symbols. These scores provide valuable insights into company performance, financial health, and operational efficiency.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_scores-bulk_

### Parameters
#### Query Parameters
- **apikey** (string) - Required - Your unique API key.

### Request Example
````

https://financialmodelingprep.com/stable/_scores-bulk_?apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
Returns a CSV file containing financial scores for multiple symbols. The structure of the response will include various financial metrics and scores for each requested symbol.

#### Response Example
(Note: The exact fields returned can be extensive. This is a representative example.)
```json
[
  {
    "symbol": "AAPL",
    "financialScore": "85",
    "managementScore": "90",
    "financialStrengthScore": "88",
    "profitabilityScore": "92",
    "growthScore": "80"
  }
]
````

````

--------------------------------

### Retrieve Balance Sheet Data via API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement

This snippet demonstrates the structure of the JSON response returned by the Balance Sheet Statement API. It includes key financial metrics such as cash, debt, and total equity for a specified company.

```json
[
  {
    "date": "2024-09-28",
    "symbol": "AAPL",
    "reportedCurrency": "USD",
    "cik": "0000320193",
    "filingDate": "2024-11-01",
    "acceptedDate": "2024-11-01 06:01:36",
    "fiscalYear": "2024",
    "period": "FY",
    "cashAndCashEquivalents": 29943000000,
    "shortTermInvestments": 35228000000,
    "totalCurrentAssets": 152987000000,
    "totalAssets": 364980000000,
    "totalCurrentLiabilities": 176392000000,
    "totalLiabilities": 308030000000,
    "totalStockholdersEquity": 56950000000,
    "totalDebt": 106629000000,
    "netDebt": 76686000000
  }
]
````

---

### Symbol Changes Endpoint

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-transcript-symbols

Provides a historical record of ticker symbol transitions, including old and new symbols, company names, and effective dates.

```APIDOC
## Symbol Changes Endpoint

### Description
The Symbol Changes endpoint provides a historical record of all ticker transitions over time. Each entry represents an actual change event, including the old symbol, the new symbol, the company name, and the effective date. This allows you to trace how a company’s ticker has evolved, such as past transitions like IOT → IOR or QQQQ → QQQ. These entries appear in the data because they reflect real historical changes, not active tickers.

### Method
GET

### Endpoint
`/symbol_changes`

### Parameters
#### Query Parameters
- **apikey** (string) - Required - Your unique API key.

#### Request Body
N/A

### Request Example
```

GET https://financialmodelingprep.com/api/v3/symbol_changes?apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **symbol_changes** (array) - An array of objects, where each object represents a symbol change.
  - **oldSymbol** (string) - The previous ticker symbol.
  - **newSymbol** (string) - The current ticker symbol.
  - **changeDate** (string) - The date the symbol change became effective (YYYY-MM-DD).
  - **companyName** (string) - The name of the company.

#### Response Example
```json
{
  "symbol_changes": [
    {
      "oldSymbol": "IOT",
      "newSymbol": "IOR",
      "changeDate": "2020-01-01",
      "companyName": "Example Corp"
    },
    {
      "oldSymbol": "QQQQ",
      "newSymbol": "QQQ",
      "changeDate": "2010-01-01",
      "companyName": "Invesco QQQ Trust"
    }
  ]
}
````

````

--------------------------------

### ETF and Mutual Funds APIs

Source: https://site.financialmodelingprep.com/developer/docs/cycle-times-stable

Access data related to Exchange Traded Funds (ETFs) and Mutual Funds, including holdings, information, country allocation, and asset exposure.

```APIDOC
## ETF & Fund Holdings

### Description
Retrieves the holdings of ETFs and Mutual Funds.

### Method
GET

### Endpoint
/api/etf/holdings

### Parameters
- **symbol** (string) - The ETF or Mutual Fund symbol.

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The security symbol.
- **name** (string) - The name of the security.
- **shares** (number) - The number of shares held.
- **date** (string) - The date of the holdings data.

#### Response Example
{
  "symbol": "AAPL",
  "name": "Apple Inc.",
  "shares": 1000000,
  "date": "2023-09-30"
}

## ETF & Mutual Fund Information

### Description
Provides general information about ETFs and Mutual Funds.

### Method
GET

### Endpoint
/api/etf/info

### Parameters
- **symbol** (string) - The ETF or Mutual Fund symbol.

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The ETF or Mutual Fund symbol.
- **name** (string) - The name of the ETF or Mutual Fund.
- **assetType** (string) - The type of asset (e.g., ETF, Mutual Fund).
- **issuer** (string) - The issuer of the fund.

#### Response Example
{
  "symbol": "VOO",
  "name": "Vanguard S&P 500 ETF",
  "assetType": "ETF",
  "issuer": "Vanguard"
}

## ETF & Fund Country Allocation

### Description
Shows the country allocation of assets within ETFs and Mutual Funds.

### Method
GET

### Endpoint
/api/etf/country-allocation

### Parameters
- **symbol** (string) - The ETF or Mutual Fund symbol.

### Request Example
None

### Response
#### Success Response (200)
- **country** (string) - The name of the country.
- **allocationPercentage** (number) - The percentage of assets allocated to the country.

#### Response Example
{
  "country": "United States",
  "allocationPercentage": 60.5
}

## ETF Asset Exposure

### Description
Details the asset exposure of an ETF.

### Method
GET

### Endpoint
/api/etf/asset-exposure

### Parameters
- **symbol** (string) - The ETF symbol.

### Request Example
None

### Response
#### Success Response (200)
- **assetClass** (string) - The asset class (e.g., Equity, Fixed Income).
- **exposurePercentage** (number) - The percentage of exposure to the asset class.

#### Response Example
{
  "assetClass": "Equity",
  "exposurePercentage": 95.0
}

## ETF Sector Weighting

### Description
Provides the sector weighting for an ETF.

### Method
GET

### Endpoint
/api/etf/sector-weighting

### Parameters
- **symbol** (string) - The ETF symbol.

### Request Example
None

### Response
#### Success Response (200)
- **sector** (string) - The name of the sector.
- **weightPercentage** (number) - The percentage weight of the sector in the ETF.

#### Response Example
{
  "sector": "Technology",
  "weightPercentage": 28.2
}

## Mutual Fund & ETF Disclosure

### Description
Retrieves disclosure information for Mutual Funds and ETFs.

### Method
GET

### Endpoint
/api/etf/disclosure

### Parameters
- **symbol** (string) - The Mutual Fund or ETF symbol.

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The Mutual Fund or ETF symbol.
- **date** (string) - The date of the disclosure.
- **disclosureText** (string) - The disclosure text.

#### Response Example
{
  "symbol": "SWPPX",
  "date": "2023-09-30",
  "disclosureText": "This fund seeks long-term growth of capital..."
}

## Mutual Fund Disclosures

### Description
Retrieves disclosure information specifically for Mutual Funds.

### Method
GET

### Endpoint
/api/mutual-fund/disclosures

### Parameters
- **symbol** (string) - The Mutual Fund symbol.

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The Mutual Fund symbol.
- **date** (string) - The date of the disclosure.
- **disclosureText** (string) - The disclosure text.

#### Response Example
{
  "symbol": "SWPPX",
  "date": "2023-09-30",
  "disclosureText": "This fund seeks long-term growth of capital..."
}

## Mutual Fund & ETF Disclosure Name Search

### Description
Searches for Mutual Fund and ETF disclosures by name.

### Method
GET

### Endpoint
/api/etf/disclosure/search-name

### Parameters
- **name** (string) - The name of the Mutual Fund or ETF.

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The Mutual Fund or ETF symbol.
- **name** (string) - The name of the Mutual Fund or ETF.
- **date** (string) - The date of the disclosure.

#### Response Example
{
  "symbol": "SWPPX",
  "name": "Schwab S&P 500 Index Fund",
  "date": "2023-09-30"
}

## Fund & ETF Disclosures by Date

### Description
Retrieves Mutual Fund and ETF disclosures for a specific date.

### Method
GET

### Endpoint
/api/etf/disclosures-by-date

### Parameters
- **date** (string) - The date for which to retrieve disclosures (YYYY-MM-DD).

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The Mutual Fund or ETF symbol.
- **name** (string) - The name of the Mutual Fund or ETF.
- **disclosureText** (string) - The disclosure text.

#### Response Example
{
  "symbol": "SWPPX",
  "name": "Schwab S&P 500 Index Fund",
  "disclosureText": "This fund seeks long-term growth of capital..."
}
````

---

### Retrieve Unadjusted Historical Stock Prices

Source: https://site.financialmodelingprep.com/developer/docs

Fetches end-of-day stock price and volume data that does not account for stock splits. Requires a symbol parameter and supports optional date range filtering.

```json
[
  {
    "symbol": "AAPL",
    "date": "2025-02-04",
    "open": 227.2,
    "high": 233.13,
    "low": 226.65,
    "close": 232.8,
    "volume": 44489128,
    "change": 5.6,
    "changePercent": 2.46479,
    "vwap": 230.86
  }
]
```

---

### Full Cryptocurrency Quotes API

Source: https://site.financialmodelingprep.com/developer/docs

Access real-time cryptocurrency quotes with the FMP Full Cryptocurrency Quotes API. Track live prices, trading volumes, and price changes for a wide range of digital assets.

```APIDOC
## GET /stable/batch-crypto-quotes

### Description
Retrieve real-time quotes for multiple cryptocurrencies.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-crypto-quotes

### Parameters
#### Query Parameters
- **symbols** (string) - Optional - A comma-separated list of cryptocurrency symbols (e.g., BTCUSD, ETHUSD).

### Request Example
```

https://financialmodelingprep.com/stable/batch-crypto-quotes?symbols=BTCUSD,ETHUSD

````

### Response
#### Success Response (200)
- **symbol** (string) - The cryptocurrency symbol.
- **price** (number) - The current price.
- **change** (number) - The price change.
- **volume** (integer) - The trading volume.

#### Response Example
```json
[
  {
    "symbol": "BTCUSD",
    "price": 34000.50,
    "change": 500.25,
    "volume": 20000000000
  },
  {
    "symbol": "ETHUSD",
    "price": 1800.75,
    "change": 20.50,
    "volume": 10000000000
  }
]
````

````

--------------------------------

### Available Countries API

Source: https://site.financialmodelingprep.com/developer/docs/stable/available-countries

Retrieve a list of countries where stock symbols are available. This API is useful for filtering and analyzing stock symbols based on their country of origin or primary trading market.

```APIDOC
## GET /stable/_available-countries_

### Description
Retrieves a list of countries where stock symbols are available. This endpoint allows users to filter and analyze stock symbols based on the country of origin or the primary market where the securities are traded.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/_available-countries_

### Parameters
#### Query Parameters
None

### Request Example
None (GET request)

### Response
#### Success Response (200)
- **country** (string) - The country code.

#### Response Example
```json
[
  {
    "country": "FK"
  }
]
````

````

--------------------------------

### ETF & Mutual Funds API

Source: https://site.financialmodelingprep.com/developer/docs

Access comprehensive data on Exchange Traded Funds (ETFs) and mutual funds. This includes holdings, general information, country and sector allocations, disclosures, and search capabilities.

```APIDOC
## ETF & Fund Holdings API

### Description
Get a detailed breakdown of the assets held within ETFs and mutual funds.

### Method
GET

### Endpoint
`/stable/etf/holdings`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ETF or mutual fund symbol (e.g., SPY).

### Request Example
````

https://financialmodelingprep.com/stable/etf/holdings?symbol=SPY

```

## ETF & Mutual Fund Information API

### Description
Access comprehensive data on ETFs and mutual funds, including ticker symbol, fund name, expense ratio, and assets under management.

### Method
GET

### Endpoint
`/stable/etf/info`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ETF or mutual fund symbol (e.g., SPY).

### Request Example
```

https://financialmodelingprep.com/stable/etf/info?symbol=SPY

```

## ETF & Fund Country Allocation API

### Description
Provides detailed information on the percentage of assets allocated to various countries within ETFs and mutual funds.

### Method
GET

### Endpoint
`/stable/etf/country-weightings`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ETF or mutual fund symbol (e.g., SPY).

### Request Example
```

https://financialmodelingprep.com/stable/etf/country-weightings?symbol=SPY

```

## ETF Asset Exposure API

### Description
Discover which ETFs hold specific stocks and access details on market value, share numbers, and weight percentages.

### Method
GET

### Endpoint
`/stable/etf/asset-exposure`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol to check for exposure in ETFs (e.g., AAPL).

### Request Example
```

https://financialmodelingprep.com/stable/etf/asset-exposure?symbol=AAPL

```

## ETF Sector Weighting API

### Description
Provides a breakdown of the percentage of an ETF's assets invested in each sector.

### Method
GET

### Endpoint
`/stable/etf/sector-weightings`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The ETF symbol (e.g., SPY).

### Request Example
```

https://financialmodelingprep.com/stable/etf/sector-weightings?symbol=SPY

```

## Mutual Fund & ETF Disclosure API

### Description
Access the latest disclosures from mutual funds and ETFs, including filings and changes in holdings.

### Method
GET

### Endpoint
`/stable/funds/disclosure-holders-latest`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The fund or ETF symbol (e.g., AAPL).

### Request Example
```

https://financialmodelingprep.com/stable/funds/disclosure-holders-latest?symbol=AAPL

```

## Mutual Fund Disclosures API

### Description
Access comprehensive disclosure data for mutual funds, including recent filings, balance sheets, and financial reports.

### Method
GET

### Endpoint
`/stable/funds/disclosure`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The mutual fund symbol (e.g., VWO).
- **year** (integer) - Required - The year for the disclosure data (e.g., 2023).
- **quarter** (integer) - Required - The quarter for the disclosure data (e.g., 4).

### Request Example
```

https://financialmodelingprep.com/stable/funds/disclosure?symbol=VWO&year=2023&quarter=4

```

## Mutual Fund & ETF Disclosure Name Search API

### Description
Easily search for mutual fund and ETF disclosures by name.

### Method
GET

### Endpoint
`/stable/funds/disclosure-holders-search`

### Parameters
#### Query Parameters
- **name** (string) - Required - The name of the mutual fund or ETF to search for (e.g., "Federated Hermes Government Income Securities, Inc.").

### Request Example
```

https://financialmodelingprep.com/stable/funds/disclosure-holders-search?name=Federated Hermes Government Income Securities, Inc.

```

## Fund & ETF Disclosures by Date API

### Description
Retrieve detailed disclosures for mutual funds and ETFs based on filing dates.

### Method
GET

### Endpoint
`/stable/funds/disclosure-dates`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The fund or ETF symbol (e.g., VWO).

### Request Example
```

https://financialmodelingprep.com/stable/funds/disclosure-dates?symbol=VWO

```

```

---

### Available Countries API

Source: https://site.financialmodelingprep.com/developer/docs

Access a comprehensive list of countries where stock symbols are available with the FMP Available Countries API. This API enables users to filter and analyze stock symbols based on the country of origin or the primary market where the securities are traded.

````APIDOC
## GET /stable/available-countries

### Description
Retrieves a comprehensive list of countries where stock symbols are available.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/available-countries

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **country** (string) - The name of the country.

#### Response Example
```json
[
  {
    "country": "United States"
  },
  {
    "country": "Canada"
  }
]
````

````

--------------------------------

### CIK List API

Source: https://site.financialmodelingprep.com/developer/docs

Access a comprehensive database of CIK (Central Index Key) numbers for SEC-registered entities with the FMP CIK List API. This endpoint is essential for businesses, financial professionals, and individuals who need quick access to CIK numbers for regulatory compliance, financial transactions, and investment research.

```APIDOC
## GET /stable/cik-list

### Description
Retrieves a database of CIK (Central Index Key) numbers for SEC-registered entities.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/cik-list

### Parameters
#### Path Parameters
None

#### Query Parameters
- **page** (integer) - Optional. The page number for pagination. Defaults to 0.
- **limit** (integer) - Optional. The number of results per page. Defaults to 1000.

#### Request Body
None

### Request Example
````

https://financialmodelingprep.com/stable/cik-list?page=0&limit=1000

````

### Response
#### Success Response (200)
- **cik** (string) - The Central Index Key number.
- **companyName** (string) - The name of the company.

#### Response Example
```json
[
  {
    "cik": "0000320193",
    "companyName": "Apple Inc."
  }
]
````

````

--------------------------------

### As Reported Financial Statements API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement

Retrieve comprehensive financial statements as reported by companies, including income, balance sheet, and cash flow statements.

```APIDOC
## GET /api/financial-statements

### Description
Fetches as-reported financial statements (income statement, balance sheet, cash flow) for a given company.

### Method
GET

### Endpoint
/api/financial-statements

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **period** (string) - Optional - The period for the statements (e.g., 'annual', 'quarter'). Defaults to 'annual'.

### Request Example
````

GET /api/financial-statements?symbol=MSFT&period=quarter

````

### Response
#### Success Response (200)
- **incomeStatement** (array) - Array of income statement objects.
- **balanceSheet** (array) - Array of balance sheet objects.
- **cashflowStatement** (array) - Array of cash flow statement objects.

#### Response Example
```json
{
  "incomeStatement": [
    {
      "date": "2023-09-30",
      "revenue": 57000000000,
      "costOfRevenue": 20000000000,
      "grossProfit": 37000000000
    }
  ],
  "balanceSheet": [
    {
      "date": "2023-09-30",
      "totalAssets": 400000000000,
      "totalLiabilities": 200000000000,
      "totalEquity": 200000000000
    }
  ],
  "cashflowStatement": [
    {
      "date": "2023-09-30",
      "operatingCashFlow": 60000000000,
      "investingCashFlow": -10000000000,
      "financingCashFlow": -5000000000
    }
  ]
}
````

````

--------------------------------

### Retrieve Dividend Adjusted Historical Stock Prices

Source: https://site.financialmodelingprep.com/developer/docs

Retrieves end-of-day price and volume data adjusted for dividend payouts. This provides a more accurate representation of long-term stock performance.

```json
[ { "symbol": "AAPL", "date": "2025-02-04", "adjOpen": 227.2, "adjHigh": 233.13, "adjLow": 226.65, "adjClose": 232.8, "volume": 44489128 } ]
````

---

### Actively Trading List API

Source: https://site.financialmodelingprep.com/developer/docs

List all actively trading companies and financial instruments with the FMP Actively Trading List API. This endpoint allows users to filter and display securities that are currently being traded on public exchanges, ensuring you access real-time market activity.

````APIDOC
## GET /stable/actively-trading-list

### Description
Retrieves a list of all companies and financial instruments that are currently actively trading on public exchanges.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/actively-trading-list

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **exchange** (string) - The exchange the stock is traded on.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "exchange": "NASDAQ"
  }
]
````

````

--------------------------------

### Financial Statement Symbols List API

Source: https://site.financialmodelingprep.com/developer/docs

Access a comprehensive list of companies with available financial statements through the FMP Financial Statement Symbols List API. Find companies listed on major global exchanges and obtain up-to-date financial data including income statements, balance sheets, and cash flow statements.

```APIDOC
## GET /stable/financial-statement-symbol-list

### Description
Retrieves a list of companies with available financial statements, including income statements, balance sheets, and cash flow statements.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/financial-statement-symbol-list

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **name** (string) - The company name.
- **financials** (boolean) - Indicates if financial statements are available.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "name": "Apple Inc.",
    "financials": true
  }
]
````

````

--------------------------------

### Acquisition Ownership API

Source: https://site.financialmodelingprep.com/developer/docs/stable/acquisition-ownership

Retrieve data on changes in stock ownership during acquisitions, mergers, or other significant corporate events. This endpoint provides details on beneficial ownership, acquisition data, reporting entities, and SEC filing information.

```APIDOC
## GET /stable/acquisition-of-beneficial-ownership

### Description
Retrieve data on changes in stock ownership during acquisitions, mergers, or other significant corporate events. This endpoint provides details on beneficial ownership, acquisition data, reporting entities, and SEC filing information.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/acquisition-of-beneficial-ownership

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol for which to retrieve acquisition ownership data.
- **limit** (number) - Optional - The maximum number of records to return.

### Request Example
```json
{
  "symbol": "AAPL",
  "limit": 2000
}
````

### Response

#### Success Response (200)

- **cik** (string) - Central Index Key of the reporting entity.
- **symbol** (string) - The stock symbol.
- **filingDate** (string) - The date the filing was made.
- **acceptedDate** (string) - The date the filing was accepted.
- **cusip** (string) - The CUSIP number of the security.
- **nameOfReportingPerson** (string) - The name of the reporting person or entity.
- **citizenshipOrPlaceOfOrganization** (string) - The citizenship or place of organization of the reporting person.
- **soleVotingPower** (string) - The number of shares with sole voting power.
- **sharedVotingPower** (string) - The number of shares with shared voting power.
- **soleDispositivePower** (string) - The number of shares with sole dispositive power.
- **sharedDispositivePower** (string) - The number of shares with shared dispositive power.
- **amountBeneficiallyOwned** (string) - The total amount of shares beneficially owned.
- **percentOfClass** (string) - The percentage of class beneficially owned.
- **typeOfReportingPerson** (string) - The type of reporting person (e.g., IC, EP, IN, CO).
- **url** (string) - A URL to the official SEC filing.

#### Response Example

```json
[
  {
    "cik": "0000320193",
    "symbol": "AAPL",
    "filingDate": "2024-02-14",
    "acceptedDate": "2024-02-14",
    "cusip": "037833100",
    "nameOfReportingPerson": "National Indemnity Company",
    "citizenshipOrPlaceOfOrganization": "State of Nebraska",
    "soleVotingPower": "0",
    "sharedVotingPower": "755059877",
    "soleDispositivePower": "0",
    "sharedDispositivePower": "755059877",
    "amountBeneficiallyOwned": "755059877",
    "percentOfClass": "4.8",
    "typeOfReportingPerson": "IC, EP, IN, CO",
    "url": "https://www.sec.gov/Archives/edgar/data/320193/000119312524036431/d751537dsc13ga.htm"
  }
]
```

````

--------------------------------

### Mutual Fund Price Quotes API

Source: https://site.financialmodelingprep.com/developer/docs

Access real-time quotes for mutual funds with the FMP Mutual Fund Price Quotes API. Track current prices, performance changes, and key data for various mutual funds.

```APIDOC
## GET /stable/batch-mutualfund-quotes

### Description
Retrieve real-time price quotes for multiple mutual funds.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-mutualfund-quotes

### Parameters
#### Query Parameters
- **symbols** (string) - Optional - A comma-separated list of mutual fund symbols.

### Request Example
````

https://financialmodelingprep.com/stable/batch-mutualfund-quotes?symbols=VTSAX,SWPPX

````

### Response
#### Success Response (200)
- **symbol** (string) - The mutual fund symbol.
- **price** (number) - The current price.
- **change** (number) - The price change.

#### Response Example
```json
[
  {
    "symbol": "VTSAX",
    "price": 100.50,
    "change": 0.75
  },
  {
    "symbol": "SWPPX",
    "price": 50.25,
    "change": 0.30
  }
]
````

````

--------------------------------

### Technical Indicators API

Source: https://site.financialmodelingprep.com/developer/docs

Access various technical indicators for financial analysis, including Simple Moving Average (SMA), Exponential Moving Average (EMA), Relative Strength Index (RSI), and more. These endpoints allow you to retrieve historical indicator data for specified symbols and timeframes.

```APIDOC
## Simple Moving Average (SMA) API

### Description
Retrieves Simple Moving Average data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/sma`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the SMA calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
````

https://financialmodelingprep.com/stable/technical-indicators/sma?symbol=AAPL&periodLength=10&timeframe=1day

```

## Exponential Moving Average (EMA) API

### Description
Retrieves Exponential Moving Average data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/ema`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the EMA calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/ema?symbol=AAPL&periodLength=10&timeframe=1day

```

## Weighted Moving Average (WMA) API

### Description
Retrieves Weighted Moving Average data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/wma`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the WMA calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/wma?symbol=AAPL&periodLength=10&timeframe=1day

```

## Double Exponential Moving Average (DEMA) API

### Description
Retrieves Double Exponential Moving Average data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/dema`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the DEMA calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/dema?symbol=AAPL&periodLength=10&timeframe=1day

```

## Triple Exponential Moving Average (TEMA) API

### Description
Retrieves Triple Exponential Moving Average data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/tema`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the TEMA calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/tema?symbol=AAPL&periodLength=10&timeframe=1day

```

## Relative Strength Index (RSI) API

### Description
Retrieves Relative Strength Index data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/rsi`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the RSI calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/rsi?symbol=AAPL&periodLength=10&timeframe=1day

```

## Standard Deviation API

### Description
Retrieves Standard Deviation data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/standarddeviation`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the standard deviation calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/standarddeviation?symbol=AAPL&periodLength=10&timeframe=1day

```

## Williams API

### Description
Retrieves Williams %R data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/williams`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the Williams %R calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/williams?symbol=AAPL&periodLength=10&timeframe=1day

```

## Average Directional Index (ADX) API

### Description
Retrieves Average Directional Index data for a given stock symbol.

### Method
GET

### Endpoint
`/stable/technical-indicators/adx`

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol (e.g., AAPL).
- **periodLength** (integer) - Required - The period length for the ADX calculation.
- **timeframe** (string) - Required - The timeframe for the data (e.g., '1day', '1hour').

### Request Example
```

https://financialmodelingprep.com/stable/technical-indicators/adx?symbol=AAPL&periodLength=10&timeframe=1day

```

```

---

### Company Search API Endpoints

Source: https://site.financialmodelingprep.com/developer/docs

APIs for searching company information by various identifiers.

```APIDOC
## Company Search API

### Stock Symbol Search API

Easily find the ticker symbol of any stock with the FMP Stock Symbol Search API. Search by symbol across multiple global markets.

#### Method
GET

#### Endpoint
`https://financialmodelingprep.com/stable/search-symbol`

#### Query Parameters
- **query** (string) - Required - The stock symbol or name to search for.
- **apikey** (string) - Required - Your API key.

### Company Name Search API

Search for ticker symbols, company names, and exchange details for equity securities and ETFs listed on various exchanges with the FMP Name Search API. This endpoint is useful for retrieving ticker symbols when you know the full or partial company or asset name but not the symbol identifier.

#### Method
GET

#### Endpoint
`https://financialmodelingprep.com/stable/search-name`

#### Query Parameters
- **query** (string) - Required - The company name or asset name to search for.
- **apikey** (string) - Required - Your API key.

### CIK API

Easily retrieve the Central Index Key (CIK) for publicly traded companies with the FMP CIK API. Access unique identifiers needed for SEC filings and regulatory documents for a streamlined compliance and financial analysis process.

#### Method
GET

#### Endpoint
`https://financialmodelingprep.com/stable/search-cik`

#### Query Parameters
- **cik** (string) - Required - The CIK number to search for.
- **apikey** (string) - Required - Your API key.

### CUSIP API

Easily search and retrieve financial securities information by CUSIP number using the FMP CUSIP API. Find key details such as company name, stock symbol, and market capitalization associated with the CUSIP.

#### Method
GET

#### Endpoint
`https://financialmodelingprep.com/stable/search-cusip`

#### Query Parameters
- **cusip** (string) - Required - The CUSIP number to search for.
- **apikey** (string) - Required - Your API key.

### ISIN API

Easily search and retrieve the International Securities Identification Number (ISIN) for financial securities using the FMP ISIN API. Find key details such as company name, stock symbol, and market capitalization associated with the ISIN.

#### Method
GET

#### Endpoint
`https://financialmodelingprep.com/stable/search-isin`

#### Query Parameters
- **isin** (string) - Required - The ISIN to search for.
- **apikey** (string) - Required - Your API key.

### Stock Screener API

Discover stocks that align with your investment strategy using the FMP Stock Screener API. Filter stocks based on market cap, price, volume, beta, sector, country, and more to identify the best opportunities.

#### Method
GET

#### Endpoint
`https://financialmodelingprep.com/stable/company-screener`

#### Query Parameters
- **apikey** (string) - Required - Your API key.
- [Other screener parameters like marketCap, beta, sector, etc. - refer to full documentation for details]

### Exchange Variants API

Search across multiple public exchanges to find where a given stock symbol is listed using the FMP Exchange Variants API. This allows users to quickly identify all the exchanges where a security is actively traded.

#### Method
GET

#### Endpoint
`https://financialmodelingprep.com/stable/search-exchange-variants`

#### Query Parameters
- **symbol** (string) - Required - The stock symbol to search for.
- **apikey** (string) - Required - Your API key.
```

---

### Access Balance Sheet Statement Growth API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement-growth

This snippet demonstrates the endpoint structure and the expected JSON response format for retrieving balance sheet growth data for a specific ticker symbol.

```http
GET https://financialmodelingprep.com/stable/balance-sheet-statement-growth?symbol=AAPL
```

```json
[
  {
    "symbol": "AAPL",
    "date": "2024-09-28",
    "fiscalYear": "2024",
    "period": "FY",
    "growthTotalAssets": 0.035160515396374756,
    "growthTotalLiabilities": 0.060574238130816666,
    "growthTotalEquity": -0.0836095645737457
  }
]
```

---

### Retrieve Historical Stock Data JSON Response

Source: https://site.financialmodelingprep.com/developer/docs

This snippet represents the JSON structure returned by the historical stock data endpoint. It includes fields such as symbol, date, open, low, high, close, adjusted close, and volume.

```json
[
  {
    "symbol": "EGS745W1C011.CA",
    "date": "2024-10-22",
    "open": "2.67",
    "low": "2.7",
    "high": "2.9",
    "close": "2.93",
    "adjClose": "2.93",
    "volume": "920904"
  }
]
```

---

### Financial Reports Form 10-K JSON API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement

Access comprehensive annual reports (Form 10-K) with the FMP Annual Reports on Form 10-K API. Obtain detailed information about a company’s financial performance and business operations.

```APIDOC
## GET /api/form10k

### Description
Retrieves the full text of a company's annual report (Form 10-K) in JSON format.

### Method
GET

### Endpoint
/api/form10k

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **year** (integer) - Required - The year of the 10-K filing.

### Request Example
```

GET /api/form10k?symbol=AAPL&year=2023

````

### Response
#### Success Response (200)
- **form10k** (object) - The content of the Form 10-K filing.
  - **filingDate** (string) - The date the filing was submitted.
  - **reportDate** (string) - The end date of the reporting period.
  - **accessionNumber** (string) - The accession number of the filing.
  - **cik** (string) - The CIK number of the company.
  - **companyName** (string) - The name of the company.
  - **form** (string) - The form type (e.g., '10-K').
  - **period** (string) - The reporting period.
  - **items** (object) - An object containing various items from the 10-K report (e.g., Item 1, Item 7).

#### Response Example
```json
{
  "form10k": {
    "filingDate": "2023-02-03",
    "reportDate": "2022-12-31",
    "accessionNumber": "0000320193-23-000008",
    "cik": "0000320193",
    "companyName": "Apple Inc.",
    "form": "10-K",
    "period": "2022",
    "items": {
      "item1": "Business",
      "item7": "Management's Discussion and Analysis of Financial Condition and Results of Operations"
    }
  }
}
````

````

--------------------------------

### FMP Function for Financial Data

Source: https://site.financialmodelingprep.com/developer/docs/excel-add-on

Retrieves financial data, key metrics, revenue segments, and analyst estimates. Supports single or multiple tickers, parameters, and periods. Optional parameters include quarter and divisor for data unit conversion.

```Excel Formula
=FMP("ticker/s", "parameter/s", "period/s", ["quarter"], [divisor])
````

```Excel Formula
=FMP("AAPL","ROE","TTM")
```

```Excel Formula
=FMP("TSLA", "Revenue", "LY",,1000000)
```

```Excel Formula
=FMP("AAPL","Free Cash Flow",2019,"Q3")
```

```Excel Formula
=FMP(A1:A10, B1:B10, C1:C10)
```

---

### As Reported Financial Statements API

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-financial-statements

Retrieve original, unadjusted financial statements including income, balance sheet, and cash flow statements directly from company filings. This API is ideal for detailed financial audits, investment analysis, historical data tracking, and compliance and reporting.

````APIDOC
## GET /api/financial-statement-full-as-reported

### Description
Retrieves comprehensive financial statements as reported by companies, including income, balance sheet, and cash flow statements in their original form for detailed analysis.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/financial-statement-full-as-reported

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol of the company (e.g., AAPL).
- **limit** (number) - Optional - Limits the number of records returned. Maximum 1000 records per request.
- **period** (string) - Optional - Specifies the period for the financial statements. Accepted values: "annual", "quarter".

### Request Example
```json
{
  "example": "https://financialmodelingprep.com/stable/financial-statement-full-as-reported?symbol=AAPL&period=annual&limit=5"
}
````

### Response

#### Success Response (200)

- **symbol** (string) - The stock ticker symbol.
- **date** (string) - The date of the financial statement.
- **reportedCurrency** (string) - The currency in which the financials are reported.
- **cik** (string) - The CIK (Central Index Key) of the company.
- **fillingDate** (string) - The date the financial statement was filed.
- **acceptedDate** (string) - The date the filing was accepted.
- **link** (string) - A link to the original filing.
- **finalLink** (string) - A link to the final version of the filing.
- **incomeStatement** (object) - Contains details of the income statement.
- **balanceSheetStatement** (object) - Contains details of the balance sheet statement.
- **cashFlowStatement** (object) - Contains details of the cash flow statement.

#### Response Example

```json
{
  "example": {
    "symbol": "AAPL",
    "date": "2023-09-30",
    "reportedCurrency": "USD",
    "cik": "0000320193",
    "fillingDate": "2023-11-03",
    "acceptedDate": "2023-11-02T21:59:59.000Z",
    "link": "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/aapl-20230930.htm",
    "finalLink": "https://www.sec.gov/Archives/edgar/data/320193/000032019323000106/aapl-20230930.xsd",
    "incomeStatement": {
      "Revenue": 383285000000,
      "Cost of Revenue": 214149000000,
      "Gross Profit": 169136000000,
      "Research and Development Expenses": 29990000000,
      "General and Administrative Expenses": 25083000000,
      "Selling and Marketing Expenses": 27027000000,
      "Other Expenses": 0,
      "Operating Expenses": 82100000000,
      "Operating Income": 87036000000,
      "Interest Expense": 4460000000,
      "Depreciation and Amortization": 11500000000,
      "EBITDA": 112578000000,
      "EBIT": 75536000000,
      "Earnings Before Tax": 76345000000,
      "Income Tax Expense": 15300000000,
      "Net Income for Current Year": 61072000000,
      "Net Income": 61072000000
    },
    "balanceSheetStatement": {
      "Cash and cash equivalents": 61579000000,
      "Short-term investments": 121579000000,
      "Receivables": 27071000000,
      "Inventories": 6128000000,
      "Property, Plant and Equipment Net": 37759000000,
      "Goodwill": 0,
      "Intangible Assets": 0,
      "Accounts Payable": 70433000000,
      "Accrued Liabilities": 71312000000,
      "Short-term debt": 10950000000,
      "Deferred Revenue": 8577000000,
      "Other Current Liabilities": 0,
      "Total Current Liabilities": 142745000000,
      "Long-term debt": 97596000000,
      "Other Non-Current Liabilities": 48755000000,
      "Total Non-Current Liabilities": 146351000000,
      "Total Liabilities": 289096000000,
      "Common Stock": 55000000000,
      "Retained Earnings": 57095000000,
      "Accumulated Other Comprehensive Income": -1172000000,
      "Total Equity": 143746000000,
      "Total Liabilities and Equity": 432842000000
    },
    "cashFlowStatement": {
      "Net Income": 61072000000,
      "Depreciation & Amortization": 11500000000,
      "Stock-based compensation": 15000000000,
      "Changes in working capital": -11000000000,
      "Accounts receivable": -1000000000,
      "Inventory": -2000000000,
      "Accounts payable": 1000000000,
      "Other working capital": -9000000000,
      "Cash from operations": 110525000000,
      "Capital expenditures": -11000000000,
      "Investments in securities": -25000000000,
      "Other investing activities": 0,
      "Cash from investing": -36000000000,
      "Dividends paid": -14500000000,
      "Issuance of debt": 10000000000,
      "Repayment of debt": -5000000000,
      "Issuance of stock": 5000000000,
      "Share purchases": -2000000000,
      "Other financing activities": 0,
      "Cash from financing": -4500000000,
      "Effect of foreign exchange rate changes": -1000000000,
      "Net cash flow change": 68525000000,
      "Cash at end of period": 61579000000,
      "Cash at beginning of period": -6946000000
    }
  }
}
```

````

--------------------------------

### Exchange Stock Quotes API

Source: https://site.financialmodelingprep.com/developer/docs

Retrieve real-time stock quotes for all listed stocks on a specific exchange with the FMP Exchange Stock Quotes API. Track price changes and trading activity across the entire exchange.

```APIDOC
## GET /stable/batch-exchange-quote

### Description
Retrieve real-time stock quotes for all listed stocks on a specific exchange.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/batch-exchange-quote

### Parameters
#### Query Parameters
- **exchange** (string) - Required - The stock exchange to retrieve quotes for (e.g., NASDAQ, NYSE).

### Request Example
````

https://financialmodelingprep.com/stable/batch-exchange-quote?exchange=NASDAQ

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **price** (number) - The current stock price.
- **volume** (integer) - The trading volume.
- **change** (number) - The price change.

#### Response Example
```json
[
  {
    "symbol": "AAPL",
    "price": 170.50,
    "volume": 50000000,
    "change": 1.25
  },
  {
    "symbol": "MSFT",
    "price": 330.00,
    "volume": 30000000,
    "change": 1.50
  }
]
````

````

--------------------------------

### Income Statement API

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-financial-statements

Access detailed income statement data for publicly traded companies. Track profitability, compare competitors, and identify business trends with up-to-date financial data.

```APIDOC
## GET /api/v3/income-statement

### Description
Retrieves the income statement for a given company.

### Method
GET

### Endpoint
/api/v3/income-statement

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **date** (string) - Optional - The specific date for the income statement (YYYY-MM-DD).
- **period** (string) - Optional - The period for the income statement (e.g., 'quarter', 'annual').

### Request Example
```json
{
  "example": "/api/v3/income-statement?symbol=AAPL&period=annual"
}
````

### Response

#### Success Response (200)

- **date** (string) - The date of the income statement.
- **symbol** (string) - The stock symbol.
- **reportedCurrency** (string) - The currency in which the financials were reported.
- **revenue** (number) - Total revenue.
- **costOfRevenue** (number) - Cost of revenue.
- **grossProfit** (number) - Gross profit.
- **grossProfitRatio** (number) - Gross profit ratio.
- **researchAndDevelopmentExpenses** (number) - Research and development expenses.
- **generalAndAdministrativeExpenses** (number) - General and administrative expenses.
- **sellingAndMarketingExpenses** (number) - Selling and marketing expenses.
- **otherExpenses** (number) - Other expenses.
- **totalOtherExpenses** (number) - Total other expenses.
- **operatingExpenses** (number) - Total operating expenses.
- **operatingIncome** (number) - Operating income.
- **earningsBeforeInterestAndTaxes** (number) - Earnings before interest and taxes (EBIT).
- **interestExpense** (number) - Interest expense.
- **depreciationAndAmortization** (number) - Depreciation and amortization.
- **ebitda** (number) - Earnings before interest, taxes, depreciation, and amortization (EBITDA).
- **ebitdaratio** (number) - EBITDA ratio.
- **incomeBeforeTax** (number) - Income before tax.
- **incomeTaxExpense** (number) - Income tax expense.
- **netIncome** (number) - Net income.
- **eps** (number) - Earnings per share (basic).
- **epsdiluted** (number) - Earnings per share (diluted).
- **weightedAverageShsOut** (number) - Weighted average shares outstanding (basic).
- **weightedAverageShsOutDil** (number) - Weighted average shares outstanding (diluted).

#### Response Example

```json
{
  "example": "[{\"date\": \"2023-09-30\", \"symbol\": \"AAPL\", \"reportedCurrency\": \"USD\", \"revenue\": 383286000000, \"costOfRevenue\": 214142000000, \"grossProfit\": 169144000000, \"grossProfitRatio\": 0.4413, \"researchAndDevelopmentExpenses\": 29957000000, \"generalAndAdministrativeExpenses\": 0, \"sellingAndMarketingExpenses\": 0, \"otherExpenses\": 0, \"totalOtherExpenses\": 0, \"operatingExpenses\": 100000000000, \"operatingIncome\": 69144000000, \"earningsBeforeInterestAndTaxes\": 70000000000, \"interestExpense\": 3500000000, \"depreciationAndAmortization\": 11000000000, \"ebitda\": 80000000000, \"ebitdaratio\": 0.2087, \"incomeBeforeTax\": 66500000000, \"incomeTaxExpense\": 14700000000, \"netIncome\": 51700000000, \"eps\": 5.70, \"epsdiluted\": 5.60, \"weightedAverageShsOut\": 17000000000, \"weightedAverageShsOutDil\": 17000000000}]"
}
```

````

--------------------------------

### As Reported Cash Flow Statements API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement

View cash flow statements as reported by the company. Analyze a company's cash flows related to operations, investments, and financing.

```APIDOC
## GET /api/cash-flow-statement

### Description
Retrieves the as-reported cash flow statement for a specified company and period.

### Method
GET

### Endpoint
/api/cash-flow-statement

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **period** (string) - Optional - The period for the statement (e.g., 'annual', 'quarter'). Defaults to 'annual'.

### Request Example
````

GET /api/cash-flow-statement?symbol=GOOGL&period=annual

````

### Response
#### Success Response (200)
- **cashflowStatement** (array) - An array of cash flow statement objects.
  - **date** (string) - The date of the statement.
  - **operatingCashFlow** (number) - Cash flow from operations.
  - **investingCashFlow** (number) - Cash flow from investing activities.
  - **financingCashFlow** (number) - Cash flow from financing activities.
  - **cashFlowFromContinuingOperations** (number) - Cash flow from continuing operations.
  - **propertyPlantEquipmentNet** (number) - Net changes in property, plant, and equipment.
  - **acquisitionsNet** (number) - Net cash used for acquisitions.
  - **stockBasedCompensation** (number) - Stock-based compensation expense.
  - **depreciationAndAmortization** (number) - Depreciation and amortization expenses.
  - **accountsReceivable** (number) - Changes in accounts receivable.
  - **cash** (number) - Net change in cash.
  - **changeInWorkingCapital** (number) - Change in working capital.
  - **netIncome** (number) - Net income for the period.

#### Response Example
```json
{
  "cashflowStatement": [
    {
      "date": "2023-12-31",
      "operatingCashFlow": 75000000000,
      "investingCashFlow": -15000000000,
      "financingCashFlow": -10000000000,
      "cashFlowFromContinuingOperations": 70000000000,
      "propertyPlantEquipmentNet": -8000000000,
      "acquisitionsNet": -5000000000,
      "stockBasedCompensation": 4000000000,
      "depreciationAndAmortization": 6000000000,
      "accountsReceivable": 2000000000,
      "cash": 50000000000,
      "changeInWorkingCapital": 3000000000,
      "netIncome": 65000000000
    }
  ]
}
````

````

--------------------------------

### Balance Sheet Statement API

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-financial-statements

Retrieve detailed balance sheet statements for publicly traded companies. Analyze assets, liabilities, and shareholder equity to gain insights into a company's financial position.

```APIDOC
## GET /api/v3/balance-sheet

### Description
Retrieves the balance sheet statement for a given company.

### Method
GET

### Endpoint
/api/v3/balance-sheet

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **date** (string) - Optional - The specific date for the balance sheet (YYYY-MM-DD).
- **period** (string) - Optional - The period for the balance sheet (e.g., 'quarter', 'annual').

### Request Example
```json
{
  "example": "/api/v3/balance-sheet?symbol=AAPL&period=quarter"
}
````

### Response

#### Success Response (200)

- **date** (string) - The date of the balance sheet.
- **symbol** (string) - The stock symbol.
- **reportedCurrency** (string) - The currency in which the financials were reported.
- **totalAssets** (number) - Total assets of the company.
- **totalLiabilities** (number) - Total liabilities of the company.
- **totalEquity** (number) - Total equity of the company.
- **currentAssets** (number) - Current assets.
- **currentLiabilities** (number) - Current liabilities.
- **longTermDebt** (number) - Long-term debt.
- **cashAndCashEquivalents** (number) - Cash and cash equivalents.
- **propertyPlantEquipmentNet** (number) - Net property, plant, and equipment.
- **accountsReceivable** (number) - Accounts receivable.
- **inventory** (number) - Inventory.
- **goodwill** (number) - Goodwill.
- **intangibleAssets** (number) - Intangible assets.
- **otherAssets** (number) - Other assets.
- **otherCurrentAssets** (number) - Other current assets.
- **accountsPayable** (number) - Accounts payable.
- **deferredRevenue** (number) - Deferred revenue.
- **otherLiabilities** (number) - Other liabilities.
- **otherNonCurrentAssets** (number) - Other non-current assets.
- **nonCurrentAssets** (number) - Non-current assets.
- **nonCurrentLiabilities** (number) - Non-current liabilities.
- **capitalStock** (number) - Capital stock.
- **retainedEarnings** (number) - Retained earnings.
- **accumulatedOtherComprehensiveIncome** (number) - Accumulated other comprehensive income.
- ** कमी** (number) - कमी

#### Response Example

```json
{
  "example": "{\"date\": \"2023-09-30\", \"symbol\": \"AAPL\", \"reportedCurrency\": \"USD\", \"totalAssets\": 352755000000, \"totalLiabilities\": 290435000000, \"totalEquity\": 62320000000, \"currentAssets\": 143649000000, \"currentLiabilities\": 145440000000, \"longTermDebt\": 108409000000, \"cashAndCashEquivalents\": 61600000000, \"propertyPlantEquipmentNet\": 41317000000, \"accountsReceivable\": 28555000000, \"inventory\": 6517000000, \"goodwill\": 0, \"intangibleAssets\": 0, \"otherAssets\": 52814000000, \"otherCurrentAssets\": 0, \"accountsPayable\": 53779000000, \"deferredRevenue\": 12636000000, \"otherLiabilities\": 55274000000, \"otherNonCurrentAssets\": 0, \"nonCurrentAssets\": 209106000000, \"nonCurrentLiabilities\": 181995000000, \"capitalStock\": 57700000000, \"retainedEarnings\": 5047000000, \"accumulatedOtherComprehensiveIncome\": -517000000}"
}
```

````

--------------------------------

### Cash Flow Statement API

Source: https://site.financialmodelingprep.com/developer/docs/stable/as-reported-financial-statements

Access cash flow statements for companies, detailing cash generated and used in operating, investing, and financing activities.

```APIDOC
## GET /api/v3/cash-flow

### Description
Retrieves the cash flow statement for a given company.

### Method
GET

### Endpoint
/api/v3/cash-flow

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **date** (string) - Optional - The specific date for the cash flow statement (YYYY-MM-DD).
- **period** (string) - Optional - The period for the cash flow statement (e.g., 'quarter', 'annual').

### Request Example
```json
{
  "example": "/api/v3/cash-flow?symbol=AAPL&period=annual"
}
````

### Response

#### Success Response (200)

- **date** (string) - The date of the cash flow statement.
- **symbol** (string) - The stock symbol.
- **reportedCurrency** (string) - The currency in which the financials were reported.
- **operatingCashFlow** (number) - Cash flow from operations.
- **totalCashFromFinancingActivities** (number) - Total cash from financing activities.
- **totalCashFromInvestingActivities** (number) - Total cash from investing activities.
- **changeInCash** (number) - Change in cash.
- **depreciationAndAmortization** (number) - Depreciation and amortization.
- **capitalExpenditure** (number) - Capital expenditures.
- **cashAtEndOfPeriod** (number) - Cash at the end of the period.
- **cashAtBeginningOfPeriod** (number) - Cash at the beginning of the period.
- **accountsReceivable** (number) - Change in accounts receivable.
- **accountsPayable** (number) - Change in accounts payable.
- **inventory** (number) - Change in inventory.
- **netIncome** (number) - Net income.

#### Response Example

```json
{
  "example": "[{\"date\": \"2023-09-30\", \"symbol\": \"AAPL\", \"reportedCurrency\": \"USD\", \"operatingCashFlow\": 110547000000, \"totalCashFromFinancingActivities\": -10549000000, \"totalCashFromInvestingActivities\": -21170000000, \"changeInCash\": 77570000000, \"depreciationAndAmortization\": 11000000000, \"capitalExpenditure\": -11000000000, \"cashAtEndOfPeriod\": 61600000000, \"cashAtBeginningOfPeriod\": 25500000000, \"accountsReceivable\": 1000000000, \"accountsPayable\": 5000000000, \"inventory\": -2000000000, \"netIncome\": 51700000000}]"
}
```

````

--------------------------------

### Symbol Changes List API

Source: https://site.financialmodelingprep.com/developer/docs

Stay informed about the latest stock symbol changes with the FMP Stock Symbol Changes API. Track changes due to mergers, acquisitions, stock splits, and name changes to ensure accurate trading and analysis.

```APIDOC
## GET /stable/symbol-change

### Description
Retrieves a list of recent stock symbol changes, including those due to mergers, acquisitions, stock splits, and name changes.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/symbol-change

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The original stock symbol.
- **name** (string) - The company name.
- **change** (string) - The type of change (e.g., 'Stock Split', 'Merger').
- **toSymbol** (string) - The new stock symbol, if applicable.
- **fromSymbol** (string) - The old stock symbol, if applicable.
- **date** (string) - The date of the change.

#### Response Example
```json
[
  {
    "symbol": "XYZ",
    "name": "Example Corp.",
    "change": "Stock Split",
    "toSymbol": null,
    "fromSymbol": null,
    "date": "2023-10-27"
  }
]
````

````

--------------------------------

### Cash Flow Statement Growth API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statement

Measure the growth rate of a company’s cash flow with the FMP Cashflow Statement Growth API. Determine how quickly a company’s cash flow is increasing or decreasing over time.

```APIDOC
## GET /api/cash-flow-statement-growth

### Description
Calculates and returns the growth rates for various components of a company's cash flow statement.

### Method
GET

### Endpoint
/api/cash-flow-statement-growth

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock symbol of the company.
- **period** (string) - Optional - The period for the growth calculation (e.g., 'annual', 'quarter'). Defaults to 'annual'.

### Request Example
````

GET /api/cash-flow-statement-growth?symbol=AMZN&period=annual

````

### Response
#### Success Response (200)
- **growthRates** (object) - An object containing cash flow growth rates.
  - **operatingCashFlowGrowth** (number) - Year-over-year growth rate of operating cash flow.
  - **investingCashFlowGrowth** (number) - Year-over-year growth rate of investing cash flow.
  - **financingCashFlowGrowth** (number) - Year-over-year growth rate of financing cash flow.
  - **freeCashFlowGrowth** (number) - Year-over-year growth rate of free cash flow.

#### Response Example
```json
{
  "growthRates": {
    "operatingCashFlowGrowth": 0.15,
    "investingCashFlowGrowth": -0.05,
    "financingCashFlowGrowth": 0.10,
    "freeCashFlowGrowth": 0.12
  }
}
````

````

--------------------------------

### Retrieve TTM Balance Sheet Data via REST API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statements-ttm

This snippet demonstrates the JSON response structure returned by the Balance Sheet Statements TTM API. It provides a comprehensive breakdown of assets, liabilities, and equity for a specified stock symbol.

```json
[
  {
    "date": "2024-12-28",
    "symbol": "AAPL",
    "reportedCurrency": "USD",
    "cik": "0000320193",
    "filingDate": "2025-01-31",
    "acceptedDate": "2025-01-31 06:01:27",
    "fiscalYear": "2025",
    "period": "Q1",
    "cashAndCashEquivalents": 30299000000,
    "shortTermInvestments": 23476000000,
    "totalCurrentAssets": 133240000000,
    "totalAssets": 344085000000,
    "totalLiabilities": 277327000000,
    "totalStockholdersEquity": 66758000000,
    "totalDebt": 96799000000,
    "netDebt": 66500000000
  }
]
````

---

### ETF Symbol Search API

Source: https://site.financialmodelingprep.com/developer/docs

Quickly find ticker symbols and company names for Exchange Traded Funds (ETFs) using the FMP ETF Symbol Search API. This tool simplifies identifying specific ETFs by their name or ticker.

````APIDOC
## GET /stable/etf-list

### Description
Retrieves a list of ticker symbols and company names for Exchange Traded Funds (ETFs).

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/etf-list

### Parameters
#### Path Parameters
None

#### Query Parameters
None

#### Request Body
None

### Request Example
None

### Response
#### Success Response (200)
- **symbol** (string) - The ETF ticker symbol.
- **name** (string) - The name of the ETF.

#### Response Example
```json
[
  {
    "symbol": "SPY",
    "name": "SPDR S&P 500 ETF Trust"
  }
]
````

````

--------------------------------

### Balance Sheet Statements TTM API

Source: https://site.financialmodelingprep.com/developer/docs/stable/balance-sheet-statements-ttm

Retrieves the trailing twelve months (TTM) balance sheet statements for a given company symbol. This endpoint is useful for analyzing a company's financial position over the most recent four quarters.

```APIDOC
## GET /balance-sheet-statement-ttm

### Description
Retrieves the trailing twelve months (TTM) balance sheet statements for a given company symbol. This endpoint is useful for analyzing a company's financial position over the most recent four quarters.

### Method
GET

### Endpoint
https://financialmodelingprep.com/stable/balance-sheet-statement-ttm

### Parameters
#### Query Parameters
- **symbol** (string) - Required - The stock ticker symbol of the company (e.g., AAPL).
- **limit** (number) - Optional - The maximum number of records to return. Defaults to 1000.

### Request Example
```json
{
  "example": "https://financialmodelingprep.com/stable/balance-sheet-statement-ttm?symbol=AAPL&limit=5"
}
````

### Response

#### Success Response (200)

- **date** (string) - The date of the balance sheet statement.
- **symbol** (string) - The stock ticker symbol.
- **reportedCurrency** (string) - The currency in which the financial statements are reported.
- **cik** (string) - The CIK (Central Index Key) of the company.
- **filingDate** (string) - The date when the filing was made.
- **acceptedDate** (string) - The date when the filing was accepted.
- **fiscalYear** (string) - The fiscal year of the report.
- **period** (string) - The period of the report (e.g., Q1, Q2, Q3, Q4).
- **cashAndCashEquivalents** (number) - Cash and cash equivalents.
- **shortTermInvestments** (number) - Short-term investments.
- **cashAndShortTermInvestments** (number) - Total cash and short-term investments.
- **netReceivables** (number) - Net receivables.
- **accountsReceivables** (number) - Accounts receivables.
- **otherReceivables** (number) - Other receivables.
- **inventory** (number) - Inventory.
- **prepaids** (number) - Prepaid expenses.
- **otherCurrentAssets** (number) - Other current assets.
- **totalCurrentAssets** (number) - Total current assets.
- **propertyPlantEquipmentNet** (number) - Property, plant, and equipment, net.
- **goodwill** (number) - Goodwill.
- **intangibleAssets** (number) - Intangible assets.
- **goodwillAndIntangibleAssets** (number) - Goodwill and intangible assets.
- **longTermInvestments** (number) - Long-term investments.
- **taxAssets** (number) - Tax assets.
- **otherNonCurrentAssets** (number) - Other non-current assets.
- **totalNonCurrentAssets** (number) - Total non-current assets.
- **otherAssets** (number) - Other assets.
- **totalAssets** (number) - Total assets.
- **totalPayables** (number) - Total payables.
- **accountPayables** (number) - Accounts payables.
- **otherPayables** (number) - Other payables.
- **accruedExpenses** (number) - Accrued expenses.
- **shortTermDebt** (number) - Short-term debt.
- **capitalLeaseObligationsCurrent** (number) - Current capital lease obligations.
- **taxPayables** (number) - Tax payables.
- **deferredRevenue** (number) - Deferred revenue.
- **otherCurrentLiabilities** (number) - Other current liabilities.
- **totalCurrentLiabilities** (number) - Total current liabilities.
- **longTermDebt** (number) - Long-term debt.
- **deferredRevenueNonCurrent** (number) - Non-current deferred revenue.
- **deferredTaxLiabilitiesNonCurrent** (number) - Non-current deferred tax liabilities.
- **otherNonCurrentLiabilities** (number) - Other non-current liabilities.
- **totalNonCurrentLiabilities** (number) - Total non-current liabilities.
- **otherLiabilities** (number) - Other liabilities.
- **capitalLeaseObligations** (number) - Capital lease obligations.
- **totalLiabilities** (number) - Total liabilities.
- **treasuryStock** (number) - Treasury stock.
- **preferredStock** (number) - Preferred stock.
- **commonStock** (number) - Common stock.
- **retainedEarnings** (number) - Retained earnings.
- **additionalPaidInCapital** (number) - Additional paid-in capital.
- **accumulatedOtherComprehensiveIncomeLoss** (number) - Accumulated other comprehensive income (loss).
- **otherTotalStockholdersEquity** (number) - Other total stockholders' equity.
- **totalStockholdersEquity** (number) - Total stockholders' equity.
- **totalEquity** (number) - Total equity.
- **minorityInterest** (number) - Minority interest.
- **totalLiabilitiesAndTotalEquity** (number) - Total liabilities and total equity.
- **totalInvestments** (number) - Total investments.
- **totalDebt** (number) - Total debt.
- **netDebt** (number) - Net debt.

#### Response Example

```json
{
  "example": [
    {
      "date": "2024-12-28",
      "symbol": "AAPL",
      "reportedCurrency": "USD",
      "cik": "0000320193",
      "filingDate": "2025-01-31",
      "acceptedDate": "2025-01-31 06:01:27",
      "fiscalYear": "2025",
      "period": "Q1",
      "cashAndCashEquivalents": 30299000000,
      "shortTermInvestments": 23476000000,
      "cashAndShortTermInvestments": 53775000000,
      "netReceivables": 59306000000,
      "accountsReceivables": 29639000000,
      "otherReceivables": 29667000000,
      "inventory": 6911000000,
      "prepaids": 0,
      "otherCurrentAssets": 13248000000,
      "totalCurrentAssets": 133240000000,
      "propertyPlantEquipmentNet": 46069000000,
      "goodwill": 0,
      "intangibleAssets": 0,
      "goodwillAndIntangibleAssets": 0,
      "longTermInvestments": 87593000000,
      "taxAssets": 0,
      "otherNonCurrentAssets": 77183000000,
      "totalNonCurrentAssets": 210845000000,
      "otherAssets": 0,
      "totalAssets": 344085000000,
      "totalPayables": 61910000000,
      "accountPayables": 61910000000,
      "otherPayables": 0,
      "accruedExpenses": 0,
      "shortTermDebt": 12843000000,
      "capitalLeaseObligationsCurrent": 0,
      "taxPayables": 0,
      "deferredRevenue": 8461000000,
      "otherCurrentLiabilities": 61151000000,
      "totalCurrentLiabilities": 144365000000,
      "longTermDebt": 83956000000,
      "deferredRevenueNonCurrent": 0,
      "deferredTaxLiabilitiesNonCurrent": 0,
      "otherNonCurrentLiabilities": 49006000000,
      "totalNonCurrentLiabilities": 132962000000,
      "otherLiabilities": 0,
      "capitalLeaseObligations": 0,
      "totalLiabilities": 277327000000,
      "treasuryStock": 0,
      "preferredStock": 0,
      "commonStock": 84768000000,
      "retainedEarnings": -11221000000,
      "additionalPaidInCapital": 0,
      "accumulatedOtherComprehensiveIncomeLoss": -6789000000,
      "otherTotalStockholdersEquity": 0,
      "totalStockholdersEquity": 66758000000,
      "totalEquity": 66758000000,
      "minorityInterest": 0,
      "totalLiabilitiesAndTotalEquity": 344085000000,
      "totalInvestments": 111069000000,
      "totalDebt": 96799000000,
      "netDebt": 66500000000
    }
  ]
}
```

```

=== COMPLETE CONTENT === This response contains all available snippets from this library. No additional content exists. Do not make further requests.
```
