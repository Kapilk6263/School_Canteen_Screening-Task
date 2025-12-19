# School Canteen App

A digital ordering system for a school canteen built with React, Context API, and JSON Server.

## Features
- View Available Snacks
- Order Snacks (select student & quantity)
- Manage Students (Create, View Details)
- Track Student Spending and Order History
- Mock Backend with `json-server`

## Tech Stack
- **Frontend**: React, Vite
- **Routing**: React Router DOM v7
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Backend (Mock)**: JSON Server
- **Styling**: Vanilla CSS (CSS Modules approach with global variables)

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start the Mock Backend** (Port 3001)
   ```bash
   npm run server
   ```

3. **Start the Frontend** (Port 5173)
   ```bash
   npm run dev
   ```

4. **Access the App**
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## Mock Data Approach
Data is stored in `db.json`. 
- `snacks`: List of available items.
- `students`: User profiles with wallet tracking.
- `orders`: Transaction history linked to students.

`json-server` provides full REST API capabilities to read/write to this file.
