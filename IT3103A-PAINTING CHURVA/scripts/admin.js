document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('salesPieChart')) loadAnalytics();
  if (document.getElementById('artCarousel'))  loadArtManagement();
  if (document.getElementById('artistList'))   loadArtistManagement();
  if (document.getElementById('txTable'))      loadTransactions();

  if (document.getElementById('artForm'))      hookArtworkForm();
  if (document.getElementById('artistForm'))   hookArtistForm();
});

function loadAnalytics() {
  fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getAnalytics.php')
    .then(r => r.json())
    .then(data => {
      new Chart(
        document.getElementById('salesPieChart'),
        {
          type: 'pie',
          data: {
            labels: data.byCategory.labels,
            datasets: [{ data: data.byCategory.values }]
          }
        }
      );
      new Chart(
        document.getElementById('salesLineChart'),
        {
          type: 'line',
          data: {
            labels: data.trends.labels,
            datasets: [{
              label: 'Sales',
              data: data.trends.values,
              fill: false
            }]
          }
        }
      );
    })
    .catch(console.error);
}

function loadArtManagement() {
  fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getArtworksForAdmin.php')
    .then(r => r.json())
    .then(list => {
      const car = document.getElementById('artCarousel');
      car.innerHTML = ''; // clear before inject
      list.forEach(a => {
        const c = document.createElement('div');
        c.className = 'card';
        c.style.minWidth = '200px';
        c.innerHTML = `
          <img src="${a.image_path}" class="card-img-top" style="height:120px;object-fit:cover">
          <div class="card-body p-2">
            <h6 class="card-title mb-1">${a.title}</h6>
            <p class="mb-1">₱${parseFloat(a.price).toFixed(2)}</p>
          </div>`;
        car.append(c);
      });
      document.getElementById('prevArt').onclick = () => car.scrollBy({ left:-220, behavior:'smooth' });
      document.getElementById('nextArt').onclick = () => car.scrollBy({ left:220, behavior:'smooth' });
    })
    .catch(console.error);
}

function loadArtistManagement() {
  fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getArtistsForAdmin.php')
    .then(r => r.json())
    .then(list => {
      const ul = document.getElementById('artistList');
      ul.innerHTML = '';
      list.forEach(art => {
        const li = document.createElement('div');
        li.className = 'list-group-item d-flex align-items-center';
        li.innerHTML = `<i class='bx bx-user-circle bx-lg me-3'></i>${art.artist_name}`;
        ul.append(li);
      });
    })
    .catch(console.error);
}
// // 4) Transactions
// function loadTransactions() {
//   fetch('../php/getCartItems.php')
//     .then(r=>r.json())
//     .then(data=>{
//       const tbody = document.querySelector('#txTable tbody');
//       data.items.forEach(it=> {
//         const tr = document.createElement('tr');
//         tr.innerHTML = `
//           <td>${it.order_id}</td>
//           <td>${it.user_id}</td>
//           <td>${it.title}</td>
//           <td>₱${parseFloat(it.price).toFixed(2)}</td>
//           <td>${it.date_of_order}</td>`;
//         tbody.append(tr);
//       });
//     });
// }

function hookArtworkForm() {
  const form = document.getElementById('artForm');

  // Populate artist dropdown (unchanged)
  fetch('../php/getArtistsForAdmin.php')
    .then(r => r.json())
    .then(list => {
      const sel = document.getElementById('artistSelect');
      list.forEach(a => {
        sel.innerHTML += `<option value="${a.artist_id}">${a.artist_name}</option>`;
      });
    });

  // Handle submission
  form.onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(form);
    fetch('../php/addArtwork.php', {
      method: 'POST',
      body: fd   // with multipart/form-data headers automatically set
    })
    .then(r => r.json())
    .then(j => {
      alert(j.success ? 'Artwork added!' : 'Error: ' + j.message);
      if (j.success) window.location = 'adminSide.html';
    })
    .catch(err => {
      console.error(err);
      alert('Network error.');
    });
  };
}


// 6) Hook Add Artist form
function hookArtistForm() {
  const form = document.getElementById('artistForm');
  form.onsubmit = e => {
    e.preventDefault();
    const fd = new FormData(form);
    fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/addArtists.php', {
      method: 'POST',
      body: fd
    })
    .then(r => r.json())
    .then(j => {
      alert(j.success ? 'Artist added!' : 'Error: ' + j.message);
      if (j.success) window.location = 'adminSide.html';
    })
    .catch(err => {
      console.error(err);
      alert('Network error.');
    });
  };
}
