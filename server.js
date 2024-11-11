// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to handle the order placement
app.post('/placeOrder', (req, res) => {
  const { customerName, address, dressName, quantity } = req.body;
  
  // Process the order (For now, log it to the console)
  console.log('Order Received:', { customerName, address, dressName, quantity });

  // Respond with a success message
  res.json({ message: 'Order placed successfully!' });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
