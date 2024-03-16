document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get('sessionId', function(data) {
      const sessionId = data.sessionId || 'No sessionId set';
      document.getElementById('sessionIdDisplay').textContent = `Session ID: ${sessionId}`;
    });
  });
  