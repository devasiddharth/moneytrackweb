let expenses = [];

document.getElementById('expense-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const amount = parseFloat(document.getElementById('amount').value);
  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;
  const date = document.getElementById('date').value || new Date().toISOString().split('T')[0];

  expenses.push({ amount, category, description, date });
  this.reset();
  renderExpenses();
});

function renderExpenses() {
  const list = document.getElementById('expense-list');
  list.innerHTML = '';

  let filtered = [...expenses];

  const cat = document.getElementById('filter-category').value;
  const month = document.getElementById('filter-date').value;
  const sortBy = document.getElementById('sort-by').value;

  if (cat) {
    filtered = filtered.filter(e => e.category === cat);
  }

  if (month) {
    filtered = filtered.filter(e => e.date.startsWith(month));
  }

  if (sortBy === 'amount') {
    filtered.sort((a, b) => b.amount - a.amount);
  } else {
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  filtered.forEach((e, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${e.date} | ${e.category} - ₹${e.amount} ${e.description ? '| ' + e.description : ''}</span>
      <button onclick="deleteExpense(${index})">Delete</button>
    `;
    list.appendChild(li);
  });
}

function deleteExpense(index) {
  expenses.splice(index, 1);
  renderExpenses();
}

document.getElementById('filter-category').addEventListener('change', renderExpenses);
document.getElementById('filter-date').addEventListener('change', renderExpenses);
document.getElementById('sort-by').addEventListener('change', renderExpenses);
