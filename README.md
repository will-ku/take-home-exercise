# Full-Stack Engineering Take-Home Exercise

_✍️ Completed by William Ku_

Thanks for taking the time to review my submission. I enjoyed working on this exercise and I'm excited to share it with you.

## Design Decisions

### Filtering

- On the landing page, users can filter products by **characteristics** using a multi-select dropdown and **product name** using a search bar.
- A single **Clear Filters** button can remove all filters.
- **Filter State** is managed in the URL, as opposed to in memory, so users can share links to specific filtered views.
  - A link to `http://localhost:3000/?characteristics=Plastic-Free&productName=cog` should take a user to a filtered view of products that are plastic-free and contain the word "cog" in the name.

### Scoring

- **Score Tags** - Scores are grouped and color-coded using Score Tag UI elements to allow users to quickly identify how products compare to each other. Scoring groups are as follows:
  - Hot 🔥 (>= 2 points)
  - Neutral 🫥 (< 2 and > 0 points)
  - Cold 🥶 (< 0 points)
- **Score Section** in the Product Detail page contains a score for the product as well as a breakdown of how a product's score compares to other products.

### Product Suggestions

- The product detail page contains suggested products, which are a simplistic way to suggest other products that a user might like based on overlapping characteristics.

### Backend Caching

- In-memory caching using a lightweight library, `node-cache`, is used to cache an index of products by characteristics and the product scores.

### Request Coalescing

- The `RequestCoalescer` class is used to coalesce requests to the backend to improve performance when getting products and product scores.

## Performance Considerations

- Add pagination to the Product Grid to prevent overfetching as the number of products grows.
- Calculating scores relevancy and suggested products currently happens on the client side. As the catalog of products and the complexity of the app, it will not be feasible to perform these calculations based on what exists in the client state. This data should be fetched at the time a user clicks on a product detail page.
- Replace in-memory caching with Redis to improve performance at scale.
- The `products/scores` endpoint calculates and sums the scores at the time a request is made. This should ideally be done in the background and the scores should be cached for a short duration to improve performance.

## Future Improvements

### Technical

- **Search** - Searching by product name should work in conjunction with the characteristics filter to fetch filtered products from the backend. Right now, the search bar just filters products that are already fetched.
- **Frontend Routing** - roll out React Router or a similar library to allow for a better user and developer experience.
- Related missing feature: Cannot navigate to a Product Detail page from a Suggested Product card.
- Implement a fully **RESTful backend API**.
- **Testing** - As the application scales, it is critical to add tests to the backend and frontend to ensure that the application is working as expected. Because of the emphasis on product thinking, I did not implement tests.
- **Caching** - In-memory caching is not a scalable solution. Replace with Redis to improve performance at scale.
- **Pagination** - Add pagination to the Product Grid to prevent overfetching as the number of products grows.

### Product / UX

- Create characteristic groupings and **product categories** (e.g. "Eco-Friendly", "Pantry Staples", "Personal Care") to give better suggestions, as well as a faster way to filter products. These could be implemented as a quick filter on the product grid.
- Find appropriate **product photos** to improve the user experience. The Product Card UI elements were supposed to be more square in dimension -- however, because of a lack of product photos, I had to make the dimensions more landscape-oriented. The landing page looks more like a Kanban board than I would like to admit.

At this point, the application is made for a user to browse products and find related products based on characteristics. Unfortunately, that is where the user's story ends, but you can imagine the user can add these items to a shopping list or favorites list to take action on.

### Data Structure

Products have the following structure:

```json
{
  "id": "string",
  "name": "string",
  "characteristics": ["string"] // e.g., ["Humane", "Locally Produced", "Healthy"]
}
```

Available characteristics: "Humane", "Locally Produced", "Healthy", "Plastic-Free", "Unhealthy", "Wasteful", "Vegan"

## Tasks

### Backend (Express API)

1. Implement a route that filters products by characteristic:

   - Endpoint: GET `/products?characteristic=value` ✅
   - Should efficiently handle multiple concurrent requests ✅
   - Consider caching strategies for performance ✅

2. Create a product scoring system:
   - Endpoint: GET `/products/scores ✅`
   - Scoring rules: ✅
     - +1: "Humane", "Locally Produced", "Healthy"
     - +2: "Plastic-Free"
     - -1: "Unhealthy", "Wasteful"
   - Return products with their calculated scores ✅
   - Optimize for performance at scale ✅

### Frontend (React)

3. Build a responsive product grid:

   - Display products in a 3-column layout ✅
   - Show product name and score ✅
   - Implement loading states ✅
   - Handle error cases ✅

4. [Bonus] Add characteristic filtering:
   - Create a UI for selecting multiple characteristics ✅
   - Update the product grid based on selected filters ✅
   - Maintain a clean and intuitive user experience ✅

## Setup Instructions

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager
- Git

### Getting Started

1. Clone this repository to your local machine:

   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. Set up and start the backend:

   ```bash
   cd api
   yarn install
   yarn start
   ```

   The API server will start on port 3005, and the JSON server on port 4000.

3. In a new terminal, set up and start the frontend:
   ```bash
   cd client
   yarn install
   yarn start
   ```
   The React development server will start on port 3000 and should automatically open in your default browser.

### Verifying Setup

- Backend API should be accessible at: http://localhost:3005
- JSON Server should be accessible at: http://localhost:4000/products and should return product data
  <details>
    <summary>Example response (click to expand) - Shows 6 products including "Sprockets", "Cogs", etc.</summary>

  ```json
  [
    {
      "name": "Sprockets",
      "characteristics": ["Plastic-Free", "Locally Produced"],
      "id": "dcea"
    },
    {
      "name": "Cogs",
      "characteristics": ["Plastic-Free", "Wasteful"],
      "id": "0f8f"
    },
    {
      "name": "Face Cream",
      "characteristics": ["Humane", "Vegan", "Locally Produced"],
      "id": "9880"
    },
    {
      "name": "Muskers",
      "characteristics": ["Wasteful", "Unhealthy"],
      "id": "5015"
    },
    {
      "name": "Hand Sanitizer",
      "characteristics": ["Vegan", "Humane"],
      "id": "04dd"
    },
    {
      "name": "Lettuce",
      "characteristics": ["Vegan", "Humane", "Healthy"],
      "id": "0219"
    }
  ]
  ```

  </details>

- Frontend should be accessible at: http://localhost:3000

### Port Configuration

- Express Server: 3005
- JSON Server: 4000
- React App: 3000
