const API_URL = "http://127.0.0.1:5000/api";
const token = localStorage.getItem('token');

if (!token) window.location.href = 'login.html';

// ---------------- LOGOUT ----------------
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// ---------------- LOAD PROFILE ----------------
(async function loadProfile() {
  try {
    const res = await fetch(`${API_URL}/users/profile`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch profile');
    const user = await res.json();

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('address').value = user.address;
    document.getElementById('number').value = user.number;

  } catch (err) {
    console.error(err);
    alert('Error loading profile');
  }
})();

// ---------------- UPDATE PROFILE ----------------
document.getElementById('profile-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const updatedData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    address: document.getElementById('address').value,
    number: document.getElementById('number').value,
  };

  const password = document.getElementById('password').value;
  if (password) updatedData.password = password;

  try {
    const res = await fetch(`${API_URL}/users/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    if (res.ok) alert('Profile updated successfully!');
    else alert(data.msg || 'Update failed');

  } catch (err) {
    console.error(err);
    alert('Error updating profile');
  }
});

// ---------------- LOAD ORDER HISTORY ----------------
(async function loadOrders() {
  try {
    const res = await fetch(`${API_URL}/users/orders`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Failed to fetch orders');
    const orders = await res.json();

    const container = document.getElementById('order-list');
    container.innerHTML = '';

    if (!orders.length) {
      container.innerHTML = '<p>No orders yet.</p>';
      return;
    }

    orders.forEach(order => {
      const div = document.createElement('div');
      div.className = 'order';
      div.innerHTML = `
        <h3>Order #${order._id}</h3>
        <p>Placed on: ${new Date(order.createdAt).toLocaleString()}</p>
        <ul>
          ${order.items.map(item => `
            <li>
              <strong>${item.dishName}</strong> - $${item.itemTotal.toFixed(2)}
              <ul>
                ${item.ingredients.map(ing => `<li>${ing.selectedQty} × ${ing.quantity} ${ing.name} — $${(ing.price * ing.selectedQty).toFixed(2)}</li>`).join('')}
              </ul>
            </li>
          `).join('')}
        </ul>
        <p><strong>Total: $${order.totalPrice.toFixed(2)}</strong></p>
        <hr/>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    alert('Error loading orders');
  }
})();
