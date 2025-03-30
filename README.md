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
```

### Step 3: Deploy the Web App

1. Click **Deploy > New deployment**
2. Select **Web app** as the deployment type
3. Configure the following settings:
  * Execute as: **Me**
  * Who has access: **Anyone**
4. Click **Deploy**
5. When prompted, authorize the script to access your Google Sheet
6. **Copy the Web App URL** provided in the success message - you'll need this for the next step
7. Run the project by clicking on Run

### Step 4: Configure the Extension

1. Go to the GitHub repository: [[YourGitHubRepoLink](https://github.com/sbt4104/LinkedIn-Job-Tracker/edit/main/)]
2. Click the green "Code" button and select "Download ZIP"
3. Extract the ZIP file to a folder on your computer
4. Open Chrome and navigate to `chrome://extensions/`
5. Enable "Developer mode" using the toggle in the top-right corner
6. Click "Load unpacked" and select the folder containing the extracted extension files
7. The LinkedIn Job Tracker extension should now appear in your extensions list

### Step 5: Configure the Extension

1. Click the LinkedIn Job Tracker extension icon in your browser toolbar
2. Paste the Web App URL you copied from the Apps Script deployment
3. Click **Save URL**
4. You'll see a confirmation message when saved successfully

## Using the Extension

1. Browse LinkedIn job listings
2. When you find a job you want to save, right-click anywhere on the page
3. Select **Add Job to Sheet** from the context menu
4. You'll see a confirmation when the job is added to your sheet

## Troubleshooting

* If jobs aren't being added, make sure your Web App URL is correct
* If job details aren't captured correctly, try refreshing the LinkedIn page
* Check that your sheet has the correct column headers in the first row

## Privacy Notice

This extension:
* Only accesses data on LinkedIn pages
* Only sends data to your own Google Sheet
* Does not collect or store your data anywhere else
* Does not track your browsing activity

## Support

If you encounter any issues or have questions, please create a issue or just send a PR here.
