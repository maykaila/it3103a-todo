const stripe = Stripe('pk_test_51RNXXYPmeWVQueXTXZeUSSeK7NzbABLnWb9yMuBXadk62yQ0w6RFKpzPQMlvF6bVujRsSEtDkBMq5ekvTAeAtKWR00GFDNtK9H'); // Replace with your public key
const elements = stripe.elements();

const cardNumber = elements.create('cardNumber');
cardNumber.mount('#card-number');

const cardExpiry = elements.create('cardExpiry');
cardExpiry.mount('#card-expiry');

const cardCvc = elements.create('cardCvc');
cardCvc.mount('#card-cvc');

const form = document.getElementById('checkoutForm');
const errorDiv = document.getElementById('card-errors');

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const { token, error } = await stripe.createToken(cardNumber);

  if (error) {
    errorDiv.textContent = error.message;
  } else {
    const formData = new FormData(form);
    formData.append('stripeToken', token.id);

    fetch('../php/checkout.php', {
      method: 'POST',
      body: formData
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert('Payment successful! Order ID: ' + data.orderID);
        window.location.href = 'thankyou.html';
      } else {
        errorDiv.textContent = data.message;
      }
    })
    .catch(err => {
      console.error('Checkout error:', err);
      errorDiv.textContent = 'An unexpected error occurred.';
    });
  }
});

// Fetch and display order summary from cart
window.addEventListener('DOMContentLoaded', () => {
  const orderItemsContainer = document.getElementById('orderItemsContainer');
  const orderTotal = document.getElementById('orderTotal');

  fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartItems.php')
    .then(res => res.json())
    .then(data => {
      const { items, total } = data;
      orderItemsContainer.innerHTML = '';
      if (!items || items.length === 0) {
        orderItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        orderTotal.textContent = '₱0.00';
        return;
      }
      items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card shadow-sm mb-3';
        card.innerHTML = `
          <div class="row g-0">
            <div class="col-3">
              <img src="${item.image_path}" class="img-fluid rounded-start" alt="${item.title}">
            </div>
            <div class="col-9 card-body d-flex justify-content-between">
              <div>
                <h5 class="card-title mb-1">${item.title}</h5>
                <p class="card-text mb-1">${item.artist_name}</p>
                <p class="card-text mb-1">${item.category}</p>
              </div>
              <div class="d-flex align-items-center">
                <p class="fw-bold fs-6 mb-0">₱${parseFloat(item.price).toFixed(2)}</p>
              </div>
            </div>
          </div>`;
        orderItemsContainer.appendChild(card);
      });
      orderTotal.textContent = `₱${parseFloat(total).toFixed(2)}`;
    })
    .catch(err => {
      console.error('Could not load order summary', err);
      orderItemsContainer.innerHTML = '<p class="text-danger">Error loading order summary.</p>';
      orderTotal.textContent = '₱0.00';
    });
});

// Fetch order details from cart
fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartItems.php')
  .then(res => res.json())
  .then(data => {
    console.log('Order details from cart:', data);
  })
  .catch(err => {
    console.error('Error fetching order details:', err);
<<<<<<< HEAD
  });
=======
  });
>>>>>>> e2bbeb87f92985ad455f857a8079714a53dfb024
