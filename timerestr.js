document.addEventListener('DOMContentLoaded', function() {
    const websiteInput = document.getElementById('websiteInput');
    const addWebsiteBtn = document.getElementById('addWebsiteBtn');
    const websiteList = document.getElementById('websiteList');
  
    // Load stored websites on popup open
    chrome.storage.sync.get('restrictedWebsites', function(data) {
      if (data.restrictedWebsites) {
        data.restrictedWebsites.forEach(website => {
          addWebsiteToList(website);
        });
      }
    });
  
    // Add website to list
    addWebsiteBtn.addEventListener('click', function() {
      const website = websiteInput.value.trim();
      if (website) {
        addWebsiteToList(website);
        saveWebsite(website);
        websiteInput.value = '';
      }
    });
  
    // Delete website from list
    websiteList.addEventListener('click', function(event) {
      if (event.target.classList.contains('delete-btn')) {
        const website = event.target.parentElement.textContent.trim();
        event.target.parentElement.remove();
        removeWebsite(website);
      }
    });
  
    // Function to add website to list
    function addWebsiteToList(website) {
      const li = document.createElement('li');
      li.innerHTML = `${website} <input type="number" placeholder="Time limit (minutes)"> minutes <button class="delete-btn">Delete</button>`;
      websiteList.appendChild(li);
    }
  
    // Function to save website to storage
    function saveWebsite(website) {
      chrome.storage.sync.get('restrictedWebsites', function(data) {
        let websites = data.restrictedWebsites || [];
        if (!websites.includes(website)) {
          websites.push(website);
          chrome.storage.sync.set({ 'restrictedWebsites': websites });
        }
      });
    }
  
    // Function to remove website from storage
    function removeWebsite(website) {
      chrome.storage.sync.get('restrictedWebsites', function(data) {
        let websites = data.restrictedWebsites || [];
        const index = websites.indexOf(website);
        if (index !== -1) {
          websites.splice(index, 1);
          chrome.storage.sync.set({ 'restrictedWebsites': websites });
        }
      });
    }
  });
  