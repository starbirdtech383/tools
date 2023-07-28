var machineIP = '';

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({machineIP: '127.0.0.1'}, function() {
        console.log("The machine IP is set.");
    });
});

chrome.storage.onChanged.addListener(function(changes, namespace) {
    for (var key in changes) {
        if(key === 'machineIP'){
            machineIP = changes[key].newValue;
        }
    }
});

function pingMachine() {
    return new Promise((resolve, reject) => {
        var img = new Image();
        img.onload = function() { resolve('online'); };
        img.onerror = function() { resolve('offline'); };
        img.src = 'http://' + machineIP;
    });
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.message === "pingStatus") {
            pingMachine().then(status => {
                sendResponse({status: status});
            });
            return true; // Will respond asynchronously.
        }
    }
);