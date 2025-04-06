# Campus Wellness Platform

A mental health and wellness tracking platform designed for college students, featuring AI-powered insights and counselor support.

## Features

- 📊 Daily Wellness Tracking
- 🧠 AI-Powered Mood Analysis
- 📈 Interactive Wellness Visualizations
- 💡 Personalized Recommendations
- 👥 Counselor Dashboard
- 📱 Real-time Analytics

## Screenshots

### Login Page

![Screenshot 2025-04-06 234828](https://github.com/user-attachments/assets/9b9befe8-6b27-4763-93c4-54e9ef90612b)

### Daily Check-in

![Screenshot 2025-04-07 001947](https://github.com/user-attachments/assets/465b368a-7890-458f-99bf-805c64312670)

### Analytics Dashboard

![Screenshot 2025-04-07 001829](https://github.com/user-attachments/assets/c4f58485-6dda-4308-afa7-858397ad6ef5)
![Screenshot 2025-04-07 001928](https://github.com/user-attachments/assets/f1784cd6-469a-4a44-a32b-f176bf4bd207)


### AI Insights and Recommendations
![Screenshot 2025-04-07 002009](https://github.com/user-attachments/assets/8186a93a-ced1-4d54-ab50-f9885ae0403c)


## Tech Stack

### Frontend
- React.js
- Material-UI
- Chart.js
- Axios

### Backend
- Node.js
- Express
- MongoDB
- JWT Authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/CampusWellness.git
cd CampusWellness
```

2. Install Backend Dependencies
```bash
cd backend
npm install
```

3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

4. Start the Backend Server
```bash
cd backend
npm start
```

5. Start the Frontend Server
```bash
cd frontend
npm start
```

### Usage
1. Register/Login to your account
2. Complete daily wellness check-ins
3. View personalized insights
4. Track your wellness trends

### ## API Endpoints
### Wellness Routes
- POST /api/wellness/log - Submit wellness log
- GET /api/wellness/history - Get user's wellness history
- GET /api/wellness/analytics - Get wellness analytics
### Authentication Routes
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user
- GET /api/auth/me - Get current user
