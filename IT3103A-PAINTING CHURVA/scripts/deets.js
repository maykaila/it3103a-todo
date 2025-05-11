document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    alert('No artwork specified.');
    return;
  }

  // Fetch details endpoint
  fetch(`/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getArtDetails.php?id=${encodeURIComponent(id)}`)
    .then(r => r.json())
    .then(art => {
      document.getElementById('artImage').src         = art.image_path;
      document.getElementById('artImage').alt         = art.title;
      document.getElementById('artTitle').textContent = art.title;
      document.getElementById('artArtist').textContent= art.artist_name;
      document.getElementById('artDesc').textContent  = art.description;

      // ABOUT list
      document.getElementById('aboutArtist').textContent = art.artist_name;
      document.getElementById('aboutYear').textContent   = art.year_created;
      document.getElementById('aboutSubject').textContent= art.subject;
      document.getElementById('aboutPrice').textContent  = `Php ${parseFloat(art.price).toFixed(2)}`;

      // DETAILS list
      document.getElementById('detailSize').textContent   = art.size_dimensions;
      document.getElementById('detailMedium').textContent = art.medium;
      document.getElementById('detailFrame').textContent  = art.frame;
      document.getElementById('detailAuth').textContent   = art.authenticity;
      document.getElementById('detailPack').textContent   = art.packaging;
      document.getElementById('detailHang').textContent   = art.ready_to_hang ? 'Yes' : 'No';

      // Price display under button
      document.getElementById('priceDisplay').textContent = `₱${parseFloat(art.price).toFixed(2)}`;

      // Artist bio
      document.getElementById('artistPic').src    = art.profile_picture || 'default-profile.png';
      document.getElementById('artistName').textContent = art.artist_name;
      document.getElementById('artistBio').textContent  = art.artist_description;
    })
    .catch(() => alert('Failed to load artwork.'));

});
