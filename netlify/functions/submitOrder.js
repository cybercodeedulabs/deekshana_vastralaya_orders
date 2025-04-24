const { google } = require("googleapis");
require("dotenv").config(); // Load environment variables from .env file

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // Parse the service account key from the environment variable
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const { client_email, private_key } = credentials;

    const auth = new google.auth.JWT(
      client_email,
      null,
      private_key.replace(/\\n/g, "\n"), // Convert escaped \n back to actual newlines
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const data = JSON.parse(event.body);
    const spreadsheetId = process.env.GOOGLE_SHEET_ID; // Use the ID from .env
    const range = "Orders!A1"; // Replace with your sheet name and range

    await sheets.spreadsheets.values.append({
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

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to submit order" }),
    };
  }
};
