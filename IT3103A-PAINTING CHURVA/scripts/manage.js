document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('artTableBody')) loadAllArtworks();
  if (document.getElementById('artistTableBody')) loadAllArtists();
});

function loadAllArtworks() {
  fetch('../php/getArtworksForAdmin.php')
    .then(r=>r.json())
    .then(list=>{
      const tbody = document.getElementById('artTableBody');
      list.forEach(a=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><img src="${a.image_path}" style="height:50px"></td>
          <td>${a.title}</td>
          <td>${a.artist}</td>
          <td>${a.category}</td>
          <td>₱${parseFloat(a.price).toFixed(2)}</td>
          <td>
            <a href="editArtwork.html?id=${a.artwork_id}" class="btn btn-sm btn-warning">
              <i class='bx bx-edit'></i>
            </a>
            <button class="btn btn-sm btn-danger" onclick="deleteArtwork(${a.artwork_id})">
              <i class='bx bx-trash'></i>
            </button>
          </td>`;
        tbody.append(tr);
      });
    });
}

function loadAllArtists() {
  fetch('../php/getArtistsForAdmin.php')
    .then(r=>r.json())
    .then(list=>{
      const tbody = document.getElementById('artistTableBody');
      list.forEach(a=>{
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td><img src="${a.profile_picture||'/default-profile.png'}" style="height:50px"></td>
          <td>${a.artist_name}</td>
          <td>${a.artist_description.substring(0,50)}…</td>
          <td>
            <a href="editArtist.html?id=${a.artist_id}" class="btn btn-sm btn-warning">
              <i class='bx bx-edit'></i>
            </a>
            <button class="btn btn-sm btn-danger" onclick="deleteArtist(${a.artist_id})">
              <i class='bx bx-trash'></i>
            </button>
          </td>`;
        tbody.append(tr);
      });
    });
}

function deleteArtwork(id) {
  if (!confirm('Delete this artwork?')) return;
  fetch(`../php/deleteArtwork.php?id=${id}`,{method:'DELETE'})
    .then(r=>r.json()).then(j=>{
      if (j.success) location.reload();
      else alert('Error: '+j.message);
    });
}

function deleteArtist(id) {
  if (!confirm('Delete this artist?')) return;
  fetch(`../php/deleteArtist.php?id=${id}`,{method:'DELETE'})
    .then(r=>r.json()).then(j=>{
      if (j.success) location.reload();
      else alert('Error: '+j.message);
    });
}
