// artworks.js

/**
 * @param {string} category  One of "Painting","Drawing","Print"
 */
function loadArtworks(category) {
  fetch(`/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getArtworks.php?category=${encodeURIComponent(category)}`)
    .then(res => {
      if (!res.ok) throw new Error(res.status);
      return res.json();
    })
    .then(data => {
      const container = document.querySelector('.data-container');
      container.innerHTML = data.map(item => `
        <div class="details">
          <a href="#">
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
