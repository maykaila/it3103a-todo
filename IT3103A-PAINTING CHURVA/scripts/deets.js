document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) {
    alert('No artwork specified.');
    return;
  }

  // Fetch details endpoint
  fetch(`/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getArtDetails.php?id=${encodeURIComponent(id)}`)
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

        // Handle Add to Cart
      document.getElementById('addToCartBtn').addEventListener('click', () => {
        // 1) Check login status
        fetch('/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/check_session.php')
          .then(r => r.json())
          .then(s => {
            if (!s.loggedIn) {
              // show modal if not logged in
              new bootstrap.Modal(document.getElementById('loginRegisterModal')).show();
              return;
            }
            // 2) Logged in → add to cart
            fetch('/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/addToCart.php', {
              method: 'POST',
              headers: { 'Content-Type':'application/json' },
              body: JSON.stringify({ artwork_id: id })
            })
            .then(r => r.json())
            .then(resp => {
              if (resp.success) {
                fetch('/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartCount.php')
                .then(r => r.json())
                .then(data => {
                  document.getElementById('cartCount').textContent = data.count;
                });

                const toastEl = document.getElementById('cartToast');
                if (toastEl) {
                  new bootstrap.Toast(toastEl, { delay: 2000 }).show();
                }
              } else {
                alert('Error: ' + (resp.message||'Could not add.'));
              }
            })
            .catch(()=>alert('Network error.'));
          });
      });
      
});
