// State management
let currentUser = null;
let currentDataset = null;
let filteredData = [];
let selectedRows = 100;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    loadDatasets();
});

// Authentication functions
function checkAuth() {
    const user = localStorage.getItem('currentUser');
    if (user) {
        currentUser = JSON.parse(user);
        updateNavigation(true);
    } else {
        updateNavigation(false);
    }
}

function updateNavigation(isLoggedIn) {
    document.getElementById('loginLink').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('signupLink').style.display = isLoggedIn ? 'none' : 'block';
    document.getElementById('datasetsLink').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('purchasesLink').style.display = isLoggedIn ? 'block' : 'none';
    document.getElementById('logoutLink').style.display = isLoggedIn ? 'block' : 'none';
}

function handleSignup(event) {
    event.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    
    // Get existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
        showAlert('User already exists!', 'error');
        return;
    }
    
    // Create new user
    const newUser = {
        id: Date.now(),
        name,
        email,
        password, // In production, this should be hashed
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    // Auto login
    currentUser = newUser;
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showAlert('Account created successfully!', 'success');
    updateNavigation(true);
    showPage('datasets');
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        showAlert('Login successful!', 'success');
        updateNavigation(true);
        showPage('datasets');
    } else {
        showAlert('Invalid credentials!', 'error');
    }
}

function logout() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateNavigation(false);
    showPage('home');
    showAlert('Logged out successfully!', 'success');
}

// Page navigation
function showPage(pageName) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const pageMap = {
        'home': 'homePage',
        'login': 'loginPage',
        'signup': 'signupPage',
        'datasets': 'datasetsPage',
        'datasetDetail': 'datasetDetailPage',
        'purchases': 'purchasesPage'
    };
    
    const pageId = pageMap[pageName];
    if (pageId) {
        document.getElementById(pageId).classList.add('active');
        
        if (pageName === 'datasets') {
            loadDatasets();
        } else if (pageName === 'purchases') {
            loadPurchases();
        }
    }
}

// Dataset functions
function loadDatasets() {
    const grid = document.getElementById('datasetsGrid');
    grid.innerHTML = datasets.map(dataset => `
        <div class="dataset-card" onclick="viewDataset(${dataset.id})">
            <h3>${dataset.name}</h3>
            <p>${dataset.description}</p>
            <div class="dataset-meta">
                <span>📊 ${dataset.totalRows.toLocaleString()} rows</span>
                <span>📁 ${dataset.category}</span>
            </div>
            <div class="dataset-price">$${dataset.pricePerRow} per row</div>
        </div>
    `).join('');
}

function viewDataset(datasetId) {
    if (!currentUser) {
        showAlert('Please login to view datasets', 'error');
        showPage('login');
        return;
    }
    
    currentDataset = datasets.find(d => d.id === datasetId);
    filteredData = [...currentDataset.data];
    renderDatasetDetail();
    showPage('datasetDetail');
}

function renderDatasetDetail() {
    const content = document.getElementById('datasetDetailContent');
    
    const filterInputs = Object.keys(currentDataset.filters).map(filterKey => {
        const filterValue = currentDataset.filters[filterKey];
        
        if (Array.isArray(filterValue)) {
            return `
                <div class="form-group">
                    <label>${formatLabel(filterKey)}</label>
                    <select id="filter_${filterKey}" onchange="applyFilters()">
                        <option value="">All</option>
                        ${filterValue.map(v => `<option value="${v}">${v}</option>`).join('')}
                    </select>
                </div>
            `;
        } else if (filterKey.startsWith('min') || filterKey.startsWith('max')) {
            return `
                <div class="form-group">
                    <label>${formatLabel(filterKey)}</label>
                    <input type="number" id="filter_${filterKey}" placeholder="${formatLabel(filterKey)}" onchange="applyFilters()">
                </div>
            `;
        }
        return '';
    }).join('');
    
    content.innerHTML = `
        <div class="dataset-detail">
            <div class="dataset-header">
                <h2>${currentDataset.name}</h2>
                <p>${currentDataset.description}</p>
                <div class="dataset-meta">
                    <span>📊 Total Rows: ${currentDataset.totalRows.toLocaleString()}</span>
                    <span>💰 Price: $${currentDataset.pricePerRow} per row</span>
                </div>
            </div>
            
            <div class="filters-section">
                <h3>🔍 Filter Data</h3>
                <div class="filters-grid">
                    ${filterInputs}
                </div>
                <button class="btn btn-secondary btn-small" onclick="resetFilters()" style="margin-top: 1rem;">Reset Filters</button>
            </div>
            
            <div class="preview-section">
                <h3>📋 Preview (First 10 rows)</h3>
                <div class="table-container" id="previewTable"></div>
            </div>
            
            <div class="purchase-section">
                <h3>💳 Purchase Data</h3>
                <p>Filtered Results: <strong>${filteredData.length}</strong> rows available</p>
                <div class="purchase-calculator">
                    <label>Number of rows to purchase:</label>
                    <input type="number" id="rowCount" value="100" min="1" max="${filteredData.length}" onchange="updatePrice()">
                    <div class="price-display" id="totalPrice">$5.00</div>
                </div>
                <button class="btn btn-primary" onclick="initiatePayment()">Purchase & Download</button>
            </div>
        </div>
    `;
    
    renderPreviewTable();
    updatePrice();
}

function formatLabel(key) {
    return key.replace(/([A-Z])/g, ' $1')
        .replace(/^./, str => str.toUpperCase())
        .replace('min', 'Min')
        .replace('max', 'Max');
}

function applyFilters() {
    filteredData = currentDataset.data.filter(row => {
        for (let filterKey in currentDataset.filters) {
            const filterElement = document.getElementById(`filter_${filterKey}`);
            if (!filterElement || !filterElement.value) continue;
            
            const filterValue = filterElement.value;
            
            if (filterKey.startsWith('min')) {
                const dataKey = filterKey.replace('min', '');
                const actualKey = currentDataset.columns.find(col => 
                    col.toLowerCase().includes(dataKey.toLowerCase())
                );
                if (actualKey && parseFloat(row[actualKey]) < parseFloat(filterValue)) {
                    return false;
                }
            } else if (filterKey.startsWith('max')) {
                const dataKey = filterKey.replace('max', '');
                const actualKey = currentDataset.columns.find(col => 
                    col.toLowerCase().includes(dataKey.toLowerCase())
                );
                if (actualKey && parseFloat(row[actualKey]) > parseFloat(filterValue)) {
                    return false;
                }
            } else {
                const actualKey = currentDataset.columns.find(col => 
                    col.toLowerCase().includes(filterKey.toLowerCase())
                );
                if (actualKey && row[actualKey] !== filterValue) {
                    return false;
                }
            }
        }
        return true;
    });
    
    renderDatasetDetail();
}

function resetFilters() {
    filteredData = [...currentDataset.data];
    renderDatasetDetail();
}

function renderPreviewTable() {
    const preview = filteredData.slice(0, 10);
    const tableHtml = `
        <table>
            <thead>
                <tr>
                    ${currentDataset.columns.map(col => `<th>${col}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
                ${preview.map(row => `
                    <tr>
                        ${currentDataset.columns.map(col => `<td>${formatCellValue(row[col])}</td>`).join('')}
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    document.getElementById('previewTable').innerHTML = tableHtml;
}

function formatCellValue(value) {
    if (typeof value === 'number' && value > 1000) {
        return value.toLocaleString();
    }
    return value;
}

function updatePrice() {
    const rowCount = parseInt(document.getElementById('rowCount').value) || 0;
    const maxRows = filteredData.length;
    
    if (rowCount > maxRows) {
        document.getElementById('rowCount').value = maxRows;
        selectedRows = maxRows;
    } else {
        selectedRows = rowCount;
    }
    
    const total = (selectedRows * currentDataset.pricePerRow).toFixed(2);
    document.getElementById('totalPrice').textContent = `$${total}`;
}

// Payment functions
function initiatePayment() {
    if (!currentUser) {
        showAlert('Please login to purchase', 'error');
        return;
    }
    
    const total = (selectedRows * currentDataset.pricePerRow).toFixed(2);
    
    document.getElementById('paymentDetails').innerHTML = `
        <div class="alert alert-success">
            <strong>Order Summary</strong><br>
            Dataset: ${currentDataset.name}<br>
            Rows: ${selectedRows}<br>
            Price per row: $${currentDataset.pricePerRow}<br>
            <strong>Total: $${total}</strong>
        </div>
    `;
    
    document.getElementById('paymentModal').classList.add('active');
}

function closePaymentModal() {
    document.getElementById('paymentModal').classList.remove('active');
}

function handlePayment(event) {
    event.preventDefault();
    
    // Simulate payment processing
    setTimeout(() => {
        const purchase = {
            id: Date.now(),
            userId: currentUser.id,
            datasetId: currentDataset.id,
            datasetName: currentDataset.name,
            rows: selectedRows,
            totalPrice: (selectedRows * currentDataset.pricePerRow).toFixed(2),
            purchaseDate: new Date().toISOString(),
            data: filteredData.slice(0, selectedRows)
        };
        
        // Save purchase
        const purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
        purchases.push(purchase);
        localStorage.setItem('purchases', JSON.stringify(purchases));
        
        closePaymentModal();
        showAlert('Payment successful! Your data is ready to download.', 'success');
        
        // Auto download
        downloadCSV(purchase);
        
        // Redirect to purchases
        setTimeout(() => showPage('purchases'), 2000);
    }, 1500);
}

// Download CSV
function downloadCSV(purchase) {
    const data = purchase.data;
    const columns = datasets.find(d => d.id === purchase.datasetId).columns;
    
    let csv = columns.join(',') + '\n';
    data.forEach(row => {
        csv += columns.map(col => {
            const value = row[col];
            return typeof value === 'string' && value.includes(',') ? `"${value}"` : value;
        }).join(',') + '\n';
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${purchase.datasetName.replace(/\s+/g, '_')}_${purchase.id}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
}

// Purchases page
function loadPurchases() {
    if (!currentUser) {
        showPage('login');
        return;
    }
    
    const purchases = JSON.parse(localStorage.getItem('purchases') || '[]')
        .filter(p => p.userId === currentUser.id)
        .sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate));
    
    const listHtml = purchases.length > 0 ? purchases.map(purchase => `
        <div class="purchase-item">
            <h3>${purchase.datasetName}</h3>
            <div class="purchase-meta">
                <span>📊 ${purchase.rows} rows</span>
                <span>💰 $${purchase.totalPrice}</span>
                <span>📅 ${new Date(purchase.purchaseDate).toLocaleDateString()}</span>
            </div>
            <div class="purchase-actions">
                <button class="btn btn-primary btn-small" onclick='downloadCSV(${JSON.stringify(purchase)})'>
                    📥 Download CSV
                </button>
            </div>
        </div>
    `).join('') : '<p>No purchases yet. <a href="#" onclick="showPage(\'datasets\')">Browse datasets</a></p>';
    
    document.getElementById('purchasesList').innerHTML = listHtml;
}

// Alert system
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '80px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '1000';
    alertDiv.style.minWidth = '300px';
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('paymentModal');
    if (event.target === modal) {
        closePaymentModal();
    }
}