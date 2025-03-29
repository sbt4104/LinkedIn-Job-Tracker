chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "addLinkedInJob",
    title: "Add Job to Sheet",
    contexts: ["all"],
    documentUrlPatterns: ["https://www.linkedin.com/*"]
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "addLinkedInJob") {
    // Check if the tab is valid before sending a message
    chrome.tabs.sendMessage(tab.id, { action: "captureJobDetails" }, (response) => {
      // Handle case where there was no response (errors are suppressed in the callback)
      if (chrome.runtime.lastError) {
        console.log('Could not send message: ', chrome.runtime.lastError.message);
      }
    });
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "addToSheet" && request.jobDetails) {
    // Get the web app URL from storage
    chrome.storage.sync.get(['webAppUrl'], function(result) {
      if (!result.webAppUrl) {
        console.log('Please set your Web App URL in the extension settings');
        return;
      }
      
      // Send job details to the Google Apps Script web app
      fetch(result.webAppUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request.jobDetails)
      })
      .then(() => {
        console.log('Job added to your sheet successfully!');
      })
      .catch(error => {
        console.error('Error:', error);
        console.log('Failed to add job to sheet. Check the console for details.');
      });
    });
    
    // Acknowledge receipt of the message
    sendResponse({received: true});
    return true; // Indicates asynchronous response
  }
});