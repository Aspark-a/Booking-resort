async function getHotelList() {
  // get cointainer
  const cointainer = document.getElementById('hotel-list');

  // get data from api
  try {
    const response = await fetch(
      "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=PAR&radius=5&radiusUnit=KM&hotelSource=ALL",
      {
        type: "GET",
        headers: {
            'accept': 'application/vnd.amadeus+json',
            'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer rHYLrKVTNhJOf7mFENurNCSe9Bku'
        },
      }
    );

    const result = await response.json();
    // render list in html
    result.data?.forEach(element => {
        cointainer.appendChild(renderHotel(element));
    });
  } catch (error) {
    console.log(error);
  }
}
function renderHotel(hotel) {
    // Create the main card div
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';

    // Create the img element
    const img = document.createElement('img');
    img.className = 'card-img-top hotel-img';
    img.src = '...'; // Add your image source here
    img.alt = 'Card image cap';

    // Create the card body div
    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    // Create the card title
    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title hotel-name';
    cardTitle.textContent = hotel.name;

    // Create the card text
    const cardText = document.createElement('p');
    cardText.className = 'card-text hotel-description';
    cardText.textContent =`hotel id is: ${hotel.hotelId}`;

    // Create the card link/button
    const cardLink = document.createElement('a');
    cardLink.href = '#';
    cardLink.className = 'btn btn-primary hotel-details';
    cardLink.textContent = 'Go somewhere';

    // Append the elements to the card body
    cardBodyDiv.appendChild(cardTitle);
    cardBodyDiv.appendChild(cardText);
    cardBodyDiv.appendChild(cardLink);

    // Append the img and card body to the main card div
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBodyDiv);

    return cardDiv;
}

getHotelList();
