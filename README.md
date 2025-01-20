# Coding Exercise

### Application overview

A simple full-stack project using Node.js/Express for the backend and React for the frontend. The backend features a mock API powered by `json-server`, simulating a third-party service. It includes a single route, `/products`, which returns all products. The frontend fetches data directly from this endpoint.

### Instructions for running the app

To run the application, follow these steps:

1. **Navigate to the `api` directory:**
   ```bash
   cd api
   ```
2. **Install dependencies:**
   ```bash
   yarn
   ```
3. **Start the express server:**
   ```bash
   yarn start
   ```
4. **Open a new terminal window and navigate to the `client` directory::**
   ```bash
   cd client
   ```
5. **Install dependencies:**
   ```bash
   yarn
   ```
6. **Start the react application:**
   ```bash
   yarn start
   ```

### Note:

Port numbers are hardcoded in the codebase. If you need to adjust them, ensure you update the values everywhere they are relevant in the application. Currently, the ports are configured as follows:

- **Express Server:** `3005`
- **JSON server:** `4000`
- **React App:** `3000`

### Exercise tasks

1. Write a new route that takes the characteristic as a query parameter and returns a list of products with that characteristic. Note that when evaluating this route we will assume this is functioning at scale so take performance at scale into account.

2. Write a new route that returns a list of products with a score associated with each product. The score will be based on characteristic composition. Characteristics "Humane", "Locally Produced", "Healthy" are worth 1 point, "Plastic-Free" is worth 2 points, "Unhealthy" and "Wasteful" are -1 point each. Once again assume performance at scale if you can and use any method you see fit to make the endpoint more performant.

3. Display products on the frontend in a three-column grid, including each product's name and score.

4. [Bonus] Implement filters for all characteristics on the frontend, allowing users to select a filter and view only the products that match those criteria.
