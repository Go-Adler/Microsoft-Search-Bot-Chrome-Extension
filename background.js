chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'display123') {
    console.log('123');
  }
});
