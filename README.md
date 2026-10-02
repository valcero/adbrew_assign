# Adbrew Assignment Submission

## Overview
This repository contains the completed full-stack assignment for Adbrew. The project integrates a React frontend, a Django backend, and a MongoDB database, all fully containerized using Docker.

## Setup Instructions
1. Set the environment variable for your local path:
   ```powershell
   # Replace with your actual path
   $env:ADBREW_CODEBASE_PATH="C:\path\to\your\cloned\adb_test\src"
   ```
2. Build the Docker containers:
   ```powershell
   docker-compose build
   ```
3. Start the containers:
   ```powershell
   docker-compose up -d
   ```
4. Access the applications:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:8000/todos`

---

## Tasks Completed

### 1. Backend Implementation (Django & PyMongo)
- **File modified:** `src/rest/rest/views.py`
- Implemented a direct connection to MongoDB bypassing traditional Django models and serializers.
- **GET `/todos/`**: Fetches all tasks from the `todos` collection and cleanly serializes MongoDB's `ObjectId` to strings before returning a standard JSON response.
- **POST `/todos/`**: Accepts JSON data (`description`), validates it, inserts a new document into MongoDB, and returns the newly created record with a `201 Created` status.

### 2. Frontend Implementation (React Hooks)
- **Files modified:** `src/app/src/App.js`, `src/app/src/App.css`, `src/app/src/index.css`
- Fully replaced the boilerplate code with a modern React implementation using functional components and **React Hooks** (`useState`, `useEffect`).
- Built an automatic fetch-and-render loop where the UI dynamically refreshes immediately after submitting a new task via a `POST` request.
- Added essential loading states and empty states for a production-ready feel.
- **Design & Aesthetics:** Implemented a premium, responsive UI featuring Glassmorphism, a glowing interactive input system, animated task entry (slide-ins), and a sleek animated gradient background using pure CSS.

---

## Issues Encountered & Resolved (Deliberate Debugging Challenges)

As mentioned in the original assignment instructions ("If the containers... are not up, we would like you to use your debugging skills to figure out the issue"), I recognized that the Docker environment contained intentional build-breaking bugs designed to test DevOps debugging skills. 

I successfully diagnosed and resolved all of them without needing to reach out for help:

1. **Debian Buster EOL (`apt-get update` failing):** 
   - The original `python:3.8` (or `python:3.8-buster`) image relies on Debian 10, which recently reached End-of-Life. Its repositories were archived, causing `404 Not Found` errors during the build. 
   - **Fix:** I explicitly pinned the `Dockerfile` to `python:3.8-buster` and pointed the APT package manager (`/etc/apt/sources.list`) directly to `archive.debian.org` so the legacy MongoDB 4.4 dependencies could fetch correctly.

2. **Deprecated `easy_install pip`:**
   - The original `Dockerfile` attempted to run `easy_install pip`, a command that was entirely removed from modern `setuptools` packages, causing a build crash. 
   - **Fix:** I replaced this line with the standard `pip install --upgrade pip setuptools`.

3. **Celery 5.0.5 Metadata Enforcement:**
   - The updated pip (`>= 24.1`) strictly enforces PEP-440 rules, and rejected the installation of `celery==5.0.5` due to invalid metadata published on PyPI.
   - **Fix:** I pinned pip to an older version (`pip<24.1`) in the `Dockerfile` to bypass the strict metadata check and allow the project's legacy dependencies to install smoothly.
