# 🛒 বাজার দর | BazarDor

### Daily Essential Product Price Tracker

BazarDor is a responsive web application that helps users explore and compare the prices of essential daily products in Bangladesh. Users can browse products, view price changes, explore categories, and check market-wise price information through a simple and user-friendly interface.

🔗 **Live Demo:** https://bazardor-nu-gold.vercel.app/

📂 **GitHub Repository:** https://github.com/Naajatnoor/bazar_dor

---

## ✨ Features

- **📊 Daily Price Tracking:** Explore essential product prices and identify products whose prices have increased or decreased.
- **🛍️ Product Browsing:** View all available products with their names, categories, units, current prices, and price-change indicators.
- **🔎 Category Filtering:** Browse products by category and find specific products easily.
- **📈 Product Price Details:** View product information, minimum price, maximum price, average price, and market-wise pricing.
- **🔐 Secure Authentication:** Sign up and sign in using email and password or social authentication with Google and GitHub through Better Auth.
- **↕️ Price Sorting:** Sort products by default order, lowest price, or highest price.
- **👤 Profile Management:** View profile information and update the user's name.
- **🔔 Toast Notifications:** Get feedback for authentication actions, validation errors, and other relevant operations.
- **⏳ Loading Skeletons:** Display loading states while product data is being fetched.
- **📱 Fully Responsive UI:** Enjoy a consistent experience across mobile, tablet, and desktop devices.
- **🚫 Custom 404 Page:** Display a friendly error page for unknown or invalid routes.

---

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js (App Router) | Application structure, routing, and page rendering |
| React | Building reusable UI components |
| TypeScript | Type safety and maintainable code |
| Tailwind CSS | Responsive styling and UI design |
| DaisyUI / Component Library | Reusable UI components |
| Better Auth | Email/password and social authentication |
| React Hot Toast | Success and error notifications |
| REST API / JSON Data | Fetching product and category information |
| Vercel | Application deployment |

---

## 🔌 API Endpoints

The application uses the following endpoints to access product and category information.

### Products

| Method | Endpoint | Description |
|---|---|---|
| GET | `/products` | Retrieve all products |
| GET | `/products?category=chal` | Filter products by category |
| GET | `/products/1` | Retrieve a single product by ID |

### Categories

| Method | Endpoint | Description |
|---|---|---|
| GET | `/categories` | Retrieve all categories |
| GET | `/categories/chal` | Retrieve a single category by slug |

---

## 🔑 Authentication

BazarDor uses Better Auth to provide authentication features.

- Email and password sign-in
- New user registration
- Google social sign-in
- GitHub social sign-in
- Protected product detail pages
- User profile management
- Update user information
- Toast notifications for success and error states

Email verification and password recovery are not included in this project.

---

## 📱 Responsive Design

The interface is designed to adapt to different screen sizes.

- Mobile-friendly navigation and price ticker
- Responsive hero section
- Product grids that adjust to screen width
- Readable product cards and price information
- Accessible buttons and forms across devices

---

## 🚀 Getting Started

Follow these steps to run the project locally.

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Navigate to the project directory

```bash
cd YOUR_PROJECT_FOLDER
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the environment variables required by your Better Auth configuration and data API.

Example:

```env
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
```

Add any additional variables required by your actual project setup. Never commit real secrets or private credentials to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deployment

The application is deployed on Vercel.

🔗 **Live Website:** https://bazardor-nu-gold.vercel.app/

For deployment, configure the required environment variables in the hosting platform and ensure that authentication callbacks and API URLs are correctly configured.

---

## 📌 Project Information

**Project Name:** বাজার দর (BazarDor)

**Category:** Web Application / Daily Market Price Tracker

**Purpose:** To help users explore essential product prices and understand daily market price changes in Bangladesh.

**Built With:** Next.js, React, TypeScript, Tailwind CSS, and Better Auth.

---

## 👨‍💻 Author

**Naajat Noor**

- GitHub:  https://github.com/Naajatnoor
- LinkedIn:https://www.linkedin.com/in/naajatnoor/



