# LinkedIn Job Tracker Extension

Save LinkedIn jobs directly to your Google Sheet with a single right-click. Track your job search efficiently without manual copying and pasting.

## Features

- **One-Click Saving**: Capture job details with a simple right-click
- **Automatic Data Extraction**: Saves job title, company, location, URL, and date
- **Private & Secure**: Your data stays in your personal Google Sheet
- **Customizable**: Use your own Google Sheet for complete control

## Setup Instructions

### Step 1: Create Your Google Sheet

1. Create a new Google Sheet or make a copy of our template
2. Add the following headers in the first row:
  - A1: Title
  - B1: Company
  - C1: Location
  - D1: URL
  - E1: Date Added

### Step 2: Add the Google Apps Script

1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any code in the editor and paste the following:

```javascript
function doGet(e) {
 return ContentService.createTextOutput("The web app is running!");
}

function doPost(e) {
 try {
   // Parse the incoming data
   const data = JSON.parse(e.postData.contents);
   
   // Open the active spreadsheet
   const ss = SpreadsheetApp.getActiveSpreadsheet();
   const sheet = ss.getSheets()[0]; // Gets the first sheet
   
   // Append the job data to the sheet
   sheet.appendRow([
     data.title,
     data.company,
     data.location,
     data.url,
     data.dateAdded
   ]);
   
   // Return success
   return ContentService.createTextOutput(JSON.stringify({
     'result': 'success'
   })).setMimeType(ContentService.MimeType.JSON);
 } catch (error) {
   // Log any errors
   console.error(error);
   return ContentService.createTextOutput(JSON.stringify({
     'result': 'error',
     'error': error.toString()
   })).setMimeType(ContentService.MimeType.JSON);
 }
}
