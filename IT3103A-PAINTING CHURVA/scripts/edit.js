document.addEventListener('DOMContentLoaded', () => {
  const url = new URL(location.href);
  if (document.getElementById('editArtForm') && url.searchParams.has('id')) {
    editArtwork(url.searchParams.get('id'));
  }
  if (document.getElementById('editArtistForm') && url.searchParams.has('id')) {
    editArtist(url.searchParams.get('id'));
  }
});

function editArtwork(id) {
  const form = document.getElementById('editArtForm');
  // populate artist dropdown first
  fetch('../php/getArtistsForAdmin.php')
    .then(r => r.json())
    .then(list => {
      const sel = document.getElementById('artistSelect');
      list.forEach(a => sel.innerHTML += `<option value="${a.artist_id}">${a.artist_name}</option>`);
    });
  // fetch current artwork
  fetch(`../php/getArtworkAdmin.php?id=${id}`)
    .then(r => r.json())
    .then(art => {
      form.artwork_id.value      = art.artwork_id;
      form.title.value           = art.title;
      form.artist_id.value       = art.artist_id;
      form.year_created.value    = art.year_created;
      form.subject.value         = art.subject;
      form.size_dimensions.value = art.size_dimensions;
      form.medium.value          = art.medium;
      form.frame.value           = art.frame;
      form.authenticity.value    = art.authenticity;
      form.packaging.value       = art.packaging;
      form.ready_to_hang.value   = art.ready_to_hang ? 1 : 0;
      form.category.value        = art.category;
      form.price.value           = art.price;
      form.description.value     = art.description;
      document.getElementById('currentImage').src           = art.image_path;
      form.existing_image_path.value                       = art.image_path;
    });

  form.onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(form);
    fetch('../php/updateArtwork.php', { method:'POST', body:fd })
      .then(r=>r.json())
      .then(j=>{
        alert(j.success ? 'Artwork updated!' : 'Error: '+j.message);
        if (j.success) location.href = 'manageArtworks.html';
      })
      .catch(err=>{ console.error(err); alert('Network error'); });
  };
}

function editArtist(id) {
  const form = document.getElementById('editArtistForm');
  fetch(`../php/getArtistAdmin.php?id=${id}`)
    .then(r => r.json())
    .then(a => {
      form.artist_id.value        = a.artist_id;
      form.artist_name.value      = a.artist_name;
      form.artist_description.value = a.artist_description;
      document.getElementById('currentProfile').src = a.profile_picture;
      form.existing_profile_picture.value = a.profile_picture;
    });

  form.onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(form);
    fetch('../php/updateArtist.php', { method:'POST', body:fd })
      .then(r=>r.json())
      .then(j=>{
        alert(j.success ? 'Artist updated!' : 'Error: '+j.message);
        if (j.success) location.href = 'manageArtists.html';
      })
      .catch(err=>{ console.error(err); alert('Network error'); });
  };
}