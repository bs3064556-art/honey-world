/**
 * Paste this into the sheet: Extensions → Apps Script.
 * Deploy → New deployment → Web app.
 * Execute as: Me. Who has access: Anyone.
 * Put the /exec URL in .env as VITE_SHEET_URL, and in Vercel as the same env var.
 *
 * Sheet header row: Time | Q1 | Q2 | Q3 | Q4 | Q5
 * Each form fill appends one new row.
 */
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.q1 || '',
    data.q2 || '',
    data.q3 || '',
    data.q4 || '',
    data.q5 || '',
  ]);
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
