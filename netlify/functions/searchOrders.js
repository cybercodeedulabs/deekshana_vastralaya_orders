const { google } = require("googleapis");

exports.handler = async (event) => {
  if (event.httpMethod !== "GET") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const { client_email, private_key } = credentials;

    const auth = new google.auth.JWT(
      client_email,
      null,
      private_key,
      ["https://www.googleapis.com/auth/spreadsheets.readonly"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Orders!A1:J"; // Adjust to match your sheet

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const rows = response.data.values;

    if (!rows || rows.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }

    const query = event.queryStringParameters.q || "";
    const filteredRows = rows
    .slice(1) // Skip header
    .map((row, index) => ({ index: index + 2, row })) // Index +2 since we sliced off first row
    .filter((entry) =>
      entry.row[1]?.toLowerCase().includes(query.toLowerCase())
    );
    return {
      statusCode: 200,
      body: JSON.stringify(filteredRows),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch orders" }),
    };
  }
};
