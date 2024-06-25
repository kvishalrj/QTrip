async function fetchReservations() {
  try {
  
    const response = await fetch(`https://content-qtripdynamic-qa-backend.azurewebsites.net/api/v1/reservations/`);

    if (!response.ok) {
      throw new Error('Failed to fetch reservations');
    }
    
    const reservations = await response.json();
    return reservations;

  } catch (error) {
    console.error('Error fetching reservations:', error);
    return null;
  }

}

function addReservationToTable(reservations) {
    
    const noReservationBanner = document.getElementById('no-reservation-banner');
    const reservationTableParent = document.getElementById('reservation-table-parent');
    const reservationTable = document.getElementById('reservation-table');
  
    if (reservations.length === 0) {
      noReservationBanner.style.display = 'block';
      reservationTableParent.style.display = 'none';
    } else {
      noReservationBanner.style.display = 'none';
      reservationTableParent.style.display = 'block';
  
      reservations.forEach(reservation => {
        const tr = document.createElement('tr');
  
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const bookingDate = new Date(reservation.date).toLocaleDateString('en-IN', options);
        const bookingTime = new Date(reservation.time).toLocaleString('en-IN', { 
          weekday: undefined, 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric', 
          hour: 'numeric', 
          minute: 'numeric', 
          second: 'numeric', 
          hour12: true 
        }).replace(' at', ',');
  
        tr.innerHTML = `
          <td>${reservation.id}</td>
          <td>${reservation.name}</td>
          <td>${reservation.adventureName}</td>
          <td>${reservation.person}</td>
          <td>${bookingDate}</td>
          <td>${reservation.price}</td>
          <td>${bookingTime}</td>
          <td>
            <button id="${reservation.id}" class="reservation-visit-button">
              <a href="/frontend/pages/adventures/detail/?adventure=${reservation.adventure}" target="_blank">Visit Adventure</a>
            </button>
          </td>
        `;
  
        reservationTable.appendChild(tr);
      });
    }

}

export { fetchReservations, addReservationToTable };
