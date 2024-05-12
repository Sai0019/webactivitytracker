let activeTabId = null;
let activeTabStartTime = null;
let activeTabTotalTime = 0;

// Function to update active tab's total time
function updateActiveTabTime() {
  if (activeTabStartTime) {
    activeTabTotalTime += (Date.now() - activeTabStartTime) / 1000; // Convert to seconds
    activeTabStartTime = Date.now();
  }
}

// Function to start tracking time when a tab becomes active
chrome.tabs.onActivated.addListener((activeInfo) => {
  updateActiveTabTime();
  activeTabId = activeInfo.tabId;
  activeTabStartTime = Date.now();
});

// Function to stop tracking time when a tab becomes inactive
chrome.tabs.onRemoved.addListener((tabId, removeInfo) => {
  if (tabId === activeTabId) {
    updateActiveTabTime();
    console.log(`Total time spent on active tab: ${activeTabTotalTime} seconds`);
    activeTabId = null;
    activeTabStartTime = null;
    activeTabTotalTime = 0;
  }
});

// Function to track time spent on each page
chrome.webNavigation.onDOMContentLoaded.addListener((details) => {
  if (details.tabId === activeTabId) {
    updateActiveTabTime();
    console.log(`Time spent on ${details.url}: ${activeTabTotalTime} seconds`);
    activeTabStartTime = Date.now();
    activeTabTotalTime = 0;
  }
});
