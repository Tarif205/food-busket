//src/components/app.js


const token = localStorage.getItem('token');
if (!token) {
  alert('Please log in first');
  window.location.href = 'login.html';
}

fetch('http://localhost:5000/api/dishes', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(dishes => {
    const container = document.getElementById('dish-list');

    dishes.forEach(dish => {
      const dishDiv = document.createElement('div');
      dishDiv.classList.add('dish');

      // Create ingredient checkboxes
      const ingredientList = dish.ingredients.map(ing => `
        <label>
          <input type="checkbox" class="ingredient-checkbox" data-name="${ing.name}" data-price="${ing.price}" checked>
          ${ing.name} - $${ing.price}
        </label>
        <br>
      `).join('');

      dishDiv.innerHTML = `
        <h2>${dish.name} (${dish.category})</h2>
        <p><strong>Instructions:</strong> ${dish.instructions}</p>
        <h3>Select Ingredients:</h3>
        ${ingredientList}
        <p><strong>Total: $<span class="total-price">0</span></strong></p>
        <button class="order-btn">Place Order</button>
        <img src="${dish.image}" alt="${dish.name}" width="200">
        <hr>
      `;

      container.appendChild(dishDiv);

      // Calculate initial total
      updateTotal(dishDiv);

      // Listen for checkbox changes
      dishDiv.querySelectorAll('.ingredient-checkbox').forEach(cb => {
        cb.addEventListener('change', () => updateTotal(dishDiv));
      });

      // Place order button handler
      dishDiv.querySelector('.order-btn').addEventListener('click', () => {
        const checkboxes = dishDiv.querySelectorAll('.ingredient-checkbox');
        const selectedIngredients = [];
        let total = 0;

        checkboxes.forEach(cb => {
          if (cb.checked) {
            const name = cb.dataset.name;
            const price = parseFloat(cb.dataset.price);
            selectedIngredients.push({ name, price });
            total += price;
          }
        });

        if (selectedIngredients.length === 0) {
          alert('Please select at least one ingredient to order.');
          return;
        }

        // fetch('http://localhost:5000/api/orders', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${token}`
        //   },
        //   body: JSON.stringify({ ingredients: selectedIngredients, totalPrice: total })
        // })
        fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            ingredients: selectedIngredients,
            totalPrice: total
          })
        })
        .then(res => res.json())
        .then(data => {
          console.log("✅ Server response:", data);
          alert(data.msg || 'Order placed successfully!');
        })
        .catch(err => {
          console.error('❌ Error placing order:', err);
          alert('Failed to place order.');
        });

      });
    });
  })
  .catch(err => {
    console.error('Error fetching dishes:', err);
    alert('Failed to load dishes. Please try again later.');
  });

// Update the total price based on selected ingredients
function updateTotal(dishDiv) {
  const checkboxes = dishDiv.querySelectorAll('.ingredient-checkbox');
  let total = 0;
  checkboxes.forEach(cb => {
    if (cb.checked) {
      total += parseFloat(cb.dataset.price);
    }
  });
  dishDiv.querySelector('.total-price').textContent = total.toFixed(2);
}

// Logout button logic (make sure you have a button with id="logoutBtn" in your index.html)
document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
});



// // src/components/app.js

// // Simulate logged-in user info (store after login)
// const loggedInUserId = localStorage.getItem('userId'); 
// if (!loggedInUserId) {
//   alert('Please log in first');
//   window.location.href = 'login.html';
// }

// // Fetch dishes (no auth needed)
// fetch('http://localhost:5000/api/dishes')
//   .then(res => res.json())
//   .then(dishes => {
//     const container = document.getElementById('dish-list');

//     dishes.forEach(dish => {
//       const dishDiv = document.createElement('div');
//       dishDiv.classList.add('dish');

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

//       updateTotal(dishDiv);

//       dishDiv.querySelectorAll('.ingredient-checkbox').forEach(cb => {
//         cb.addEventListener('change', () => updateTotal(dishDiv));
//       });

//       // Order button
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

//         fetch('http://localhost:5000/api/orders', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({
//             userId: loggedInUserId,
//             ingredients: selectedIngredients,
//             totalPrice: total
//           })
//         })
//         .then(res => res.json())
//         .then(data => {
//           console.log('Server response:', data);
//           alert(data.msg || 'Order placed successfully!');
//         })
//         .catch(err => {
//           console.error('Error placing order:', err);
//           alert('Failed to place order.');
//         });
//       });
//     });
//   })
//   .catch(err => {
//     console.error('Error fetching dishes:', err);
//     alert('Failed to load dishes. Please try again later.');
//   });

// // Update total
// function updateTotal(dishDiv) {
//   const checkboxes = dishDiv.querySelectorAll('.ingredient-checkbox');
//   let total = 0;
//   checkboxes.forEach(cb => {
//     if (cb.checked) total += parseFloat(cb.dataset.price);
//   });
//   dishDiv.querySelector('.total-price').textContent = total.toFixed(2);
// }

// // Logout
// document.getElementById('logoutBtn').addEventListener('click', () => {
//   localStorage.removeItem('userId');
//   window.location.href = 'login.html';
// });
