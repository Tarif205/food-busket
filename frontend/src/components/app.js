//src/components/app.js


// const token = localStorage.getItem('token');
// if (!token) {
//   alert('Please log in first');
//   window.location.href = 'login.html';
// }

// fetch('http://localhost:5000/api/dishes', {
//   headers: {
//     'Authorization': `Bearer ${token}`
//   }
// })
//   .then(res => res.json())
//   .then(dishes => {
//     const container = document.getElementById('dish-list');

//     dishes.forEach(dish => {
//       const dishDiv = document.createElement('div');
//       dishDiv.classList.add('dish');

//       // Create ingredient checkboxes
//       const ingredientList = dish.ingredients.map(ing => `
//         <label>
//           <input type="checkbox" class="ingredient-checkbox" data-name="${ing.name}" data-price="${ing.price}" checked>
//           ${ing.name} - $${ing.price}
//         </label>
//         <br>
//       `).join('');

//       dishDiv.innerHTML = `
//         <h2>${dish.name} (${dish.category})</h2>
//         <p><strong>Instructions:</strong> ${dish.instructions}</p>
//         <h3>Select Ingredients:</h3>
//         ${ingredientList}
//         <p><strong>Total: $<span class="total-price">0</span></strong></p>
//         <button class="order-btn">Place Order</button>
//         <img src="${dish.image}" alt="${dish.name}" width="200">
//         <hr>
//       `;

//       container.appendChild(dishDiv);

//       // Calculate initial total
//       updateTotal(dishDiv);

//       // Listen for checkbox changes
//       dishDiv.querySelectorAll('.ingredient-checkbox').forEach(cb => {
//         cb.addEventListener('change', () => updateTotal(dishDiv));
//       });

//       // Place order button handler
//       dishDiv.querySelector('.order-btn').addEventListener('click', () => {
//         const checkboxes = dishDiv.querySelectorAll('.ingredient-checkbox');
//         const selectedIngredients = [];
//         let total = 0;

//         checkboxes.forEach(cb => {
//           if (cb.checked) {
//             const name = cb.dataset.name;
//             const price = parseFloat(cb.dataset.price);
//             selectedIngredients.push({ name, price });
//             total += price;
//           }
//         });

//         if (selectedIngredients.length === 0) {
//           alert('Please select at least one ingredient to order.');
//           return;
//         }

//         // fetch('http://localhost:5000/api/orders', {
//         //   method: 'POST',
//         //   headers: {
//         //     'Content-Type': 'application/json',
//         //     'Authorization': `Bearer ${token}`
//         //   },
//         //   body: JSON.stringify({ ingredients: selectedIngredients, totalPrice: total })
//         // })
//         fetch('http://localhost:5000/api/orders', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             ingredients: selectedIngredients,
//             totalPrice: total
//           })
//         })
//         .then(res => res.json())
//         .then(data => {
//           console.log("✅ Server response:", data);
//           alert(data.msg || 'Order placed successfully!');
//         })
//         .catch(err => {
//           console.error('❌ Error placing order:', err);
//           alert('Failed to place order.');
//         });

//       });
//     });
//   })
//   .catch(err => {
//     console.error('Error fetching dishes:', err);
//     alert('Failed to load dishes. Please try again later.');
//   });

// // Update the total price based on selected ingredients
// function updateTotal(dishDiv) {
//   const checkboxes = dishDiv.querySelectorAll('.ingredient-checkbox');
//   let total = 0;
//   checkboxes.forEach(cb => {
//     if (cb.checked) {
//       total += parseFloat(cb.dataset.price);
//     }
//   });
//   dishDiv.querySelector('.total-price').textContent = total.toFixed(2);
// }

// // Logout button logic (make sure you have a button with id="logoutBtn" in your index.html)
// document.getElementById('logoutBtn').addEventListener('click', () => {
//   localStorage.removeItem('token');
//   window.location.href = 'login.html';
// });



// // src/components/app.js

// src/components/app.js
// frontend/src/components/app.js
// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem('token');

// // ===================== UTILITY: CART =====================
// function getCart() {
//   return JSON.parse(localStorage.getItem('cart') || '[]');
// }
// function setCart(cart) {
//   localStorage.setItem('cart', JSON.stringify(cart));
//   updateCartCount();
// }
// function updateCartCount() {
//   const el = document.getElementById('cart-count');
//   if (el) el.textContent = getCart().length;
// }

// // ===================== LOGOUT =====================
// const logoutBtn = document.getElementById('logoutBtn');
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('cart');
//     window.location.href = 'login.html';
//   });
// }

// // ===================== LOGIN =====================
// const loginForm = document.getElementById('loginForm');
// if (loginForm) {
//   loginForm.addEventListener('submit', async e => {
//     e.preventDefault();
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     try {
//       const res = await fetch(`${API_URL}/users/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password })
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         window.location.href = 'index.html';
//       } else {
//         alert(data.msg || 'Login failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Login error');
//     }
//   });
// }

// // ===================== REGISTER =====================
// const registerForm = document.getElementById('registerForm');
// if (registerForm) {
//   registerForm.addEventListener('submit', async e => {
//     e.preventDefault();
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const address = document.getElementById('address').value;
//     const number = document.getElementById('number').value;
//     try {
//       const res = await fetch(`${API_URL}/users/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password, address, number })
//       });
//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         window.location.href = 'index.html';
//       } else {
//         alert(data.msg || 'Register failed');
//       }
//     } catch (err) {
//       console.error(err);
//       alert('Register error');
//     }
//   });
// }

// // ===================== INDEX: DISPLAY DISHES =====================
// if (document.getElementById('dish-list')) {
//   (async function loadDishes() {
//     if (!token) {
//       alert('Please log in first');
//       window.location.href = 'login.html';
//       return;
//     }
//     updateCartCount();
//     try {
//       const res = await fetch(`${API_URL}/dishes`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       const dishes = await res.json();
//       const container = document.getElementById('dish-list');
//       container.innerHTML = '';

//       dishes.forEach(dish => {
//         const card = document.createElement('div');
//         card.className = 'dish';

//         // Ingredients with quantity input
//         const ingHtml = dish.ingredients.map((ing, idx) => `
//           <div class="ing-row">
//             <label>${ing.name} (${ing.price}$)</label>
//             <input type="number" min="0" value="1" class="ing-multiplier" data-name="${ing.name}" data-price="${ing.price}" />
//           </div>
//         `).join('');

//         card.innerHTML = `
//           <h2>${dish.name} <small>(${dish.category})</small></h2>
//           <p><strong>Instructions:</strong> ${dish.instructions}</p>
//           <div class="ingredients">${ingHtml}</div>
//           <p><strong>Total: $<span class="item-total">0</span></strong></p>
//           <button class="add-to-cart" data-id="${dish._id}">Add to Cart</button>
//           <img src="${dish.image || ''}" alt="${dish.name}" width="200" />
//           <hr>
//         `;

//         container.appendChild(card);

//         // Calculate initial total
//         updateItemTotal(card);

//         // Listen for input changes
//         card.querySelectorAll('.ing-multiplier').forEach(inp => {
//           inp.addEventListener('input', () => updateItemTotal(card));
//         });

//         // Add to cart
//         card.querySelector('.add-to-cart').addEventListener('click', () => {
//           const multipliers = [...card.querySelectorAll('.ing-multiplier')];
//           const selectedIngredients = multipliers
//             .filter(m => Number(m.value) > 0)
//             .map(m => ({
//               name: m.dataset.name,
//               price: Number(m.dataset.price),
//               quantity: Number(m.value)
//             }));
//           if (!selectedIngredients.length) {
//             alert('Select at least one ingredient');
//             return;
//           }

//           const itemTotal = selectedIngredients.reduce((sum, ing) => sum + ing.price * ing.quantity, 0);

//           const cart = getCart();
//           cart.push({
//             dishId: dish._id,
//             dishName: dish.name,
//             ingredients: selectedIngredients,
//             itemTotal
//           });
//           setCart(cart);
//           alert('Added to cart');
//         });
//       });
//     } catch (err) {
//       console.error(err);
//       alert('Failed to load dishes.');
//     }
//   })();
// }

// // ===================== HELPER: UPDATE TOTAL =====================
// function updateItemTotal(card) {
//   const multipliers = [...card.querySelectorAll('.ing-multiplier')];
//   const total = multipliers.reduce((sum, inp) => sum + (Number(inp.value) * Number(inp.dataset.price)), 0);
//   card.querySelector('.item-total').textContent = total.toFixed(2);
// }



// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem('token');

// // ========== Utility: cart in localStorage ==========
// function getCart() {
//   return JSON.parse(localStorage.getItem('cart') || '[]');
// }
// function setCart(cart) {
//   localStorage.setItem('cart', JSON.stringify(cart));
//   updateCartCount();
// }
// function updateCartCount() {
//   const el = document.getElementById('cart-count');
//   if (el) el.textContent = getCart().length;
// }

// // ========== Logout button ==========
// const logoutBtn = document.getElementById('logoutBtn');
// if (logoutBtn) {
//   logoutBtn.addEventListener('click', () => {
//     localStorage.removeItem('token');
//     window.location.href = 'login.html';
//   });
// }

// // ========== INDEX PAGE: Load dishes ==========
// if (document.getElementById('dish-list')) {
//   (async function loadDishes() {
//     updateCartCount();

//     try {
//       const res = await fetch(`${API_URL}/dishes`, {
//         headers: token ? { 'Authorization': `Bearer ${token}` } : {}
//       });
//       const dishes = await res.json();
//       const container = document.getElementById('dish-list');
//       container.innerHTML = '';

//       dishes.forEach(dish => {
//         const card = document.createElement('div');
//         card.className = 'dish';

//         const ingHtml = dish.ingredients.map((ing) => `
//           <label>
//             <input type="checkbox" class="dish-ingredient" data-name="${ing.name}" data-price="${ing.price}" data-quantity="${ing.quantity}" checked>
//             ${ing.quantity} — ${ing.name} — $${ing.price}
//           </label><br>
//         `).join('');

//         card.innerHTML = `
//           <h2>${dish.name} <small>(${dish.category})</small></h2>
//           <div class="ingredients">${ingHtml}</div>
//           <p><strong>Estimated total: $<span class="item-total">0</span></strong></p>
//           <div class="card-actions">
//             <button class="view-recipe" data-id="${dish._id}">View Recipe</button>
//             <button class="add-to-cart" data-id="${dish._id}" data-name="${escapeHtml(dish.name)}">Add to Cart</button>
//           </div>
//           <img class="dish-img" src="${dish.image || ''}" alt="${escapeHtml(dish.name)}" />
//         `;

//         container.appendChild(card);
//         updateItemTotal(card);

//         // Checkbox listener to update total
//         card.querySelectorAll('.dish-ingredient').forEach(cb => {
//           cb.addEventListener('change', () => updateItemTotal(card));
//         });

//         // View Recipe
//         card.querySelector('.view-recipe').addEventListener('click', () => {
//           window.location.href = `recipe.html?dishId=${dish._id}`;
//         });

//         // Add to Cart
//         card.querySelector('.add-to-cart').addEventListener('click', async () => {
//           if (!token) {
//             alert('Please login first');
//             window.location.href = 'login.html';
//             return;
//           }

//           const selectedIngredients = [...card.querySelectorAll('.dish-ingredient')]
//             .filter(cb => cb.checked)
//             .map(cb => ({
//               name: cb.dataset.name,
//               quantity: cb.dataset.quantity,
//               price: Number(cb.dataset.price),
//               selectedQty: 1
//             }));

//           if (!selectedIngredients.length) {
//             alert('Select at least one ingredient to add to cart');
//             return;
//           }

//           const itemTotal = selectedIngredients.reduce((sum, it) => sum + it.price * it.selectedQty, 0);

//           try {
//             const res = await fetch(`${API_URL}/cart`, {
//               method: 'POST',
//               headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//               },
//               body: JSON.stringify({
//                 dishId: dish._id,
//                 dishName: dish.name,
//                 ingredients: selectedIngredients,
//                 itemTotal
//               })
//             });
//             const data = await res.json();
//             if (res.ok) {
//               alert('Added to cart successfully!');
//               updateCartCount();
//             } else {
//               alert(data.message || 'Failed to add to cart');
//             }
//           } catch (err) {
//             console.error(err);
//             alert('Error adding to cart');
//           }
//         });
//       });

//     } catch (err) {
//       console.error(err);
//       alert('Failed to load dishes');
//     }
//   })();
// }

// // Helper: update item total
// function updateItemTotal(card) {
//   const checkboxes = [...card.querySelectorAll('.dish-ingredient')];
//   const total = checkboxes.reduce((s, cb) => {
//     return s + (cb.checked ? Number(cb.dataset.price) : 0);
//   }, 0);
//   const span = card.querySelector('.item-total');
//   if (span) span.textContent = total.toFixed(2);
// }

// // Helper: escape HTML
// function escapeHtml(unsafe) {
//   return unsafe.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#039;"}[m]));
// }


// //last update

// const API_URL = "http://localhost:5000/api";
// const token = localStorage.getItem('token');

// // ------------- CART UTILS -------------
// function getCart() { return JSON.parse(localStorage.getItem('cart') || '[]'); }
// function setCart(cart) { localStorage.setItem('cart', JSON.stringify(cart)); updateCartCount(); }
// function updateCartCount() { const el = document.getElementById('cart-count'); if(el) el.textContent = getCart().length; }

// // ------------- LOGOUT -------------
// document.getElementById('logoutBtn')?.addEventListener('click', () => {
//   localStorage.removeItem('token');
//   window.location.href = 'login.html';
// });

// // ------------- DASHBOARD: LOAD DISHES -------------
// if(document.getElementById('dish-list')) {
//   if(!token) { window.location.href='login.html'; }
//   (async function(){
//     try{
//       const res = await fetch(`${API_URL}/dishes`, { headers:{ Authorization:`Bearer ${token}` } });
//       const dishes = await res.json();
//       const container = document.getElementById('dish-list');
//       container.innerHTML = '';
//       dishes.forEach(dish => {
//         const card = document.createElement('div');
//         card.className='dish';
//         card.innerHTML=`
//           <h3 class="dish-name">${dish.name}</h3>
//           <img class="dish-img" src="${dish.image || ''}" alt="${dish.name}" width="200"/>
//         `;
//         container.appendChild(card);

//         card.addEventListener('click', () => {
//           window.location.href=`recipe.html?dishId=${dish._id}`;
//         });
//       });
//     } catch(err){ console.error(err); alert('Failed to load dishes'); }
//   })();
// }

// // ------------- RECIPE PAGE -------------
// if(document.getElementById('dish-title')) {
//   (async function(){
//     updateCartCount();
//     const params = new URLSearchParams(window.location.search);
//     const dishId = params.get('dishId');
//     if(!dishId){ document.getElementById('dish-title').textContent='Dish not found'; return; }

//     try{
//       const res = await fetch(`${API_URL}/dishes/${dishId}`);
//       if(!res.ok) throw new Error('Dish not found');
//       const dish = await res.json();

//       document.getElementById('dish-title').textContent = dish.name;
//       document.getElementById('dish-img').src = dish.image || '';
//       document.getElementById('ingredients-list').innerHTML = dish.ingredients.map((ing,i)=>`
//         <div class="ing-row">
//           <label>
//             <input type="checkbox" class="ingredient-checkbox" data-name="${ing.name}" data-price="${ing.price}" checked>
//             ${ing.name} (${ing.quantity}) - $${ing.price}
//           </label>
//           <input type="number" min="1" value="1" class="ingredient-qty" data-name="${ing.name}" data-price="${ing.price}" />
//         </div>
//       `).join('');
//       document.getElementById('instructions').innerHTML = dish.instructions.map((step,i)=>`<p><strong>Step ${i+1}:</strong> ${step}</p>`).join('');

//       document.getElementById('add-to-cart-recipe').addEventListener('click',()=>{
//         const selectedIngredients = [];
//         document.querySelectorAll('#ingredients-list .ing-row').forEach(row=>{
//           const cb = row.querySelector('.ingredient-checkbox');
//           const qty = row.querySelector('.ingredient-qty');
//           if(cb.checked) selectedIngredients.push({
//             name: cb.dataset.name,
//             price: Number(cb.dataset.price),
//             selectedQty: Number(qty.value),
//             quantity: qty.value
//           });
//         });
//         if(!selectedIngredients.length){ alert('Select at least one ingredient'); return; }
//         const itemTotal = selectedIngredients.reduce((sum,it)=>sum+it.price*it.selectedQty,0);
//         const cart = getCart();
//         cart.push({ dishId: dish._id, dishName: dish.name, ingredients:selectedIngredients, itemTotal });
//         setCart(cart); alert('Added to cart');
//       });

//     } catch(err){ console.error(err); document.getElementById('dish-title').textContent='Error loading dish'; }
//   })();
// }

// // ------------- CART PAGE -------------
// if(document.getElementById('cart-items')){
//   (function renderCart(){
//     updateCartCount();
//     const container = document.getElementById('cart-items');
//     const cart = getCart();
//     container.innerHTML='';
//     let grandTotal = 0;

//     cart.forEach((ci,idx)=>{
//       grandTotal += ci.itemTotal;
//       const div = document.createElement('div');
//       div.className='cart-item';
//       div.innerHTML=`
//         <h3>${ci.dishName}</h3>
//         <ul>${ci.ingredients.map(ing=>`<li>${ing.selectedQty} × ${ing.quantity} ${ing.name} — $${(ing.price*ing.selectedQty).toFixed(2)}</li>`).join('')}</ul>
//         <p>Item total: $${ci.itemTotal.toFixed(2)}</p>
//         <button class="remove-btn" data-idx="${idx}">Remove</button>
//         <hr>
//       `;
//       container.appendChild(div);
//     });

//     document.getElementById('cart-total').textContent = grandTotal.toFixed(2);

//     document.querySelectorAll('.remove-btn').forEach(btn=>{
//       btn.addEventListener('click',e=>{
//         const idx=Number(e.target.dataset.idx);
//         const c = getCart();
//         c.splice(idx,1);
//         setCart(c);
//         renderCart();
//       });
//     });

//     const confirmBtn = document.getElementById('confirm-order');
//     confirmBtn?.addEventListener('click', async ()=>{
//       if(!token){ alert('Login first'); window.location.href='login.html'; return; }
//       if(!cart.length){ alert('Cart empty'); return; }
//       try{
//         const res = await fetch(`${API_URL}/orders`,{
//           method:'POST',
//           headers:{ 'Content-Type':'application/json', 'Authorization':`Bearer ${token}` },
//           body: JSON.stringify({ cart })
//         });
//         const data = await res.json();
//         if(res.ok){ alert('Order placed!'); localStorage.removeItem('cart'); updateCartCount(); window.location.href='index.html'; }
//         else alert(data.message || 'Order failed');
//       } catch(err){ console.error(err); alert('Order error'); }
//     });
//   })();
// }
//frontend/src/components/app.js
//const API_URL = "http://localhost:5000/api";
const API_URL = "http://127.0.0.1:5000/api";
const token = localStorage.getItem('token');

// ---------------- LOGOUT ----------------
document.getElementById('logoutBtn')?.addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});

// ---------------- DASHBOARD (index.html) ----------------
if (document.getElementById('dish-list')) {
  if (!token) { window.location.href = 'login.html'; }

  (async function loadDishes() {
    try {
      const res = await fetch(`${API_URL}/dishes`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const dishes = await res.json();
      const container = document.getElementById('dish-list');
      container.innerHTML = '';

      dishes.forEach(dish => {
        const card = document.createElement('div');
        card.className = 'dish';
        card.innerHTML = `
          <h3 class="dish-name">${dish.name}</h3>
          <img class="dish-img" src="${dish.image || ''}" alt="${dish.name}" width="200"/>
        `;
        container.appendChild(card);
        card.addEventListener('click', () => {
          window.location.href = `recipe.html?dishId=${dish._id}`;
        });
      });
    } catch (err) {
      console.error(err);
      alert('Failed to load dishes');
    }
  })();
}

// ---------------- RECIPE PAGE (recipe.html) ----------------
// Recipe page logic
if (document.getElementById('dish-title')) {  // Only run on recipe.html
  (async function loadRecipe() {
    const params = new URLSearchParams(window.location.search);
    const dishId = params.get('dishId');
    if (!dishId) return;

    const res = await fetch(`${API_URL}/dishes/${dishId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const dish = await res.json();

    // Render title, image, instructions
    document.getElementById('dish-title').textContent = dish.name;
    document.getElementById('dish-img').src = dish.image;
    document.getElementById('instructions').innerHTML =
      dish.instructions.map((s,i) => `<p><strong>Step ${i+1}:</strong> ${s}</p>`).join('');

    // Render ingredients list
    document.getElementById('ingredients-list').innerHTML =
      dish.ingredients.map(ing => `
        <div class="ing-row">
          <label>
            <input type="checkbox" class="ingredient-checkbox" data-name="${ing.name}" data-price="${ing.price}" checked>
            ${ing.name} (${ing.quantity}) - $${ing.price}
          </label>
          <input type="number" min="1" value="1" class="ingredient-qty" data-name="${ing.name}" data-price="${ing.price}" />
        </div>
      `).join('');

    // Add to cart button
    document.getElementById('add-to-cart-recipe').addEventListener('click', async () => {
      const selectedIngredients = [];
      document.querySelectorAll('#ingredients-list .ing-row').forEach(row => {
        const cb = row.querySelector('.ingredient-checkbox');
        const qty = row.querySelector('.ingredient-qty');
        if (cb.checked) selectedIngredients.push({
          name: cb.dataset.name,
          price: Number(cb.dataset.price),
          quantity: qty.value,
          selectedQty: Number(qty.value)
        });
      });

      if (!selectedIngredients.length) {
        alert('Select at least one ingredient');
        return;
      }

      const itemTotal = selectedIngredients.reduce((sum, it) => sum + it.price * it.selectedQty, 0);

      try {
        const res = await fetch(`${API_URL}/cart`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            dishId: dish._id,
            dishName: dish.name,
            ingredients: selectedIngredients,
            itemTotal
          })
        });

        const data = await res.json();
        if (res.ok) {
          alert('Added to cart');
          document.getElementById('cart-count').textContent = data.cartCount;
        } else {
          alert(data.message || 'Failed to add');
        }

      } catch (err) {
        console.error(err);
        alert('Error adding to cart');
      }
    });

  })();
}

// ---------------- CART PAGE (cart.html) ----------------
if (document.getElementById('cart-items')) {
  (async function renderCart() {
    try {
      const res = await fetch(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Failed to fetch cart');
      const cart = await res.json();
      const container = document.getElementById('cart-items');
      container.innerHTML = '';
      let grandTotal = 0;

      cart.forEach((ci, idx) => {
        grandTotal += ci.itemTotal;
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.innerHTML = `
          <h3>${ci.dishName}</h3>
          <ul>
            ${ci.ingredients.map(ing => `<li>${ing.selectedQty} × ${ing.quantity} ${ing.name} — $${(ing.price * ing.selectedQty).toFixed(2)}</li>`).join('')}
          </ul>
          <p>Item total: $${ci.itemTotal.toFixed(2)}</p>
          <button class="remove-btn" data-id="${ci._id}">Remove</button>
          <hr>
        `;
        container.appendChild(div);
      });

      document.getElementById('cart-total').textContent = grandTotal.toFixed(2);

      // Remove item
      document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', async e => {
          const id = e.target.dataset.id;
          try {
            const res = await fetch(`${API_URL}/cart/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) renderCart();
            else alert('Failed to remove item');
          } catch (err) {
            console.error(err);
            alert('Error removing item');
          }
        });
      });

      // Checkout
      document.getElementById('confirm-order')?.addEventListener('click', async () => {
        try {
          const res = await fetch(`${API_URL}/cart/checkout`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}` }
          });
          const data = await res.json();
          if (res.ok) {
            alert('Order placed successfully!');
            window.location.href = 'index.html';
          } else alert(data.message || 'Checkout failed');
        } catch (err) {
          console.error(err);
          alert('Error placing order');
        }
      });

    } catch (err) {
      console.error(err);
      alert('Failed to load cart');
    }
  })();
}
