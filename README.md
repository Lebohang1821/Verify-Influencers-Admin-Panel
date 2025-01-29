# Verify Influencers Admin Panel

This project is the Verify Influencers Admin Panel, which includes both frontend and backend components. The frontend is built with React, and the backend is built with Node.js and Express.

## Table of Contents

- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)
- [License](#license)

## Frontend

The frontend provides an interface for managing and verifying influencers. It includes components such as Dashboard, Leaderboard, InfluencerDetails, ResearchTasks, and more.

### Installation

1. Navigate to the frontend directory:
    ```sh
    cd verify-influencers-admin-panel/frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

### API Endpoints

The frontend communicates with the backend API hosted at ``. Below are the main API endpoints used:

- `GET /api/influencers`: Fetch all influencers.
- `POST /api/influencers`: Add a new influencer.
- `POST /api/chat`: Start a new chat session.
- `GET /api/chat/leaderboard`: Fetch the leaderboard data.
- `GET /api/chat/summary`: Fetch the summary data.

## Backend

The backend provides the API for managing and verifying influencers. It is built with Node.js and Express, and it connects to a MongoDB database.

### Installation

1. Navigate to the backend directory:
    ```sh
    cd verify-influencers-admin-panel/backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

### Usage

1. Start the backend server:
    ```sh
    npm start
    ```

2. The backend server will run on `http://localhost:5000`.

### Environment Variables

Create a `.env` file in the backend directory with the following variables:

```properties
PERPLEXITY_API_KEY="your-perplexity-api-key"
MONGODB_URI="your-mongodb-uri"
AI1_API_KEY="your-ai1-api-key"
```

## Deployment

### Frontend

To deploy the frontend application, follow these steps:

1. Build the application:
    ```sh
    npm run build
    ```

2. Deploy the build folder to your preferred hosting service.

### Backend

To deploy the backend application, follow these steps:

1. Ensure all environment variables are set correctly in the hosting service.
2. Deploy the backend code to your preferred hosting service.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.