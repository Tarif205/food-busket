fetch('http://localhost:5000/api/dishes')
  .then(res => res.json())
  .then(dishes => {
    const container = document.getElementById('dish-list');

    dishes.forEach(dish => {
      const dishDiv = document.createElement('div');
      dishDiv.classList.add('dish');

      // Create ingredient checkboxes
      const ingredientList = dish.ingredients.map(ing => `
        <label>
          <input type="checkbox" class="ingredient-checkbox" data-price="${ing.price}" checked>
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
    });
  })
  .catch(err => console.error('Error fetching dishes:', err));

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