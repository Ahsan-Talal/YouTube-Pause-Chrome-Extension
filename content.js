let autoPauseEnabled = true;
let wasPlaying = false;

// Pause the video if it's playing and record that it was playing
function pauseVideo() {
  const video = document.querySelector("video");
  if (video && !video.paused) {
    wasPlaying = true;
    video.pause();
  }
}

// Resume the video if it was paused by our script
function resumeVideo() {
  const video = document.querySelector("video");
  if (video && video.paused && wasPlaying) {
    video.play();
    wasPlaying = false;
  }
}

// Handle visibility changes: pause when hidden, resume when visible
function handleVisibilityChange() {
  if (document.hidden) {
    pauseVideo();
  } else {
    resumeVideo();
  }
}

// Add or remove event listeners based on the toggle state
function addEventListeners() {
  document.addEventListener("visibilitychange", handleVisibilityChange);
  window.addEventListener("blur", pauseVideo);
  window.addEventListener("focus", resumeVideo);
}

function removeEventListeners() {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener("blur", pauseVideo);
  window.removeEventListener("focus", resumeVideo);
}

function updateEventListeners(enabled) {
  if (enabled) {
    addEventListeners();
  } else {
    removeEventListeners();
  }
}

// Retrieve the initial autoPauseEnabled setting from storage
chrome.storage.sync.get("autoPauseEnabled", (data) => {
  if (typeof data.autoPauseEnabled === "undefined") {
    autoPauseEnabled = true;
    chrome.storage.sync.set({ autoPauseEnabled: true });
  } else {
    autoPauseEnabled = data.autoPauseEnabled;
  }
  updateEventListeners(autoPauseEnabled);
});

// Listen for changes in the storage setting to update functionality in real time
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.autoPauseEnabled) {
    autoPauseEnabled = changes.autoPauseEnabled.newValue;
    updateEventListeners(autoPauseEnabled);
  }
});
