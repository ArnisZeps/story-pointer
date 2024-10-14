# 🎯 Story Pointing App Documentation

Welcome to the **Story Pointing App**! This guide will help you launch and run the app locally, both backend and frontend, using Docker.

---

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Quick Start](#quick-start)
3. [Frontend Setup](#frontend-setup)
4. [Backend Setup](#backend-setup)
5. [MongoDB Setup](#mongodb-setup)

---

## 🌟 Project Overview

The **Story Pointing App** is designed to help teams collaboratively assign story points in Agile development. This app includes both a React frontend and an Express backend, fully dockerized for ease of deployment.

---

## ⚡ Quick Start

To quickly launch the application, follow these steps:

1. **Start MongoDB**:
    If using Docker, run the following command to spin up MongoDB:
    ```bash
    docker-compose up mongo
    ```
    Alternatively, if using `mongosh`, start it with:
    ```bash
    mongosh
    ```

2. **Start the React Frontend**:
    Navigate to the frontend directory and start the application:
    ```bash
    cd frontend
    npm start
    ```

3. **Start the Express Backend**:
    Navigate to the backend directory and start the backend server with `nodemon`:
    ```bash
    cd backend
    npm start
    ```