// Function to handle sort option change
//for the under sorting
function handleSortChange() {
    const sortOption = document.getElementById('sort').value; // Get selected sort option
    fetchArtworks('Painting', 0, 400, sortOption, '#paintingsContainer'); // Fetch sorted paintings
    fetchArtworks('Drawing', 0, 400, sortOption, '#drawingsContainer'); // Fetch sorted drawings
    fetchArtworks('Print', 0, 400, sortOption, '#printsContainer'); // Fetch sorted prints
}

//for the between sorting
function handleSortChanges() {
    const sortOption = document.getElementById('sort').value; // Get selected sort option
    fetchArtworks('Painting', 400, 1000, sortOption, '#paintingsContainer'); // Fetch sorted paintings
    fetchArtworks('Drawing', 400, 1000, sortOption, '#drawingsContainer'); // Fetch sorted drawings
    fetchArtworks('Print', 400, 1000, sortOption, '#printsContainer'); // Fetch sorted prints
}

//for the above sorting
function handleSortChangez() {
    const sortOption = document.getElementById('sort').value; // Get selected sort option
    fetchArtworks('Painting', 1000, 10000, sortOption, '#paintingsContainer'); // Fetch sorted paintings
    fetchArtworks('Drawing', 1000, 10000, sortOption, '#drawingsContainer'); // Fetch sorted drawings
    fetchArtworks('Print', 1000, 10000, sortOption, '#printsContainer'); // Fetch sorted prints
}


function fetchArtworks(category, minPrice = 0, maxPrice = 1000000, sort = '', containerId = '.data-container') {
  const url = `/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getArtworks.php?category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}&min_price=${minPrice}&max_price=${maxPrice}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(data => {
      const container = document.querySelector(containerId);
      if (data.length === 0) {
        container.innerHTML = `<p class="text-muted">No ${category}s found in this price range.</p>`;
        return;
      }
      container.innerHTML = data.map(item => `
        <div class="details">
          <a href="/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/views/deetsOfArt.html?id=${item.artwork_id}">
            <div class="eachPainting">
              <img src="${encodeURI(item.image_path)}" alt="${item.title}">
            </div>
          </a>
          <p>${item.title}</p>
          <p>${item.size_dimensions}</p>
          <p>${item.artist_name}</p>
          <p>₱${parseFloat(item.price).toFixed(2)}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error('Load error:', err);
      document.querySelector(containerId).innerHTML =
        `<p class="text-danger">Could not load ${category}s.</p>`;
    });
}