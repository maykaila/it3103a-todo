document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('cartItemsContainer');
  const totalEl   = document.getElementById('estimatedTotal');
  const summary   = document.getElementById('summaryCard');

  // 1) Fetch all pending orders for this user
  fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartItems.php')
    .then(res => res.json())
    .then(data => {
      const { items, total } = data;

      // 2) Populate items
      if (items.length === 0) {
        container.innerHTML += '<p>Your cart is empty.</p>';
        summary.querySelector('button').disabled = true;
        return;
      }

      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card shadow-sm mb-3';
        card.dataset.itemId = item.cart_item_id;
        card.innerHTML = `
          <div class="row g-0">
            <div class="col-md-3">
              <img src="${item.image_path}"
                   class="img-fluid rounded-start"
                   alt="${item.title}">
            </div>
            <div class="col-md-8 card-body d-flex justify-content-between">
              <div>
                <h5 class="card-title">${item.title}</h5>
                <p class="card-text mb-1">${item.artist_name}</p>
                <p class="card-text mb-1">${item.category}</p>
                <button class="btn btn-sm btn-outline-danger mt-2 remove-btn">Remove</button>
              </div>
              <div class="d-flex align-items-center">
                <p class="fw-bold fs-5 mb-0">₱${parseFloat(item.price).toFixed(2)}</p>
              </div>
            </div>
          </div>`;
        container.appendChild(card);
      });

      // 3) Display total
      totalEl.textContent = `₱${parseFloat(total).toFixed(2)}`;
    })
    .catch(err => {
      console.error('Could not load cart items', err);
      container.innerHTML += '<p class="text-danger">Error loading cart.</p>';
    });

  // 4) Optional: hook up your checkout button
  document.getElementById('checkoutBtn')
    .addEventListener('click', () => {
      window.location.href = 'checkout.html'; // or your checkout flow
    });

    // Attach remove handlers
  container.addEventListener('click', (e) => {
    if (e.target.classList.contains('remove-btn')) {
      const card = e.target.closest('.card');
      const itemId = card.dataset.itemId;

      fetch(`/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/removeCartItem.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cart_item_id: itemId }) // This matches PHP code
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          card.remove();
          location.reload(); // or update total manually
        } else {
          alert('Failed to remove item.');
        }
      })
      .catch(err => {
        console.error('Error removing item:', err);
      });
    }
  });

  // Checkout
  document.getElementById('checkoutBtn')
    .addEventListener('click', () => {
      window.location.href = 'checkout.html';
    });
});


