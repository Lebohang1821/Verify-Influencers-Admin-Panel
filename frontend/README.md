# Verify Influencers Admin Panel - Frontend

This project is the frontend for the Verify Influencers Admin Panel. It is built with React and provides an interface for managing and verifying influencers.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Components](#components)
- [Deployment](#deployment)
- [Environment Variables](#environment-variables)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/verify-influencers-admin-panel.git
    ```

2. Navigate to the frontend directory:
    ```sh
    cd verify-influencers-admin-panel/frontend
    ```

3. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start the development server:
    ```sh
    npm start
    ```

2. Open your browser and navigate to `http://localhost:3000`.

## API Endpoints

The frontend communicates with the backend API hosted at `https://verify-influencers-admin-panel.onrender.com`. Below are the main API endpoints used:

- `GET /api/influencers`: Fetch all influencers.
- `POST /api/influencers`: Add a new influencer.
- `POST /api/chat`: Start a new chat session.
- `GET /api/chat/leaderboard`: Fetch the leaderboard data.
- `GET /api/chat/summary`: Fetch the summary data.

## Components

### Dashboard

The `Dashboard` component displays an overview of the influencers, claims, and other statistics.

### Leaderboard

The `Leaderboard` component shows the rankings of influencers based on various metrics.

### InfluencerDetails

The `InfluencerDetails` component provides detailed information about a specific influencer.

### ResearchTasks

The `ResearchTasks` component allows users to configure and start new research tasks.

### AddInfluencerForm

The `AddInfluencerForm` component provides a form for adding new influencers.

### Navbar

The `Navbar` component provides navigation links to different sections of the application.

### Contact

The `Contact` component provides a form for contacting support.

### About

The `About` component provides information about the application.

### Monetization

The `Monetization` component provides insights into revenue trends and growth strategies.

## Deployment

To deploy the frontend application, follow these steps:

1. Build the application:
    ```sh
    npm run build
    ```

2. Deploy the build folder to your preferred hosting service.

## Environment Variables

The frontend application does not require any environment variables. However, ensure that the backend API URL is correctly set in the `src/services/api.js` file:

```javascript
const API_BASE_URL = 'https://verify-influencers-admin-panel.onrender.com';
```

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for more details.
