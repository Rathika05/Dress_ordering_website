// app.js
let cart = [];

// Function to add items to cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const dressName = button.dataset.name;
    const price = button.dataset.price;

    // Add to cart array
    cart.push({ dressName, price });

    // Update the cart UI
    updateCartUI();
  });
});

// Function to update the cart display
function updateCartUI() {
  const cartList = document.getElementById('cart');
  cartList.innerHTML = '';

  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.dressName} - $${item.price}`;
    cartList.appendChild(li);
  });
}

// Handle order form submission
document.getElementById('orderForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const customerName = document.getElementById('customerName').value;
  const address = document.getElementById('address').value;

  const orderData = {
    customerName,
    address,
    dresses: cart
  };

  // Send order to the server
  fetch('/placeOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderData),
  })
    .then(response => response.json())
    .then(result => {
      document.getElementById('responseMessage').textContent = result.message;
      cart = [];  // Clear cart after order
      updateCartUI(); // Update UI to reflect empty cart
    })
    .catch(error => {
      document.getElementById('responseMessage').textContent = 'Error placing order.';
    });
});
