async function init() {

  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key, index) => {
      if (index!==7 && index!==3) {
        addCityToDOM(key.id, key.city, key.description, key.image, index);
      }
    });
  }
}

 // Fetch cities using the Backend API and return the data
async function fetchCities() {
 
  try {
    let response = await fetch('https://content-qtripdynamic-qa-backend.azurewebsites.net/api/v1/cities');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let cities = await response.json();
    return cities;

  } catch (error) {
    console.error("Error fetching cities:", error);
    return null; 
  }

}

// Populate the City details and insert those details into the DOM
function addCityToDOM(id, city, description, image) {

  const boxDiv = document.createElement("div");
  boxDiv.classList.add("box");
  
  boxDiv.innerHTML = `<a href="/adventures/?city=${id}" id="${id}">
            <img src="${image}" alt="">
            <div class="content">
                <h3> <i class="fas fa-map-marker-alt"></i> ${city} (${description})</h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, nam!</p>
                <div class="stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="far fa-star"></i>
                </div>
                <div class="price"> $90.00 <span>$120.00</span> </div>
                <a href="#" class="btn">book now</a>
            </div>
          </a>`;

  const dataContainer = document.getElementById("data");
  dataContainer.appendChild(boxDiv);

}

export { init, fetchCities, addCityToDOM };
