let siteTimes = {};
let currentSite = null;
let startTime = Date.now();

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  switchSite(tab.url);
});

chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.tabs.get(details.tabId, (tab) => {
    if (tab && tab.url) {
      switchSite(tab.url);
    }
  });
});

function switchSite(url) {
  const hostname = new URL(url).hostname;

  if (currentSite) {
    const duration = (Date.now() - startTime) / 1000;
    siteTimes[currentSite] = (siteTimes[currentSite] || 0) + duration;
  }

  currentSite = hostname;
  startTime = Date.now();

  chrome.storage.local.set({ siteTimes });
}
