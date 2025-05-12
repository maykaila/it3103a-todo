// artworks.js

/**
 * @param {string} category  One of "Painting","Drawing","Print"
 * @param {string} sort  "low", "high", or ""
 * @param {number} minPrice Optional minimum price
 * @param {number} maxPrice Optional maximum price
 */

function loadArtworks(category, sort = '') {
  const url = `/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getArtworks.php?category=${encodeURIComponent(category)}&sort=${encodeURIComponent(sort)}`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(data => {
      const container = document.querySelector('.data-container');
      container.innerHTML = data.map(item => `
        <div class="details">
          <a href="/it3103a-todo/IT3103A-PAINTING%20CHURVA/views/deetsOfArt.html?id=${item.artwork_id}">
            <div class="eachPainting">
              <img src="${encodeURI(item.image_path)}" alt="${item.title}">
            </div>
          </a>
          <p>${item.title}</p>
          <p>${item.size_dimensions}</p>
          <p>${item.artist_name}</p>
          <p>$${parseFloat(item.price).toFixed(2)}</p>
        </div>
      `).join('');
    })
    .catch(err => {
      console.error('Load error:', err);
      document.querySelector('.data-container').innerHTML =
        `<p class="text-danger">Could not load artworks.</p>`;
    });
}


function handleSortChange() {
  const sortValue = document.getElementById('sort').value;
  // Detect category from URL or assign manually
  const category = window.location.pathname.includes('drawing') ? 'Drawing'
                  : window.location.pathname.includes('print') ? 'Print'
                  : 'Painting';

  loadArtworks(category, sortValue);
}