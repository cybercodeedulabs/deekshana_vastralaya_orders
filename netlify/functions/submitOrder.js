const { google } = require("googleapis");
require("dotenv").config();

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY || !process.env.GOOGLE_SHEET_ID) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Environment variables not configured properly" }),
      };
    }

    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const { client_email, private_key } = credentials;

    const auth = new google.auth.JWT(
      client_email,
      null,
      private_key, // Assuming proper newlines
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const data = JSON.parse(event.body);
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Orders!A1";

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            data.orderNumber,
            data.customerName,
            data.product,
            data.orderDate,
            data.quantity,
            data.customerAddress,
            data.vendor,
            data.actualPrice,
            data.sellPrice,
            data.orderStatus,
          ],
        ],
      },
    });

    console.log("Google Sheets response:", response.data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error details:", error.response?.data || error.message || error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to submit order" }),
    };
  }
};
