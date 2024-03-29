# RedScope

## Part 1  Allow multiple URL’s to be stored and retrieved
The Node.js server maintains a sessionMap where each sessionId is associated with a data file path.
When receiving a payload from the Chrome plugin, the server checks if a sessionId is provided.
If a sessionId is provided, it retrieves the corresponding data file path from the sessionMap. If not, it logs an error and stops processing the payload.
Data associated with the URL is then appended to the respective data file.

## Part 2 Assign sessionId to the data sent by Chrome Plugin
When the user starts a session on the server, a unique sessionId is created and associated with a data file path.
The Chrome plugin sends data to the server along with the sessionId.
The server processes the payload and associates the data with the provided sessionId.
If no sessionId is provided in the payload, the server logs an error and stops processing the payload.
The server acknowledges successful data reception back to the Chrome plugin.

## Part 4 : Show sessionId in options page
Manifest File Modification:

Added the options_page property to the manifest.json file, pointing to the options.html file.
Options Page Creation:

Created an options.html file to serve as the options page.
Added a placeholder <div> element with an id (sessionIdDisplay) where the sessionId will be displayed.
Options Page Script:

Implemented an options.js file to retrieve the sessionId from Chrome storage and display it on the options page.
Used the chrome.storage.sync.get() method to retrieve the sessionId from Chrome storage.
Updated the content of the <div> element with the retrieved sessionId.
Storage of sessionId:

Stored the sessionId in Chrome storage. This could be done in either the background script or content script of the Chrome extension.
Used chrome.storage.sync.set() method to store the sessionId.