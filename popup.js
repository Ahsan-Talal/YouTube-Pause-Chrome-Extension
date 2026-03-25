document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('toggle');
  
    // Load the current setting from storage
    chrome.storage.sync.get("autoPauseEnabled", (data) => {
      const isEnabled = (typeof data.autoPauseEnabled === "undefined") ? true : data.autoPauseEnabled;
      toggle.checked = isEnabled;
    });
  
    // Update storage when the toggle is changed
    toggle.addEventListener('change', function() {
      const isEnabled = toggle.checked;
      chrome.storage.sync.set({ autoPauseEnabled: isEnabled });
    });
  });
  