function getCityFromURL(search) {
  const params = new URLSearchParams(search);
  const city = params.get('city');
  return city;

}

async function fetchAdventures(city) {
  try {
    let response = await fetch(`https://content-qtripdynamic-qa-backend.azurewebsites.net/adventures?city=${city}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let adventures = await response.json();
    return adventures;

  } catch (error) {
    console.error("Error fetching cities:", error);
    return null; 
  }

}

function addAdventureToDOM(adventures) {
  if (adventures) {
    adventures.forEach((key) => {
      
      const adventureCard = document.createElement("div");
      adventureCard.className = "col-6 col-lg-3 mb-3"; 
      const adventureLink = document.createElement("a");
      adventureLink.href = `detail/?adventure=${key.id}`;
      adventureLink.id = key.id; 

      adventureLink.innerHTML = `
      <div class="activity-card">
        <img src="${key.image}" class="activity-card img" alt="${key.category}">
        <div class="adventure-detail-card">
          <div class="d-flex justify-content-between">
              <h6>${key.name}</h6>
              <h6>${key.costPerHead}</h6>
          </div>
          <div class="d-flex justify-content-between">
              <h6>Duration</h6>
              <h6>${key.duration} Hours</h6>
          </div>
        </div>
        <p class="category-banner">${key.category}</p>
      </div>
      `;    

      adventureCard.appendChild(adventureLink);

      const dataContainer = document.getElementById("data");
      dataContainer.appendChild(adventureCard);

    });
  }

}

function filterByDuration(list, low, high) {
  return list.filter(adventure => adventure.duration >= low && adventure.duration <= high);

}

function filterByCategory(list, categoryList) {
  return list.filter(adventure => {
    return categoryList.includes(adventure.category);
  });

}

function filterFunction(list, filters) {
  let filteredList = list;

  if (filters.duration) {
    let li = filters.duration.split("-");
    let low = li[0];
    let high = li[1];

    filteredList = filterByDuration(filteredList, low, high);
  }

  if (filters.category && filters.category.length > 0) {
    filteredList = filterByCategory(filteredList, filters.category);
  }

  return filteredList;

}

function saveFiltersToLocalStorage(filters) {
  try {
    
    var filtersJSON = JSON.stringify(filters);

    localStorage.setItem('filters', filtersJSON);
    
    return true;

  } catch (error) {
    console.error('Error saving filters to localStorage:', error);
    return false;
  }

}

function getFiltersFromLocalStorage() {
  try {
      var filtersJSON = localStorage.getItem('filters');
      
      var filters = JSON.parse(filtersJSON);
      
      return filters;
    } catch (error) {
      console.error('Error retrieving filters from localStorage:', error);
      return null;
    }

}

function generateFilterPillsAndUpdateDOM(filters) {
  var durationSelect = document.getElementById('duration-select');
  if (filters && filters.duration) {
      durationSelect.value = filters.duration;
  }

  const categoryListContainer = document.getElementById('category-list');
  categoryListContainer.innerHTML = '';

  if (filters.category) {
    filters.category.forEach(category => {
      const categoryPill = document.createElement('span');
      categoryPill.className = 'category-filter';
      categoryPill.textContent = category;
      categoryListContainer.appendChild(categoryPill);
    });
  }

}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
