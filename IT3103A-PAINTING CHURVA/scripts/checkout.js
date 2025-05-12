const form = document.getElementById('checkoutForm');
const errorDiv = document.getElementById('card-errors');

// Init on load
document.addEventListener('DOMContentLoaded', () => {
  displayCartItemsFromServer();
  updateOrderTotalFromServer();
  restrictNumericInput('cardCVC', 4);
  setupCardNumberFormatting();
});

// Allow only digits (with max length)
function restrictNumericInput(fieldId, maxLength) {
  const input = document.getElementById(fieldId);
  if (input) {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '').slice(0, maxLength);
    });
  }
}

// Auto-format card number input to #### #### #### ####
function setupCardNumberFormatting() {
  const cardInput = document.getElementById('cardNumber');
  if (!cardInput) return;

  cardInput.addEventListener('input', () => {
    let value = cardInput.value.replace(/\D/g, '').slice(0, 16);
    const formatted = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    cardInput.value = formatted;
  });
}

// Form submission logic
form.addEventListener('submit', async function (e) {
  e.preventDefault();
  errorDiv.textContent = '';

  const month = parseInt(form.cardExpiryMonth.value, 10);
  let year = form.cardExpiryYear.value.trim();

  if (isNaN(month) || month < 1 || month > 12) {
    errorDiv.textContent = 'Expiry month must be between 1 and 12.';
    return;
  }

  if (/^\d{2}$/.test(year)) {
    const currentYear = new Date().getFullYear();
    const currentCentury = Math.floor(currentYear / 100) * 100;
    year = parseInt(year, 10) + currentCentury;
  } else if (/^\d{4}$/.test(year)) {
    year = parseInt(year, 10);
  } else {
    errorDiv.textContent = 'Expiry year must be 2 or 4 digits.';
    return;
  }

  const now = new Date();
  const expiryDate = new Date(year, month - 1, 1);
  expiryDate.setMonth(expiryDate.getMonth() + 1);
  if (expiryDate <= now) {
    errorDiv.textContent = 'Card expiration date must be in the future.';
    return;
  }

  try {
    const res = await fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartItems.php');
    const { items } = await res.json();

    if (!items || items.length === 0) {
      errorDiv.textContent = 'Your cart is empty.';
      return;
    }

    const data = {
      fullName: form.fullName.value,
      address: form.address.value,
      userID: form.userID.value,
      cardNumber: form.cardNumber.value.replace(/\s/g, ''),
      cardExpiryMonth: month,
      cardExpiryYear: year,
      cardCVC: form.cardCVC.value,
      cartItems: items
    };

    const submitRes = await fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/checkout.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const text = await submitRes.text();
    let response;
    try {
      response = JSON.parse(text);
    } catch (err) {
      throw new Error('Unexpected server response: ' + text);
    }

    if (response.status === 'success') {
      alert(response.message);
      window.location.href = '/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/views/homepage.html';
    } else {
      errorDiv.textContent = response.message;
    }

  } catch (err) {
    console.error(err);
    errorDiv.textContent = 'An error occurred during checkout.';
  }
});

// Show total from server
function updateOrderTotalFromServer() {
  fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartItems.php')
    .then(res => res.json())
    .then(data => {
      document.getElementById('orderTotal').textContent = `₱${parseFloat(data.total).toFixed(2)}`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById('orderTotal').textContent = '₱0.00';
    });
}

// Display items in cart
function displayCartItemsFromServer() {
  const cartContainer = document.getElementById('orderItemsContainer');
  fetch('/it3103a-todo/it3103a-todo/IT3103A-PAINTING%20CHURVA/php/getCartItems.php')
    .then(res => res.json())
    .then(data => {
      const { items } = data;
      cartContainer.innerHTML = '';

      if (!items || items.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
      }

      items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item', 'mb-3', 'p-3', 'border', 'rounded');
        itemElement.innerHTML = `
          <div class="d-flex align-items-center">
            <img src="${item.image_path}" alt="${item.title}" style="width: 80px; height: 80px; object-fit: cover;" class="me-3">
            <div class="flex-grow-1">
              <h5 class="mb-1">${item.title}</h5>
              <p class="mb-0">Price: ₱${parseFloat(item.price).toFixed(2)}</p>
            </div>
          </div>
        `;
        cartContainer.appendChild(itemElement);
      });
    })
    .catch(err => {
      console.error(err);
      cartContainer.innerHTML = '<p class="text-danger">Error loading cart items.</p>';
    });
}
