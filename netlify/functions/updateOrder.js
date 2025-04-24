const { google } = require("googleapis");

exports.handler = async (event) => {
  if (event.httpMethod !== "PUT") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    const { client_email, private_key } = credentials;

    const auth = new google.auth.JWT(
      client_email,
      null,
      private_key,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const { rowIndex, ...updatedData } = JSON.parse(event.body);
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const range = `Orders!A${rowIndex}:J${rowIndex}`; // Target specific row

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      requestBody: {
        values: [
          [
            updatedData.orderNumber,
            updatedData.customerName,
            updatedData.product,
            updatedData.orderDate,
            updatedData.quantity,
            updatedData.customerAddress,
            updatedData.vendor,
            updatedData.actualPrice,
            updatedData.sellPrice,
            updatedData.orderStatus,
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
      body: JSON.stringify({ error: "Failed to update order" }),
    };
  }
};
