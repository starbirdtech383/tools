document.addEventListener('DOMContentLoaded', function() {
    var refreshButton = document.getElementById('refreshButton');
    var pingStatusDisplay = document.getElementById('pingStatusDisplay');

    refreshButton.addEventListener('click', function() {
        chrome.runtime.sendMessage({message: "pingStatus"}, function(response) {
            pingStatusDisplay.textContent = response.status;
        });
    });
});