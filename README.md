# Full-Stack Engineering Take-Home Exercise

**Time Expectation:** While we suggest spending 3-4 hours on core requirements, feel free to invest more time if you're excited about additional features or improvements that showcase your product thinking.

## Overview

This is a full-stack application built with Node.js/Express backend and React frontend. The backend includes a mock API (powered by `json-server`) that simulates a product catalog service.

### Product Thinking Opportunity

We encourage you to think beyond just the technical implementation. This exercise is intentionally open-ended to allow you to:

- Make thoughtful product decisions about the user experience
- Fill in any gaps in the requirements based on reasonable assumptions
- Add features that you think would benefit the end user
- Document your product decisions and their rationale
- Consider real-world scenarios and edge cases

Strong submissions often go beyond the basic requirements to create a more complete and polished product experience. Feel free to:

- Enhance the UI/UX with additional features that make sense
- Add helpful product metadata or functionality
- Improve error messaging and user feedback
- Consider accessibility and internationalization
- Add data visualizations or analytics features
- Implement any other features you think would be valuable

Just be sure to document your choices and reasoning in your submission.

### Data Structure

Products have the following structure:
```json
{
  "id": "string",
  "name": "string",
  "characteristics": ["string"]  // e.g., ["Humane", "Locally Produced", "Healthy"]
}
```

Available characteristics: "Humane", "Locally Produced", "Healthy", "Plastic-Free", "Unhealthy", "Wasteful"

## Technical Requirements

- Use the existing Node.js/Express backend and React frontend structure
- Write clean, maintainable, and well-documented code
- Include error handling and loading states
- Consider performance optimization for scale
- Add appropriate tests for new functionality

## Tasks

### Backend (Express API)

1. Implement a route that filters products by characteristic:
   - Endpoint: GET `/products?characteristic=value`
   - Should efficiently handle multiple concurrent requests
   - Consider caching strategies for performance

2. Create a product scoring system:
   - Endpoint: GET `/products/scores`
   - Scoring rules:
     - +1: "Humane", "Locally Produced", "Healthy"
     - +2: "Plastic-Free"
     - -1: "Unhealthy", "Wasteful"
   - Return products with their calculated scores
   - Optimize for performance at scale

### Frontend (React)

3. Build a responsive product grid:
   - Display products in a 3-column layout
   - Show product name and score
   - Implement loading states
   - Handle error cases

4. [Bonus] Add characteristic filtering:
   - Create a UI for selecting multiple characteristics
   - Update the product grid based on selected filters
   - Maintain a clean and intuitive user experience

## Setup Instructions

1. Clone this repository
2. Start the backend:
   ```bash
   cd api && yarn && yarn start
   ```
3. Start the frontend:
   ```bash
   cd client && yarn && yarn start
   ```

### Port Configuration
- Express Server: 3005
- JSON Server: 4000
- React App: 3000

## Evaluation Criteria

We will evaluate your submission based on:
- Code quality and organization
- Performance considerations
- Error handling and edge cases
- Testing approach
- UI/UX decisions
- Documentation

## Submission Instructions

1. Create a private GitHub repository
2. Push your code with clear commit messages
3. Include a README with:
   - Setup instructions
   - Your design decisions
   - Performance considerations
   - What you would do differently with more time
4. Share the repository with [GITHUB_USERNAME]

## Troubleshooting

If you encounter port conflicts:
1. Check if the ports (3000, 3005, 4000) are available
2. Modify the port numbers in the respective configuration files
3. Update the `BASE_API_URL` in the frontend accordingly

For any questions, please reach out to [CONTACT_EMAIL]
