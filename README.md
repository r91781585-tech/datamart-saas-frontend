# 📊 DataMart - Mini SaaS Platform

A frontend-only mini SaaS platform where users can explore datasets, apply custom filters, preview data, and purchase specific rows with simulated payment processing.

## 🚀 Live Demo

Open `index.html` in your browser to start using the application.

## ✨ Features

### 🔐 Authentication
- User sign-up and login
- Session management using localStorage
- Protected routes for authenticated users

### 📊 Dataset Management
- **2 Sample Datasets:**
  1. **Startup Funding Dataset** - 500 rows of startup funding data
  2. **Real Estate Listings** - 500 rows of property listings

### 🔍 Advanced Filtering
- Multiple filter options per dataset
- Real-time data filtering
- Filter by categories, ranges, and specific values
- Reset filters functionality

### 👀 Data Preview
- View first 10 rows of filtered data
- Responsive table display
- Formatted values for better readability

### 💳 Purchase System
- Pay-per-row pricing model ($0.05/row)
- Dynamic price calculation
- Simulated payment gateway
- Instant CSV download after purchase

### 📥 Download Management
- CSV file generation
- Purchase history tracking
- Re-download purchased datasets

## 🛠️ Tech Stack

- **HTML5** - Structure and markup
- **CSS3** - Styling with modern features (Grid, Flexbox, CSS Variables)
- **Vanilla JavaScript** - All functionality without frameworks
- **LocalStorage** - Data persistence

## 📁 Project Structure

```
datamart-saas-frontend/
├── index.html          # Main HTML file with all pages
├── styles.css          # Complete styling
├── app.js              # Application logic and state management
├── data.js             # Mock dataset generation
└── README.md           # Documentation
```

## 🎯 How to Use

### 1. Sign Up / Login
- Create a new account with name, email, and password
- Or login with existing credentials

### 2. Browse Datasets
- View available datasets on the Datasets page
- Click on any dataset to view details

### 3. Filter Data
- Apply filters based on your requirements:
  - **Startup Dataset**: Filter by industry, year, city, funding stage, amount range
  - **Real Estate Dataset**: Filter by property type, location, bedrooms, price range, area

### 4. Preview & Purchase
- Preview first 10 rows of filtered data
- Select number of rows to purchase
- See real-time price calculation
- Complete payment (simulated)

### 5. Download
- CSV automatically downloads after payment
- Access purchase history in "My Purchases"
- Re-download anytime

## 💡 Key Features Explained

### Authentication System
- Uses localStorage to persist user sessions
- Password storage (Note: In production, use proper hashing)
- Protected routes that redirect to login

### Dataset Filtering
```javascript
// Example filters for Startup Dataset:
- Industry: Technology, E-commerce, FinTech, etc.
- Year: 2020-2024
- City: Bangalore, Mumbai, Delhi, etc.
- Funding Stage: Seed, Series A, B, C, D
- Amount Range: Min/Max funding amount
```

### Pricing Model
- Base price: **$0.05 per row**
- Dynamic calculation based on selected rows
- Example: 200 rows = $10.00

### Data Generation
- Mock data generated using JavaScript
- Realistic field values
- 500 rows per dataset (expandable)

## 🎨 Design Features

- **Responsive Design** - Works on all screen sizes
- **Modern UI** - Clean, professional interface
- **Color Scheme** - Purple/Indigo primary colors
- **Smooth Animations** - Hover effects and transitions
- **Accessible** - Semantic HTML and proper labels

## 🔒 Security Notes

**Important:** This is a frontend-only demo application. For production use:

1. ✅ Implement proper backend authentication (JWT/OAuth)
2. ✅ Hash passwords using bcrypt or similar
3. ✅ Use real payment gateway (Stripe, Razorpay, etc.)
4. ✅ Store data in secure database (PostgreSQL, MongoDB)
5. ✅ Implement API rate limiting
6. ✅ Add HTTPS/SSL certificates
7. ✅ Validate all inputs server-side
8. ✅ Implement CSRF protection

## 📦 Deployment Options

### Option 1: GitHub Pages
1. Go to repository Settings
2. Navigate to Pages section
3. Select main branch as source
4. Your site will be live at: `https://username.github.io/datamart-saas-frontend/`

### Option 2: Netlify
1. Connect your GitHub repository
2. Deploy with default settings
3. Instant deployment with custom domain support

### Option 3: Vercel
1. Import GitHub repository
2. Deploy with one click
3. Automatic deployments on push

### Option 4: Local Server
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx http-server

# Then open: http://localhost:8000
```

## 🧪 Testing the Application

### Test User Credentials
Create your own account or use these test scenarios:

1. **Sign Up Flow:**
   - Name: John Doe
   - Email: john@example.com
   - Password: test123

2. **Dataset Filtering:**
   - Go to Startup Dataset
   - Filter: Industry = "FinTech", Year = "2023"
   - Preview filtered results
   - Purchase 50 rows

3. **Purchase Flow:**
   - Select rows to purchase
   - Click "Purchase & Download"
   - Enter mock card details
   - Download CSV file

## 🔄 Data Persistence

All data is stored in browser's localStorage:
- `users` - User accounts
- `currentUser` - Active session
- `purchases` - Purchase history

**Note:** Clearing browser data will reset the application.

## 🚀 Future Enhancements

- [ ] Backend API integration
- [ ] Real payment gateway (Stripe/Razorpay)
- [ ] PostgreSQL database
- [ ] More datasets
- [ ] Advanced analytics
- [ ] Export formats (JSON, Excel)
- [ ] Bulk purchase discounts
- [ ] API access for purchased data
- [ ] Team collaboration features
- [ ] Data visualization tools

## 📝 Code Highlights

### Clean Separation of Concerns
- `index.html` - Structure and layout
- `styles.css` - All styling (no inline styles)
- `app.js` - Business logic and interactions
- `data.js` - Data layer and mock generation

### Modern JavaScript Features
- ES6+ syntax
- Arrow functions
- Template literals
- Destructuring
- Array methods (map, filter, reduce)

### Responsive CSS
- CSS Grid for layouts
- Flexbox for components
- CSS Variables for theming
- Media queries for mobile

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 👨‍💻 Developer

Built as a demonstration of frontend development skills using vanilla HTML, CSS, and JavaScript.

---

**Note:** This is a frontend-only implementation. For production use, implement proper backend services, database, and security measures.