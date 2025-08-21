// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem('token');

// if (!token) {
//   alert('Please log in first');
//   window.location.href = 'login.html';
// }

// // Logout button
// const logoutBtn = document.getElementById('logoutBtn');
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', () => {
//     localStorage.removeItem('token');
//     window.location.href = 'login.html';
//   });
// }

// // Load cart items from backend
// async function loadCart() {
//   try {
//     const res = await fetch(`${API_URL}/cart`, {
//       headers: {
//         'Authorization': `Bearer ${token}`
//       }
//     });
//     const cartItems = await res.json();

//     const container = document.getElementById('cart-items');
//     container.innerHTML = '';

//     if (!cartItems.length) {
//       container.innerHTML = '<p>Your cart is empty.</p>';
//       document.getElementById('cart-total').textContent = '0.00';
//       return;
//     }

//     let grandTotal = 0;

//     cartItems.forEach((item, idx) => {
//       const itemTotal = item.ingredients.reduce((sum, ing) => sum + ing.price * ing.selectedQty, 0);
//       grandTotal += itemTotal;

//       const div = document.createElement('div');
//       div.className = 'cart-item';
//       div.innerHTML = `
//         <h3>${item.dishName}</h3>
//         <ul>
//           ${item.ingredients.map(ing => `<li>${ing.selectedQty} × ${ing.quantity} ${ing.name} — $${(ing.price * ing.selectedQty).toFixed(2)}</li>`).join('')}
//         </ul>
//         <p>Item total: $${itemTotal.toFixed(2)}</p>
//         <button class="remove-btn" data-id="${item._id}">Remove</button>
//         <hr>
//       `;
//       container.appendChild(div);
//     });

//     document.getElementById('cart-total').textContent = grandTotal.toFixed(2);

//     // Remove item
//     document.querySelectorAll('.remove-btn').forEach(btn => {
//       btn.addEventListener('click', async (e) => {
//         const id = e.target.dataset.id;
//         await fetch(`${API_URL}/cart/${id}`, {
//           method: 'DELETE',
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         loadCart();
//       });
//     });

//   } catch (err) {
//     console.error(err);
//     alert('Failed to load cart');
//   }
// }

// // Confirm order
// const confirmBtn = document.getElementById('confirm-order');
// if (confirmBtn) {
//   confirmBtn.addEventListener('click', async () => {
//     try {
//       const res = await fetch(`${API_URL}/cart/checkout`, {
//         method: 'POST',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const data = await res.json();
//       if (res.ok) {
//         alert('Order placed successfully!');
//         loadCart();
//       } else {
//         alert(data.message || 'Order failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Order error');
//     }
//   });
// }

// // Initial load
// loadCart();
// frontend/src/components/cart.js
const API_URL = "http://127.0.0.1:5000/api"; // or wherever your backend runs
const token = localStorage.getItem("token");

async function loadCart() {
  const token = localStorage.getItem("token");

  const response = await fetch("http://127.0.0.1:5000/api/cart", {
    headers: { Authorization: `Bearer ${token}` }
  });

  const cart = await response.json();
  console.log("Cart API response:", cart); // 👈 add this line to check what data is coming

  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <h3>${item.dishName}</h3>
      <ul>
        ${item.ingredients.map(ing => 
          `<li>${ing.name} - ${ing.selectedQty} × ${ing.price} = ${ing.selectedQty * ing.price}</li>`
        ).join("")}
      </ul>
      <p><strong>Item Total: ${item.itemTotal}</strong></p>
    `;

    cartItemsContainer.appendChild(itemDiv);

    total += item.itemTotal;
  });

  document.getElementById("cart-total").textContent = total;
}

document.addEventListener("DOMContentLoaded", loadCart);
document.getElementById("confirmOrderBtn")?.addEventListener("click", async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to place an order!");
      return;
    }

    // Fetch current cart items
    const cartRes = await fetch(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const cart = await cartRes.json();

    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    // Prepare payload for backend
    const payload = { cart };  // matches what backend expects

    const res = await fetch(`${API_URL}/cart/checkout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.ok) {
      alert("✅ Order placed successfully!");
      // Optionally clear cart display
      document.getElementById("cart-items").innerHTML = "";
      document.getElementById("cart-total").textContent = "0.00";
    } else {
      console.error("Order error:", data);
      alert(data.message || "Failed to place order");
    }

  } catch (err) {
    console.error("Error placing order:", err);
    alert("Error placing order");
  }
});