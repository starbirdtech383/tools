document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('saveButton').addEventListener('click', saveOptions);
  restoreOptions();
});

function saveOptions() {
  var ip = document.getElementById('ipAddressInput').value;
  chrome.storage.sync.set({
    ipAddress: ip
  }, function() {
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restoreOptions() {
  chrome.storage.sync.get({
    ipAddress: '127.0.0.1'
  }, function(items) {
    document.getElementById('ipAddressInput').value = items.ipAddress;
  });
}