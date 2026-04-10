### Python GET Request Example for MACD Data

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch MACD data using the `requests` library. It constructs the API URL with specified parameters and makes a GET request. Ensure you have the `requests` library installed (`pip install requests`). The output is expected to be in JSON format by default.

```python
import requests

def get_macd_data(symbol, interval, series_type, api_key):
    url = f"https://www.alphavantage.co/query?function=MACD&symbol={symbol}&interval={interval}&series_type={series_type}&apikey={api_key}"
    response = requests.get(url)
    return response.json()

# Example usage:
# api_key = "YOUR_API_KEY" # Replace with your actual API key
# macd_data = get_macd_data("IBM", "daily", "open", "demo")
# print(macd_data)
```

---

### Fetch MIDPRICE Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

This example demonstrates fetching MIDPRICE data using Node.js with the 'request' library. It makes an HTTP GET request and handles potential errors or successful responses, logging the received JSON data. The 'request' module needs to be installed.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=MIDPRICE&symbol=IBM&interval=daily&time_period=10&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Example Alpha Vantage API Request URL

Source: https://www.alphavantage.co/documentation/index

This is an example of a complete API request URL for Alpha Vantage, demonstrating the structure and inclusion of required parameters like function, symbol, interval, series_type, and apikey. It's a GET request.

```text
https://www.alphavantage.co/query?function=HT_SINE&symbol=IBM&interval=daily&series_type=close&apikey=demo
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Fetches financial data from Alpha Vantage. This example demonstrates fetching the Aroon Oscillator (AROONOSC) for IBM.

```APIDOC
## GET /query

### Description
This endpoint allows you to query various financial data functions provided by Alpha Vantage. The example below shows how to retrieve the Aroon Oscillator for a given stock symbol.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The financial function to retrieve (e.g., AROONOSC, MFI).
- **symbol** (string) - Required - The stock symbol to query (e.g., IBM).
- **interval** (string) - Optional - The time interval for the data (e.g., daily, weekly, monthly).
- **time_period** (integer) - Optional - The number of periods to consider for the calculation.
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

GET https://www.alphavantage.co/query?function=AROONOSC&symbol=IBM&interval=daily&time_period=10&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **metadata** (object) - Information about the query parameters.
- **technicalAnalysis** (object) - The calculated technical indicator values.

#### Response Example
```json
{
  "MetaData": {
    "Symbol": "IBM",
    "Indicator": "Aroon Oscillator",
    "Last Updated": "2023-10-27 16:00:01 UTC",
    "Interval": "daily",
    "Time Period": 10
  },
  "Technical Analysis: Aroon Oscillator": {
    "2023-10-26": {
      "Aroon Oscillator": "72.7273"
    },
    "2023-10-25": {
      "Aroon Oscillator": "63.6364"
    }
  }
}
````

````

--------------------------------

### Fetch STOCHF Data with JavaScript using request

Source: https://www.alphavantage.co/documentation/index

This JavaScript example fetches Stochastic Fast (STOCHF) data for IBM using the 'request' library. It makes an HTTP GET request and handles the JSON response asynchronously. Replace 'demo' with your actual API key. Requires the 'request' npm package (`npm install request`).

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=STOCHF&symbol=IBM&interval=daily&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Example AlphaVantage API Call (URL)

Source: https://www.alphavantage.co/documentation/index

This is an example of a complete API call to AlphaVantage for retrieving MIDPRICE data for IBM. It includes all required parameters: function, symbol, interval, time_period, and apikey. The 'demo' key is used as a placeholder for a free API key.

```URL
https://www.alphavantage.co/query?**function**=MIDPRICE&**symbol**=IBM&**interval**=daily&**time_period**=10&**apikey**=demo
```

---

### Fetch Daily Time Series Data with JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This JavaScript example for Node.js fetches daily time series data for IBM from Alpha Vantage. It utilizes the 'request' library to perform the HTTP GET request and handles the JSON response asynchronously. You'll need to install the 'request' package (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieves financial data based on the specified function. This example focuses on the DURABLES function.

````APIDOC
## GET /query

### Description
This endpoint allows you to retrieve various financial data series. The `function` parameter specifies the type of data, and `datatype` controls the output format. An `apikey` is required for all requests.

### Method
GET

### Endpoint
`/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The financial function to execute. Example: `DURABLES`.
- **datatype** (string) - Optional - The desired output format. Accepted values are `json` (default) and `csv`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
`https://www.alphavantage.co/query?function=DURABLES&apikey=YOUR_API_KEY`

### Response
#### Success Response (200)
- **data** (object/string) - The financial data in JSON or CSV format, depending on the `datatype` parameter.

#### Response Example (JSON)
```json
{
  "example": "response body"
}
````

````

--------------------------------

### Fetch ROC Data with JavaScript using request

Source: https://www.alphavantage.co/documentation/index

This JavaScript example uses the 'request' module to retrieve ROC data from the Alpha Vantage API. It sends a GET request and logs the JSON response or any errors encountered. Make sure to install the 'request' module (`npm install request`).

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=ROC&symbol=IBM&interval=weekly&time_period=10&series_type=close&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch Financial Data with JavaScript (request)

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet uses the 'request' library to fetch financial data from the Alpha Vantage API. It makes a GET request and handles the response, logging the data or any errors. Ensure you have the 'request' library installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=HT_PHASOR&symbol=IBM&interval=weekly&series_type=close&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch ETF Profile Data with C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching ETF profile data using WebClient. It shows how to deserialize the JSON response using both System.Web.Script.Serialization (for .NET Framework) and System.Text.Json (for .NET Core). Note: The .NET Core example uses dynamic deserialization which might require specific configurations or newer .NET versions.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=QQQ&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Historical Options Data (URL Examples)

Source: https://www.alphavantage.co/documentation/index

Demonstrates various ways to call the Alpha Vantage API to retrieve historical options data. Includes examples for fetching data from the previous trading session, a specific date, and downloading as a CSV file. The 'datatype' parameter controls the output format.

```URL
https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=IBM&apikey=demo
```

```URL
https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=IBM&date=2017-11-15&apikey=demo
```

```URL
https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=IBM&date=2017-11-15&apikey=demo&datatype=csv
```

---

### Fetch HT_PHASOR Data with C# (.NET Framework & Core)

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch HT_PHASOR data using `WebClient`. It includes examples for parsing JSON using both `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) and `System.Text.Json.JsonSerializer` (for .NET Core). Ensure the correct .NET libraries are referenced.

```csharp
using System;
using System.Collections.Generic;
using System.Net;
// if using .NET Framework
using System.Web.Script.Serialization;
// if using .Net Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=HT_PHASOR&symbol=IBM&interval=weekly&series_type=close&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // .NET Framework (System.Web.Script.Serialization)
                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // .NET Core (System.Text.Json)
                // Note: System.Text.Json parsing can be more complex for dynamic data structures.
                // This example assumes a Dictionary-like structure.
                dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // Placeholder for using the data
                Console.WriteLine("Data fetched successfully (framework example):");
                // Console.WriteLine(json_data_framework);
                Console.WriteLine("\nData fetched successfully (core example):");
                // Console.WriteLine(json_data_core);
            }
        }
    }
}
```

---

### Fetch STOCHF Data (C#)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching STOCHF data for IBM from Alpha Vantage. It utilizes `WebClient` to download the JSON string and then deserializes it. It shows examples for both .NET Framework using `JavaScriptSerializer` and .NET Core using `System.Text.Json`. Ensure you replace 'demo' with your actual API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=STOCH&symbol=IBM&interval=daily&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data (either json_data_framework or json_data_core)
            }
        }
    }
}
```

---

### Fetch FX Intraday Data - JavaScript

Source: https://www.alphavantage.co/documentation/index

Retrieves intraday FX data using JavaScript. This example utilizes the `request` module to perform an HTTP GET request to the Alpha Vantage API. It handles potential errors and logs the JSON data upon a successful response. Ensure the `request` module is installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### NONFARM_PAYROLL API - C#/.NET Example

Source: https://www.alphavantage.co/documentation/index

Example of how to fetch NONFARM_PAYROLL data using C#/.NET.

````APIDOC
## GET /query

### Description
Fetches NONFARM_PAYROLL data.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Query Parameters
- **function** (string) - Required - The name of the API function (e.g., NONFARM_PAYROLL).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```csharp
using System;
using System.Collections.Generic;
using System.Net;

// if using .NET Framework
using System.Web.Script.Serialization;
// if using .Net Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // .NET Framework example
                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // .NET Core example
                dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // do something with the json_data
            }
        }
    }
}
````

### Response

#### Success Response (200)

- **data** (object) - The JSON response containing NONFARM_PAYROLL data.

#### Response Example

```json
{
  "data": "..."
}
```

````

--------------------------------

### Fetch Realtime Bulk Quotes (NodeJS)

Source: https://www.alphavantage.co/documentation/index

This NodeJS example utilizes the 'request' module to retrieve real-time bulk quotes for multiple stock symbols. It requires an API key and parses the JSON response. Make sure to install the 'request' module (`npm install request`).

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=MSFT,AAPL,IBM&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch MIDPRICE Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# code example shows how to fetch MIDPRICE data using .NET. It utilizes 'WebClient' to download the JSON string and demonstrates parsing it using both 'JavaScriptSerializer' (for .NET Framework) and 'System.Text.Json' (for .NET Core). Ensure correct references are added.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// if using .NET Framework
using System.Web.Script.Serialization;
// if using .Net Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MIDPRICE&symbol=IBM&interval=daily&time_period=10&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // if using .NET Core (System.Text.Json)
                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch ADOSC Data with JavaScript

Source: https://www.alphavantage.co/documentation/index

This JavaScript example retrieves ADOSC data using the 'request' module. It makes an HTTP GET request to the Alpha Vantage API and logs the JSON response or any errors. Ensure you have Node.js and the 'request' package installed.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=AD&symbol=IBM&interval=daily&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Commodity Data with C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example demonstrates fetching monthly commodity data from the Alpha Vantage API. It shows how to use `WebClient` for HTTP requests and includes guidance for parsing JSON using both `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=ALL_COMMODITIES&interval=monthly&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch VWAP Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch VWAP data using .NET. It uses WebClient to download the JSON string and then demonstrates parsing it using either JavaScriptSerializer (for .NET Framework) or JsonSerializer (for .NET Core). Ensure you have the correct references added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=VWAP&symbol=IBM&interval=15min&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Coffee Prices Data with C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching monthly coffee price data from the Alpha Vantage API. It shows how to use 'WebClient' to download the data and includes examples for parsing JSON using both .NET Framework's 'JavaScriptSerializer' and .NET Core's 'System.Text.Json'. Ensure appropriate references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=SUGAR&interval=monthly&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch AD Line Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

Fetches the Chaikin A/D line (AD) values for a given stock symbol using the Alpha Vantage API. This Node.js example uses the `request` library to make an HTTP GET request and handles the JSON response. Ensure you have the `request` package installed (`npm install request`). Replace 'demo' with your actual API key.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=NATR&symbol=IBM&interval=weekly&time_period=14&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch CPI Data with C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch CPI data using WebClient. It includes options for parsing JSON using either System.Web.Script.Serialization (for .NET Framework) or System.Text.Json (for .NET Core). An API key is required.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves technical indicator data from Alpha Vantage. The example demonstrates fetching MACDEXT data for IBM.

````APIDOC
## GET /query

### Description
This endpoint retrieves technical indicator data from Alpha Vantage. The example demonstrates fetching MACDEXT data for IBM.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Query Parameters
- **function** (string) - Required - The technical indicator to retrieve (e.g., MACDEXT).
- **symbol** (string) - Required - The stock symbol (e.g., IBM).
- **interval** (string) - Required - The data interval (e.g., daily).
- **series_type** (string) - Required - The type of series (e.g., open).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=MACDEXT&symbol=IBM&interval=daily&series_type=open&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

### Response

#### Success Response (200)

- **data** (object) - The JSON object containing the requested technical indicator data.

#### Response Example

```json
{
  "MACDEXT": {
    "Meta Data": {
      "Symbol": "IBM",
      "Information": "Daily Prices and Volumes",
      "Last Updated": "2023-10-26 16:00:01 UTC",
      "Interval": "daily",
      "Output Size": "Compact",
      "Time Series (Daily)": {
        "2023-10-26": {
          "open": "135.1000",
          "high": "135.8600",
          "low": "134.5800",
          "close": "135.5000",
          "volume": "3601453"
        },
        "2023-10-25": {
          "open": "134.3500",
          "high": "135.1000",
          "low": "133.8400",
          "close": "134.3000",
          "volume": "3514610"
        }
      }
    },
    "Technical Analysis: MACDEXT": {
      "2023-10-26": {
        "MACDEXT": "0.5098",
        "MACD_Signal": "0.4130",
        "MACD_Hist": "0.0968"
      },
      "2023-10-25": {
        "MACDEXT": "0.4588",
        "MACD_Signal": "0.4050",
        "MACD_Hist": "0.0538"
      }
    }
  }
}
```

````

--------------------------------

### Fetch Commodity Data with NodeJS

Source: https://www.alphavantage.co/documentation/index

This NodeJS script fetches monthly commodity data using the 'request' library. It performs an HTTP GET request and handles the JSON response. Make sure to install the 'request' library (`npm install request`). Replace 'demo' with your valid API key.

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=ALL_COMMODITIES&interval=monthly&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### NONFARM_PAYROLL API - PHP Example

Source: https://www.alphavantage.co/documentation/index

Example of how to fetch NONFARM_PAYROLL data using PHP.

````APIDOC
## GET /query

### Description
Fetches NONFARM_PAYROLL data.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Query Parameters
- **function** (string) - Required - The name of the API function (e.g., NONFARM_PAYROLL).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
````

### Response

#### Success Response (200)

- **data** (object) - The JSON response containing NONFARM_PAYROLL data.

#### Response Example

```json
{
  "data": "..."
}
```

````

--------------------------------

### Alpha Vantage API Request Examples

Source: https://www.alphavantage.co/documentation/index

Demonstrates how to construct API requests to Alpha Vantage for retrieving technical indicator data. These examples show the basic structure of a GET request, including required parameters like function, symbol, interval, time_period, series_type, and apikey. The `datatype` parameter can be appended to specify the output format (JSON or CSV).

```url
https://www.alphavantage.co/query?function=EMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo
````

```url
https://www.alphavantage.co/query?function=EMA&symbol=USDEUR&interval=weekly&time_period=10&series_type=open&apikey=demo
```

---

### Fetch HT_PHASOR Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# example illustrates fetching Hilbert transform, phasor components (HT_PHASOR) data using Alpha Vantage API. It shows how to use 'WebClient' to download the data and includes options for parsing JSON with both '.NET Framework' (JavaScriptSerializer) and '.NET Core' (System.Text.Json) libraries. Replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=HT_DCPHASE&symbol=IBM&interval=daily&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Unemployment Data with C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching unemployment data from Alpha Vantage using C#. It shows how to use WebClient and includes examples for parsing JSON with both .NET Framework's JavaScriptSerializer and .NET Core's JsonSerializer. Requires .NET Framework or .NET Core.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch SMA Data Example (Python)

Source: https://www.alphavantage.co/documentation/index

Demonstrates how to fetch Simple Moving Average (SMA) data using the Alpha Vantage API with Python's 'requests' library. This example assumes you have an API key and specifies the symbol, interval, time period, series type, and the API endpoint.

```python
import requests

# Replace with your actual API key
api_key = "YOUR_API_KEY"

symbol = "IBM"
interval = "weekly"
time_period = 10
series_type = "open"

url = f"https://www.alphavantage.co/query?function=SMA&symbol={symbol}&interval={interval}&time_period={time_period}&series_type={series_type}&apikey={api_key}"

response = requests.get(url)
data = response.json()

print(data)
```

---

### Fetch Market News Sentiment API URL Examples

Source: https://www.alphavantage.co/documentation/index

These examples show how to construct API request URLs for fetching market news and sentiment data. They demonstrate filtering by ticker symbols and a combination of tickers, time range, and limit.

```url
https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo
```

```url
https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=COIN,CRYPTO:BTC,FOREX:USD&time_from=20220410T0130&limit=1000&apikey=demo
```

---

### Fetch Inflation Data using Python and Requests

Source: https://www.alphavantage.co/documentation/index

This Python snippet uses the 'requests' library to fetch inflation data from the Alpha Vantage API. It sends a GET request to the specified URL and parses the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=INFLATION&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch MACD Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch MACD data from the Alpha Vantage API using the 'requests' library. It makes a GET request to the API endpoint and parses the JSON response. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=MACD&symbol=IBM&interval=daily&series_type=open&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Real-time Options Data in C#

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching real-time options data. It shows examples for both .NET Framework using `JavaScriptSerializer` and .NET Core using `System.Text.Json`. Both approaches involve downloading the API response and deserializing the JSON data. Remember to replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=REALTIME_OPTIONS&symbol=IBM&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch HT_PHASOR Data with JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet for Node.js shows how to retrieve HT_PHASOR data using the `request` library. It makes an HTTP GET request and includes error handling for the response. Remember to install the `request` library (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=HT_PHASOR&symbol=IBM&interval=weekly&series_type=close&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### NONFARM_PAYROLL API - Python Example

Source: https://www.alphavantage.co/documentation/index

Example of how to fetch NONFARM_PAYROLL data using Python and the requests library.

````APIDOC
## GET /query

### Description
Fetches NONFARM_PAYROLL data.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Query Parameters
- **function** (string) - Required - The name of the API function (e.g., NONFARM_PAYROLL).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

### Response

#### Success Response (200)

- **data** (object) - The JSON response containing NONFARM_PAYROLL data.

#### Response Example

```json
{
  "data": "..."
}
```

````

--------------------------------

### Fetch FX Intraday Data - C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching intraday FX data in C# using `WebClient`. This example includes logic for parsing JSON using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`. Ensure appropriate references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch ADXR Data using C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching ADXR data for IBM using Alpha Vantage. It shows how to use `WebClient` for downloading the data and includes options for parsing JSON using either `JavaScriptSerializer` (for .NET Framework) or `System.Text.Json` (for .NET Core). Ensure necessary references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=ADX&symbol=IBM&interval=daily&time_period=10&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Top Gainers/Losers Data (Node.js)

Source: https://www.alphavantage.co/documentation/index

This Node.js example uses the 'request' library to retrieve top gainers and losers data from Alpha Vantage. It handles potential errors and checks the HTTP status code before logging the JSON response. Ensure the 'request' module is installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### GET /query (Commodity Data Example: Wheat)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves commodity price data. You can specify the function, interval, data type, and your API key.

```APIDOC
## GET /query

### Description
Retrieves global commodity price data, such as the price of wheat, on monthly, quarterly, or annual horizons. The data source is the International Monetary Fund (IMF) via the FRED API.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function of your choice. For wheat data, use `WHEAT`.
- **interval** (string) - Optional - By default, `monthly`. Accepts `monthly`, `quarterly`, and `annual`.
- **datatype** (string) - Optional - By default, `json`. Accepts `json` and `csv`.
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo

````

### Response
#### Success Response (200)
- **data** (object) - Contains the time series data for the requested commodity.

#### Response Example
```json
{
    "dataset": {
        "data": [
            ["2023-01-01", 300.50, 290.00, 310.00],
            ["2022-01-01", 280.75, 275.25, 285.50]
        ],
        "column_names": ["date", "open", "close", "high"]
    }
}
````

````

--------------------------------

### Alpha Vantage API URL Examples

Source: https://www.alphavantage.co/documentation/index

Demonstrates various URL formats for accessing Alpha Vantage API data. Includes examples for fetching weekly time series data in JSON and CSV formats, specifying the function, symbol, and API key. The 'demo' API key is used for illustrative purposes.

```url
https://www.alphavantage.co/query?**function**=TIME_SERIES_WEEKLY&**symbol**=IBM&**apikey**=demo
https://www.alphavantage.co/query?**function**=TIME_SERIES_WEEKLY&**symbol**=TSCO.LON&**apikey**=demo
https://www.alphavantage.co/query?**function**=TIME_SERIES_WEEKLY&**symbol**=IBM&**apikey**=demo&**datatype**=csv
````

---

### Fetch ETF Profile Data using Alpha Vantage API

Source: https://www.alphavantage.co/documentation/index

This section provides an example of how to fetch ETF profile data using the Alpha Vantage API. It outlines the required parameters: `function` (set to `ETF_PROFILE`), `symbol`, and `apikey`. An example URL is given, but the code implementation for different languages is not provided in this snippet.

```text
API Parameters
Required: `function` = ETF_PROFILE
Required: `symbol` = e.g., QQQ
Required: `apikey` = Your API key

Example URL:
`https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=QQQ&apikey=demo`
```

---

### GET /query (WILLR Example)

Source: https://www.alphavantage.co/documentation/index

This endpoint returns the Williams' %R (WILLR) values for a specified stock symbol. Similar to other endpoints, it requires an API key and allows for interval and time period customization.

```APIDOC
## GET /query (WILLR)

### Description
This API returns the Williams' %R (WILLR) values for a specified stock symbol. Williams' %R is a momentum indicator used in trading.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The type of technical indicator to retrieve. Set to `WILLR`.
- **symbol** (string) - Required - The stock symbol for which to retrieve data (e.g., `IBM`).
- **interval** (string) - Optional - The interval of the data (e.g., `daily`, `weekly`, `monthly`).
- **time_period** (integer) - Optional - The number of periods to include in the calculation (e.g., `14`).
- **apikey** (string) - Required - Your Alpha Vantage API key. Replace `demo` with your actual key.

### Request Example
```

https://www.alphavantage.co/query?function=WILLR&symbol=IBM&interval=daily&time_period=14&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **`Technical Analysis: WILLR`** (object) - Contains the WILLR values for each date.
  - **`WILLR`** (string) - The calculated Williams' %R value for a given date.
- **`Meta Data`** (object) - Contains metadata about the request.
  - **`Symbol`** (string) - The requested stock symbol.
  - **`Indicator`** (string) - The name of the technical indicator (`Williams' %R`).
  - **`Last Updated`** (string) - The timestamp of the last update.
  - **`Interval`** (string) - The data interval used.
  - **`Time Period`** (integer) - The time period used for calculation.

#### Response Example
```json
{
    "Meta Data": {
        "Symbol": "IBM",
        "Indicator": "Williams' %R",
        "Last Updated": "2023-10-27 16:00:00 UTC",
        "Interval": "daily",
        "Time Period": 14
    },
    "Technical Analysis: WILLR": {
        "2023-10-26": {
            "WILLR": "-30.50"
        },
        "2023-10-25": {
            "WILLR": "-35.25"
        }
    }
}
````

````

--------------------------------

### NONFARM_PAYROLL API - NodeJS Example

Source: https://www.alphavantage.co/documentation/index

Example of how to fetch NONFARM_PAYROLL data using NodeJS and the request library.

```APIDOC
## GET /query

### Description
Fetches NONFARM_PAYROLL data.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Query Parameters
- **function** (string) - Required - The name of the API function (e.g., NONFARM_PAYROLL).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

### Response

#### Success Response (200)

- **data** (object) - The JSON response containing NONFARM_PAYROLL data.

#### Response Example

```json
{
  "data": "..."
}
```

````

--------------------------------

### Fetch Crypto Intraday Data (Python)

Source: https://www.alphavantage.co/documentation/index

Fetches intraday cryptocurrency data (e.g., ETH/USD) using the Alpha Vantage API in Python. It uses the 'requests' library to make the HTTP GET request and 'json' to parse the response. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### GET /query (STOCHRSI Example)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves Stochastic Relative Strength Index (STOCHRSI) data for a given stock symbol. It requires an API key and allows customization of time period, series type, and other parameters.

```APIDOC
## GET /query

### Description
Retrieves Stochastic Relative Strength Index (STOCHRSI) data for a specified stock symbol. This endpoint is part of the Alpha Vantage API for technical analysis.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The type of technical indicator to retrieve. For this example, it's `STOCHRSI`.
- **symbol** (string) - Required - The stock symbol for which to retrieve data (e.g., `IBM`).
- **interval** (string) - Optional - The interval of the data (e.g., `daily`, `weekly`, `monthly`). Defaults to `daily`.
- **time_period** (integer) - Optional - The number of periods to include in the calculation (e.g., `10`). Defaults to `10`.
- **series_type** (string) - Optional - The type of series to use for calculation (e.g., `close`, `open`, `high`, `low`). Defaults to `close`.
- **fastkperiod** (integer) - Optional - The period for the Fast K calculation (e.g., `6`).
- **fastdmatype** (integer) - Optional - The type of Moving Average for Fast D calculation (e.g., `1`).
- **apikey** (string) - Required - Your Alpha Vantage API key. Replace `demo` with your actual key.

### Request Example
```

https://www.alphavantage.co/query?function=STOCHRSI&symbol=IBM&interval=daily&time_period=10&series_type=close&fastkperiod=6&fastdmatype=1&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **`Technical Analysis: STOCHRSI`** (object) - Contains the STOCHRSI values.
  - **`STOCHRSI.K`** (string) - The calculated STOCHRSI K value for a given date.
  - **`STOCHRSI.D`** (string) - The calculated STOCHRSI D value for a given date.
- **`Meta Data`** (object) - Contains metadata about the request.
  - **`Symbol`** (string) - The requested stock symbol.
  - **`Indicator`** (string) - The name of the technical indicator.
  - **`Last Updated`** (string) - The timestamp of the last update.
  - **`Interval`** (string) - The data interval used.
  - **`Time Period`** (integer) - The time period used for calculation.
  - **`Series Type`** (string) - The series type used for calculation.

#### Response Example
```json
{
    "Meta Data": {
        "Symbol": "IBM",
        "Indicator": "Stochastic Relative Strength Index (STOCHRSI)",
        "Last Updated": "2023-10-27 16:00:00 UTC",
        "Interval": "daily",
        "Time Period": 10,
        "Series Type": "close"
    },
    "Technical Analysis: STOCHRSI": {
        "2023-10-26": {
            "STOCHRSI.K": "70.1234",
            "STOCHRSI.D": "65.5678"
        },
        "2023-10-25": {
            "STOCHRSI.K": "68.9012",
            "STOCHRSI.D": "63.4321"
        }
    }
}
````

````

--------------------------------

### Fetch Stock Analytics Data (C#)

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch advanced analytics data using System.Net.WebClient. It demonstrates parsing JSON using both .NET Framework's JavaScriptSerializer and .NET Core's System.Text.Json, allowing flexibility based on the .NET version used. The code requires appropriate using directives for the chosen JSON parser.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://alphavantageapi.co/timeseries/analytics?SYMBOLS=AAPL,MSFT,IBM&RANGE=2023-07-01&RANGE=2023-08-31&INTERVAL=DAILY&OHLC=close&CALCULATIONS=MEAN,STDDEV,CORRELATION&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch VWAP Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

This example demonstrates fetching VWAP data using Node.js with the 'request' library. It makes an HTTP GET request to the Alpha Vantage API and handles the JSON response, logging any errors or the retrieved data. Replace 'demo' with your actual API key.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=VWAP&symbol=IBM&interval=15min&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Python Request Example for Alpha Vantage VWAP API

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to make a request to the Alpha Vantage VWAP API using the 'requests' library. It requires the 'requests' library to be installed. The function, symbol, interval, and apikey are passed as parameters in the URL.

```python
import requests

function = "VWAP"
symbol = "IBM"
interval = "15min"
apikey = "demo"

url = f"https://www.alphavantage.co/query?function={function}&symbol={symbol}&interval={interval}&apikey={apikey}"

response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    print(data)
else:
    print(f"Error: {response.status_code}")
```

---

### Fetch OBV Data with C# using WebClient

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching OBV data for IBM from the Alpha Vantage API using 'WebClient'. It includes conditional logic for deserializing JSON using either '.NET Framework's JavaScriptSerializer' or '.NET Core's System.Text.Json'. Ensure appropriate references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=OBV&symbol=IBM&interval=weekly&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Inflation Data using NodeJS and Request

Source: https://www.alphavantage.co/documentation/index

This NodeJS snippet utilizes the 'request' library to retrieve inflation data from the Alpha Vantage API. It makes a GET request and handles the JSON response, logging any errors or the data itself. Ensure the 'request' module is installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = "https://www.alphavantage.co/query?function=INFLATION&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch HT_PHASOR Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch weekly closing prices for IBM using the Alpha Vantage HT_PHASOR function. It uses the `requests` library to make an HTTP GET request and then parses the JSON response. Ensure the `requests` library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=HT_PHASOR&symbol=IBM&interval=weekly&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Retail Sales Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example shows how to fetch retail sales data from Alpha Vantage. It includes logic for both .NET Framework (using `JavaScriptSerializer`) and .NET Core (using `System.Text.Json`) to deserialize the JSON response. Ensure appropriate JSON serialization libraries are referenced.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=RETAIL_SALES&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Coffee Prices Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches monthly coffee price data from the Alpha Vantage API. It uses the 'requests' library to make the HTTP GET request and then parses the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=SUGAR&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Node.js: Fetch Technical Indicator Data

Source: https://www.alphavantage.co/documentation/index

This Node.js example shows how to make a request to the AlphaVantage API to retrieve technical indicator data. It uses the 'axios' library to handle the HTTP request. You'll need to install axios (`npm install axios`). Replace 'YOUR_API_KEY' with your actual API key.

```javascript
const axios = require("axios");

const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
const BASE_URL = "https://www.alphavantage.co/query";

const params = {
  function: "PPO",
  symbol: "IBM",
  interval: "daily",
  series_type: "close",
  fastperiod: 10,
  matype: 1,
  apikey: API_KEY,
};

axios
  .get(BASE_URL, { params })
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
```

---

### Alpha Vantage API URL Examples

Source: https://www.alphavantage.co/documentation/index

Examples of Alpha Vantage API URLs for retrieving monthly adjusted time series data. Demonstrates JSON output format and how to request data in CSV format. The 'demo' API key can be used for testing purposes.

```url
https://www.alphavantage.co/query?**function**=TIME_SERIES_MONTHLY_ADJUSTED&**symbol**=IBM&**apikey**=demo
```

```url
https://www.alphavantage.co/query?**function**=TIME_SERIES_MONTHLY_ADJUSTED&**symbol**=TSCO.LON&**apikey**=demo
```

```url
https://www.alphavantage.co/query?**function**=TIME_SERIES_MONTHLY_ADJUSTED&**symbol**=IBM&**apikey**=demo&**datatype**=csv
```

---

### Fetch Weekly Cryptocurrency Data (Python)

Source: https://www.alphavantage.co/documentation/index

This Python snippet uses the 'requests' library to fetch weekly cryptocurrency data from the Alpha Vantage API. It demonstrates how to make a GET request to the API endpoint and parse the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch COTTON Data using NodeJS

Source: https://www.alphavantage.co/documentation/index

This NodeJS script shows how to retrieve COTTON data from the Alpha Vantage API. It utilizes the `request` library to send an HTTP GET request and logs the JSON data. Make sure to install the `request` module (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=COTTON&interval=monthly&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Crypto Intraday Data (JavaScript)

Source: https://www.alphavantage.co/documentation/index

Fetches intraday cryptocurrency data using the Alpha Vantage API in Node.js. It utilizes the 'request' library to perform the HTTP GET request and handles the JSON response asynchronously. Make sure to install the 'request' package (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### BRENT Oil API (Example)

Source: https://www.alphavantage.co/documentation/index

This section provides example code snippets for fetching BRENT crude oil prices using the Alpha Vantage API in Python, NodeJS, PHP, and C#.

````APIDOC
## GET /query

### Description
Retrieves time series data for BRENT crude oil prices.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the data to retrieve. Use `BRENT` for this endpoint.
- **interval** (string) - Optional - The time interval for the data. Example: `monthly`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example (Python)
```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

### Request Example (NodeJS)

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

### Request Example (PHP)

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
```

### Request Example (C#)

```csharp
using System;
using System.Collections.Generic;
using System.Net;
// Using System.Web.Script.Serialization for .NET Framework
using System.Web.Script.Serialization;
// Using System.Text.Json for .NET Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // For .NET Framework:
                 JavaScriptSerializer js = new JavaScriptSerializer();
                 dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                 // For .NET Core:
                 dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                 // Process json_data_framework or json_data_core
            }
        }
    }
}
```

### Response

#### Success Response (200)

- **data** (object) - JSON object containing the time series data for BRENT oil prices.

#### Response Example

```json
{
  "note": "See Alpha Vantage API documentation for details on data structure."
}
```

````

--------------------------------

### Fetch MFI Data with C# using WebClient

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching Money Flow Index (MFI) data for IBM from Alpha Vantage API in C#. It shows how to use 'WebClient' to download the data and includes examples for parsing JSON using both .NET Framework's 'JavaScriptSerializer' and .NET Core's 'System.Text.Json'.

```csharp
using System;
using System.Collections.Generic;
using System.Net;
// if using .NET Framework
using System.Web.Script.Serialization;
// if using .Net Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MFI&symbol=IBM&interval=weekly&time_period=10&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // if using .NET Framework (System.Web.Script.Serialization)
                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // if using .NET Core (System.Text.Json)
                dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch FX Daily Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

Retrieves daily FX data (EUR to USD) via the Alpha Vantage API using Node.js. This example uses the `request` module for making HTTP requests and includes basic error handling for the response. Ensure the `request` module is installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### GET /query (Commodity Data Example: Aluminum)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves commodity price data for Aluminum. You can specify the function, interval, data type, and your API key.

```APIDOC
## GET /query

### Description
Retrieves monthly price data for Aluminum. Requires a valid API key.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - Set to `ALUMINUM` for Aluminum price data.
- **interval** (string) - Optional - Defaults to `monthly`. Other values might be accepted depending on the specific data series.
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=demo

````

### Response
#### Success Response (200)
- **data** (object) - Contains the time series data for Aluminum prices.

#### Response Example
```json
{
    "dataset": {
        "data": [
            ["2023-01-01", 2000.50, 1950.75, 2050.00],
            ["2022-01-01", 1900.25, 1880.50, 1920.75]
        ],
        "column_names": ["date", "open", "close", "high"]
    }
}
````

````

--------------------------------

### Fetch STOCHF Data (Python)

Source: https://www.alphavantage.co/documentation/index

This Python snippet fetches STOCHF data for IBM from Alpha Vantage. It uses the `requests` library to make the HTTP GET request and then parses the JSON response. Ensure you have the `requests` library installed (`pip install requests`). The API key 'demo' should be replaced with a valid Alpha Vantage API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=STOCH&symbol=IBM&interval=daily&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### Fetch Running Analytics Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches running analytics data for specified stock symbols from the Alpha Vantage API. It uses the `requests` library to make a GET request and `json` to parse the response. Ensure you have the `requests` library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://alphavantageapi.co/timeseries/running_analytics?SYMBOLS=AAPL,IBM&RANGE=2month&INTERVAL=DAILY&OHLC=close&WINDOW_SIZE=20&CALCULATIONS=MEAN,STDDEV(annualized=True)&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch STOCHRSI Stock Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching the STOCHRSI indicator for IBM from Alpha Vantage. It shows how to use `WebClient` for downloading the data and includes options for JSON deserialization using either `System.Web.Script.Serialization` (for .NET Framework) or `System.Text.Json` (for .NET Core). Remember to replace the placeholder API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=STOCHRSI&symbol=IBM&interval=daily&time_period=10&series_type=close&fastkperiod=6&fastdmatype=1&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Market Status Data using Python and Requests

Source: https://www.alphavantage.co/documentation/index

This Python script fetches the current market status from the Alpha Vantage API using the `requests` library. It makes a GET request to the specified URL and parses the JSON response. Ensure you have the `requests` library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Company Overview Data using Alpha Vantage API (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example shows how to fetch company overview data from Alpha Vantage. It demonstrates using `WebClient` to download the data and provides options for deserializing JSON using either `JavaScriptSerializer` (for .NET Framework) or `System.Text.Json` (for .NET Core). The input is a URL, and the output is dynamic JSON data.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Daily Time Series Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches daily time series data for IBM from Alpha Vantage. It uses the 'requests' library to make an HTTP GET request and then parses the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch STOCHF Data with Python using requests

Source: https://www.alphavantage.co/documentation/index

This Python script fetches Stochastic Fast (STOCHF) technical indicator data for IBM from Alpha Vantage. It uses the 'requests' library to make an HTTP GET request and 'json' to parse the response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=STOCHF&symbol=IBM&interval=daily&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Global Cotton Price Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example demonstrates fetching the monthly global price of cotton from the Alpha Vantage API. It shows how to use 'WebClient' for HTTP requests and provides examples for JSON deserialization using both 'JavaScriptSerializer' (.NET Framework) and 'System.Text.Json' (.NET Core). Remember to replace the 'demo' API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=CORN&interval=monthly&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Alpha Vantage API Request Example (URL)

Source: https://www.alphavantage.co/documentation/index

An example URL demonstrating how to construct a request to the Alpha Vantage API for technical indicator data. This URL includes required parameters like function, symbol, interval, series_type, and apikey.

```plaintext
https://www.alphavantage.co/query?function=HT_TRENDLINE&symbol=IBM&interval=daily&series_type=close&apikey=demo
```

---

### Fetch Stock Data (TRANGE) using C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching True Range (TRANGE) data for IBM from the Alpha Vantage API. It shows how to use 'WebClient' for downloading data and includes methods for JSON deserialization using both .NET Framework's 'JavaScriptSerializer' and .NET Core's 'System.Text.Json'. Ensure appropriate references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=SAR&symbol=IBM&interval=weekly&acceleration=0.05&maximum=0.25&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch DURABLES Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

Provides examples for fetching DURABLES data from the Alpha Vantage API in C#/.NET. It demonstrates using WebClient to download the JSON string and includes options for parsing with System.Web.Script.Serialization (for .NET Framework) or System.Text.Json (for .NET Core).

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=DURABLES&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                //dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Balance Sheet Data with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching balance sheet data using 'WebClient'. It includes conditional logic for parsing JSON using either 'System.Web.Script.Serialization.JavaScriptSerializer' (for .NET Framework) or 'System.Text.Json' (for .NET Core). Ensure correct namespaces and references are included based on your .NET version.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Alpha Vantage API Request Example

Source: https://www.alphavantage.co/documentation/index

This example demonstrates how to construct a URL to fetch technical indicator data (PLUS_DM) from the Alpha Vantage API. It includes required parameters like symbol, interval, time_period, and apikey. The output format is JSON by default.

```URL
https://www.alphavantage.co/query?function=PLUS_DM&symbol=IBM&interval=daily&time_period=10&apikey=demo
```

---

### Example AlphaVantage MINUS_DI API Request URL

Source: https://www.alphavantage.co/documentation/index

This is an example of a complete API request URL to fetch MINUS_DI technical indicator data from AlphaVantage. It includes all required parameters: function, symbol, interval, time_period, and apikey. The datatype defaults to JSON and the interval is set to 'weekly'.

```text
https://www.alphavantage.co/query?function=MINUS_DI&symbol=IBM&interval=weekly&time_period=10&apikey=demo
```

---

### Fetch ADXR Data using JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This Node.js script retrieves ADXR data for IBM from Alpha Vantage. It uses the 'request' library to make the HTTP GET request and logs the JSON response or any errors. Ensure you have 'request' installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=ADX&symbol=IBM&interval=daily&time_time_period=10&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch and Parse Alpha Vantage Data in Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet shows how to make an HTTP GET request to the Alpha Vantage API to fetch stock data. It uses the `requests` library to send the request and `r.json()` to parse the JSON response. Ensure the `requests` library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=MAMA&symbol=IBM&interval=daily&series_type=close&fastlimit=0.02&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Earnings Estimates using JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet demonstrates fetching earnings estimate data using Node.js and the 'request' library. It makes an HTTP GET request and logs the parsed JSON data to the console. Error handling for network issues and non-200 status codes is included. Install the 'request' library using `npm install request`.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Real GDP Per Capita Data (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

Illustrates fetching Real GDP Per Capita data using C# in a .NET environment. It shows how to use `WebClient` to download data and provides examples for deserializing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). An API key is necessary.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch ROC Data with Python using requests

Source: https://www.alphavantage.co/documentation/index

This Python snippet uses the 'requests' library to fetch the Rate of Change Ratio (ROC) data from the Alpha Vantage API. It makes a GET request to the specified URL and then parses the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=ROC&symbol=IBM&interval=weekly&time_period=10&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### C# MFI API Request Example

Source: https://www.alphavantage.co/documentation/index

This C# snippet demonstrates fetching MFI data from the AlphaVantage API. It involves constructing the request URL with required parameters like `function`, `symbol`, `interval`, `time_period`, and `apikey`, and then deserializing the JSON response.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

public class AlphaVantageClient
{
    public static async Task GetMfiDataAsync()
    {
        string url = "https://www.alphavantage.co/query?function=MFI&symbol=IBM&interval=weekly&time_period=10&apikey=demo";
        using (HttpClient client = new HttpClient())
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode();
            string responseBody = await response.Content.ReadAsStringAsync();
            Console.WriteLine(responseBody);
        }
    }
}
```

---

### GET /query (IPO Calendar)

Source: https://www.alphavantage.co/documentation/index

Retrieves the IPO calendar data. Replace 'demo' with your actual API key.

```APIDOC
## GET /query (IPO Calendar)

### Description
Retrieves the IPO calendar data. This endpoint provides a list of upcoming Initial Public Offerings.

### Method
GET

### Endpoint
https://www.alphavantage.co/query?function=IPO_CALENDAR&apikey=YOUR_API_KEY

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the API function. Use `IPO_CALENDAR`.
- **apikey** (string) - Required - Your Alpha Vantage API key. Obtain one from the Alpha Vantage website.

### Request Example
```

https://www.alphavantage.co/query?function=IPO_CALENDAR&apikey=demo

````

### Response
#### Success Response (200)
- The response is in CSV format, containing details about upcoming IPOs.

#### Response Example
```csv
"symbol","name","exchange","ipo_date","source"
"ACB","Aurora Cannabis Inc.","NASDAQ","2018-09-19","nasdaq"
"SPLK","Splunk Inc.","NASDAQ","2012-10-19","nasdaq"
````

````

--------------------------------

### Fetch STOCHF Data (JavaScript)

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet fetches STOCHF data for IBM from Alpha Vantage using the `request` library. It makes an HTTP GET request and logs the parsed JSON data to the console. Replace 'demo' with your actual API key. Ensure the `request` library is installed (`npm install request`).

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=STOCH&symbol=IBM&interval=daily&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch TRIMA Data with C# using WebClient

Source: https://www.alphavantage.co/documentation/index

This C# snippet shows how to get TRIMA indicator data from Alpha Vantage using 'WebClient'. It includes examples for both .NET Framework (using 'JavaScriptSerializer') and .NET Core (using 'System.Text.Json') for JSON deserialization. Ensure you replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TRIMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Commodity Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script retrieves monthly commodity data from the Alpha Vantage API. It uses the 'requests' library to make an HTTP GET request and 'json' to parse the response. Ensure you have the 'requests' library installed (`pip install requests`) and replace 'demo' with your actual API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=ALL_COMMODITIES&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Weekly Cryptocurrency Data (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example demonstrates fetching weekly cryptocurrency data from the Alpha Vantage API using `WebClient`. It includes methods for parsing JSON data using both `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) and `System.Text.Json.JsonSerializer` (for .NET Core). Ensure appropriate references are added to your project.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Coffee Commodity Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching monthly coffee commodity data using `WebClient`. It shows how to deserialize the JSON response using both `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Ensure appropriate references are added to your project.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
                // Example for .NET Framework:
                // Console.WriteLine(json_data_framework["priceIndexData"][0]["open"]);
                // Example for .NET Core:
                // Console.WriteLine(json_data_core["priceIndexData"][0]["open"]);
            }
        }
    }
}
```

---

### Fetch WILLR Data with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching 'WILLR' data for IBM using `WebClient`. It shows how to deserialize the JSON response using either `JavaScriptSerializer` for .NET Framework or `System.Text.Json` for .NET Core. The parsed data can then be processed further.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=WILLR&symbol=IBM&interval=daily&time_period=10&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Real GDP Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching Real GDP data from Alpha Vantage. It includes options for parsing JSON using both .NET Framework's JavaScriptSerializer and .NET Core's System.Text.Json. A valid API key is required.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### EARNINGS_ESTIMATES Endpoint Examples

Source: https://www.alphavantage.co/documentation/index

Examples of how to fetch earnings estimates data using the Alpha Vantage API in Python, JavaScript, PHP, and C#.

````APIDOC
## GET /query?function=EARNINGS_ESTIMATES

### Description
Fetches earnings estimates for a given stock symbol.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the API function, should be `EARNINGS_ESTIMATES`.
- **symbol** (string) - Required - The stock symbol for which to retrieve earnings estimates (e.g., `IBM`).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example (Python)
```python
import requests

url = 'https://www.alphavantage.co/query?function=EARNINGS_ESTIMATES&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

### Request Example (JavaScript)

```javascript
var request = require("request");

var url =
  "https://www.alphavantage.co/query?function=EARNINGS_ESTIMATES&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      console.log(data);
    }
  },
);
```

### Request Example (PHP)

```php
<?php
$json = file_get_contents('https://www.alphavantage.co/query?function=EARNINGS_ESTIMATES&symbol=IBM&apikey=demo');
$data = json_decode($json,true);
print_r($data);
exit;
?>
```

### Request Example (C#)

```csharp
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Script.Serialization;
// Or using System.Text.Json;

// ... inside a method ...
string QUERY_URL = "https://www.alphavantage.co/query?function=EARNINGS_ESTIMATES&symbol=IBM&apikey=demo";
Uri queryUri = new Uri(QUERY_URL);

using (WebClient client = new WebClient())
{
    // For .NET Framework
    JavaScriptSerializer js = new JavaScriptSerializer();
    dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

    // For .NET Core (requires System.Text.Json)
    // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

    // Process json_data
}
```

### Response

#### Success Response (200)

- **symbol** (string) - The stock symbol.
- **estimatedEPS** (array) - An array of estimated Earnings Per Share.
  - Each object in the array contains:
    - **fiscalDateEnding** (string) - The end date of the fiscal period.
    - **estimatedEPS** (string) - The estimated Earnings Per Share value.
    - **estimatedP/E** (string) - The estimated Price/Earnings ratio.

#### Response Example

```json
{
  "symbol": "IBM",
  "estimatedEPS": [
    {
      "fiscalDateEnding": "2024-03-31",
      "estimatedEPS": "2.6520",
      "estimatedP/E": "12.59"
    },
    {
      "fiscalDateEnding": "2023-12-31",
      "estimatedEPS": "2.0940",
      "estimatedP/E": "15.80"
    }
  ]
}
```

````

--------------------------------

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves On Balance Volume (OBV) data for a given stock symbol. Replace 'demo' with your actual API key.

```APIDOC
## GET /query

### Description
This endpoint retrieves On Balance Volume (OBV) data for a given stock symbol. OBV is a momentum indicator that relates volume to price change. You will need to replace the placeholder 'demo' API key with your own, obtained from the Alpha Vantage support page.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the desired data function. For OBV, use `ADOSC`.
- **symbol** (string) - Required - The stock symbol for which to retrieve data (e.g., `IBM`).
- **interval** (string) - Optional - The interval between data points. Common values include `daily`, `60min`, `30min`, `15min`, `5min`.
- **fastperiod** (integer) - Optional - A parameter used in some technical indicators, specify as needed for the function.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
```python
import requests

url = 'https://www.alphavantage.co/query?function=ADOSC&symbol=IBM&interval=daily&fastperiod=5&apikey=YOUR_API_KEY'
r = requests.get(url)
data = r.json()
print(data)
````

### Response

#### Success Response (200)

- **Note**: The structure of the response will vary based on the `function` parameter. For OBV, it typically includes metadata and a time series of OBV values.

#### Response Example

```json
{
  "Meta Data": {
    "Symbol": "IBM",
    "Information": "On Balance Volume (OBV)",
    "Last Updated": "2023-10-27 10:00:00",
    "Interval": "daily",
    "Time Series (Daily)": "1. open"
  },
  "Technical Analysis: OBV": {
    "2023-10-26": {
      "OBV": "123456.7890"
    },
    "2023-10-25": {
      "OBV": "123400.1234"
    }
  }
}
```

````

--------------------------------

### Fetch Earnings Estimates with Alpha Vantage API (JavaScript)

Source: https://www.alphavantage.co/documentation/index

This JavaScript example demonstrates how to fetch earnings estimate data using the 'request' library. It makes an HTTP GET request to the Alpha Vantage API and handles the response, logging the data or any errors encountered. Remember to replace 'demo' with your API key.

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=EARNINGS_ESTIMATES&symbol=IBM&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch Financial Data with C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching financial data using `WebClient`. It includes comments for both .NET Framework (using `JavaScriptSerializer`) and .NET Core (using `System.Text.Json`). You'll need to add the appropriate assembly references based on your .NET version.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch FX Daily Data using C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching daily FX data (EUR to USD) from Alpha Vantage API in C#. This example shows how to use `WebClient` for HTTP requests and includes methods for parsing JSON using both `.NET Framework`'s `JavaScriptSerializer` and `.NET Core`'s `System.Text.Json`. Note that `System.Web.Extensions` needs to be referenced for the former.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch and Parse Alpha Vantage Data in C#

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch data from the Alpha Vantage API using `WebClient`. It demonstrates parsing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Remember to add the necessary assembly references.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MAMA&symbol=IBM&interval=daily&series_type=close&fastlimit=0.02&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch IBM Stock Quote using Alpha Vantage API in C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching the global quote for IBM using the Alpha Vantage API. It shows how to use `WebClient` to download the data and includes examples for parsing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core).

```csharp
using System;
using System.Collections.Generic;
using System.Net;
// if using .NET Framework
using System.Web.Script.Serialization;
// if using .Net Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // if using .NET Core (System.Text.Json)
                dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch FX Daily Data using Python

Source: https://www.alphavantage.co/documentation/index

Fetches daily foreign exchange data for a specified currency pair (EUR to USD) using the Alpha Vantage API. This snippet utilizes the `requests` library to make an HTTP GET request and then parses the JSON response. Ensure the `requests` library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch OBV Data with Python using requests

Source: https://www.alphavantage.co/documentation/index

This Python snippet fetches On-Balance Volume (OBV) data for IBM using the Alpha Vantage API. It utilizes the 'requests' library to make an HTTP GET request and then parses the JSON response. Ensure you have the 'requests' library installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=OBV&symbol=IBM&interval=weekly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Brent Oil Prices (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example demonstrates fetching Brent crude oil prices using WebClient. It shows how to deserialize JSON data using both System.Web.Script.Serialization for .NET Framework and System.Text.Json for .NET Core.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch ROC Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching ROC data for IBM using `WebClient`. It includes logic for both .NET Framework (using `JavaScriptSerializer`) and .NET Core (using `System.Text.Json`). You will need to uncomment and use the appropriate parsing method based on your .NET version. Error handling for the HTTP request is basic.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=CMO&symbol=IBM&interval=weekly&time_period=10&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Stock Analytics Data (JavaScript)

Source: https://www.alphavantage.co/documentation/index

This JavaScript example demonstrates fetching advanced analytics data using the 'request' module. It constructs the API URL with specified parameters for stock symbols, date range, and calculations, then makes a GET request. The code handles potential errors and logs the JSON response.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://alphavantageapi.co/timeseries/analytics?SYMBOLS=AAPL,MSFT,IBM&RANGE=2023-07-01&RANGE=2023-08-31&INTERVAL=DAILY&OHLC=close&CALCULATIONS=MEAN,STDDEV,CORRELATION&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Earnings Estimates using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching earnings estimate data using .NET. It shows two approaches for JSON deserialization: `JavaScriptSerializer` for .NET Framework and `System.Text.Json` for .NET Core. Both methods use `WebClient` to download the data from the API. Note the different namespace requirements for each deserialization method.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // Note: The actual implementation for System.Text.Json would be more detailed,
                // depending on the expected JSON structure. This is a placeholder.
                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
                Console.WriteLine("Data fetched (implementation depends on .NET version and JSON structure).");
            }
        }
    }
}
```

---

### Fetch Weekly Cryptocurrency Data (NodeJS)

Source: https://www.alphavantage.co/documentation/index

This NodeJS snippet utilizes the 'request' module to retrieve weekly cryptocurrency data from the Alpha Vantage API. It shows how to make an HTTP GET request and handle the response, including error checking and JSON parsing. You need to install the 'request' module (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Earnings Estimates using Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet shows how to retrieve earnings estimate data from the Alpha Vantage API. It uses the 'requests' library to make an HTTP GET request and 'json()' to parse the response. Ensure you have the 'requests' library installed (`pip install requests`). The output is the raw JSON data.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Dividends Data with C# using WebClient

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching dividend data from the Alpha Vantage API in C#. This example uses 'WebClient' to download the data and includes options for deserializing JSON using both .NET Framework's JavaScriptSerializer and .NET Core's JsonSerializer.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=DIVIDENDS&symbol=IBM&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Constructing an RSI API Request (Python)

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to construct and send a request to the AlphaVantage API to retrieve RSI data. It utilizes the `requests` library and shows how to build the URL with the necessary parameters. Ensure you have the `requests` library installed (`pip install requests`). The output will be in JSON format by default.

```python
import requests

def get_rsi_data(symbol, interval, time_period, series_type, api_key):
    base_url = "https://www.alphavantage.co/query?"
    params = {
        "function": "RSI",
        "symbol": symbol,
        "interval": interval,
        "time_period": time_period,
        "series_type": series_type,
        "apikey": api_key
    }
    response = requests.get(base_url, params=params)
    return response.json()

# Example usage:
# api_key = "YOUR_API_KEY"
# rsi_data = get_rsi_data("IBM", "weekly", 10, "open", api_key)
# print(rsi_data)

```

---

### GET /query - Technical Indicators (SMA Example)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves Simple Moving Average (SMA) technical indicator data for a given stock symbol and interval. It requires several parameters to specify the function, symbol, time period, series type, and API key.

```APIDOC
## GET /query

### Description
Retrieves Simple Moving Average (SMA) technical indicator data for a specified stock symbol and interval. This endpoint is useful for analyzing historical price trends.

### Method
GET

### Endpoint
/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The technical indicator to retrieve. For SMA, use `SMA`.
- **symbol** (string) - Required - The ticker symbol of the stock (e.g., `IBM`).
- **interval** (string) - Required - The time interval between data points. Supported values: `1min`, `5min`, `15min`, `30min`, `60min`, `daily`, `weekly`, `monthly`.
- **time_period** (integer) - Required - The number of data points to use for calculation (e.g., `60`, `200`).
- **series_type** (string) - Required - The type of price series to use. Supported values: `close`, `open`, `high`, `low`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.
- **month** (string) - Optional - Filter results for a specific month in `YYYY-MM` format (e.g., `2009-01`).
- **datatype** (string) - Optional - The format for the returned data. Supported values: `json` (default), `csv`.

### Request Example
```

https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **Symbol** (string) - The ticker symbol for which the data is provided.
- **Indicator** (string) - The name of the technical indicator (e.g., "Simple Moving Average").
- **`Time Period`** (integer) - The time period used for the calculation.
- **`Series Type`** (string) - The type of price series used.
- **`Time Series`** (object) - An object containing the time series data, where keys are timestamps and values are the calculated indicator values.

#### Response Example
```json
{
    "Technical Analysis: SMA": {
        "2023-10-27": {
            "SMA": "150.5000"
        },
        "2023-10-26": {
            "SMA": "150.7500"
        }
    }
}
````

````

--------------------------------

### NEWS_SENTIMENT API Example

Source: https://www.alphavantage.co/documentation/index

This section provides examples of how to fetch news sentiment data using the NEWS_SENTIMENT function of the Alpha Vantage API in Python, JavaScript, PHP, and C#.

```APIDOC
## GET /query?function=NEWS_SENTIMENT

### Description
Fetches news sentiment data for a given ticker symbol. This endpoint is useful for analyzing market sentiment based on news coverage.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the API function to use. Set to `NEWS_SENTIMENT`.
- **tickers** (string) - Required - The stock ticker symbol (e.g., `AAPL`, `GOOGL`).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo`

### Response
#### Success Response (200)
- **items** (array) - A list of news items, each containing:
  - **title** (string) - The title of the news article.
  - **url** (string) - The URL of the news article.
  - **time_published** (string) - The publication timestamp of the article.
  - **authors** (array) - A list of authors for the article.
  - **summary** (string) - A summary of the news article.
  - **banner_image** (string) - URL of the banner image for the article.
  - **source** (string) - The news source.
  - **category_within_source** (string) - The category of the article within its source.
  - **overall_sentiment_score** (string) - The overall sentiment score for the article.
  - **overall_sentiment_label** (string) - The sentiment label (e.g., POSITIVE, NEGATIVE, NEUTRAL).
  - **ticker_sentiment** (array) - Sentiment analysis specific to the requested ticker:
    - **ticker** (string) - The ticker symbol.
    - **relevance_score** (string) - The relevance score of the news to the ticker.
    - **sentiment_score** (string) - The sentiment score for the ticker.
    - **sentiment_label** (string) - The sentiment label for the ticker.

#### Response Example
```json
{
  "items": [
    {
      "title": "Apple Stock Slips Amidst Report of iPhone Demand Slowdown",
      "url": "https://example.com/apple-news",
      "time_published": "1678886400",
      "authors": ["John Doe"],
      "summary": "A recent report suggests a slowdown in iPhone demand, leading to a dip in Apple's stock price.",
      "banner_image": "https://example.com/banner.jpg",
      "source": "Financial Times",
      "category_within_source": "Technology",
      "overall_sentiment_score": "0.45",
      "overall_sentiment_label": "POSITIVE",
      "ticker_sentiment": [
        {
          "ticker": "AAPL",
          "relevance_score": "0.95",
          "sentiment_score": "-0.30",
          "sentiment_label": "NEGATIVE"
        }
      ]
    }
  ],
  "sentiment_prev_close": "175.00",
  "sentiment_current_close": "172.50",
  "sentiment_change": "-1.43",
  "sentiment_down_votes": "150",
  "sentiment_up_votes": "50"
}
````

````

--------------------------------

### Fetch Financial Data with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# snippet demonstrates fetching financial data using 'WebClient'. It shows how to deserialize JSON using either 'System.Web.Script.Serialization.JavaScriptSerializer' (for .NET Framework) or 'System.Text.Json' (for .NET Core). Ensure the appropriate .NET libraries are referenced.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=HT_PHASOR&symbol=IBM&interval=weekly&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch TEMA Data with JavaScript (Node.js) using request

Source: https://www.alphavantage.co/documentation/index

This JavaScript example demonstrates fetching TEMA data for IBM using Node.js and the 'request' library. It makes a GET request to the Alpha Vantage API and handles potential errors or successful responses, logging the parsed JSON data. Remember to substitute 'demo' with your valid API key. The code specifies the API function, symbol, interval, time period, series type, and API key.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=TEMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch PLUS_DI Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

Fetches PLUS_DI data using the Alpha Vantage API and Node.js with the 'request' module. It sends a GET request and handles the JSON response, logging any errors or the retrieved data. Requires the 'request' module to be installed.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=PLUS_DI&symbol=IBM&interval=daily&time_period=10&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch FX Intraday Data - Python

Source: https://www.alphavantage.co/documentation/index

Fetches intraday foreign exchange (FX) data for a given currency pair using the Alpha Vantage API. This Python script uses the `requests` library to make an HTTP GET request and then parses the JSON response. Ensure you have the `requests` library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch AD Line Data using Python

Source: https://www.alphavantage.co/documentation/index

Fetches the Chaikin A/D line (AD) values for a given stock symbol using the Alpha Vantage API. This example uses the `requests` library to make an HTTP GET request and `json` to parse the response. Replace 'demo' with your actual API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=NATR&symbol=IBM&interval=weekly&time_period=14&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Python API Request with Requests Library

Source: https://www.alphavantage.co/documentation/index

This Python code snippet demonstrates how to make a request to the Alpha Vantage API using the 'requests' library. It constructs the API URL with specified parameters and prints the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

API_KEY = 'YOUR_API_KEY'  # Replace with your actual API key
SYMBOL = 'IBM'
FUNCTION = 'WMA'
INTERVAL = 'weekly'
TIME_PERIOD = '10'
SERIES_TYPE = 'open'

base_url = 'https://www.alphavantage.co/query?'

params = {
    'function': FUNCTION,
    'symbol': SYMBOL,
    'interval': INTERVAL,
    'time_period': TIME_PERIOD,
    'series_type': SERIES_TYPE,
    'apikey': API_KEY
}

try:
    response = requests.get(base_url, params=params)
    response.raise_for_status()  # Raise an exception for bad status codes
    data = response.json()
    print(data)

except requests.exceptions.RequestException as e:
    print(f"Error making API request: {e}")
except ValueError as e:
    print(f"Error parsing JSON response: {e}")
```

---

### Fetch Income Statement Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script uses the `requests` library to fetch the income statement data for a given company symbol from the Alpha Vantage API. It makes an HTTP GET request and parses the JSON response. Ensure you have the `requests` library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch News Sentiment Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching news sentiment data using `WebClient` and parsing the JSON response. It shows options for both .NET Framework (using `JavaScriptSerializer`) and .NET Core (using `System.Text.Json`).

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch STOCHRSI Data with C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching Stochastic Relative Strength Index (STOCHRSI) data from the Alpha Vantage API using WebClient. It includes comments for handling JSON parsing with both .NET Framework's JavaScriptSerializer and .NET Core's System.Text.Json. Remember to replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=RSI&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Retail Sales Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python script demonstrates how to fetch retail sales data from the Alpha Vantage API using the 'requests' library. It requires an API key and outputs the data in JSON format. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=RETAIL_SALES&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### GET /query - Cash Flow Data

Source: https://www.alphavantage.co/documentation/index

Retrieves cash flow data for a specified stock symbol. Requires an API key. Examples are provided for Python, NodeJS, PHP, and C#.

````APIDOC
## GET /query - Cash Flow Data

### Description
Retrieves the cash flow statement for a specified company symbol. This endpoint is useful for analyzing a company's financial health and operational efficiency.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The API function to use, e.g., `CASH_FLOW`.
- **symbol** (string) - Required - The stock symbol of the company, e.g., `IBM`.
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **datatype** (string) - Optional - The desired data format, `json` (default) or `csv`.

### Request Example
`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=IBM&apikey=demo`

### Response
#### Success Response (200)
- **annualReports** (array) - An array of objects, where each object contains annual cash flow data.
- **yearlyCashFlow** (array) - An array of objects, where each object contains yearly cash flow summaries.

#### Response Example
```json
{
  "annualReports": [
    {
      "fiscalDateEnding": "2023-12-31",
      "reportedCurrency": "USD",
      "investments",
      "capitalExpenditures",
      "etc."
    }
  ],
  "yearlyCashFlow": [
    {
      "fiscalDateEnding": "2023-12-31",
      "reportedCurrency": "USD",
      "operatingCashflow",
      "leveragedFreeCashFlow",
      "etc."
    }
  ]
}
````

````

--------------------------------

### Python MFI API Request Example

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to make a request to the AlphaVantage API to retrieve MFI data. It uses the `requests` library and requires the `symbol`, `interval`, `time_period`, and `apikey` parameters. The output is expected in JSON format by default.

```python
import requests

url = "https://www.alphavantage.co/query?function=MFI&symbol=IBM&interval=weekly&time_period=10&apikey=demo"
response = requests.get(url)
data = response.json()

print(data)
````

---

### Fetch Bollinger Bands Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch Bollinger Bands data from Alpha Vantage. It includes logic for both .NET Framework (using JavaScriptSerializer) and .NET Core (using System.Text.Json) for JSON parsing. The WebClient class is used for making the HTTP request. Remember to replace 'demo' with your actual API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=BBANDS&symbol=IBM&interval=weekly&time_period=5&series_type=close&nbdevup=3&nbdevdn=3&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch Dividends Data with Python using requests

Source: https://www.alphavantage.co/documentation/index

Retrieves dividend data for a given stock symbol using the Alpha Vantage API. This example utilizes the 'requests' library in Python to make an HTTP GET request and parse the JSON response.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=DIVIDENDS&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### GET /query?function=UNEMPLOYMENT

Source: https://www.alphavantage.co/documentation/index

Retrieves unemployment data. Replace 'demo' with your actual API key.

```APIDOC
## GET /query?function=UNEMPLOYMENT

### Description
This endpoint retrieves unemployment data. The API key needs to be replaced with a valid one.

### Method
GET

### Endpoint
https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=demo

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the data function, in this case `UNEMPLOYMENT`.
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=UNEMPLOYMENT&apikey=demo

````

### Response
#### Success Response (200)
- **data** (object) - Contains the unemployment data.

#### Response Example
```json
{
    "data": [
        {
            "date": "2023-01-01",
            "value": "3.4"
        }
        // ... more data points
    ]
}
````

````

--------------------------------

### GET /query (Technical Indicators - KAMA Example)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves the KAMA (Kaufman's Adaptive Moving Average) technical indicator for a given symbol and interval. It allows specifying time period and series type, with optional month and data type parameters.

```APIDOC
## GET /query

### Description
Retrieves the KAMA (Kaufman's Adaptive Moving Average) technical indicator for a given symbol and interval. This endpoint allows for specifying the time period and series type, with optional month and data type parameters.

### Method
GET

### Endpoint
/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The technical indicator of your choice. Example: `KAMA`
- **symbol** (string) - Required - The name of the ticker of your choice. Example: `IBM`
- **interval** (string) - Required - Time interval between two consecutive data points. Supported values: `1min`, `5min`, `15min`, `30min`, `60min`, `daily`, `weekly`, `monthly`
- **time_period** (integer) - Required - Number of data points used to calculate each moving average value. Example: `60`
- **series_type** (string) - Required - The desired price type in the time series. Supported values: `close`, `open`, `high`, `low`
- **apikey** (string) - Required - Your API key.
- **month** (string) - Optional - Return technical indicators for a specific month in history. Format: `YYYY-MM`. Example: `2009-01`
- **datatype** (string) - Optional - The desired output format. Supported values: `json` (default), `csv`.

### Request Example
`https://www.alphavantage.co/query?function=KAMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo`

### Response
#### Success Response (200)
- **kama** (object) - Contains the KAMA values and metadata.
  - **1. open** (number) - The opening price.
  - **...**

#### Response Example
```json
{
    "Technical Analysis: KAMA": {
        "2023-10-27": {
            "KAMA": "150.1234"
        },
        "2023-10-26": {
            "KAMA": "149.9876"
        }
    }
}
````

````

--------------------------------

### Fetch Alpha Vantage HT_TRENDMODE Data in Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches weekly closing prices for IBM using the Alpha Vantage HT_TRENDMODE function. It uses the 'requests' library to make an HTTP GET request and then parses the JSON response. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=HT_TRENDMODE&symbol=IBM&interval=weekly&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### Fetch Aroon Oscillator Data with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching Aroon oscillator data using `WebClient`. It shows how to deserialize the JSON response using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Ensure you have the necessary references or using statements for the chosen JSON deserialization method.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=AROON&symbol=IBM&interval=daily&time_period=14&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch FX Monthly Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch monthly FX data from Alpha Vantage. It includes options for parsing JSON using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`. Ensure you have the necessary assembly references.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=EUR&to_symbol=USD&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch ADOSC Data with C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching ADOSC data using WebClient. It shows two methods for JSON parsing: one for .NET Framework using JavaScriptSerializer and another for .NET Core using System.Text.Json. Replace the placeholder API key with your actual key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=AD&symbol=IBM&interval=daily&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch ETF Profile Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script uses the 'requests' library to fetch ETF profile data from Alpha Vantage. It requires a valid API key and prints the JSON response. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=QQQ&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Aroon Oscillator Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet retrieves Aroon oscillator data from the Alpha Vantage API. It uses the 'requests' library to make an HTTP GET request and 'json' to parse the response. Ensure you have the 'requests' library installed (`pip install requests`). The output is the JSON response from the API.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=AROON&symbol=IBM&interval=daily&time_period=14&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Monthly Digital Currency Data (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching monthly digital currency data from the Alpha Vantage API using `WebClient`. It shows how to deserialize the JSON response using both `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) and `System.Text.Json.JsonSerializer` (for .NET Core). Ensure the appropriate JSON serializer is referenced or available in your project.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch ATR Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

This JavaScript code snippet demonstrates how to retrieve Average True Range (ATR) data using the 'request' library. It makes a GET request to the Alpha Vantage API and handles potential errors or successful responses by logging the fetched data. Ensure the 'request' library is installed ('npm install request').

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=ATR&symbol=IBM&interval=daily&time_time_period=14&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Stock Data (TRANGE) using Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches True Range (TRANGE) data for IBM using the Alpha Vantage API. It uses the 'requests' library to make the HTTP GET request and 'json()' to parse the response. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=SAR&symbol=IBM&interval=weekly&acceleration=0.05&maximum=0.25&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch ROC Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches the Rate of Change (ROC) data for IBM using the Alpha Vantage API. It uses the 'requests' library to make an HTTP GET request and 'json' to parse the response. Ensure the 'requests' library is installed (`pip install requests`). The output is the JSON data returned by the API.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=CMO&symbol=IBM&interval=weekly&time_period=10&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Monthly Time Series Data with Python using Requests

Source: https://www.alphavantage.co/documentation/index

This Python script uses the 'requests' library to fetch monthly time series data for a specified stock symbol from the Alpha Vantage API. It makes a GET request to the API endpoint and then parses the JSON response. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Alpha Vantage STOCHRSI API Request Example

Source: https://www.alphavantage.co/documentation/index

This is an example URL to request Stochastic RSI (STOCHRSI) technical indicator data from Alpha Vantage. It includes all required parameters and some optional ones like 'interval', 'time_period', 'series_type', 'fastkperiod', and 'fastdmatype'. The 'apikey' is set to 'demo'.

```url
https://www.alphavantage.co/query?function=STOCHRSI&symbol=IBM&interval=daily&time_period=10&series_type=close&fastkperiod=6&fastdmatype=1&apikey=demo
```

---

### Python Request for AlphaVantage API

Source: https://www.alphavantage.co/documentation/index

This Python code snippet demonstrates how to make a request to the AlphaVantage API using the 'requests' library. It constructs the API URL with specified parameters and prints the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# Define API parameters
function = "MIDPRICE"
symbol = "IBM"
interval = "daily"
time_period = 10
apikey = "demo" # Replace with your actual API key

# Construct the API URL
url = f"https://www.alphavantage.co/query?function={function}&symbol={symbol}&interval={interval}&time_period={time_period}&apikey={apikey}"

# Make the API request
response = requests.get(url)
data = response.json()

# Print the JSON response
print(data)
```

---

### Fetch ADOSC Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

Fetches ADOSC data for IBM from Alpha Vantage API using Node.js 'request' library. The code makes a GET request and logs the JSON response or any errors encountered. Requires the 'request' package to be installed.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=ADOSC&symbol=IBM&interval=daily&fastperiod=5&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Company Overview Data using Alpha Vantage API (NodeJS)

Source: https://www.alphavantage.co/documentation/index

This example demonstrates fetching company overview data via the Alpha Vantage API using NodeJS. It utilizes the 'request' library. The input is a URL specifying the function, symbol, and API key, and the output is a JSON object with company details. Error handling for the request is included.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves financial data based on specified parameters. It requires a function, symbol, interval, and an API key.

```APIDOC
## GET /query

### Description
This endpoint retrieves financial data, such as Average True Range (ATR), based on specified parameters. It requires a function, symbol, interval, and an API key.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The type of data to retrieve (e.g., TRANGE, ATR).
- **symbol** (string) - Required - The stock symbol (e.g., IBM).
- **interval** (string) - Optional - The data interval (e.g., daily, weekly, monthly).
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=TRANGE&symbol=IBM&interval=daily&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **The structure of the response will vary depending on the 'function' parameter.**

#### Response Example (for TRANGE function)
```json
{
    "symbol": "IBM",
    "interval": "daily",
    "TRANGE": [
        {
            "date": "2023-10-27",
            "TRANGE": "1.5000"
        },
        {
            "date": "2023-10-26",
            "TRANGE": "2.1000"
        }
    ],
    "information": "Monthly US prices listed in local currency."
}
````

````

--------------------------------

### Python Request Example for Alpha Vantage API

Source: https://www.alphavantage.co/documentation/index

Demonstrates how to make an API request to Alpha Vantage using the Python 'requests' library. This snippet requires the 'requests' library and constructs a URL with the specified API parameters to fetch ROCR data.

```python
import requests

# Define API parameters
api_params = {
    "function": "ROCR",
    "symbol": "IBM",
    "interval": "daily",
    "time_period": 10,
    "series_type": "close",
    "apikey": "YOUR_API_KEY"
}

# Construct the API URL
base_url = "https://www.alphavantage.co/query?"
response = requests.get(base_url, params=api_params)

# Get the JSON data
data = response.json()

# Print the data (or process it further)
print(data)
````

---

### Fetch Shares Outstanding Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches the shares outstanding for a given stock symbol (MSFT) from the Alpha Vantage API. It uses the 'requests' library to make an HTTP GET request and then parses the JSON response. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=SHARES_OUTSTANDING&symbol=MSFT&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Daily Time Series Data with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching daily time series data for IBM from Alpha Vantage using `WebClient`. It shows how to parse the JSON response using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). You will need to add the appropriate assembly references.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Realtime Bulk Quotes (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example demonstrates fetching real-time bulk quotes using `WebClient`. It shows how to deserialize the JSON response using both `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). An Alpha Vantage API key is necessary.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=MSFT,AAPL,IBM&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                //dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch MACD Data using C# (.NET Framework & Core)

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to download and parse MACD data from the Alpha Vantage API. It includes methods for both .NET Framework (using `JavaScriptSerializer`) and .NET Core (using `System.Text.Json`). The code uses `WebClient` to fetch the data and then deserializes the JSON string.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MACD&symbol=IBM&interval=daily&series_type=open&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Insider Transactions API Data - JavaScript

Source: https://www.alphavantage.co/documentation/index

This Node.js script fetches insider transaction data for IBM from the Alpha Vantage API. It utilizes the `request` library to perform the HTTP GET request and handle the JSON response asynchronously. Make sure to install the `request` module (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch DEMA Technical Indicator Data (C#)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching DEMA data using `WebClient`. It provides implementations for both .NET Framework (using `JavaScriptSerializer`) and .NET Core (using `System.Text.Json`) for JSON deserialization. You will need to add the appropriate assembly references for your .NET version.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=DEMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch MACDEXT Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching MACDEXT data for IBM from the Alpha Vantage API. It uses `WebClient` to download the data and includes examples for parsing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Ensure the necessary references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MACDEXT&symbol=IBM&interval=daily&series_type=open&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri)); // This line was commented out in the original input

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch AROONOSC Data using Python

Source: https://www.alphavantage.co/documentation/index

Fetches the Aroon Oscillator data for IBM using the Alpha Vantage API in Python. It uses the 'requests' library to make the HTTP GET request and 'json' to parse the response. The output is printed to the console. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=AROONOSC&symbol=IBM&interval=daily&time_period=10&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Top Gainers/Losers Data (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching top gainers and losers data from Alpha Vantage using `WebClient`. It shows how to deserialize the JSON response using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`. Ensure correct assembly references are added for the serializers.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // Note: The original code snippet had a duplicate declaration of json_data
                // This is a corrected version to show the .NET Core approach.
                // dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch Alpha Vantage HT_TRENDMODE Data in JavaScript

Source: https://www.alphavantage.co/documentation/index

This Node.js script retrieves weekly closing prices for IBM using the Alpha Vantage HT_TRENDMODE function. It utilizes the 'request' library to perform an HTTP GET request and handles the JSON response asynchronously. Ensure the 'request' library is installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=HT_TRENDMODE&symbol=IBM&interval=weekly&series_type=close&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### PHP MFI API Request Example

Source: https://www.alphavantage.co/documentation/index

This PHP snippet shows how to retrieve MFI data from AlphaVantage. It constructs the API URL with necessary parameters such as `function`, `symbol`, `interval`, `time_period`, and `apikey`. The result is typically returned as a JSON string.

```php
<?php

$url = 'https://www.alphavantage.co/query?function=MFI&symbol=IBM&interval=weekly&time_period=10&apikey=demo';
$json_data = file_get_contents($url);
$data = json_decode($json_data, true);

print_r($data);

?>
```

---

### Fetch MIDPRICE Data using Python

Source: https://www.alphavantage.co/documentation/index

This snippet shows how to retrieve MIDPRICE data for a given stock symbol using Python's 'requests' library. It makes a GET request to the Alpha Vantage API and parses the JSON response. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=MIDPRICE&symbol=IBM&interval=daily&time_period=10&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch PLUS_DI Data using Python

Source: https://www.alphavantage.co/documentation/index

Fetches PLUS_DI data for a given stock symbol using the Alpha Vantage API and Python's requests library. It makes a GET request to the API endpoint and parses the JSON response. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=PLUS_DI&symbol=IBM&interval=daily&time_period=10&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### GET /query (Currency Exchange Rate)

Source: https://www.alphavantage.co/documentation/index

Retrieves the real-time exchange rate between two currencies. Replace 'demo' with your actual API key.

````APIDOC
## GET /query (Currency Exchange Rate)

### Description
This API returns the realtime exchange rate for a pair of physical or cryptocurrency. Requires an API key.

### Method
GET

### Endpoint
https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=FROM&to_currency=TO&apikey=YOUR_API_KEY

### Parameters
#### Query Parameters
- **function** (string) - Required - The function of your choice. Use `CURRENCY_EXCHANGE_RATE`.
- **from_currency** (string) - Required - The currency you would like to get the exchange rate for. Examples: `USD`, `BTC`.
- **to_currency** (string) - Required - The destination currency for the exchange rate. Examples: `USD`, `BTC`.
- **apikey** (string) - Required - Your Alpha Vantage API key. Claim your free API key here.

### Request Example
*   US Dollar to Japanese Yen:
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=demo`
*   Bitcoin to Euro:
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo`

### Response
#### Success Response (200)
- The response is in JSON format, containing the `Realtime Currency Exchange Rate`.
  - **1. From_Currency Code** (string) - The code of the 'from' currency.
  - **2. From_Currency Name** (string) - The name of the 'from' currency.
  - **3. To_Currency Code** (string) - The code of the 'to' currency.
  - **4. To_Currency Name** (string) - The name of the 'to' currency.
  - **5. Exchange Rate** (string) - The current exchange rate.
  - **6. Last Refreshed** (string) - The timestamp when the rate was last updated.
  - **7. Time Zone** (string) - The time zone of the `Last Refreshed` timestamp.
  - **8. Bid Price** (string) - The bid price of the currency pair.
  - **9. Ask Price** (string) - The ask price of the currency pair.

#### Response Example
```json
{
    "Realtime Currency Exchange Rate": {
        "1. From_Currency Code": "USD",
        "2. From_Currency Name": "US Dollar",
        "3. To_Currency Code": "JPY",
        "4. To_Currency Name": "Japanese Yen",
        "5. Exchange Rate": "150.34500000",
        "6. Last Refreshed": "2023-10-27 10:00:00",
        "7. Time Zone": "UTC",
        "8. Bid Price": "150.34000000",
        "9. Ask Price": "150.35000000"
    }
}
````

````

--------------------------------

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieves retail sales data from Alpha Vantage. Requires a function and API key. Supports JSON and CSV output formats.

```APIDOC
## GET /query

### Description
This endpoint allows you to retrieve monthly retail sales data. You must provide a valid API key and specify the function as `RETAIL_SALES`. The output format can be specified using the `datatype` parameter, defaulting to JSON.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function to call, must be `RETAIL_SALES`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.
- **datatype** (string) - Optional - The desired output format. Accepts `json` (default) or `csv`.

### Request Example
`https://www.alphavantage.co/query?function=RETAIL_SALES&apikey=YOUR_API_KEY`

### Response
#### Success Response (200)
- **data** (object/string) - The retail sales data, in JSON or CSV format depending on the `datatype` parameter.

#### Response Example (JSON)
```json
{
  "data": [
    {
      "date": "2023-10-01",
      "value": "567890.0000"
    },
    {
      "date": "2023-09-01",
      "value": "560000.0000"
    }
    // ... more data
  ]
}
````

````

--------------------------------

### Fetch TRIX Indicator Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch TRIX indicator data using WebClient. It includes options for parsing JSON using either System.Web.Script.Serialization (for .NET Framework) or System.Text.Json (for .NET Core). The fetched data can then be processed.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TRIX&symbol=IBM&interval=daily&time_period=10&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch Balance Sheet Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script demonstrates how to fetch annual and quarterly balance sheet data for a specified company symbol using the Alpha Vantage API. It utilizes the `requests` library for making the HTTP GET request and expects a JSON response. Ensure `requests` is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Retail Sales Data using NodeJS

Source: https://www.alphavantage.co/documentation/index

This NodeJS script shows how to retrieve retail sales data from Alpha Vantage using the 'request' package. It handles potential errors and prints the JSON response. Make sure to install the 'request' package (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = "https://www.alphavantage.co/query?function=RETAIL_SALES&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch COTTON Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python script demonstrates how to fetch COTTON data from the Alpha Vantage API. It uses the `requests` library to make the API call and prints the JSON response. Ensure you have the `requests` library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=COTTON&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Insider Transactions API Data - Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches insider transaction data for a given stock symbol (IBM) from the Alpha Vantage API. It uses the `requests` library to make the HTTP GET request and then parses the JSON response. Ensure you have the `requests` library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch STOCHRSI Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches Stochastic Relative Strength Index (STOCHRSI) data from the Alpha Vantage API. It uses the 'requests' library to make a GET request and 'json' to parse the response. Ensure you have the 'requests' library installed. Replace 'demo' with your actual API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=RSI&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch AROONOSC Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

Fetches the Aroon Oscillator data for IBM using the Alpha Vantage API in JavaScript. It utilizes the 'request' library to perform the HTTP GET request and parses the JSON response. The retrieved data is logged to the console. Requires the 'request' module to be installed.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=AROONOSC&symbol=IBM&interval=daily&time_period=10&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Earnings Call Transcript Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches the earnings call transcript for a given stock symbol and quarter from the Alpha Vantage API. It uses the 'requests' library to make the HTTP GET request and 'json' to parse the response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=EARNINGS_CALL_TRANSCRIPT&symbol=IBM&quarter=2024Q1&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Crypto Intraday Data (C#)

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching cryptocurrency data in C# using `WebClient`. It shows how to deserialize the JSON response using either `JavaScriptSerializer` (for .NET Framework) or `System.Text.Json` (for .NET Core). Ensure the appropriate JSON serialization library is referenced.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch OBV Data with JavaScript using request

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet retrieves OBV data for IBM via the Alpha Vantage API. It uses the 'request' module to perform an asynchronous HTTP GET request and logs the JSON data upon successful retrieval. Remember to install the 'request' module.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=OBV&symbol=IBM&interval=weekly&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch DEMA Technical Indicator Data (JavaScript)

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet demonstrates fetching DEMA data using the `request` library. It makes an HTTP GET request and handles the response, logging any errors or status codes, and printing the parsed JSON data. Ensure the `request` module is installed.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=DEMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Treasury Yield Data using C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching monthly 10-year Treasury Yield data. It uses `WebClient` to download the data and includes examples for parsing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Remember to replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TREASURY_YIELD&interval=monthly&maturity=10year&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Weekly Time Series Data (Python)

Source: https://www.alphavantage.co/documentation/index

Fetches weekly time series data for a given stock symbol using the Alpha Vantage API. This example uses the 'requests' library to make the HTTP GET request and parse the JSON response. It requires a valid API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch IBM Stock Quote using Alpha Vantage API in Python

Source: https://www.alphavantage.co/documentation/index

This Python script fetches the global quote for IBM using the Alpha Vantage API. It utilizes the 'requests' library to make an HTTP GET request and then parses the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Weekly Time Series Data (NodeJS)

Source: https://www.alphavantage.co/documentation/index

Fetches weekly time series data for a given stock symbol using the Alpha Vantage API. This example uses the 'request' library to make the HTTP GET request and handle the JSON response. An API key is required for the request.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### GET /timeseries/analytics

Source: https://www.alphavantage.co/documentation/index

This endpoint returns a rich set of advanced analytics metrics (e.g., total return, variance, auto-correlation, etc.) for a given time series over sliding time windows. For example, we can calculate a moving variance over 5 years with a window of 100 points to see how the variance changes over time.

```APIDOC
## GET /timeseries/analytics

### Description
This endpoint returns advanced analytics metrics for a given time series over sliding time windows. It allows for calculations such as moving variance, auto-correlation, and more.

### Method
GET

### Endpoint
`https://alphavantageapi.co/timeseries/analytics`

### Parameters
#### Query Parameters
- **SYMBOLS** (string) - Required - Comma-separated list of stock symbols (e.g., AAPL,MSFT,IBM).
- **RANGE** (string) - Required - Start date for the data range (YYYY-MM-DD).
- **RANGE** (string) - Required - End date for the data range (YYYY-MM-DD). Note: This parameter can be specified multiple times for a date range.
- **INTERVAL** (string) - Required - The time interval between two consecutive data points in the time series (e.g., DAILY, WEEKLY, MONTHLY).
- **OHLC** (string) - Required - The type of price data to use for calculations (e.g., open, high, low, close).
- **CALCULATIONS** (string) - Required - Comma-separated list of calculations to perform (e.g., MEAN,STDDEV,CORRELATION).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

https://alphavantageapi.co/timeseries/analytics?SYMBOLS=AAPL,MSFT,IBM&RANGE=2023-07-01&RANGE=2023-08-31&INTERVAL=DAILY&OHLC=close&CALCULATIONS=MEAN,STDDEV,CORRELATION&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **data** (object) - A JSON object containing the calculated analytics for the specified symbols and parameters.

#### Response Example
```json
{
  "data": {
    "AAPL": {
      "close": {
        "MEAN": 175.50,
        "STDDEV": 2.34,
        "CORRELATION": {
          "MSFT": 0.95,
          "IBM": 0.88
        }
      }
    },
    "MSFT": {
      "close": {
        "MEAN": 330.20,
        "STDDEV": 3.10,
        "CORRELATION": {
          "AAPL": 0.95,
          "IBM": 0.90
        }
      }
    },
    "IBM": {
      "close": {
        "MEAN": 140.75,
        "STDDEV": 1.98,
        "CORRELATION": {
          "AAPL": 0.88,
          "MSFT": 0.90
        }
      }
    }
  }
}
````

````

--------------------------------

### Fetch ROC Data with C# using WebClient

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching ROC data from the Alpha Vantage API using `System.Net.WebClient`. It shows how to deserialize the JSON response using either `JavaScriptSerializer` (for .NET Framework) or `System.Text.Json` (for .NET Core). Ensure appropriate references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=ROC&symbol=IBM&interval=weekly&time_period=10&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

````

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves company overview information. You need to specify the function, the stock symbol, and your API key.

````APIDOC
## GET /query

### Description
Retrieves company overview information including financial metrics, company description, and more.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the data to retrieve. For company overview, use `OVERVIEW`.
- **symbol** (string) - Required - The stock symbol of the company (e.g., `IBM`).
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
`https://www.alphavantage.co/query?function=OVERVIEW&symbol=IBM&apikey=demo`

### Response
#### Success Response (200)
- **Symbol** (string) - The stock symbol.
- **AssetType** (string) - The type of asset.
- **Name** (string) - The name of the company.
- **Description** (string) - A description of the company.
- **Exchange** (string) - The stock exchange where the company is listed.
- **Currency** (string) - The currency of the stock price.
- **Country** (string) - The country where the company is based.
- **Sector** (string) - The industry sector the company belongs to.
- **Industry** (string) - The specific industry of the company.
- **MarketCap** (string) - The market capitalization of the company.
- **PERatio** (string) - The price-to-earnings ratio.
- **DividendYield** (string) - The dividend yield.
- **52WeekHigh** (string) - The 52-week high price.
- **52WeekLow** (string) - The 52-week low price.
- **50DayMovingAverage** (string) - The 50-day moving average.
- **200DayMovingAverage** (string) - The 200-day moving average.
- **AvgVolume** (string) - The average daily trading volume.
- **Volume** (string) - The current trading volume.
- **LatestQuarter** (string) - The date of the latest reported quarter.
- **MarketCapFloat** (string) - The market cap float.
- **SharesOutstanding** (string) - The number of shares outstanding.
- **BookValue** (string) - The book value per share.
- **DividendPerShare** (string) - The dividend per share.
- **ProfitMargin** (string) - The net profit margin.
- **PriceToSalesRatio** (string) - The price-to-sales ratio.
- **PriceToBookRatio** (string) - The price-to-book ratio.
- **SECFilings** (string) - Link to SEC filings.

#### Response Example
```json
{
  "Symbol": "IBM",
  "AssetType": "Common Stock",
  "Name": "International Business Machines Corporation",
  "Description": "International Business Machines Corporation (IBM) is a global technology and consulting company. IBM's stock is a component of the Dow Jones Industrial Average and the S&P 500 index.",
  "Exchange": "NYSE",
  "Currency": "USD",
  "Country": "United States",
  "Sector": "Information Technology",
  "Industry": "Computer Hardware & Software",
  "MarketCap": "130364200000",
  "PERatio": "25.9439",
  "DividendYield": "0.0469",
  "52WeekHigh": "146.41",
  "52WeekLow": "117.42",
  "50DayMovingAverage": "132.1234",
  "200DayMovingAverage": "135.6789",
  "AvgVolume": "4500000",
  "Volume": "3800000",
  "LatestQuarter": "2023-09-30",
  "MarketCapFloat": "129500000000",
  "SharesOutstanding": "930000000",
  "BookValue": "45.23",
  "DividendPerShare": "6.56",
  "ProfitMargin": "0.15",
  "PriceToSalesRatio": "2.5",
  "PriceToBookRatio": "3.1",
  "SECFilings": "https://www.sec.gov/edgar/browse/?CIK=0000320193"
}
````

````

--------------------------------

### Fetch TEMA Data with C# (.NET Framework and .NET Core)

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch TEMA data for IBM using Alpha Vantage API. It includes implementations for both .NET Framework (using JavaScriptSerializer) and .NET Core (using System.Text.Json). The code uses WebClient to download the string and then deserializes the JSON. Remember to replace 'demo' with your actual API key. Note that .NET Core JSON parsing can be more complex.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TEMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch and Parse HT_DCPERIOD Data (Python)

Source: https://www.alphavantage.co/documentation/index

This Python script fetches daily closing prices for IBM using the Alpha Vantage API's HT_DCPERIOD function. It uses the 'requests' library to make the HTTP GET request and 'r.json()' to parse the JSON response. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=HT_DCPERIOD&symbol=IBM&interval=daily&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch and Parse HT_DCPERIOD Data (C#)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching daily closing prices for IBM using the Alpha Vantage API's HT_DCPERIOD function. It shows how to use 'WebClient' to download the data and includes options for parsing JSON using either 'JavaScriptSerializer' (for .NET Framework) or 'System.Text.Json' (for .NET Core). Ensure correct namespaces are included.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=HT_DCPERIOD&symbol=IBM&interval=daily&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Stock Data (TRANGE) using JavaScript

Source: https://www.alphavantage.co/documentation/index

This Node.js script fetches True Range (TRANGE) data for IBM using the Alpha Vantage API. It utilizes the 'request' library to perform the HTTP GET request and handles the JSON response asynchronously. Make sure to install the 'request' package.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=SAR&symbol=IBM&interval=weekly&acceleration=0.05&maximum=0.25&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch and Parse STOCHF Data with C# (.NET Framework/.NET Core)

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching Stochastic Fast (STOCHF) data for IBM from Alpha Vantage. It shows how to use `WebClient` to download the JSON string and includes examples for parsing it using `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Remember to add the necessary assembly references.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=STOCHF&symbol=IBM&interval=daily&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch Earnings Call Transcript Data with JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This JavaScript code snippet, intended for Node.js, retrieves earnings call transcripts using the 'request' module. It makes an HTTP GET request to the Alpha Vantage API and logs the data or any errors encountered. Ensure you have the 'request' module installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=EARNINGS_CALL_TRANSCRIPT&symbol=IBM&quarter=2024Q1&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Earnings Calendar Data (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching earnings calendar data from Alpha Vantage using 'System.Net.WebClient' and parsing the CSV content with the 'CsvHelper' NuGet package. It requires .NET Framework or .Net Core. Ensure your API key replaces 'demo'.

```cs
using CsvHelper;
using System;
using System.Globalization;
using System.IO;
using System.Net;

// Compatible with any recent version of .NET Framework or .Net Core

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=EARNINGS_CALENDAR&horizon=3month&apikey=demo";

            Uri queryUri = new Uri(QUERY_URL);

            // print the output
            // This example uses the fine nuget package CsvHelper (https://www.nuget.org/packages/CsvHelper/)

            CultureInfo culture = CultureInfo.CreateSpecificCulture("en-US");
            using (WebClient client = new WebClient())
            {
                using (MemoryStream stream = new MemoryStream(client.DownloadDataTaskAsync(queryUri).Result))
                {
                    stream.Position = 0;

                    using (StreamReader reader = new StreamReader(stream))
                    {
                        using (CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Read();
                            csv.ReadHeader();
                            Console.WriteLine(string.Join("\t", csv.HeaderRecord));
                            while (csv.Read())
                            {
                                Console.WriteLine(string.Join("\t", csv.Parser.Record));
                            }
                        }
                    }
                }
            }
        }
    }
}
```

---

### NodeJS MFI API Request Example

Source: https://www.alphavantage.co/documentation/index

This NodeJS snippet illustrates how to fetch MFI data from the AlphaVantage API using a client-side request. It requires specifying the `function`, `symbol`, `interval`, `time_period`, and `apikey`. The response is typically handled as JSON.

```javascript
const fetch = require("node-fetch");

const url =
  "https://www.alphavantage.co/query?function=MFI&symbol=IBM&interval=weekly&time_period=10&apikey=demo";

fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error("Error:", error));
```

---

### WHEAT Data API (Monthly Interval)

Source: https://www.alphavantage.co/documentation/index

This example demonstrates how to fetch monthly WHEAT data using the Alpha Vantage API. It includes code snippets for Python, NodeJS, PHP, and C#.

````APIDOC
## GET /query

### Description
Fetches historical WHEAT data at a monthly interval.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - Set to `WHEAT`.
- **interval** (string) - Required - Set to `monthly`.
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example (Python)
```python
import requests

url = 'https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

### Request Example (NodeJS)

```javascript
var request = require("request");

var url =
  "https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      console.log(data);
    }
  },
);
```

### Request Example (PHP)

```php
<?php
$json = file_get_contents('https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo');
$data = json_decode($json,true);
print_r($data);
exit;
?>
```

### Request Example (C#)

```csharp
using System;
using System.Collections.Generic;
using System.Net;
using System.Web.Script.Serialization;
using System.Text.Json;

// ... other using statements

string QUERY_URL = "https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo";
Uri queryUri = new Uri(QUERY_URL);

using (WebClient client = new WebClient()) {
    // For .NET Framework:
    JavaScriptSerializer js = new JavaScriptSerializer();
    dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

    // For .NET Core:
    dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

    // Process json_data_framework or json_data_core
}
```

### Response

#### Success Response (200)

- **data** (object) - Contains time series data for WHEAT prices.
- **meta-data** (object) - Metadata about the data source and refresh times.

#### Response Example

```json
{
  "data": [
    {
      "date": "2023-10-01",
      "close": "120.50"
    }
  ],
  "meta-data": {
    "Information": "Monthly WHEAT Prices",
    "Symbol": "WHEAT",
    "Last Refreshed": "2023-10-26"
  }
}
```

````

--------------------------------

### Fetch MINUS_DI Data with C#

Source: https://www.alphavantage.co/documentation/index

Fetches the Minus Directional Indicator (MINUS_DI) data using C#. This example demonstrates how to use 'WebClient' to download data and then parse it using either 'JavaScriptSerializer' (for .NET Framework) or 'System.Text.Json' (for .NET Core). An API key is required.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=DX&symbol=IBM&interval=daily&time_period=10&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch TRANGE Data with C# - Alpha Vantage API

Source: https://www.alphavantage.co/documentation/index

This C# code example shows how to fetch stock ATR data from the Alpha Vantage API using `WebClient`. It includes commented-out sections for parsing JSON using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`. Ensure your API key replaces 'demo'.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TRANGE&symbol=IBM&interval=daily&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves financial data. It supports various functions, including MIDPRICE, and requires a symbol, interval, time period, and an API key.

```APIDOC
## GET /query

### Description
This endpoint retrieves financial data. It supports various functions, including MIDPRICE, and requires a symbol, interval, time period, and an API key.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Query Parameters
- **function** (string) - Required - The type of data to retrieve (e.g., MIDPRICE).
- **symbol** (string) - Required - The stock symbol (e.g., IBM).
- **interval** (string) - Required - The interval for the data (e.g., daily).
- **time_period** (integer) - Required - The time period for the data (e.g., 10).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=MIDPRICE&symbol=IBM&interval=daily&time_period=10&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **metadata** (object) - Contains metadata about the returned data.
- **technicalAnalysis** (object) - Contains the technical analysis data, such as SAR values.

#### Response Example
```json
{
  "information": {
    "symbol": "IBM",
    "interval": "daily",
    "time_period": 10,
    "timezone": "EST"
  },
  "technicalAnalysis": {
    "SAR": [
      {
        "3.21.2023": "148.5000"
      },
      {
        "3.20.2023": "149.0000"
      }
    ]
  }
}
````

````

--------------------------------

### Fetch Weekly Adjusted Time Series Data (NodeJS)

Source: https://www.alphavantage.co/documentation/index

Fetches weekly adjusted time series data for a given stock symbol using the Alpha Vantage API in NodeJS. It uses the 'request' library to perform an HTTP GET request and handles the JSON response. Ensure you have the 'request' library installed (`npm install request`).

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch Nonfarm Payroll Data URL

Source: https://www.alphavantage.co/documentation/index

Provides the URL format for fetching Total Nonfarm Payroll data from Alpha Vantage. This example shows the required parameters: function and apikey, and mentions optional datatype.

```url
https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=demo
```

---

### Constructing an AlphaVantage API Request URL

Source: https://www.alphavantage.co/documentation/index

This example demonstrates how to construct a valid URL to query the AlphaVantage API for technical indicator data. It requires specifying the function, symbol, interval, series_type, and apikey. The optional datatype parameter can also be included.

```url
https://www.alphavantage.co/query?function=HT_TRENDMODE&symbol=IBM&interval=weekly&series_type=close&apikey=demo
```

---

### Fetch Weekly Adjusted Time Series Data (Python)

Source: https://www.alphavantage.co/documentation/index

Fetches weekly adjusted time series data for a given stock symbol using the Alpha Vantage API in Python. It utilizes the 'requests' library to make an HTTP GET request and parses the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Cash Flow Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet is a placeholder to demonstrate fetching cash flow data. It uses the 'requests' library and requires the user to provide their own API key and specify the stock symbol. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
# and change the symbol for the company of your choice

url = 'https://www.alphavantage.co/query?function=CASH_FLOW&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Alpha Vantage HT_TRENDMODE Data in C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching weekly closing prices for IBM using the Alpha Vantage HT_TRENDMODE function. It shows how to use `WebClient` to download the JSON string and includes methods for deserializing JSON using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=HT_TRENDMODE&symbol=IBM&interval=weekly&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Fetches intraday cryptocurrency price data. You can specify the cryptocurrency, market, interval, and other options to customize your request.

```APIDOC
## GET /query

### Description
Fetches intraday cryptocurrency price data. You can specify the cryptocurrency, market, interval, and other options to customize your request.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The time series function. Use `CRYPTO_INTRADAY` for cryptocurrency intraday data.
- **symbol** (string) - Required - The cryptocurrency symbol (e.g., `ETH`).
- **market** (string) - Required - The market/exchange currency (e.g., `USD`).
- **interval** (string) - Required - The data interval. Supported values: `1min`, `5min`, `15min`, `30min`, `60min`.
- **outputsize** (string) - Optional - Controls the amount of data returned. `compact` (default) returns the latest 100 data points. `full` returns the complete time series.
- **datatype** (string) - Optional - Specifies the output format. `json` (default) returns JSON. `csv` returns a CSV file.
- **apikey** (string) - Required - Your AlphaVantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- The response format depends on the `datatype` parameter. For `json`, it will be a JSON object containing intraday price data. For `csv`, it will be a CSV formatted string.

#### Response Example (JSON)
```json
{
    "Symbol": "ETH",
    "Market": "USD",
    "interval": "5min",
    "MarketOpen": "1677056700",
    "MarketClose": "1677058500",
    "Timezone": "UTC",
    "Data": [
        {
            "datetime": "2023-02-22 10:00:00",
            "open": {
                "1": "1675.00",
                "5": "1675.00",
                "15": "1675.00",
                "30": "1675.00",
                "60": "1675.00"
            },
            "high": {
                "1": "1676.00",
                "5": "1676.00",
                "15": "1676.00",
                "30": "1676.00",
                "60": "1676.00"
            },
            "low": {
                "1": "1674.00",
                "5": "1674.00",
                "15": "1674.00",
                "30": "1674.00",
                "60": "1674.00"
            },
            "close": {
                "1": "1675.50",
                "5": "1675.50",
                "15": "1675.50",
                "30": "1675.50",
                "60": "1675.50"
            },
            "volume": {
                "1": "100.00",
                "5": "500.00",
                "15": "1500.00",
                "30": "3000.00",
                "60": "6000.00"
            }
        }
    ],
    "Information": "Historical intraday prices data"
}
````

````

--------------------------------

### Fetch DURABLES Data using NodeJS

Source: https://www.alphavantage.co/documentation/index

Illustrates fetching DURABLES data from the Alpha Vantage API using NodeJS. This example utilizes the 'request' library to make an HTTP request and handle the JSON response. Requires the 'request' library.

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=DURABLES&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch Top Gainers/Losers Data (Python)

Source: https://www.alphavantage.co/documentation/index

This Python script uses the 'requests' library to fetch the top gainers and losers data from the Alpha Vantage API. It requires an API key and returns data in JSON format. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Real GDP Per Capita Data (NodeJS)

Source: https://www.alphavantage.co/documentation/index

Shows how to retrieve Real GDP Per Capita data using NodeJS and the 'request' module. This example requires the 'request' module and a valid API key. It handles potential errors and logs the JSON data.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Market Status Data using C# (.NET Framework & .NET Core)

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching market status data from Alpha Vantage. It includes examples for parsing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). You will need to uncomment the relevant section based on your .NET version.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MARKET_STATUS&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}

```

---

### Fetch Running Analytics Data with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching running analytics data from the Alpha Vantage API using `WebClient`. It includes examples for parsing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Ensure necessary references are added to your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://alphavantageapi.co/timeseries/running_analytics?SYMBOLS=AAPL,IBM&RANGE=2month&INTERVAL=DAILY&OHLC=close&WINDOW_SIZE=20&CALCULATIONS=MEAN,STDDEV(annualized=True)&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri)); // This line is commented out as it duplicates json_data

                // Note: The following line for .NET Core parsing is commented out in the original example to avoid duplication. Uncomment and use as needed.
                // dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch WMA Data with C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching Weighted Moving Average (WMA) data for IBM using the Alpha Vantage API in C#. It shows how to use 'WebClient' to download the JSON string and provides examples for parsing it using both .NET Framework's 'JavaScriptSerializer' and .NET Core's 'System.Text.Json'. Ensure the API key is updated.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=WMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves the Minus Directional Indicator (MINUS_DI) values for a given symbol and interval. Replace 'demo' with your actual API key.

```APIDOC
## GET /query

### Description
This endpoint retrieves the Minus Directional Indicator (MINUS_DI) values for a given symbol and interval. It requires an API key for authentication.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function to execute, e.g., `DX` for Minus Directional Indicator.
- **symbol** (string) - Required - The stock symbol (e.g., `IBM`).
- **interval** (string) - Required - The time interval between two consecutive data points in hours (e.g., `daily`).
- **time_period** (integer) - Required - The time period over which to calculate the indicator.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=DX&symbol=IBM&interval=daily&time_period=10&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **data** (object) - Contains the MINUS_DI values and related metadata.

#### Response Example
```json
{
  "information": "Thank you for using Alpha Vantage!",
  "symbol": "IBM",
  "interval": "daily",
  "time_period": 10,
  "MINUS_DI": [
    {
      "date": "YYYY-MM-DD",
      "MINUS_DI": "value"
    }
    // ... more data points
  ],
  "technicalIndicator": "Minus Directional Indicator"
}
````

````

--------------------------------

### Fetch CMO Data using Alpha Vantage API (JavaScript)

Source: https://www.alphavantage.co/documentation/index

This JavaScript example retrieves Chande Momentum Oscillator (CMO) data from Alpha Vantage using the 'request' library. It handles potential errors during the request and checks the HTTP status code before processing the JSON response. Ensure you have the 'request' package installed.

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=CCI&symbol=IBM&interval=daily&time_period=10&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch Realtime Bulk Quotes (Python)

Source: https://www.alphavantage.co/documentation/index

This Python script uses the 'requests' library to fetch real-time bulk quotes for specified stock symbols. It requires an Alpha Vantage API key and outputs the JSON response. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=MSFT,AAPL,IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch STOCHRSI Data with JavaScript

Source: https://www.alphavantage.co/documentation/index

This JavaScript code snippet retrieves Stochastic Relative Strength Index (STOCHRSI) data using the 'request' library. It performs a GET request to the Alpha Vantage API and logs the JSON response. Make sure to install the 'request' package. Remember to substitute the 'demo' API key with your valid key.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=RSI&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch MACDEXT Data using JavaScript

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet uses the 'request' library to fetch MACDEXT data for IBM from the Alpha Vantage API. It handles potential errors during the request and checks the HTTP status code before logging the JSON data. Ensure the 'request' library is installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=MACDEXT&symbol=IBM&interval=daily&series_type=open&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### GET /query (HT_SINE)

Source: https://www.alphavantage.co/documentation/index

Fetches the Hilbert transform, sine wave (HT_SINE) values for a given stock symbol. Replace 'demo' with your actual API key.

````APIDOC
## GET /query (HT_SINE)

### Description
This endpoint retrieves the Hilbert Transform - Sine wave (HT_SINE) values for a specified stock symbol. Ensure you replace the placeholder 'demo' API key with your actual Alpha Vantage API key.

### Method
GET

### Endpoint
https://www.alphavantage.co/query?function=HT_SINE&symbol={SYMBOL}&interval={INTERVAL}&series_type={SERIES_TYPE}&apikey={API_KEY}

### Parameters
#### Query Parameters
- **function** (string) - Required - Must be set to `HT_SINE`.
- **symbol** (string) - Required - The stock symbol for which to retrieve data (e.g., `IBM`).
- **interval** (string) - Required - The time interval between two consecutive data points in the time series (e.g., `daily`, `60min`, `30min`, `15min`, `5min`, `1min`).
- **series_type** (string) - Required - The type of series to return. Supported values are `close`, `open`, `high`, `low`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key. Replace 'demo' with your actual key.

### Request Example
```php
<?php
// Replace 'demo' apikey with your own key
$json = file_get_contents('https://www.alphavantage.co/query?function=HT_SINE&symbol=IBM&interval=daily&series_type=close&apikey=YOUR_API_KEY');
$data = json_decode($json, true);
print_r($data);
?>
````

### Response

#### Success Response (200)

- **symbol** (string) - The stock symbol.
- **Technical Analysis: HT_SINE** (object) - An object containing the HT_SINE values for each date.
  - **YYYY-MM-DD HH:MM:SS** (string) - The HT_SINE value for the given timestamp.

#### Response Example

```json
{
  "symbol": "IBM",
  "Technical Analysis: HT_SINE": {
    "2023-10-27 16:00:00": "-1.2345",
    "2023-10-26 16:00:00": "-1.3000"
  }
}
```

````

--------------------------------

### Fetch Stock Symbol Data with Alpha Vantage API (Python)

Source: https://www.alphavantage.co/documentation/index

This Python script uses the requests library to fetch stock symbol search data from the Alpha Vantage API. It requires the 'requests' library to be installed. The script sends a GET request to the API endpoint with specified keywords and an API key, then prints the JSON response.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### Fetch Monthly Digital Currency Data (Python)

Source: https://www.alphavantage.co/documentation/index

This Python script uses the 'requests' library to fetch monthly digital currency data from the Alpha Vantage API. It requires a valid API key and specifies the cryptocurrency symbol and market. The output is printed as a JSON object. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch IBM Stock Quote using Alpha Vantage API in JavaScript

Source: https://www.alphavantage.co/documentation/index

This JavaScript code fetches the global quote for IBM using the Alpha Vantage API. It uses the 'request' module to perform an HTTP GET request and handles the response, logging any errors or the retrieved data. Make sure to install the 'request' module (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch MIDPOINT Data - C# (.NET Framework / .NET Core)

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching MIDPOINT data from Alpha Vantage API in C#. Includes examples for both .NET Framework (using JavaScriptSerializer) and .NET Core (using System.Text.Json) for JSON parsing. Requires adding relevant assembly references.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MIDPOINT&symbol=IBM&interval=daily&time_period=10&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieve the Percentage Price Oscillator (PPO) technical indicator.

```APIDOC
## GET /query

### Description
This endpoint retrieves the Percentage Price Oscillator (PPO) technical indicator for a specified stock symbol and interval. It allows for customization of various parameters to tailor the indicator calculation.

### Method
GET

### Endpoint
/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The technical indicator function. Use `PPO` for Percentage Price Oscillator.
- **symbol** (string) - Required - The ticker symbol of the stock (e.g., `IBM`).
- **interval** (string) - Required - The time interval between data points. Supported values: `1min`, `5min`, `15min`, `30min`, `60min`, `daily`, `weekly`, `monthly`.
- **month** (string) - Optional - The month for historical data in `YYYY-MM` format (e.g., `2009-01`). Defaults to current data if not specified.
- **series_type** (string) - Required - The desired price type in the time series. Supported values: `close`, `open`, `high`, `low`.
- **fastperiod** (integer) - Optional - The fast period for the PPO calculation. Defaults to `12`.
- **slowperiod** (integer) - Optional - The slow period for the PPO calculation. Defaults to `26`.
- **matype** (integer) - Optional - The moving average type. Defaults to `0`. Accepted values range from 0 to 8, where 0 = SMA, 1 = EMA, 2 = WMA, 3 = DEMA, 4 = TEMA, 5 = TRIMA, 6 = T3, 7 = KAMA, 8 = MAMA.
- **datatype** (string) - Optional - The format for the returned data. Supported values: `json` (default), `csv`.
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=PPO&symbol=IBM&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **symbol** (string) - The ticker symbol for which the PPO is calculated.
- **indicator** (string) - The name of the technical indicator (e.g., `PPO`).
- **interval** (string) - The interval of the data (e.g., `daily`).
- **series_type** (string) - The type of series used (e.g., `close`).
- **PPO** (object) - An object containing timestamped PPO values.
  - **YYYY-MM-DD HH:MM:SS** (string) - The PPO value for the corresponding timestamp.
- **FASTPERIOD** (integer) - The fast period used.
- **SLOWPERIOD** (integer) - The slow period used.
- **MATYPE** (integer) - The moving average type used.

#### Response Example (JSON)
```json
{
    "symbol": "IBM",
    "indicator": "PPO",
    "interval": "daily",
    "series_type": "close",
    "PPO": {
        "2023-10-26 00:00:00": "0.5234",
        "2023-10-25 00:00:00": "0.4891",
        "2023-10-24 00:00:00": "0.4578"
    },
    "FASTPERIOD": 10,
    "SLOWPERIOD": 26,
    "MATYPE": 1
}
````

````

--------------------------------

### GET /query (Currency Exchange Rate)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves the current exchange rate between two currencies. Replace 'demo' with your actual API key.

```APIDOC
## GET /query (Currency Exchange Rate)

### Description
Retrieves the current exchange rate between two specified currencies.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the API function. Use `CURRENCY_EXCHANGE_RATE` for this endpoint.
- **from_currency** (string) - Required - The currency you want to convert from (e.g., BTC).
- **to_currency** (string) - Required - The currency you want to convert to (e.g., EUR).
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
````

https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **Realtime Currency Exchange Rate** (object) - Contains the exchange rate information.
  - **1. From_Currency** (string) - The 'from' currency symbol.
  - **2. To_Currency** (string) - The 'to' currency symbol.
  - **3. Exchange Rate** (string) - The current exchange rate.
  - **4. Last Refreshed** (string) - The timestamp of the last data refresh.
  - **5. Time Zone** (string) - The time zone of the data.
  - **6. Bid Price** (string) - The bid price of the currency pair.
  - **7. Ask Price** (string) - The ask price of the currency pair.

#### Response Example
```json
{
    "Realtime Currency Exchange Rate": {
        "1. From_Currency": "BTC",
        "2. To_Currency": "EUR",
        "3. Exchange Rate": "35123.45",
        "4. Last Refreshed": "2023-10-27 10:00:00",
        "5. Time Zone": "UTC",
        "6. Bid Price": "35120.00",
        "7. Ask Price": "35126.90"
    }
}
````

````

--------------------------------

### GET /query?function=CURRENCY_EXCHANGE_RATE

Source: https://www.alphavantage.co/documentation/index

Retrieves the current exchange rate between two currencies. Replace 'demo' with your actual API key.

```APIDOC
## GET /query?function=CURRENCY_EXCHANGE_RATE

### Description
Retrieves the current exchange rate between two specified currencies. This endpoint requires a valid API key.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function to use. For currency exchange rates, use `CURRENCY_EXCHANGE_RATE`.
- **from_currency** (string) - Required - The currency you want to convert from (e.g., USD).
- **to_currency** (string) - Required - The currency you want to convert to (e.g., JPY).
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
`https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=JPY&apikey=YOUR_API_KEY`

### Response
#### Success Response (200)
- **Realtime Currency Exchange Rate** (object) - Contains the exchange rate details.
  - **1. From_Currency** (string) - The "from" currency.
  - **2. To_Currency** (string) - The "to" currency.
  - **3. Exchange Rate** (string) - The current exchange rate.
  - **4. Last Refreshed** (string) - The timestamp when the rate was last updated.
  - **5. Time Zone** (string) - The time zone of the data.
  - **6.bid Price** (string) - The bid price.
  - **7.ask Price** (string) - The ask price.

#### Response Example
```json
{
    "Realtime Currency Exchange Rate": {
        "1. From_Currency": "USD",
        "2. To_Currency": "JPY",
        "3. Exchange Rate": "150.50000000",
        "4. Last Refreshed": "2023-10-27 10:00:00",
        "5. Time Zone": "UTC",
        "6. bid Price": "150.49000000",
        "7. ask Price": "150.51000000"
    }
}
````

````

--------------------------------

### Fetch Coffee Commodity Data using NodeJS

Source: https://www.alphavantage.co/documentation/index

This NodeJS script uses the 'request' library to retrieve monthly coffee commodity data from Alpha Vantage. It requires an API key and handles potential errors during the request. Ensure the 'request' library is installed (`npm install request`).

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint allows you to retrieve financial data, such as the global price of cotton. You can specify the function, interval, and your API key.

```APIDOC
## GET /query

### Description
This endpoint retrieves financial data, such as the global price of cotton. It supports various functions and intervals, requiring an API key for access.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The name of the API function to use (e.g., "CORN").
- **interval** (string) - Optional - The data interval (e.g., "monthly", "quarterly", "annual").
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=CORN&interval=monthly&apikey=demo

````

### Response
#### Success Response (200)
- **data** (object) - The JSON object containing the requested financial data.

#### Response Example
```json
{
  "information": "Monthly OHLC, Volume, and more values for CORN (Global)",
  "symbol": "CORN",
  "last_updated": "2023-10-27 17:00:01 UTC",
  "monthly_prices": [
    {
      "date": "2023-09-29",
      "open": "5.0000",
      "high": "6.0000",
      "low": "4.5000",
      "close": "5.5000",
      "volume": "100000"
    }
    // ... more monthly data
  ]
}
````

````

--------------------------------

### Fetch Intraday Stock Data (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C#/.NET code example demonstrates fetching intraday stock data from Alpha Vantage. It uses HttpClient to make the API request. The function requires the stock symbol, interval, and API key, returning the data as a string (expected to be JSON).

```csharp
using System.Net.Http;
using System.Threading.Tasks;

public class AlphaVantageClient
{
    private readonly HttpClient _httpClient;

    public AlphaVantageClient()
    {
        _httpClient = new HttpClient();
    }

    public async Task<string> GetIntradayStockDataAsync(string symbol, string interval, string apiKey)
    {
        string url = $"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol={symbol}&interval={interval}&apikey={apiKey}";
        HttpResponseMessage response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode(); // Throw an exception if the status code is not success
        return await response.Content.ReadAsStringAsync();
    }
}
````

---

### Fetch Coffee Commodity Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python script utilizes the 'requests' library to fetch monthly coffee commodity data from the Alpha Vantage API. It requires an API key and outputs the data as a JSON object. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=COFFEE&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Time Series Data using C# WebClient

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching time series data (HT_SINE) for a symbol via the Alpha Vantage API using C#'s `WebClient`. It includes examples for parsing JSON using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`. Ensure your API key replaces 'demo'.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=HT_SINE&symbol=IBM&interval=daily&series_type=close&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch DURABLES Data using Python

Source: https://www.alphavantage.co/documentation/index

Demonstrates how to fetch DURABLES data from the Alpha Vantage API using Python's requests library. It shows how to make a GET request and parse the JSON response. Requires the 'requests' library.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=DURABLES&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Download Weekly Cryptocurrency Data as CSV (URL)

Source: https://www.alphavantage.co/documentation/index

This example provides a direct URL to download weekly cryptocurrency data in CSV format from the Alpha Vantage API. This URL can be used in any application or script capable of handling file downloads.

```text
https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=BTC&market=EUR&apikey=demo&datatype=csv
```

---

### Python Request for Alpha Vantage STOCHRSI Data

Source: https://www.alphavantage.co/documentation/index

This Python code snippet demonstrates how to make a request to the Alpha Vantage STOCHRSI API using the 'requests' library. It constructs the API URL with specified parameters and prints the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

API_KEY = 'YOUR_API_KEY'  # Replace with your actual API key
SYMBOL = 'IBM'
FUNCTION = 'STOCHRSI'
INTERVAL = 'daily'
TIME_PERIOD = '10'
SERIES_TYPE = 'close'
FASTKPERIOD = '6'
FASTDMATYPE = '1'

url = f"https://www.alphavantage.co/query?function={FUNCTION}&symbol={SYMBOL}&interval={INTERVAL}&time_period={TIME_PERIOD}&series_type={SERIES_TYPE}&fastkperiod={FASTKPERIOD}&fastdmatype={FASTDMATYPE}&apikey={API_KEY}"

response = requests.get(url)
data = response.json()

print(data)
```

---

### Fetch Real-time Options Data in PHP

Source: https://www.alphavantage.co/documentation/index

This PHP script retrieves real-time options data by fetching the content of the Alpha Vantage API URL. It uses `file_get_contents` to get the JSON response and `json_decode` to parse it into a PHP array. Replace 'demo' with your actual API key.

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=REALTIME_OPTIONS&symbol=IBM&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
?>
```

---

### GET /query (Global Quote)

Source: https://www.alphavantage.co/documentation/index

Retrieves the global quote for a specified stock symbol. Replace 'demo' with your actual API key.

```APIDOC
## GET /query (Global Quote)

### Description
Retrieves the global quote for a specified stock symbol. This endpoint requires an API key.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The function to use. For global quote, use `GLOBAL_QUOTE`.
- **symbol** (string) - Required - The stock symbol to query (e.g., `IBM`).
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **datatype** (string) - Optional - The desired data format (`json` or `csv`). Defaults to `json`.

### Request Example
```

https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **`Global Quote`** (object) - Contains the quote details.
  - **`01. symbol`** (string) - The stock symbol.
  - **`02. open`** (string) - The opening price.
  - **`03. high`** (string) - The highest price.
  - **`04. low`** (string) - The lowest price.
  - **`05. price`** (string) - The current trading price.
  - **`06. volume`** (string) - The trading volume.
  - **`07. latest trading day`** (string) - The date of the latest trading day.
  - **`08. previous close`** (string) - The previous day's closing price.
  - **`09. change`** (string) - The change in price.
  - **`10. change percent`** (string) - The percentage change in price.

#### Response Example
```json
{
    "Global Quote": {
        "01. symbol": "IBM",
        "02. open": "141.9100",
        "03. high": "142.2700",
        "04. low": "140.5700",
        "05. price": "141.0900",
        "06. volume": "3580970",
        "07. latest trading day": "2023-10-27",
        "08. previous close": "142.4500",
        "09. change": "-1.3600",
        "10. change percent": "-0.9547%"
    }
}
````

````

--------------------------------

### Fetch HT_TRENDLINE Data with Python

Source: https://www.alphavantage.co/documentation/index

Fetches the Hilbert transform trendline data for IBM stock using the Alpha Vantage API in Python. It uses the 'requests' library to make the HTTP GET call and 'json' to parse the response. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=HT_TRENDLINE&symbol=IBM&interval=daily&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### Fetch ETF Profile Data with Node.js

Source: https://www.alphavantage.co/documentation/index

This Node.js script uses the 'request' library to retrieve ETF profile data from Alpha Vantage. It includes error handling for the HTTP request and checks the status code before printing the JSON data. Make sure to install the 'request' module (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=QQQ&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Natural Gas Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching monthly natural gas data from the Alpha Vantage API using WebClient. It includes examples for parsing JSON with both System.Web.Script.Serialization (for .NET Framework) and System.Text.Json (for .NET Core).

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=NATURAL_GAS&interval=monthly&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch ADOSC Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet fetches ADOSC data for a given symbol using the Alpha Vantage API. It makes an HTTP GET request and parses the JSON response. Ensure you have the 'requests' library installed. The output is the raw JSON data.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=AD&symbol=IBM&interval=daily&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Running Analytics Data with JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This JavaScript code snippet uses the `request` library to fetch running analytics data from the Alpha Vantage API. It's designed for a Node.js environment. Ensure you have the `request` library installed (`npm install request`). The output is logged to the console.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://alphavantageapi.co/timeseries/running_analytics?SYMBOLS=AAPL,IBM&RANGE=2month&INTERVAL=DAILY&OHLC=close&WINDOW_SIZE=20&CALCULATIONS=MEAN,STDDEV(annualized=True)&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Python: Fetch Technical Indicator Data

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch technical indicator data from the AlphaVantage API using the 'requests' library. It constructs a URL with specified parameters and prints the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

API_KEY = 'YOUR_API_KEY' # Replace with your actual API key
BASE_URL = 'https://www.alphavantage.co/query'

params = {
    'function': 'PPO',
    'symbol': 'IBM',
    'interval': 'daily',
    'series_type': 'close',
    'fastperiod': 10,
    'matype': 1,
    'apikey': API_KEY
}

response = requests.get(BASE_URL, params=params)
data = response.json()

print(data)
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves the daily time series for a specified FX currency pair. You can specify the function, from and to symbols, and your API key. Optional parameters include data type.

```APIDOC
## GET /query

### Description
Retrieves the daily time series (timestamp, open, high, low, close) of the FX currency pair specified. The latest data point is the price information for the day (or partial day) containing the current trading day, updated realtime.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The time series of your choice. Use `FX_DAILY` for daily FX data.
- **from_symbol** (string) - Required - A three-letter symbol from the forex currency list (e.g., `EUR`).
- **to_symbol** (string) - Required - A three-letter symbol from the forex currency list (e.g., `USD`).
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **datatype** (string) - Optional - Specifies the data format. Accepted values are `json` (default) and `csv`.

### Request Example
```

https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **symbol** (string) - The currency pair symbol.
- **timeSeries** (object) - An object containing daily price data, where keys are timestamps and values are objects with `1. open`, `2. high`, `3. low`, `4. close`.

#### Response Example
```json
{
    "Time Series (Daily)": {
        "2023-10-27": {
            "1. open": "1.05850",
            "2. high": "1.05910",
            "3. low": "1.05500",
            "4. close": "1.05700",
            "5. volume": "0.00000000"
        },
        "2023-10-26": {
            "1. open": "1.05800",
            "2. high": "1.06050",
            "3. low": "1.05600",
            "4. close": "1.05850",
            "5. volume": "0.00000000"
        }
    }
}
````

````

--------------------------------

### GET /query (REAL_GDP)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves Real GDP data. You can specify the interval and desired data type. An API key is required for all requests.

```APIDOC
## GET /query

### Description
Retrieves Real GDP data. Supports annual and quarterly intervals and JSON or CSV output formats.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function of your choice. Example: `REAL_GDP`
- **interval** (string) - Optional - By default, `annual`. Accepted values: `quarterly`, `annual`.
- **datatype** (string) - Optional - By default, `json`. Accepted values: `json`, `csv`.
- **apikey** (string) - Required - Your API key.

### Request Example
`https://www.alphavantage.co/query?function=REAL_GDP&interval=annual&apikey=demo`

### Response
#### Success Response (200)
- **data** (object/csv) - The requested financial data.

#### Response Example (JSON)
```json
{
    "information": "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests every 1 minute and 500 requests every 1 hour. Please refer to https://www.alphavantage.co/documentation/ for more information about the premium plans.",
    "symbol": "GDP",
    "interval": "annual",
    "real_gdp": [
        {
            "date": "2022-01-01",
            "value": "25439.4"
        },
        {
            "date": "2021-01-01",
            "value": "23315.3"
        }
    ]
}
````

````

--------------------------------

### Fetch Aroon Oscillator Data with JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet uses the 'request' library to fetch Aroon oscillator data from Alpha Vantage. It handles potential errors during the request and checks the HTTP status code before printing the parsed JSON data. Make sure to install the 'request' library (`npm install request`).

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=AROON&symbol=IBM&interval=daily&time_period=14&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch and Parse ROCR Data with Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch the Aroon Oscillator (ROCR) data for a given stock symbol from the Alpha Vantage API using the 'requests' library. It then parses the JSON response and prints it. Ensure the 'requests' library is installed (`pip install requests`).

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=ROCR&symbol=IBM&interval=daily&time_period=10&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Monthly Digital Currency Data (NodeJS)

Source: https://www.alphavantage.co/documentation/index

This NodeJS script uses the 'request' module to retrieve monthly digital currency data from the Alpha Vantage API. It requires an API key, cryptocurrency symbol, and market. The script handles potential errors and prints the JSON data upon successful retrieval. Ensure the 'request' module is installed (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Monthly Time Series Data with C#

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching monthly time series data from the Alpha Vantage API. It utilizes `WebClient` for downloading the data and includes examples for deserializing the JSON response using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Ensure necessary references or NuGet packages are included.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// For .NET Framework:
// using System.Web.Script.Serialization;
// For .NET Core:
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // For .NET Framework (System.Web.Script.Serialization):
                 // JavaScriptSerializer js = new JavaScriptSerializer();
                 // dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                 // For .NET Core (System.Text.Json):
                 // Note: Deserialization with dynamic types in .NET Core can be more involved.
                 // This example assumes a basic structure or requires a specific class definition.
                 // For a Dictionary<string, dynamic> approach, ensure System.Text.Json is configured appropriately.
                 // Example with a placeholder for actual deserialization:
                 var jsonString = client.DownloadString(queryUri);
                 // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(jsonString);
                 // Placeholder for actual processing:
                 Console.WriteLine("JSON data fetched. Implement deserialization logic here.");

                 // do something with the json_data
            }
        }
    }
}
```

---

### Fetch COTTON Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching COTTON data from the Alpha Vantage API using `WebClient`. It includes examples for parsing JSON data using both `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core).

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=COTTON&interval=monthly&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch WTI Crude Oil Data - C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching monthly WTI crude oil price data from Alpha Vantage API in C#. It shows how to use WebClient for HTTP requests and includes examples for both .NET Framework (JavaScriptSerializer) and .NET Core (System.Text.Json) for JSON parsing.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=WTI&interval=monthly&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch ADXR Data using Alpha Vantage API in C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching ADXR indicator data for IBM via the Alpha Vantage API. It uses 'WebClient' to download the JSON string and then parses it using either 'JavaScriptSerializer' (for .NET Framework) or 'System.Text.Json' (for .NET Core). Remember to replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=ADXR&symbol=IBM&interval=daily&time_period=10&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                //dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch CMO Data using Alpha Vantage API (C#)

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching Chande Momentum Oscillator (CMO) data from Alpha Vantage using `WebClient`. It includes conditional logic for parsing JSON using either `System.Web.Script.Serialization.JavaScriptSerializer` (for .NET Framework) or `System.Text.Json.JsonSerializer` (for .NET Core). Ensure the appropriate JSON serializer is referenced in your project.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=CCI&symbol=IBM&interval=daily&time_period=10&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                // dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Alpha Vantage Data using JavaScript (Node.js)

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet shows how to retrieve data from the Alpha Vantage API using the 'request' module in a Node.js environment. It handles potential errors during the request and logs the parsed JSON data. Make sure to install the 'request' module (`npm install request`).

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=APO&symbol=IBM&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Python: Fetch Alpha Vantage Symbol Search Results

Source: https://www.alphavantage.co/documentation/index

This Python code snippet demonstrates how to fetch symbol search results from the Alpha Vantage API using the 'requests' library. It constructs the API URL with specified parameters and handles the JSON response. Ensure you have the 'requests' library installed (`pip install requests`).

```python
import requests

api_key = "YOUR_API_KEY"
keywords = "microsoft"

url = f"https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords={keywords}&apikey={api_key}"

response = requests.get(url)
data = response.json()

print(data)
```

---

### GET /query (Stock Splits)

Source: https://www.alphavantage.co/documentation/index

Retrieves stock split data for a given symbol. Requires a valid API key.

```APIDOC
## GET /query (Stock Splits)

### Description
This endpoint retrieves historical stock split data for a specified company symbol. It is useful for analyzing past stock splits.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The API function to call. Set to `SPLITS` for stock splits.
- **symbol** (string) - Required - The stock ticker symbol for the company (e.g., `IBM`).
- **apikey** (string) - Required - Your unique Alpha Vantage API key. Obtain one from the Alpha Vantage support page.

### Request Example
```

https://www.alphavantage.co/query?function=SPLITS&symbol=IBM&apikey=demo

````

### Response
#### Success Response (200)
- **split** (array) - An array of objects, where each object contains the date and period of a stock split.
- **symbol** (string) - The requested stock symbol.

#### Response Example
```json
{
    "symbol": "IBM",
    "split": [
        {
            "date": "2000-05-24",
            "splitfactor": "2 for 1"
        }
    ]
}
````

````

--------------------------------

### Fetch WHEAT Data with Python

Source: https://www.alphavantage.co/documentation/index

Demonstrates how to fetch monthly WHEAT data using the Alpha Vantage API in Python. It utilizes the 'requests' library to make an HTTP GET request and parses the JSON response. Ensure you replace 'demo' with your actual API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### Fetch Insider Transactions API Data - C#

Source: https://www.alphavantage.co/documentation/index

This C# example demonstrates fetching insider transaction data for IBM from the Alpha Vantage API. It shows how to use `WebClient` for downloading the data. The code includes conditional logic for parsing JSON using either `JavaScriptSerializer` (for .NET Framework) or `System.Text.Json` (for .NET Core). Ensure the appropriate .NET libraries are referenced.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=INSIDER_TRANSACTIONS&symbol=IBM&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Constructing an RSI API Request (C#/.NET)

Source: https://www.alphavantage.co/documentation/index

This C# snippet shows how to make an HTTP GET request to the AlphaVantage API for RSI data using `HttpClient`. It constructs the API URL with the required parameters and asynchronously fetches the response. The response is expected in JSON format and is deserialized into a dynamic object for flexible access.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;

public class AlphaVantageClient
{
    private readonly HttpClient _httpClient;
    private readonly string _apiKey;

    public AlphaVantageClient(string apiKey)
    {
        _httpClient = new HttpClient();
        _apiKey = apiKey;
    }

    public async Task<dynamic> GetRsiDataAsync(string symbol, string interval, int timePeriod, string seriesType)
    {
        string baseUrl = "https://www.alphavantage.co/query?";
        string paramsString = $"function=RSI&symbol={symbol}&interval={interval}&time_period={timePeriod}&series_type={seriesType}&apikey={_apiKey}";
        string url = baseUrl + paramsString;

        try
        {
            HttpResponseMessage response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode(); // Throw if not successful

            string responseBody = await response.Content.ReadAsStringAsync();
            // Using dynamic for simplicity, consider a dedicated POCO for better type safety
            var jsonObject = System.Text.Json.JsonSerializer.Deserialize<dynamic>(responseBody);
            return jsonObject;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            return null; // Or throw an exception
        }
        catch (System.Text.Json.JsonException e)
        {
            Console.WriteLine($"JSON parsing error: {e.Message}");
            return null; // Or throw an exception
        }
    }
}

// Example usage:
// public static async Task Main(string[] args)
// {
//     string apiKey = "YOUR_API_KEY";
//     var client = new AlphaVantageClient(apiKey);
//     var rsiData = await client.GetRsiDataAsync("IBM", "weekly", 10, "open");
//
//     if (rsiData != null)
//     {
//         // Access data dynamically, e.g.:
//         // Console.WriteLine(rsiData["Technical Analysis: RSI"]["2023-01-01"]);
//         Console.WriteLine("RSI data fetched.");
//     }
// }

```

---

### Fetch EMA Data using C#

Source: https://www.alphavantage.co/documentation/index

This C# code example shows how to retrieve Exponential Moving Average (EMA) data from the Alpha Vantage API using `WebClient`. It includes guidance for parsing JSON using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`. Ensure you replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=EMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Alpha Vantage Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch financial data from the Alpha Vantage API using the requests library. It constructs the API URL with specified parameters and prints the JSON response. Ensure you have the 'requests' library installed.

```python
import requests

# API parameters
api_params = {
    "function": "MAMA",
    "symbol": "IBM",
    "interval": "daily",
    "series_type": "close",
    "fastlimit": "0.02",
    "apikey": "demo"
}

# Base URL for Alpha Vantage API
base_url = "https://www.alphavantage.co/query"

# Make the API request
response = requests.get(base_url, params=api_params)

# Print the JSON output
print(response.json())
```

---

### GET /query Digital Currency Daily

Source: https://www.alphavantage.co/documentation/index

Retrieves daily historical time series data for a cryptocurrency traded on a specific market, refreshed daily.

```APIDOC
## GET /query Digital Currency Daily

### Description
This API returns the daily historical time series for a cryptocurrency (e.g., BTC) traded on a specific market (e.g., EUR/Euro), refreshed daily at midnight (UTC). Prices and volumes are quoted in both the market-specific currency and USD.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The time series of your choice. In this case, `function=DIGITAL_CURRENCY_DAILY`.
- **symbol** (string) - Required - The cryptocurrency of your choice. It can be any of the "from" currencies in the cryptocurrency list. For example: `symbol=BTC`.
- **market** (string) - Required - The exchange market of your choice. It can be any of the "to" currencies in the cryptocurrency list. For example: `market=EUR`.
- **apikey** (string) - Required - Your API key. Claim your free API key here.
- **datatype** (string) - Optional - Specifies the output format. `csv` for CSV format, default is JSON.

### Request Example
```

https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=EUR&apikey=demo

```

### Request Example (CSV)
```

https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=EUR&apikey=demo&datatype=csv

````

### Response
#### Success Response (200)
- **data** (object/string) - A JSON object or CSV string containing the cryptocurrency's daily historical data.

#### Response Example (JSON)
```json
{
    "dataset": [
        {
            "date": "2023-10-27",
            "1a. open (USD)": "34000.12",
            "1b. open (EUR)": "32000.50",
            "2a. high (USD)": "34500.75",
            "2b. high (EUR)": "32500.90",
            "3a. low (USD)": "33800.00",
            "3b. low (EUR)": "31800.25",
            "4a. close (USD)": "34200.40",
            "4b. close (EUR)": "32200.60",
            "5. volume": "100000.00000000",
            "6. market cap (USD)": "800000000000.00000000"
        }
    ]
}
````

````

--------------------------------

### GET /query?function=NONFARM_PAYROLL

Source: https://www.alphavantage.co/documentation/index

Retrieves Total Nonfarm Payroll data. Supports JSON and CSV formats. Replace 'demo' with your API key.

```APIDOC
## GET /query?function=NONFARM_PAYROLL

### Description
This API returns the monthly US All Employees: Total Nonfarm data. It supports JSON and CSV data types. Remember to replace 'demo' with your valid API key.

### Method
GET

### Endpoint
https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=demo

### Parameters
#### Query Parameters
- **function** (string) - Required - The function of your choice. In this case, `function=NONFARM_PAYROLL`.
- **datatype** (string) - Optional - By default, `datatype=json`. Strings `json` and `csv` are accepted. `json` returns the time series in JSON format; `csv` returns the time series as a CSV file.
- **apikey** (string) - Required - Your API key. Claim your free API key here.

### Request Example
````

https://www.alphavantage.co/query?function=NONFARM_PAYROLL&apikey=demo

````

### Response
#### Success Response (200)
- **data** (object/string) - Contains the Total Nonfarm Payroll data, either in JSON object format or CSV string format depending on the `datatype` parameter.

#### Response Example (JSON)
```json
{
    "dataset": {
        "DSNAME": "PAYEMS",
        "description": "All Employees, Total Nonfarm (Thousands) Seasonally Adjusted",
        "data": [
            ["2023-01-01", "152480", "152480"],
            ["2022-12-01", "152710", "152710"]
            // ... more data points
        ]
    }
}
````

#### Response Example (CSV)

```csv
"date","value","adjusted_value"
"2023-01-01","152480","152480"
"2022-12-01","152710","152710"
// ... more data points
```

````

--------------------------------

### Fetch PLUS_DI Data using C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching PLUS_DI data from the Alpha Vantage API using C# with `WebClient`. It shows how to deserialize JSON using both .NET Framework's `JavaScriptSerializer` and .NET Core's `System.Text.Json`. Ensure appropriate references are included.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=PLUS_DI&symbol=IBM&interval=daily&time_period=10&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### GET /query (FX_INTRADAY)

Source: https://www.alphavantage.co/documentation/index

Fetches intraday foreign exchange rates between two specified currency symbols.

```APIDOC
## GET /query

### Description
This endpoint retrieves intraday foreign exchange (FX) rates between a "from" currency and a "to" currency at a specified interval. It supports various output sizes and data types.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The function to use, must be `FX_INTRADAY`.
- **from_symbol** (string) - Required - The three-letter symbol of the base currency (e.g., `EUR`).
- **to_symbol** (string) - Required - The three-letter symbol of the quote currency (e.g., `USD`).
- **interval** (string) - Required - The time interval between data points. Accepted values: `1min`, `5min`, `15min`, `30min`, `60min`.
- **outputsize** (string) - Optional - Determines the amount of data returned. Accepted values: `compact` (latest 100 data points, default), `full` (full-length time series).
- **datatype** (string) - Optional - The format of the returned data. Accepted values: `json` (default), `csv`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **symbol** (string) - The currency pair symbol.
- **timeSeriesFX** (object) - An object containing the time series data, where keys are timestamps and values are exchange rates.
  - **timestamp** (string) - The date and time of the data point.
  - **open** (string) - The opening exchange rate.
  - **high** (string) - The highest exchange rate.
  - **low** (string) - The lowest exchange rate.
  - **close** (string) - The closing exchange rate.
- **information** (string) - Additional information about the query.

#### Response Example (JSON)
```json
{
    "Time Series FX (5min)": {
        "2023-10-27 10:00:00": {
            "1. open": "1.0650",
            "2. high": "1.0655",
            "3. low": "1.0645",
            "4. close": "1.0652"
        },
        "2023-10-27 09:55:00": {
            "1. open": "1.0648",
            "2. high": "1.0650",
            "3. low": "1.0647",
            "4. close": "1.0649"
        }
    },
    "Meta Data": {
        "1. Information": "FX Intraday (5min) Austrian Euro / US Dollar quotes.",
        "2. From Symbol": "EUR",
        "3. To Symbol": "USD",
        "4. Interval": "5min",
        "5. Output Size": "compact",
        "6. Last Refreshed": "2023-10-27 10:05:00"
    }
}
````

````

--------------------------------

### Fetch Real-time Options Data in Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch real-time options data for a specified stock symbol using the requests library. It sends an HTTP GET request to the Alpha Vantage API and parses the JSON response. Ensure you replace 'demo' with your actual API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=REALTIME_OPTIONS&symbol=IBM&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### GET /query (STOCHRSI)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves Stochastic Relative Strength Index (STOCHRSI) values for a given symbol and parameters. Remember to replace 'demo' with your actual API key.

````APIDOC
## GET /query (STOCHRSI)

### Description
This endpoint retrieves Stochastic Relative Strength Index (STOCHRSI) values. You can specify the symbol, interval, time period, and series type.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function to use. For STOCHRSI, this should be `STOCHRSI`.
- **symbol** (string) - Required - The stock symbol (e.g., `IBM`).
- **interval** (string) - Required - The time interval for the data (e.g., `daily`, `weekly`, `monthly`).
- **time_period** (integer) - Required - The number of data points to consider for the calculation (e.g., `10`).
- **series_type** (string) - Required - The type of series to use (e.g., `open`, `high`, `low`, `close`).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```python
import requests

url = 'https://www.alphavantage.co/query?function=STOCHRSI&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=YOUR_API_KEY'
r = requests.get(url)
data = r.json()

print(data)
````

### Response

#### Success Response (200)

- **Technical Analysis: STOCHRSI** (object) - Contains the STOCHRSI values.
  - **STOCHRSI.RSI** (string) - The RSI value.
  - **STOCHRSI.STOCHRSI** (string) - The STOCHRSI value.
  - **STOCHRSI.STOCHRSI_K** (string) - The STOCHRSI_K value.
  - **STOCHRSI.STOCHRSI_D** (string) - The STOCHRSI_D value.

#### Response Example

```json
{
  "Technical Analysis: STOCHRSI": {
    "2023-10-27": {
      "RSI": "70.1234",
      "STOCHRSI": "85.6789",
      "STOCHRSI_K": "90.1122",
      "STOCHRSI_D": "88.4455"
    }
    // ... more data points
  }
}
```

````

--------------------------------

### GET /fx_daily

Source: https://www.alphavantage.co/documentation/index

Retrieves the daily time series (timestamp, open, high, low, close) of the FX currency pair specified, updated realtime. Requires an API key.

```APIDOC
## GET /fx_daily

### Description
This API returns the daily time series (timestamp, open, high, low, close) of the FX currency pair specified, updated realtime. You need to replace 'demo' with your own API key.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query?function=FX_DAILY&from_symbol={from_symbol}&to_symbol={to_symbol}&apikey={apikey}`

### Parameters
#### Query Parameters
- **function** (string) - Required - Must be `FX_DAILY`.
- **from_symbol** (string) - Required - The currency symbol to trade from (e.g., EUR).
- **to_symbol** (string) - Required - The currency symbol to trade to (e.g., USD).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```python
import requests

url = 'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=YOUR_API_KEY'
r = requests.get(url)
data = r.json()
print(data)
````

### Response

#### Success Response (200)

- **symbol** (string) - The trading symbol (e.g., EUR/USD).
- **timeSeriesFXDaily** (object) - An object containing daily time series data, where keys are dates and values are objects with open, high, low, close prices.

#### Response Example

```json
{
  "Meta Data": {
    "Information": "FX Daily Quotes",
    "From Symbol": "EUR",
    "To Symbol": "USD",
    "Last Refreshed": "2023-10-27",
    "Time Zone": "UTC"
  },
  "Time Series FX (Daily)": {
    "2023-10-27": {
      "1. open": "1.0650",
      "2. high": "1.0660",
      "3. low": "1.0645",
      "4. close": "1.0655"
    },
    "2023-10-26": {
      "1. open": "1.0640",
      "2. high": "1.0652",
      "3. low": "1.0638",
      "4. close": "1.0650"
    }
  }
}
```

````

--------------------------------

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieve daily time series data for a specified stock symbol. You can customize the output size and data format.

```APIDOC
## GET /query

### Description
This endpoint retrieves daily time series data for a specified stock symbol. You can customize the output size and data format.

### Method
GET

### Endpoint
/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The time series function. Use `TIME_SERIES_DAILY`.
- **symbol** (string) - Required - The equity symbol (e.g., `IBM`, `TSCO.LON`).
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **outputsize** (string) - Optional - Determines the amount of data returned. Accepts `compact` (latest 100 data points, default) or `full` (20+ years of historical data, premium keys only).
- **datatype** (string) - Optional - Specifies the return data format. Accepts `json` (default) or `csv`.

### Request Example
```json
{
  "example": "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=YOUR_API_KEY"
}
````

### Response

#### Success Response (200)

- **data** (object/csv) - The time series data, formatted as JSON or CSV depending on the `datatype` parameter.

#### Response Example

```json
{
  "example": {
    "Symbol": "IBM",
    "Time Series (Daily)": {
      "2023-10-26": {
        "1. open": "130.00",
        "2. high": "131.50",
        "3. low": "129.50",
        "4. close": "131.00",
        "5. volume": "5000000"
      }
      // ... more data points
    }
  }
}
```

````

--------------------------------

### Fetch Top Gainers, Losers, and Most Actively Traded Tickers (US Market)

Source: https://www.alphavantage.co/documentation/index

This example URL demonstrates how to fetch data for the top 20 gainers, losers, and most actively traded tickers in the US market from the Alpha Vantage API. This functionality requires a valid API key and the `TOP_GAINERS_LOSERS` function parameter. Real-time or delayed data may require a premium subscription.

```plaintext
https://www.alphavantage.co/query?function=TOP_GAINERS_LOSERS&apikey=demo
````

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieve time series data for a specified equity. This endpoint supports fetching data in JSON or CSV format.

```APIDOC
## GET /query

### Description
Retrieves historical time series data for a given stock symbol. You can specify the function to get different types of data and choose the output format (JSON or CSV).

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The type of time series data to retrieve. Example: `TIME_SERIES_WEEKLY_ADJUSTED`.
- **symbol** (string) - Required - The equity symbol for which to retrieve data. Example: `IBM`.
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **datatype** (string) - Optional - The desired output format. Accepts `json` (default) or `csv`.

### Request Example
```

https://www.alphavantage.co/query?function=TIME_SERIES_WEEKLY_ADJUSTED&symbol=IBM&apikey=demo

````

### Response
#### Success Response (200)
- **The structure of the response depends on the `function` and `datatype` parameters. For JSON, it typically includes metadata and a time series object. For CSV, it's a comma-separated value file.**

#### Response Example (JSON)
```json
{
    "Meta Data": {
        "1. Information": "Weekly Adjusted Time Series",
        "2. Symbol": "IBM",
        "3. Last Refreshed": "2023-10-27",
        "4. Interval": "weekly",
        "5. Output Size": "compact",
        "6. Time Zone": "US/Eastern"
    },
    "Time Series (Weekly)": {
        "2023-10-27": {
            "1. open": "135.0000",
            "2. high": "136.0000",
            "3. low": "134.0000",
            "4. close": "135.5000",
            "5. adjusted close": "135.5000",
            "6. volume": "1234567"
        }
        // ... more data points
    }
}
````

#### Response Example (CSV)

```csv
timestamp,open,high,low,close,adjusted_close,volume
2023-10-27,135.0000,136.0000,134.0000,135.5000,135.5000,1234567
// ... more data points
```

````

--------------------------------

### Fetch Daily Digital Currency Data with C#/.NET - Alpha Vantage API

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching daily historical cryptocurrency data from the Alpha Vantage API using WebClient. It includes examples for parsing JSON using both .NET Framework's JavaScriptSerializer and .NET Core's System.Text.Json.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// if using .NET Framework
using System.Web.Script.Serialization;
// if using .Net Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=EUR&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // if using .NET Core (System.Text.Json)
                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // do something with the json_data
            }
        }
    }
}
````

---

### GET /query (Income Statement)

Source: https://www.alphavantage.co/documentation/index

Retrieves annual and quarterly income statements for a company. Data is normalized to GAAP and IFRS standards.

```APIDOC
## GET /query (Income Statement)

### Description
This endpoint provides access to the annual and quarterly income statements for a company. The data is normalized to align with both GAAP and IFRS financial reporting standards and is typically updated on the same day a company releases its earnings.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The API function to call. Set to `INCOME_STATEMENT`.
- **symbol** (string) - Required - The stock ticker symbol for the company (e.g., `IBM`).
- **apikey** (string) - Required - Your unique Alpha Vantage API key. Obtain one from the Alpha Vantage support page.

### Request Example
```

https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=demo

````

### Response
#### Success Response (200)
- **symbol** (string) - The requested stock symbol.
- **annualReports** (array) - An array of objects, each representing an annual income statement with fields like `fiscalDateEnding`, `reportedEPS`, `totalRevenue`, etc.
- **quarterlyReports** (array) - An array of objects, each representing a quarterly income statement with similar fields as annual reports.

#### Response Example
```json
{
    "symbol": "IBM",
    "annualReports": [
        {
            "fiscalDateEnding": "2022-12-31",
            "reportedEPS": "9.24",
            "totalRevenue": "60510000000",
            "grossProfit": "31735000000",
            "operatingIncome": "14450000000",
            "netIncome": "7900000000",
            "totalCurrentAssets": "44890000000",
            "totalCurrentLiabilities": "36280000000",
            "totalAssets": "139787000000",
            "totalLiabilities": "72294000000",
            "totalEquity": "67493000000",
            "cashAndCashEquivalents": "11529000000",
            "shortTermInvestments": "13574000000",
            "accountsReceivable": "10435000000",
            "inventory": "4060000000",
            "accountsPayable": "11800000000",
            "totalNonCurrentAssets": "94897000000",
            "totalNonCurrentLiabilities": "36014000000",
            "longTermDebt": "49999000000",
            "deferredRevenue": "3687000000",
            "preferredStock": "0",
            "commonStock": "0",
            "retainedEarnings": "67493000000"
        }
    ],
    "quarterlyReports": [
        {
            "fiscalDateEnding": "2023-03-31",
            "reportedEPS": "3.04",
            "totalRevenue": "14420000000",
            "grossProfit": "7430000000",
            "operatingIncome": "2321000000",
            "netIncome": "1612000000",
            "totalCurrentAssets": "44629000000",
            "totalCurrentLiabilities": "34745000000",
            "totalAssets": "138744000000",
            "totalLiabilities": "71096000000",
            "totalEquity": "67648000000",
            "cashAndCashEquivalents": "10616000000",
            "shortTermInvestments": "16450000000",
            "accountsReceivable": "9746000000",
            "inventory": "3724000000",
            "accountsPayable": "10999000000",
            "totalNonCurrentAssets": "94115000000",
            "totalNonCurrentLiabilities": "36351000000",
            "longTermDebt": "48698000000",
            "deferredRevenue": "3676000000",
            "preferredStock": "0",
            "commonStock": "0",
            "retainedEarnings": "67648000000"
        }
    ]
}
````

````

--------------------------------

### Fetch DEMA Technical Indicator Data (Python)

Source: https://www.alphavantage.co/documentation/index

This Python snippet shows how to fetch the Double Exponential Moving Average (DEMA) technical indicator data from Alpha Vantage. It uses the `requests` library to make an HTTP GET request to the API and then parses the JSON response. Ensure you have the `requests` library installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=DEMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### Fetch HT_PHASOR Data in C#/.NET using HttpClient

Source: https://www.alphavantage.co/documentation/index

This C#/.NET code example shows how to retrieve technical indicator data (HT_PHASOR) from Alpha Vantage using HttpClient. It sets up the API parameters, constructs the URL, and deserializes the JSON response into a C# object.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json; // Requires Newtonsoft.Json NuGet package

public class AlphaVantageApiClient
{
    private static readonly HttpClient client = new HttpClient();
    private const string BaseUrl = "https://www.alphavantage.co/query?";

    public static async Task<dynamic> GetHtPhasorDataAsync(string symbol, string interval, string seriesType, string apiKey)
    {
        var queryParams = $"function=HT_PHASOR&symbol={symbol}&interval={interval}&series_type={seriesType}&apikey={apiKey}";
        var requestUrl = BaseUrl + queryParams;

        try
        {
            HttpResponseMessage response = await client.GetAsync(requestUrl);
            response.EnsureSuccessStatusCode(); // Throw an exception if the status code is not 2xx

            string responseBody = await response.Content.ReadAsStringAsync();
            // Using dynamic for simplicity, consider creating specific DTOs for better type safety
            var data = JsonConvert.DeserializeObject(responseBody);
            return data;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            return null;
        }
        catch (JsonException e)
        {
            Console.WriteLine($"JSON deserialization error: {e.Message}");
            return null;
        }
    }

    public static async Task Main(string[] args)
    {
        string apiKey = "demo"; // Replace with your actual API key
        var phasorData = await GetHtPhasorDataAsync("IBM", "weekly", "close", apiKey);

        if (phasorData != null)
        {
            // Process the data - how you access properties depends on the dynamic object structure
            Console.WriteLine(JsonConvert.SerializeObject(phasorData, Formatting.Indented));
        }
    }
}
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieve COTTON data from the Alpha Vantage API. This endpoint requires a function and an apikey, with optional parameters for interval and datatype.

````APIDOC
## GET /query

### Description
Retrieve time series data for COTTON. This endpoint allows you to fetch historical data with options for data format and interval.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The function of your choice. In this case, `function=COTTON`.
- **interval** (string) - Optional - By default, `interval=monthly`. Accepted values: `monthly`, `quarterly`, `annual`.
- **datatype** (string) - Optional - By default, `datatype=json`. Accepted values: `json`, `csv`. `json` returns data in JSON format; `csv` returns data as a CSV file.
- **apikey** (string) - Required - Your API key. Claim your free API key [here](https://www.alphavantage.co/support/#api-key).

### Request Example
`https://www.alphavantage.co/query?function=COTTON&interval=monthly&apikey=demo`

### Response
#### Success Response (200)
- **data** (object/csv) - The time series data for COTTON, either in JSON object format or as a CSV file, depending on the `datatype` parameter.

#### Response Example (JSON)
```json
{
  "data": [
    {
      "date": "2023-01-01",
      "value": "100.50"
    },
    {
      "date": "2022-12-01",
      "value": "98.75"
    }
  ]
}
````

````

--------------------------------

### Fetch AROONOSC Data using C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching Aroon Oscillator data for IBM using the Alpha Vantage API in C#. It shows how to use 'WebClient' to download the JSON string. Two approaches for parsing JSON are presented: 'JavaScriptSerializer' for .NET Framework and 'JsonSerializer' for .NET Core. Appropriate using statements for each are included.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=AROONOSC&symbol=IBM&interval=daily&time_period=10&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### GET /query Crypto Intraday

Source: https://www.alphavantage.co/documentation/index

Retrieves intraday historical time series data for a specified cryptocurrency.

```APIDOC
## GET /query Crypto Intraday

### Description
Retrieves intraday historical time series data for a specified cryptocurrency traded on a particular market. This endpoint is useful for analyzing short-term price movements.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The time series function to use. For intraday crypto data, use `CRYPTO_INTRADAY`.
- **symbol** (string) - Required - The cryptocurrency symbol (e.g., `ETH`).
- **market** (string) - Required - The market currency (e.g., `USD`).
- **interval** (string) - Required - The interval for intraday data (e.g., `5min`).
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=CRYPTO_INTRADAY&symbol=ETH&market=USD&interval=5min&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **data** (object) - A JSON object containing the cryptocurrency's intraday time series data.

#### Response Example
```json
{
    "dataset": [
        {
            "time_close": "...",
            "open_close": [
                "...",
                "..."
            ],
            "high_low": [
                "...",
                "..."
            ],
            "volume": "...",
            "market_cap_usd": "..."
        }
    ]
}
````

````

--------------------------------

### GET /query (Realtime Bulk Quotes)

Source: https://www.alphavantage.co/documentation/index

Retrieves realtime quotes for multiple US-traded symbols in bulk. Accepts up to 100 symbols per request.

```APIDOC
## GET /query (Realtime Bulk Quotes)

### Description
Returns realtime quotes for US-traded symbols in bulk, accepting up to 100 symbols per API request. This endpoint covers both regular and extended trading hours and can be used as a high-throughput alternative to the Global Quote API.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The time series of your choice. Use `REALTIME_BULK_QUOTES`.
- **symbol** (string) - Required - Up to 100 symbols separated by a comma (e.g., `MSFT,AAPL,IBM`). If more than 100 symbols are provided, only the first 100 will be honored.
- **apikey** (string) - Required - Your Alpha Vantage API key. Claim your free API key here.
- **datatype** (string) - Optional - By default, `datatype=json`. Strings `json` and `csv` are accepted. `json` returns results in JSON format; `csv` returns results as a CSV file.

### Request Example
````

https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=MSFT,AAPL,IBM&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **`data`** (array) - An array of objects, where each object contains the quote details for a symbol.
  - **`symbol`** (string) - The stock symbol.
  - **`price`** (string) - The current trading price.
  - **`size`** (string) - The volume of the last trade.
  - **`exchange`** (string) - The stock exchange.
  - **`date`** (string) - The date of the last trade.
  - **`time`** (string) - The time of the last trade.
  - **`marketCap`** (string) - The market capitalization.

#### Response Example
```json
[
    {
        "symbol": "MSFT",
        "price": "330.53",
        "size": "100",
        "exchange": "NASDAQ",
        "date": "2023-10-27",
        "time": "16:00:00",
        "marketCap": "2447800000000"
    },
    {
        "symbol": "AAPL",
        "price": "168.22",
        "size": "100",
        "exchange": "NASDAQ",
        "date": "2023-10-27",
        "time": "16:00:00",
        "marketCap": "2721000000000"
    }
]
````

````

--------------------------------

### Fetch Retail Sales Data using PHP

Source: https://www.alphavantage.co/documentation/index

This PHP script retrieves retail sales data from Alpha Vantage by making a GET request and decoding the JSON response. It uses `file_get_contents` for fetching and `json_decode` for parsing. The script outputs the data using `print_r`.

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=RETAIL_SALES&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
?>
````

---

### Fetch SMA Data using Python - Alpha Vantage API

Source: https://www.alphavantage.co/documentation/index

This Python script retrieves Simple Moving Average (SMA) data for IBM stock from the Alpha Vantage API. It uses the 'requests' library to make the HTTP GET request and 'json' to parse the response. Ensure you have the 'requests' library installed. The output is the JSON data received from the API.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves financial statements for a given stock symbol. It supports functions like INCOME_STATEMENT and BALANCE_SHEET. An API key is required for all requests.

````APIDOC
## GET /query

### Description
This endpoint retrieves financial statements for a given stock symbol. It supports functions like INCOME_STATEMENT and BALANCE_SHEET. An API key is required for all requests.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The type of financial statement to retrieve (e.g., `INCOME_STATEMENT`, `BALANCE_SHEET`).
- **symbol** (string) - Required - The stock ticker symbol (e.g., `IBM`).
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
`https://www.alphavantage.co/query?function=INCOME_STATEMENT&symbol=IBM&apikey=YOUR_API_KEY`
`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=IBM&apikey=YOUR_API_KEY`

### Response
#### Success Response (200)
- **`symbol`** (string) - The stock symbol.
- **`annualReports`** or **`quarterlyReports`** (array of objects) - Contains financial data for annual or quarterly periods.
  - Each object includes fields like `fiscalDateEnding`, `reportedCurrency`, `totalRevenue`, `grossProfit`, etc.

#### Response Example (Income Statement)
```json
{
    "symbol": "IBM",
    "annualReports": [
        {
            "fiscalDateEnding": "2023-12-31",
            "reportedCurrency": "USD",
            "grossProfit": 45000000000,
            "totalRevenue": 149000000000,
            "costOfRevenue": 104000000000,
            "costofGoodsAndServices": 104000000000,
            "operatingIncome": 21000000000,
            "sellingGeneralAdministrativeExpense": 18000000000,
            "researchAndDevelopmentExpense": 6000000000,
            "operatingExpense": 24000000000,
            "interestExpense": 1500000000,
            "depreciationAndAmortization": 5000000000,
            "ebit": 19500000000,
            "incomeBeforeTax": 20000000000,
            "incomeTaxExpense": 4000000000,
            "minorityInterest": 0,
            "netIncome": 16000000000,
            "profitEndingInterestAndTaxes": 16000000000,
            "operatingMargin": 0.1409,
            "grossMargin": 0.3020,
            "ebitMargin": 0.1309,
            "netMargin": 0.1074
        }
        // ... more annual reports
    ]
}
````

#### Response Example (Balance Sheet)

```json
{
  "symbol": "IBM",
  "annualReports": [
    {
      "fiscalDateEnding": "2023-12-31",
      "reportedCurrency": "USD",
      "totalAssets": 145000000000,
      "totalCurrentAssets": 40000000000,
      "cashAndCashEquivalents": 10000000000,
      "shortTermInvestments": 5000000000,
      "receivables": 15000000000,
      "inventories": 5000000000,
      "totalNonCurrentAssets": 105000000000,
      "propertyPlantEquipmentNet": 60000000000,
      "goodwill": 20000000000,
      "intangibleAssets": 10000000000,
      "totalLiabilities": 80000000000,
      "totalCurrentLiabilities": 30000000000,
      "accountsPayable": 10000000000,
      "shortTermDebt": 5000000000,
      "deferredRevenue": 3000000000,
      "totalNonCurrentLiabilities": 50000000000,
      "longTermDebt": 35000000000,
      "deferredTaxLiabilities": 5000000000,
      "shareholdersEquity": 65000000000,
      "treasuryStock": -5000000000,
      "retainedEarnings": 50000000000,
      "commonStockTotalEquity": 20000000000,
      "totalCapitalization": 70000000000,
      "totalDebt": 40000000000,
      "currentRatio": 1.33,
      "quickRatio": 1.17,
      "debtToEquityRatio": 0.62,
      "debtToAssetsRatio": 0.28,
      "longTermDebtToCapitalizationRatio": 0.5,
      "totalAssetsToLiabilitiesRatio": 1.81
    }
    // ... more annual reports
  ]
}
```

````

--------------------------------

### GET /query (Digital Currency Monthly)

Source: https://www.alphavantage.co/documentation/index

Retrieves monthly historical data for a specified cryptocurrency trading pair. This endpoint requires parameters for the function, cryptocurrency symbol, market, and an API key.

```APIDOC
## GET /query (Digital Currency Monthly)

### Description
This endpoint fetches monthly time series data for a specified cryptocurrency, including trading volume and open, high, low, close prices.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the data to retrieve. Use `DIGITAL_CURRENCY_MONTHLY` for monthly data.
- **symbol** (string) - Required - The cryptocurrency symbol (e.g., `BTC`).
- **market** (string) - Required - The market currency (e.g., `EUR`).
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **datatype** (string) - Optional - Specifies the data format. Defaults to JSON. Use `csv` for CSV format.

### Request Example
````

https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=demo

````

### Response
#### Success Response (200)
- **Symbol** (string) - The cryptocurrency symbol.
- **Market** (string) - The market currency.
- **Last A Day** (string) - The date of the last available data point.
- **Time Series (Digital Currency Monthly)** (object) - An object containing the historical monthly data, where each key is a date and the value is an object with:
    - **1a. open (EUR)** (string) - The opening price in EUR.
    - **1b. high (EUR)** (string) - The highest price in EUR.
    - **1c. low (EUR)** (string) - The lowest price in EUR.
    - **1d. close (EUR)** (string) - The closing price in EUR.
    - **2. volume** (string) - The trading volume.

#### Response Example
```json
{
    "dataset": {
        "Symbol": "BTC",
        "Market": "EUR",
        "Last A Day": "2023-10-27",
        "Time Series (Digital Currency Monthly)": {
            "2023-10-01": {
                "1a. open (EUR)": "27000.50",
                "1b. high (EUR)": "35000.00",
                "1c. low (EUR)": "25000.00",
                "1d. close (EUR)": "33000.00",
                "2. volume": "1500000.00"
            },
            "2023-09-01": {
                "1a. open (EUR)": "26000.00",
                "1b. high (EUR)": "28000.00",
                "1c. low (EUR)": "24000.00",
                "1d. close (EUR)": "27000.50",
                "2. volume": "1200000.00"
            }
        }
    }
}
````

### Error Handling

- **404 Not Found**: If the endpoint or resource is not found.
- **400 Bad Request**: If required parameters are missing or invalid.
- **401 Unauthorized**: If the API key is invalid or missing.

````

--------------------------------

### Fetch SMA Data using C# - Alpha Vantage API

Source: https://www.alphavantage.co/documentation/index

This C# example shows how to fetch Simple Moving Average (SMA) data from the Alpha Vantage API using .NET Framework's 'JavaScriptSerializer' or .NET Core's 'System.Text.Json'. It uses 'WebClient' to download the data and then deserializes the JSON response. Replace 'demo' with your API key and choose the appropriate deserialization method based on your .NET version.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch AD Line Data using PHP

Source: https://www.alphavantage.co/documentation/index

Fetches the Chaikin A/D line (AD) values for a given stock symbol using the Alpha Vantage API. This PHP example uses `file_get_contents` to retrieve the JSON data and `json_decode` to parse it. Replace 'demo' with your actual API key.

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=NATR&symbol=IBM&interval=weekly&time_period=14&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
?>
```

---

### Fetch Stock Symbol Data with Alpha Vantage API (JavaScript)

Source: https://www.alphavantage.co/documentation/index

This JavaScript code uses the 'request' module to retrieve stock symbol search data from the Alpha Vantage API. Ensure the 'request' module is installed via npm. It makes a GET request, handling potential errors and checking the HTTP status code before logging the JSON data.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=tesco&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch TRIMA Data with Python using requests

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch Time Rate of Change (TRIMA) indicator data from the Alpha Vantage API using the 'requests' library. It sends a GET request to the API endpoint with specified parameters and then parses the JSON response. Ensure you replace 'demo' with your actual API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=TRIMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch SMA Data using JavaScript - Alpha Vantage API

Source: https://www.alphavantage.co/documentation/index

This JavaScript code snippet fetches Simple Moving Average (SMA) data for IBM stock using the Alpha Vantage API. It utilizes the 'request' library to perform the HTTP GET request. The response data is then logged to the console. Make sure to install the 'request' package and replace 'demo' with your actual API key.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=SMA&symbol=IBM&interval=weekly&time_period=10&series_type=open&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### Fetch Currency Exchange Rate with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching currency exchange rates from Alpha Vantage API in C#. It shows how to use `WebClient` to download the JSON string and then parse it using either `JavaScriptSerializer` (for .NET Framework) or `System.Text.Json` (for .NET Core).

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch Federal Funds Rate Data in C#/.NET

Source: https://www.alphavantage.co/documentation/index

This C#/.NET code demonstrates fetching monthly Federal Funds Rate data from Alpha Vantage. It includes examples for both .NET Framework (using JavaScriptSerializer) and .NET Core (using System.Text.Json) for parsing the JSON response. Remember to use your API key instead of 'demo'.

```cs
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=FEDERAL_FUNDS_RATE&interval=monthly&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### C#/.NET: Fetch Technical Indicator Data

Source: https://www.alphavantage.co/documentation/index

This C#/.NET example demonstrates fetching technical indicator data from AlphaVantage using `HttpClient`. It constructs the API URL with parameters and deserializes the JSON response into a C# object. Ensure you handle API key securely and manage HttpClient instances appropriately in a real application.

```csharp
using System;
using System.Net.Http;
using System.Threading.Tasks;
using Newtonsoft.Json;

public class AlphaVantageApiClient
{
    private static readonly HttpClient client = new HttpClient();
    private const string BaseUrl = "https://www.alphavantage.co/query";

    public async Task<dynamic> GetTechnicalIndicatorData(string apiKey, string symbol, string interval, string seriesType, int fastPeriod, int maType)
    {
        string url = $"{BaseUrl}?function=PPO&symbol={symbol}&interval={interval}&series_type={seriesType}&fastperiod={fastPeriod}&matype={maType}&apikey={apiKey}";

        try
        {
            HttpResponseMessage response = await client.GetAsync(url);
            response.EnsureSuccessStatusCode(); // Throw if not 2xx

            string responseBody = await response.Content.ReadAsStringAsync();
            dynamic data = JsonConvert.DeserializeObject(responseBody);
            return data;
        }
        catch (HttpRequestException e)
        {
            Console.WriteLine($"Request error: {e.Message}");
            return null;
        }
        catch (JsonException e)
        {
            Console.WriteLine($"JSON deserialization error: {e.Message}");
            return null;
        }
    }

    public static async Task Main(string[] args)
    {
        var apiClient = new AlphaVantageApiClient();
        string apiKey = "YOUR_API_KEY"; // Replace with your actual API key

        var data = await apiClient.GetTechnicalIndicatorData(apiKey, "IBM", "daily", "close", 10, 1);

        if (data != null)
        {
            // Process the data object
            Console.WriteLine(JsonConvert.SerializeObject(data, Formatting.Indented));
        }
    }
}

```

---

### GET /query FX_MONTHLY

Source: https://www.alphavantage.co/documentation/index

Retrieves monthly time series data for a given currency pair. You can specify the base currency, quote currency, and data format.

```APIDOC
## GET /query FX_MONTHLY

### Description
This endpoint retrieves historical monthly foreign exchange (FX) trading data for a specified currency pair. It includes daily open, high, low, and close prices, as well as volume, in a time-series format.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The type of time series data to retrieve. Use `FX_MONTHLY` for monthly FX data.
- **from_symbol** (string) - Required - The three-letter symbol of the base currency (e.g., `EUR`).
- **to_symbol** (string) - Required - The three-letter symbol of the quote currency (e.g., `USD`).
- **apikey** (string) - Required - Your unique Alpha Vantage API key.
- **datatype** (string) - Optional - The format for the returned data. Accepts `json` (default) or `csv`.

### Request Example
```

https://www.alphavantage.co/query?function=FX_MONTHLY&from_symbol=EUR&to_symbol=USD&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **symbol** (string) - The currency pair symbol.
- **last_refreshed** (string) - The date and time the data was last updated.
- **time_zone** (string) - The time zone of the data.
- **{from_symbol} / {to_symbol}** (object) - An object containing the monthly time series data.
  - **YYYY-MM-DD HH:MM:SS** (string) - The timestamp of the data point (e.g., '2023-10-01 00:00:00').
    - **1. open** (string) - The opening price for the period.
    - **2. high** (string) - The highest price during the period.
    - **3. low** (string) - The lowest price during the period.
    - **4. close** (string) - The closing price for the period.
    - **5. volume** (string) - The trading volume for the period.

#### Response Example (JSON)
```json
{
    "Meta Data": {
        "1. Information": "Monthly FX Time Series (from_symbol/to_symbol)",
        "2. From Symbol": "EUR",
        "3. To Symbol": "USD",
        "4. Last Refreshed": "2023-10-01 00:00:00",
        "5. Time Zone": "UTC"
    },
    "Time Series FX (Monthly)": {
        "2023-10-01 00:00:00": {
            "1. open": "1.07500000",
            "2. high": "1.08000000",
            "3. low": "1.06500000",
            "4. close": "1.07000000",
            "5. volume": "0"
        },
        "2023-09-01 00:00:00": {
            "1. open": "1.08500000",
            "2. high": "1.09000000",
            "3. low": "1.07500000",
            "4. close": "1.08000000",
            "5. volume": "0"
        }
    }
}
````

#### Response Example (CSV)

```csv
"symbol","last_refreshed","time_zone","open","high","low","close","volume"
"EUR/USD","2023-10-01 00:00:00","UTC","1.07500000","1.08000000","1.06500000","1.07000000","0"
"EUR/USD","2023-09-01 00:00:00","UTC","1.08500000","1.09000000","1.07500000","1.08000000","0"
```

````

--------------------------------

### GET /query - Crude Oil Prices (Brent)

Source: https://www.alphavantage.co/documentation/index

Retrieves Brent (Europe) crude oil prices in daily, weekly, or monthly intervals. Requires an API key.

```APIDOC
## GET /query - Crude Oil Prices (Brent)

### Description
This endpoint returns the Brent (Europe) crude oil prices in daily, weekly, and monthly horizons. The data is sourced from the U.S. Energy Information Administration via the FRED API.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the data to retrieve. For Brent crude oil prices, use `BRENT`.
- **interval** (string) - Optional - The time interval for the data. Accepts `daily`, `weekly`, or `monthly`. Defaults to `monthly`.
- **datatype** (string) - Optional - The format of the returned data. Accepts `json` or `csv`. Defaults to `json`.
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
````

https://www.alphavantage.co/query?function=BRENT&interval=monthly&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **data** (object) - Contains the time series data for crude oil prices.
  - **timestamp** (string) - The date of the data point.
  - **value** (float) - The price of crude oil for that timestamp.

#### Response Example (JSON)
```json
{
  "meta-data": {
    "Information": "Daily Brent Crude Oil Price",
    "Symbol": "BRENT",
    "Last Updated": "2023-10-27 10:00:00",
    "Time Interval": "monthly",
    "Output Size": "Compact"
  },
  "Time Series (Monthly)": {
    "2023-09-01": {
      "1. open": "90.00",
      "2. high": "95.00",
      "3. low": "88.00",
      "4. close": "92.50",
      "5. adjusted close": "92.50"
    },
    "2023-08-01": {
      "1. open": "85.00",
      "2. high": "91.00",
      "3. low": "84.00",
      "4. close": "90.00",
      "5. adjusted close": "90.00"
    }
  }
}
````

````

--------------------------------

### GET /query

Source: https://www.alphavantage.co/documentation/index

Fetches real-time options data for a specified stock symbol. You can retrieve the entire option chain or data for a specific contract, and optionally include greeks and implied volatility.

```APIDOC
## GET /query

### Description
Fetches real-time options data for a specified stock symbol. This endpoint allows retrieval of the entire options chain for a given symbol or specific contract details. You can also enable the inclusion of Greek letters and implied volatility.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - The function parameter must be set to `REALTIME_OPTIONS`.
- **symbol** (string) - Required - The equity symbol for which to retrieve options data (e.g., `IBM`).
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **require_greeks** (boolean) - Optional - Set to `true` to include Greek letters and implied volatility in the response. Defaults to `false`.
- **contract** (string) - Optional - The specific US options contract ID to query. If omitted, the entire option chain for the symbol is returned.
- **datatype** (string) - Optional - Specifies the data format. Accepts `json` (default) or `csv`.

### Request Example
```json
{
  "example": "https://www.alphavantage.co/query?function=REALTIME_OPTIONS&symbol=IBM&apikey=demo"
}
````

### Response

#### Success Response (200)

- **option_chain** (object) - Contains the options data, structured by calls and puts, including strike prices, prices, sizes, etc.
- **metadata** (object) - Contains information about the request, such as the symbol and last updated time.

#### Response Example

```json
{
  "example": "{
  \"metadata\": {\n    \"symbol\": \"IBM\",\n    \"last_traded_fractional\": \"145.32\",\n    \"time_stamp\": \"2023-10-27 15:59:59\"\n  },\n  \"option_chain\": {\n    \"calls\": [\n      {\n        \"contract\": \"IBM270115C00390000\",\n        \"strike\": \"390.00\",\n        \"lastPrice\": \"0.05\",\n        \"change\": \"0.00\",\n        \"percentChange\": \"0.00\",\n        \"volume\": \"1\",\n        \"openInterest\": \"10\"\n      }\n      // ... more call options
    ],\n    \"puts\": [\n      {\n        \"contract\": \"IBM270115P00140000\",\n        \"strike\": \"140.00\",\n        \"lastPrice\": \"0.05\",\n        \"change\": \"0.00\",\n        \"percentChange\": \"0.00\",\n        \"volume\": \"5\",\n        \"openInterest\": \"15\"\n      }\n      // ... more put options
    ]\n  }\n}"
}
```

````

--------------------------------

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieves Consumer Price Index (CPI) data. This endpoint allows fetching historical inflation data with options for interval and data type.

```APIDOC
## GET /query

### Description
This endpoint returns the annual inflation rates (consumer prices) of the United States. Data is sourced from the World Bank via FRED.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function of the API call. Use `CPI` for Consumer Price Index data.
- **interval** (string) - Optional - The interval for the data. Accepted values are `monthly` (default) and `semiannual`.
- **datatype** (string) - Optional - The format of the returned data. Accepted values are `json` (default) and `csv`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
````

https://www.alphavantage.co/query?function=CPI&interval=monthly&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **data** (object/csv) - The CPI data, either in JSON format or as a CSV file, depending on the `datatype` parameter.

#### Response Example (JSON)
```json
{
  "data": [
    {
      "date": "2023-10-01",
      "value": "3.2"
    },
    {
      "date": "2023-09-01",
      "value": "3.7"
    }
    // ... more data
  ]
}
````

````

--------------------------------

### Fetch MFI Data with JavaScript using request

Source: https://www.alphavantage.co/documentation/index

Retrieves Money Flow Index (MFI) data for IBM using the Alpha Vantage API in JavaScript. This example uses the 'request' library and handles potential errors during the HTTP request. The JSON response is logged to the console.

```javascript
'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=MFI&symbol=IBM&interval=weekly&time_period=10&apikey=demo';

request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      console.log('Error:', err);
    } else if (res.statusCode !== 200) {
      console.log('Status:', res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
});
````

---

### Fetch Historical Options Data using C#/.NET

Source: https://www.alphavantage.co/documentation/index

C#/.NET code snippet for retrieving historical options data via the Alpha Vantage API. It demonstrates using `WebClient` to download data and provides examples for JSON deserialization using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core). Remember to replace the demo API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=IBM&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch IPO Calendar Data - C#

Source: https://www.alphavantage.co/documentation/index

Retrieves IPO calendar data in C# using System.Net.WebClient and the CsvHelper NuGet package for parsing. It downloads the data, reads it into a MemoryStream, and then uses CsvReader to process and print the headers and records. Requires the CsvHelper NuGet package.

```csharp
using CsvHelper;
using System;
using System.Globalization;
using System.IO;
using System.Net;

// Compatible with any recent version of .NET Framework or .Net Core

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=IPO_CALENDAR&apikey=demo";

            Uri queryUri = new Uri(QUERY_URL);

            // print the output
            // This example uses the fine nuget package CsvHelper (https://www.nuget.org/packages/CsvHelper/)

            CultureInfo culture = CultureInfo.CreateSpecificCulture("en-US"); ; //This is required for webClient.DownloadDataTaskAsync
            using (WebClient client = new WebClient())
            {
                using (MemoryStream stream = new MemoryStream(client.DownloadDataTaskAsync(queryUri).Result))
                {
                    stream.Position = 0;

                    using (StreamReader reader = new StreamReader(stream))
                    {
                        using (CsvReader csv = new CsvReader(reader, CultureInfo.InvariantCulture))
                        {
                            csv.Read();
                            csv.ReadHeader();
                            Console.WriteLine(string.Join("\t", csv.HeaderRecord));
                            while (csv.Read())
                            {
                                Console.WriteLine(string.Join("\t", csv.Parser.Record));
                            }
                        }
                    }
                }
            }
        }
    }
}
```

---

### Fetch Aluminum Data with C# (.NET)

Source: https://www.alphavantage.co/documentation/index

Fetches monthly aluminum data from Alpha Vantage API using C# and WebClient. It demonstrates parsing JSON using both System.Web.Script.Serialization (for .NET Framework) and System.Text.Json (for .NET Core). Requires appropriate .NET framework or Core setup.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch PPO Data with C# using WebClient

Source: https://www.alphavantage.co/documentation/index

Fetches the Percentage Price Oscillator (PPO) data for a given stock symbol using the Alpha Vantage API in C#. Demonstrates parsing JSON using both .NET Framework's JavaScriptSerializer and .NET Core's System.Text.Json. Replace 'demo' with your actual API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=PPO&symbol=IBM&interval=daily&series_type=close&fastperiod=10&matype=1&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### Fetch AD Line Data using C#

Source: https://www.alphavantage.co/documentation/index

Fetches the Chaikin A/D line (AD) values for a given stock symbol using the Alpha Vantage API. This C# example uses `WebClient` to download the data. It shows two methods for JSON deserialization: `JavaScriptSerializer` for .NET Framework and `System.Text.Json` for .NET Core. Replace 'demo' with your actual API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=NATR&symbol=IBM&interval=weekly&time_period=14&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
```

---

### GET /fx_intraday

Source: https://www.alphavantage.co/documentation/index

Retrieves intraday time series (timestamp, open, high, low, close) for a specified FX currency pair at a 5-minute interval. Requires an API key.

````APIDOC
## GET /fx_intraday

### Description
This API returns the intraday time series (timestamp, open, high, low, close) of the FX currency pair specified, with a 5-minute interval. You need to replace 'demo' with your own API key.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol={from_symbol}&to_symbol={to_symbol}&interval={interval}&apikey={apikey}`

### Parameters
#### Query Parameters
- **function** (string) - Required - Must be `FX_INTRADAY`.
- **from_symbol** (string) - Required - The currency symbol to trade from (e.g., EUR).
- **to_symbol** (string) - Required - The currency symbol to trade to (e.g., USD).
- **interval** (string) - Required - The time interval between consecutive data points (e.g., `5min`).
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```python
import requests

url = 'https://www.alphavantage.co/query?function=FX_INTRADAY&from_symbol=EUR&to_symbol=USD&interval=5min&apikey=YOUR_API_KEY'
r = requests.get(url)
data = r.json()
print(data)
````

### Response

#### Success Response (200)

- **symbol** (string) - The trading symbol (e.g., EUR/USD).
- **timeSeriesFX** (object) - An object containing time series data, where keys are timestamps and values are objects with open, high, low, close prices.

#### Response Example

```json
{
  "Meta Data": {
    "Information": "FX Intraday (5min)",
    "From Symbol": "EUR",
    "To Symbol": "USD",
    "Last Refreshed": "2023-10-27 10:30:00",
    "Interval": "5min",
    "Output Size": "Compact",
    "Time Zone": "UTC"
  },
  "Time Series FX (5min)": {
    "2023-10-27 10:30:00": {
      "1. open": "1.0650",
      "2. high": "1.0655",
      "3. low": "1.0648",
      "4. close": "1.0652"
    },
    "2023-10-27 10:25:00": {
      "1. open": "1.0649",
      "2. high": "1.0651",
      "3. low": "1.0647",
      "4. close": "1.0650"
    }
  }
}
```

````

--------------------------------

### Fetch Currency Exchange Rate with PHP

Source: https://www.alphavantage.co/documentation/index

Gets currency exchange rate information from Alpha Vantage API using PHP. It fetches the JSON response using `file_get_contents` and decodes it into a PHP associative array. The output is then printed.

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
?>
````

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieve economic data, such as Real GDP Per Capita, from the Alpha Vantage API. Requires a function and an API key. Data type can be specified as JSON or CSV.

````APIDOC
## GET /query

### Description
This endpoint allows you to fetch various economic indicators. The example provided retrieves Real GDP Per Capita data.

### Method
GET

### Endpoint
https://www.alphavantage.co/query

### Parameters
#### Query Parameters
- **function** (string) - Required - Specifies the economic indicator to retrieve. Example: `REAL_GDP_PER_CAPITA`.
- **datatype** (string) - Optional - Specifies the output format. Accepts `json` (default) or `csv`.
- **apikey** (string) - Required - Your unique Alpha Vantage API key.

### Request Example
`https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&apikey=demo`

### Response
#### Success Response (200)
- **data** (object/string) - The requested economic data, format depends on the `datatype` parameter.

#### Response Example (JSON)
```json
{
  "...gendata...": {
    "1960-01-01": "9374.22",
    "1961-01-01": "9472.15",
    "1962-01-01": "9651.14"
  }
}
````

````

--------------------------------

### Fetch Balance Sheet Data (BOP) using C#

Source: https://www.alphavantage.co/documentation/index

Demonstrates fetching Balance Sheet data using the Alpha Vantage API in C#. It supports both .NET Framework (using `JavaScriptSerializer`) and .NET Core (using `System.Text.Json`). Remember to replace 'demo' with your API key.

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// -------------------------------------------------------------------------
// if using .NET Framework
// https://docs.microsoft.com/en-us/dotnet/api/system.web.script.serialization.javascriptserializer?view=netframework-4.8
// This requires including the reference to System.Web.Extensions in your project
using System.Web.Script.Serialization;
// -------------------------------------------------------------------------
// if using .Net Core
// https://docs.microsoft.com/en-us/dotnet/api/system.text.json?view=net-5.0
using System.Text.Json;
// -------------------------------------------------------------------------

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=BOP&symbol=IBM&interval=daily&apikey=demo"
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // -------------------------------------------------------------------------
                 // if using .NET Framework (System.Web.Script.Serialization)

                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // -------------------------------------------------------------------------
                // if using .NET Core (System.Text.Json)
                // using .NET Core libraries to parse JSON is more complicated. For an informative blog post
                // https://devblogs.microsoft.com/dotnet/try-the-new-system-text-json-apis/

                dynamic json_data = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // -------------------------------------------------------------------------

                // do something with the json_data
            }
        }
    }
}
````

---

### Fetch ETF Profile Data with PHP

Source: https://www.alphavantage.co/documentation/index

This PHP script fetches ETF profile data from Alpha Vantage using 'file_get_contents' to retrieve the JSON response and 'json_decode' to parse it. It then prints the decoded data. Ensure your PHP installation allows 'allow_url_fopen'.

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=ETF_PROFILE&symbol=QQQ&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
?>
```

---

### Fetch HT_PHASOR Data using Python

Source: https://www.alphavantage.co/documentation/index

This Python snippet demonstrates how to fetch the Hilbert transform, phasor components (HT_PHASOR) values for a given symbol using the Alpha Vantage API. It uses the 'requests' library to make the HTTP GET request and 'r.json()' to parse the JSON response. Ensure you replace 'demo' with your actual API key.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=HT_DCPHASE&symbol=IBM&interval=daily&series_type=close&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### GET /query - Earnings Call Transcript

Source: https://www.alphavantage.co/documentation/index

Retrieves the earnings call transcript for a given stock symbol and quarter. Requires a valid API key.

```APIDOC
## GET /query - Earnings Call Transcript

### Description
Retrieves the earnings call transcript for a specific stock symbol and quarter. This endpoint is useful for analyzing company communications during earnings periods.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The function to retrieve data for. Use `EARNINGS_CALL_TRANSCRIPT`.
- **symbol** (string) - Required - The stock symbol for which to retrieve the transcript (e.g., `IBM`).
- **quarter** (string) - Required - The fiscal quarter for which to retrieve the transcript (e.g., `2024Q1`).
- **apikey** (string) - Required - Your Alpha Vantage API key. Obtain one from the Alpha Vantage website.

### Request Example
```

https://www.alphavantage.co/query?function=EARNINGS_CALL_TRANSCRIPT&symbol=IBM&quarter=2024Q1&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **symbol** (string) - The stock symbol.
- **quarterlyReports** (array) - An array of objects, each containing details about the earnings call for a specific quarter.
  - **fiscalDateEnding** (string) - The date the fiscal quarter ended.
  - **reportedDate** (string) - The date the earnings were reported.
  - **content** (string) - The full text of the earnings call transcript.

#### Response Example
```json
{
  "symbol": "IBM",
  "quarterlyReports": [
    {
      "fiscalDateEnding": "2024-03-31",
      "reportedDate": "2024-04-24",
      "content": "Good morning, everyone, and welcome to IBM's first quarter 2024 earnings call..."
    }
  ]
}
````

````

--------------------------------

### Fetch Aluminum Data with Python

Source: https://www.alphavantage.co/documentation/index

Fetches monthly aluminum data from Alpha Vantage API using Python's requests library. It requires an API key and prints the JSON response. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=ALUMINUM&interval=monthly&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
````

---

### Fetch Real-time Options Data in JavaScript

Source: https://www.alphavantage.co/documentation/index

This JavaScript snippet shows how to retrieve real-time options data using the 'request' module. It makes an HTTP GET request to the Alpha Vantage API, handles potential errors, and logs the JSON response. Remember to substitute 'demo' with your valid API key.

```javascript
"use strict";
var request = require("request");

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url =
  "https://www.alphavantage.co/query?function=REALTIME_OPTIONS&symbol=IBM&apikey=demo";

request.get(
  {
    url: url,
    json: true,
    headers: { "User-Agent": "request" },
  },
  (err, res, data) => {
    if (err) {
      console.log("Error:", err);
    } else if (res.statusCode !== 200) {
      console.log("Status:", res.statusCode);
    } else {
      // data is successfully parsed as a JSON object:
      console.log(data);
    }
  },
);
```

---

### GET /query - Volume Weighted Average Price (VWAP)

Source: https://www.alphavantage.co/documentation/index

This endpoint retrieves the Volume Weighted Average Price (VWAP) for a given symbol and interval. Replace 'demo' with your actual API key.

```APIDOC
## GET /query - Volume Weighted Average Price (VWAP)

### Description
Retrieves the Volume Weighted Average Price (VWAP) for a specified stock symbol and interval. Requires an API key.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query?function=VWAP&symbol={symbol}&interval={interval}&apikey={apikey}`

### Parameters
#### Query Parameters
- **function** (string) - Required - Set to "VWAP".
- **symbol** (string) - Required - The stock symbol (e.g., "IBM").
- **interval** (string) - Required - The time interval for the data (e.g., "15min").
- **apikey** (string) - Required - Your Alpha Vantage API key.

### Request Example
```

https://www.alphavantage.co/query?function=VWAP&symbol=IBM&interval=15min&apikey=YOUR_API_KEY

````

### Response
#### Success Response (200)
- **technical_indicator** (object) - Contains the VWAP data.
  - **1. symbol** (string) - The stock symbol.
  - **2. interval** (string) - The time interval.
  - **3. VWAP** (string) - The Volume Weighted Average Price.
  - **timestamp** (string) - The timestamp for the VWAP value.

#### Response Example
```json
{
    "technical_indicator": {
        "1. symbol": "IBM",
        "2. interval": "15min",
        "3. VWAP": "141.2345",
        "4. timestamp": "2023-10-27 14:45:00"
    }
}
````

````

--------------------------------

### GET /query (REAL_GDP_PER_CAPITA)

Source: https://www.alphavantage.co/documentation/index

This endpoint returns the quarterly Real GDP per Capita data of the United States. Data is sourced from the U.S. Bureau of Economic Analysis via the FRED API.

```APIDOC
## GET /query (REAL_GDP_PER_CAPITA)

### Description
This API returns the quarterly Real GDP per Capita data of the United States. It utilizes data from the U.S. Bureau of Economic Analysis.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - Set to `REAL_GDP_PER_CAPITA`.
- **interval** (string) - Optional - By default, `annual`. Strings `quarterly` and `annual` are accepted.
- **datatype** (string) - Optional - By default, `json`. Strings `json` and `csv` are accepted.
- **apikey** (string) - Required - Your API key.

### Request Example
`https://www.alphavantage.co/query?function=REAL_GDP_PER_CAPITA&interval=quarterly&apikey=demo`

### Response
#### Success Response (200)
- **data** (object/csv) - The requested Real GDP per Capita data.

#### Response Example (JSON)
```json
{
    "information": "Thank you for using Alpha Vantage! Our standard API rate limit is 25 requests every 1 minute and 500 requests every 1 hour. Please refer to https://www.alphavantage.co/documentation/ for more information about the premium plans.",
    "symbol": "GDPPERCAPITA",
    "interval": "quarterly",
    "real_gdp_per_capita": [
        {
            "date": "2022-01-01",
            "value": "76399.500"
        },
        {
            "date": "2021-01-01",
            "value": "70249.000"
        }
    ]
}
````

````

--------------------------------

### Fetch Historical Options Data using PHP

Source: https://www.alphavantage.co/documentation/index

PHP script to get historical options data from the Alpha Vantage API. It uses `file_get_contents` to fetch the data and `json_decode` to parse the JSON response. Replace 'demo' with your valid API key.

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=HISTORICAL_OPTIONS&symbol=IBM&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
?>
````

---

### Fetch MFI Data with Python using requests

Source: https://www.alphavantage.co/documentation/index

Fetches Money Flow Index (MFI) data for IBM using the Alpha Vantage API in Python. This snippet requires the 'requests' library. It sends a GET request to the API and parses the JSON response.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=MFI&symbol=IBM&interval=weekly&time_period=10&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Currency Exchange Rate with Python

Source: https://www.alphavantage.co/documentation/index

Fetches the real-time exchange rate between two currencies using the Alpha Vantage API. It sends a GET request to the API endpoint and parses the JSON response. Requires the 'requests' library.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Python Request for AlphaVantage MINUS_DI API

Source: https://www.alphavantage.co/documentation/index

This Python code snippet demonstrates how to use the 'requests' library to fetch MINUS_DI technical indicator data from the AlphaVantage API. It constructs the URL with the specified parameters and makes a GET request, returning the response object.

```python
import requests

api_url = "https://www.alphavantage.co/query?"
params = {
    "function": "MINUS_DI",
    "symbol": "IBM",
    "interval": "weekly",
    "time_period": "10",
    "apikey": "demo"
}

response = requests.get(api_url, params=params)

# The response object contains the data, which can be accessed as JSON, CSV, etc.
# For example, to get JSON data:
# data = response.json()
# print(data)
```

---

### Fetch AROONOSC Data using PHP

Source: https://www.alphavantage.co/documentation/index

Fetches the Aroon Oscillator data for IBM using the Alpha Vantage API in PHP. It uses 'file_get_contents' to retrieve the JSON data from the URL and 'json_decode' to parse it into a PHP array. The decoded data is then printed. No external libraries are strictly required for this basic example.

```php
<?php
// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
$json = file_get_contents('https://www.alphavantage.co/query?function=AROONOSC&symbol=IBM&interval=daily&time_period=10&apikey=demo');

$data = json_decode($json,true);

print_r($data);

exit;
?>
```

---

### Fetch ADOSC Data using Python

Source: https://www.alphavantage.co/documentation/index

Fetches the ADOSC (Awesome Oscillator) data for IBM from the Alpha Vantage API using Python's requests library. It retrieves JSON data and prints it to the console. Ensure the 'requests' library is installed.

```python
import requests

# replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
url = 'https://www.alphavantage.co/query?function=ADOSC&symbol=IBM&interval=daily&fastperiod=5&apikey=demo'
r = requests.get(url)
data = r.json()

print(data)
```

---

### Fetch Global Sugar Price Data (Python)

Source: https://www.alphavantage.co/documentation/index

This Python script demonstrates how to fetch global sugar price data using the AlphaVantage API. It utilizes the 'requests' library to make an HTTP GET request to the API endpoint. The function, interval, and API key are passed as parameters. The response is expected to be in JSON format.

```python
import requests

def get_sugar_price(interval='monthly', apikey='demo'):
    url = f"https://www.alphavantage.co/query?function=SUGAR&interval={interval}&apikey={apikey}"
    response = requests.get(url)
    return response.json()

# Example usage:
# data = get_sugar_price(interval='quarterly')
# print(data)
```

---

### GET /query

Source: https://www.alphavantage.co/documentation/index

Retrieve Stochastic Full (STOCHF) technical indicator data for a given symbol and interval. Optional parameters allow for historical month data, custom periods for fastk and fastd, moving average types, and data format.

```APIDOC
## GET /query

### Description
Retrieve Stochastic Full (STOCHF) technical indicator data for a given symbol and interval. This endpoint allows for customization of historical data, moving average periods, and data output format.

### Method
GET

### Endpoint
`https://www.alphavantage.co/query`

### Parameters
#### Query Parameters
- **function** (string) - Required - The technical indicator of your choice. Use `STOCHF` for Stochastic Full.
- **symbol** (string) - Required - The ticker symbol of your choice (e.g., `IBM`).
- **interval** (string) - Required - Time interval between data points. Supported values: `1min`, `5min`, `15min`, `30min`, `60min`, `daily`, `weekly`, `monthly`.
- **apikey** (string) - Required - Your Alpha Vantage API key.
- **month** (string) - Optional - Returns technical indicators for a specific month in history (format: `YYYY-MM`, e.g., `2009-01`).
- **fastkperiod** (integer) - Optional - The time period for the fastk moving average. Defaults to `5`.
- **fastdperiod** (integer) - Optional - The time period for the fastd moving average. Defaults to `3`.
- **fastdmatype** (integer) - Optional - The moving average type for the fastd moving average. Defaults to `0`. Accepted values: 0 (SMA), 1 (EMA), 2 (WMA), 3 (DEMA), 4 (TEMA), 5 (TRIMA), 6 (T3), 7 (KAMA), 8 (MAMA).
- **datatype** (string) - Optional - The format for the returned data. Accepted values: `json` (default), `csv`.

### Request Example
```

https://www.alphavantage.co/query?function=STOCHF&symbol=IBM&interval=daily&apikey=demo

````

### Response
#### Success Response (200)
- **`Technical Analysis: STOCHF`** (object) - Contains the STOCHF indicator values.
  - **`STOCHF.FastK`** (string) - The calculated FastK value.
  - **`STOCHF.FastD`** (string) - The calculated FastD value.
  - **`timestamp`** (string) - The timestamp for the data point.

#### Response Example
```json
{
    "Technical Analysis: STOCHF": {
        "2023-10-27 16:00:00": {
            "STOCHF.FastK": "75.3456",
            "STOCHF.FastD": "72.1234"
        },
        "2023-10-27 15:59:00": {
            "STOCHF.FastK": "73.1234",
            "STOCHF.FastD": "70.9876"
        }
    }
}
````

````

--------------------------------

### Fetch Momentum Indicator Data - C# (.NET)

Source: https://www.alphavantage.co/documentation/index

This C# code demonstrates fetching Momentum (MOM) indicator data for IBM from the Alpha Vantage API. It shows how to use `WebClient` to download the data and includes examples for parsing JSON using both `JavaScriptSerializer` (for .NET Framework) and `System.Text.Json` (for .NET Core).

```csharp
using System;
using System.Collections.Generic;
using System.Net;

// For .NET Framework
using System.Web.Script.Serialization;
// For .NET Core
using System.Text.Json;

namespace ConsoleTests
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            // replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
            string QUERY_URL = "https://www.alphavantage.co/query?function=MOM&symbol=IBM&interval=daily&time_period=10&series_type=close&apikey=demo";
            Uri queryUri = new Uri(QUERY_URL);

            using (WebClient client = new WebClient())
            {
                 // .NET Framework example
                JavaScriptSerializer js = new JavaScriptSerializer();
                dynamic json_data_framework = js.Deserialize(client.DownloadString(queryUri), typeof(object));

                // .NET Core example
                dynamic json_data_core = JsonSerializer.Deserialize<Dictionary<string, dynamic>>(client.DownloadString(queryUri));

                // Use json_data_framework or json_data_core
            }
        }
    }
}
````
