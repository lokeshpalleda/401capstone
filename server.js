const express = require('express');
const app = express();
const db = require('./firebase');
const path = require('path');

app.use(express.json());
app.use(express.static('public')); // Serves home.html by default

app.post('/order', async (req, res) => {
  const { name, roll, item } = req.body;

  try {
    await db.collection('orders').add({
      name,
      roll,
      item,
      status: 'Pending',
      timestamp: new Date()
    });
    res.json({ message: 'Order placed successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to place order' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const snapshot = await db.collection('orders').get();
    const orders = snapshot.docs.map(doc => doc.data());
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching orders');
  }
});

app.listen(3000, () => console.log('Server running at http://localhost:3000/home.html'));
