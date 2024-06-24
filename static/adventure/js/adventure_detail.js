function getAdventureIdFromURL(search) {

  const params = new URLSearchParams(search);
  const adventureId = params.get("adventure");
  return adventureId;

}

async function fetchAdventureDetails(adventureId) {

  try {
    let response = await fetch(
      `https://content-qtripdynamic-qa-backend.azurewebsites.net/api/v1/adventures/detail?adventure=${adventureId}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let adventureDetails = await response.json();
    return adventureDetails;
  } catch (error) {
    console.error("Error fetching cities:", error);
    return null;
  }
}

function addAdventureDetailsToDOM(adventure) {

  if (adventure) {
    
    let adventureName = document.getElementById("adventure-name");
    adventureName.innerHTML = adventure.name;

    let adventureSubtitle = document.getElementById("adventure-subtitle");
    adventureSubtitle.innerHTML = adventure.subtitle;

    let photoGallery = document.getElementById("photo-gallery");
    adventure.images.forEach(img =>{

      let imgDiv = document.createElement("div");

      imgDiv.innerHTML = `<img src="${img}" alt="${adventure.name}" class="activity-card-image">`;

      photoGallery.appendChild(imgDiv);

    });

    let adventureContent = document.getElementById("adventure-content");
    adventureContent.innerHTML = adventure.content;

  }
}

function addBootstrapPhotoGallery(images) {

  let photoGallery = document.getElementById("photo-gallery");
  photoGallery.innerHTML = "";
  let carouselContainer = document.createElement("div");
  carouselContainer.setAttribute("id", "carouselExampleIndicators");
  carouselContainer.classList.add("carousel", "slide");
  carouselContainer.setAttribute("data-bs-ride", "carousel");

  let carouselIndicators = document.createElement("div");
  carouselIndicators.classList.add("carousel-indicators");
  images.forEach((img, index) => {
    let indicator = document.createElement("button");
    indicator.setAttribute("type", "button");
    indicator.setAttribute("data-bs-target", "#carouselExampleIndicators");
    indicator.setAttribute("data-bs-slide-to", index);
    if (index === 0) {
      indicator.classList.add("active");
      indicator.setAttribute("aria-current", "true");
    }
    indicator.setAttribute("aria-label", `Slide ${index + 1}`);
    carouselIndicators.appendChild(indicator);
  });

  let carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");
  images.forEach((img, index) => {
    let carouselItem = document.createElement("div");
    carouselItem.classList.add("carousel-item");
    if (index === 0) {
      carouselItem.classList.add("active");
    }
    let imgElement = document.createElement("img");
    imgElement.setAttribute("src", img);
    imgElement.classList.add("d-block", "w-100", "activity-card-image");
    imgElement.setAttribute("alt", `Slide ${index + 1}`);
    carouselItem.appendChild(imgElement);
    carouselInner.appendChild(carouselItem);
  });

  let carouselControlPrev = document.createElement("button");
  carouselControlPrev.classList.add("carousel-control-prev");
  carouselControlPrev.setAttribute("type", "button");
  carouselControlPrev.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlPrev.setAttribute("data-bs-slide", "prev");
  carouselControlPrev.innerHTML = `
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  `;

  let carouselControlNext = document.createElement("button");
  carouselControlNext.classList.add("carousel-control-next");
  carouselControlNext.setAttribute("type", "button");
  carouselControlNext.setAttribute("data-bs-target", "#carouselExampleIndicators");
  carouselControlNext.setAttribute("data-bs-slide", "next");
  carouselControlNext.innerHTML = `
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  `;

  carouselContainer.appendChild(carouselIndicators);
  carouselContainer.appendChild(carouselInner);
  carouselContainer.appendChild(carouselControlPrev);
  carouselContainer.appendChild(carouselControlNext);

  photoGallery.appendChild(carouselContainer);
}

function conditionalRenderingOfReservationPanel(adventure) {
  if (adventure.available) {

    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = String(adventure.costPerHead);

  } else {

    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";

  }

}

function calculateReservationCostAndUpdateDOM(adventure, persons) {
  const totalCost = adventure.costPerHead * persons;
  document.getElementById('reservation-cost').innerHTML = totalCost;

}

function captureFormSubmit(adventure) {
  const form = document.getElementById('myForm');
  
  form.addEventListener('submit', async function(event) {
    
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const date = formData.get('date');
    const person = formData.get('person');
    
    const data = {
      name: name,
      date: date,
      person: person,
      adventure: adventure.id
    };
    
    try {

      const response = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (response.ok) {
        alert('Success!');
        location.reload();
      } else {
        alert('Failed!');
      }
    } catch (error) {
      alert('Failed!');
    }
  });
}

function showBannerIfAlreadyReserved(adventure) {

  const reservedBanner = document.getElementById('reserved-banner');

  if (adventure.reserved) {
    reservedBanner.style.display = "block";
  } else {
    reservedBanner.style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
