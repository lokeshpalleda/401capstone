const express = require('express');
const path = require('path');
const db = require('./firebase');

const app = express();
app.use(express.json());

// ✅ Serve static files (JS, HTML, CSS)
app.use(express.static('public'));

// 🚀 Force "/" to always load auth.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'auth.html'));
});

// ✅ Place order route
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


app.listen(3000, () => {
  console.log('http://localhost:3000/auth.html');
});
