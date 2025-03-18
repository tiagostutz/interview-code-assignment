# TypeScript Code Assignment

This is a TypeScript implementation of the Warehouse Colocation Management System. This README provides instructions on how to set up and run the application.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- TypeScript (v4.5 or higher)

## Setup

1. Clone this repository:
```bash
git clone <repository-url>
cd typescript-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
PORT=3000
DATABASE_URL=sqlite:./database.sqlite
```

## Running the application

1. Development mode:
```bash
npm run dev
```

2. Build and run in production mode:
```bash
npm run build
npm start
```

## Running tests

```bash
npm test
```

## Project Structure

```
src/
├── config/         # Application configuration
├── database/       # Database connection and models
├── modules/        # Domain modules
│   ├── location/   # Location module
│   ├── products/   # Products module 
│   ├── stores/     # Stores module
│   └── warehouse/  # Warehouse module
├── server.ts       # Express.js server setup
└── app.ts          # Application entry point
```

## API Endpoints

The application exposes the following API endpoints:

### Locations
- `GET /api/locations`: Get all locations
- `GET /api/locations/:id`: Get location by ID
- `POST /api/locations`: Create a new location
- `PUT /api/locations/:id`: Update a location
- `DELETE /api/locations/:id`: Delete a location

### Stores
- `GET /api/stores`: Get all stores
- `GET /api/stores/:id`: Get store by ID
- `POST /api/stores`: Create a new store
- `PUT /api/stores/:id`: Update a store
- `DELETE /api/stores/:id`: Delete a store

### Warehouses
- `GET /api/warehouses`: Get all warehouses
- `GET /api/warehouses/:id`: Get warehouse by ID
- `POST /api/warehouses`: Create a new warehouse
- `PUT /api/warehouses/:id`: Update a warehouse
- `DELETE /api/warehouses/:id`: Delete (archive) a warehouse
- `POST /api/warehouses/:id/replace`: Replace a warehouse

### Products
- `GET /api/products`: Get all products
- `GET /api/products/:id`: Get product by ID
- `POST /api/products`: Create a new product
- `PUT /api/products/:id`: Update a product
- `DELETE /api/products/:id`: Delete a product

## Assignment Tasks

The assignment tasks are described in [CODE_ASSIGNMENT.md](CODE_ASSIGNMENT.md).

After completing the implementation, please answer the questions in [QUESTIONS.md](QUESTIONS.md). 