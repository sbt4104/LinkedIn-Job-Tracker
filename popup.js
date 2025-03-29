document.addEventListener('DOMContentLoaded', function() {
  // Load saved URL
  chrome.storage.sync.get(['webAppUrl'], function(result) {
    if (result.webAppUrl) {
      document.getElementById('webAppUrl').value = result.webAppUrl;
    }
  });

  // Save URL
  document.getElementById('saveUrl').addEventListener('click', function() {
    const webAppUrl = document.getElementById('webAppUrl').value;
    
    // Basic URL validation
    if (webAppUrl.includes('script.google.com')) {
      chrome.storage.sync.set({webAppUrl: webAppUrl}, function() {
        const status = document.getElementById('status');
        status.textContent = 'URL Saved!';
        setTimeout(() => status.textContent = '', 2000);
      });
    } else {
      alert('Please enter a valid Google Apps Script Web App URL');
    }
  });
});