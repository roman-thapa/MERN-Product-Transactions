# MERN Stack Product Transactions Dashboard

This project implements a full-stack application using the MERN (MongoDB, Express.js, React, Node.js) stack to create a dashboard for managing and visualizing product transaction data.

## Backend (Node.js and Express)

The backend API is responsible for fetching and managing product transaction data from a third-party source and providing endpoints for frontend consumption.

### Technologies Used

- Node.js
- Express.js
- MongoDB (database)
- Mongoose (ODM for MongoDB)
- Axios (for making HTTP requests to third-party API)
- RESTful API design principles

### API Endpoints

- **GET /api/transactions**: Fetch all product transactions with search and pagination support.
- **GET /api/statistics**: Get total sale amount, sold items count, and not sold items count for a selected month.
- **GET /api/barchart**: Get price range data and number of items in each range for a selected month.
- **GET /api/piechart**: Get category distribution and number of items in each category for a selected month.

### Database Schema

The MongoDB schema for transactions includes fields such as `title`, `description`, `price`, `dateOfSale`, `sold`, and `category`.

## Frontend (React with Vite)

The frontend dashboard consumes backend APIs to display and visualize product transaction data using React with Vite as the build tool.

### Technologies Used

- React
- Vite (frontend build tool)
- Axios (for API requests)
- Chart.js and react-chartjs-2 (for chart visualization)
- CSS (for styling)

### Components

- **TransactionsTable**: Displays a table of product transactions with pagination and search functionality.
- **Statistics**: Shows total sale amount, sold items count, and not sold items count for a selected month.
- **BarChart**: Visualizes price range data for products sold in a selected month.
- **PieChart**: Displays the distribution of product categories for a selected month.

### Folder Structure

- `backend/`: Contains backend Node.js and Express server files.
- `frontend/`: Contains frontend React application files.

### Troubleshooting

- Ensure MongoDB is running and accessible.
- Check API endpoint configurations and adjust frontend API calls as needed.
- Handle Chart.js related errors by managing chart lifecycles properly in React components.

### Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or fixes.

### License

This project is licensed under the MIT License - see the LICENSE file for details.
