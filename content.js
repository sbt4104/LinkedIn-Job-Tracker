// Notify the background script that the content script is loaded
chrome.runtime.sendMessage({action: "contentScriptReady"}, function(response) {
  console.log("Content script has announced itself");
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "captureJobDetails") {
    // Try to extract job details from the current LinkedIn page
    const jobDetails = extractJobDetails();
    
    if (jobDetails) {
      console.log("Job details captured:", jobDetails);
      
      // Send details to background script to add to Google Sheet
      chrome.runtime.sendMessage({
        action: "addToSheet", 
        jobDetails: jobDetails
      }, function(response) {
        console.log("Message delivery confirmed:", response);
      });
      
      // Send a response back to confirm receipt
      sendResponse({success: true, message: "Job details captured"});
    } else {
      alert('Could not extract job details. Make sure you are on a job posting page.');
      sendResponse({success: false, message: "Failed to capture job details"});
    }
    
    return true; // Indicates asynchronous response
  }
});

function extractJobDetails() {
  try {
    // These selectors might need adjustment based on LinkedIn's current HTML structure
    // For job listing page
    let titleEl = document.querySelector('.job-details-jobs-unified-top-card__job-title');
    let companyEl = document.querySelector('.job-details-jobs-unified-top-card__company-name');
    let locationEl = document.querySelector('.job-details-jobs-unified-top-card__primary-description-container');
    
    // Alternative selectors for different LinkedIn pages
    if (!titleEl) {
      titleEl = document.querySelector('.top-card-layout__title');
    }
    if (!companyEl) {
      companyEl = document.querySelector('.topcard__org-name-link, .top-card-layout__second-subline a');
    }
    if (!locationEl) {
      locationEl = document.querySelector('.topcard__flavor-row .topcard__flavor');
    }

    // Debug selectors
    console.log("Title element found:", titleEl);
    console.log("Company element found:", companyEl);
    console.log("Location element found:", locationEl);

    return {
      title: titleEl ? titleEl.textContent.trim() : 'N/A',
      company: companyEl ? companyEl.textContent.trim() : 'N/A',
      location: locationEl ? locationEl.textContent.trim() : 'N/A',
      url: window.location.href,
      dateAdded: new Date().toLocaleDateString()
    };
  } catch (error) {
    console.error('Error extracting job details:', error);
    return null;
  }
}