# Docker Compose Practice Project 🚀

A beginner-friendly multi-container application built to understand how **Frontend, Backend, MongoDB, Docker, Docker Compose, environment variables, networking, and persistent storage** work together.

This project is part of my hands-on journey toward building production-ready DevOps projects.

---

## 📌 Project Overview

This application contains three main services:

* **Frontend** — HTML + Nginx
* **Backend** — Node.js + Express
* **Database** — MongoDB

Docker Compose is used to run all services together.

### Architecture

```text
                         Browser
                            │
                            │ http://localhost:8080
                            ▼
                    ┌────────────────┐
                    │    Frontend    │
                    │     Nginx      │
                    │      :80       │
                    └───────┬────────┘
                            │
                            │ /api
                            ▼
                    ┌────────────────┐
                    │    Backend     │
                    │ Node.js/Express│
                    │      :5000     │
                    └───────┬────────┘
                            │
                            │ MONGO_URI
                            ▼
                    ┌────────────────┐
                    │    MongoDB     │
                    │      :27017    │
                    └───────┬────────┘
                            │
                            ▼
                     mongo-data volume
```

---

# 🛠️ Technologies Used

* HTML
* JavaScript
* Nginx
* Node.js
* Express.js
* MongoDB
* Mongoose
* Docker
* Docker Compose
* Git
* GitHub

---

# 📁 Project Structure

```text
docker-compose-practice/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── server.js
│
├── frontend/
│   ├── Dockerfile
│   ├── index.html
│   └── nginx.conf
│
├── .env
├── .gitignore
├── docker-compose.yml
└── README.md
```

> ⚠️ `.env` should not be committed to GitHub because it contains database credentials.

---

# 🔵 Frontend

The frontend is a simple HTML application served using Nginx.

It contains a button that sends a request to the backend:

```javascript
const response = await fetch("/api");
```

The request is handled by Nginx and forwarded to the backend.

---

# 🟢 Backend

The backend is built using Node.js and Express.

Example API:

```text
GET /api
```

Response:

```text
Hello from Backend! 🚀
```

The backend uses **Mongoose** to connect to MongoDB.

The MongoDB connection is obtained from an environment variable:

```javascript
mongoose.connect(process.env.MONGO_URI)
```

---

# 🟡 MongoDB

MongoDB runs as a Docker container using the official MongoDB image.

MongoDB uses a named Docker volume:

```yaml
volumes:
  - mongo-data:/data/db
```

This allows database data to persist even when the MongoDB container is removed.

---

# 🔐 Environment Variables

The project uses a `.env` file for configuration.

Example:

```env
MONGO_DB=dockercompose
MONGO_USER=admin
MONGO_PASSWORD=admin123

BACKEND_PORT=5000
FRONTEND_PORT=8080
```

Docker Compose reads these variables and passes them to the appropriate containers.

For example:

```yaml
environment:
  MONGO_URI: mongodb://${MONGO_USER}:${MONGO_PASSWORD}@mongo:27017/${MONGO_DB}?authSource=admin
```

The backend receives the resulting MongoDB connection string through:

```text
MONGO_URI
```

The Node.js application accesses it using:

```javascript
process.env.MONGO_URI
```

---

# 🌐 Docker Compose Networking

Docker Compose creates an internal network for the services.

The services can communicate using their **service names**.

For example:

```text
backend → mongo:27017
```

The backend does not use:

```text
localhost:27017
```

because `localhost` inside the backend container refers to the backend container itself.

Instead, Docker's internal DNS resolves:

```text
mongo
```

to the MongoDB container.

---

# 🔀 Nginx Reverse Proxy

Nginx is used as a reverse proxy.

The configuration contains:

```nginx
location /api {
    proxy_pass http://backend:5000;
}
```

Therefore:

```text
Browser
   │
   │ /api
   ▼
Nginx
   │
   │ backend:5000
   ▼
Node.js Backend
```

This allows the frontend to call:

```javascript
fetch("/api")
```

without directly exposing the backend to the browser.

---

# 🚀 Running the Project

## 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

Move into the project:

```bash
cd docker-compose-practice
```

---

## 2. Create the `.env` file

Create:

```bash
nano .env
```

Add:

```env
MONGO_DB=dockercompose
MONGO_USER=admin
MONGO_PASSWORD=admin123

BACKEND_PORT=5000
FRONTEND_PORT=8080
```

---

## 3. Build and start the containers

```bash
docker compose up -d --build
```

---

## 4. Check running containers

```bash
docker compose ps
```

Expected services:

```text
backend
frontend
mongo
```

---

## 5. Check logs

Backend:

```bash
docker compose logs backend
```

MongoDB:

```bash
docker compose logs mongo
```

Frontend:

```bash
docker compose logs frontend
```

Follow logs live:

```bash
docker compose logs -f
```

---

# 🌍 Access the Application

Open your browser:

```text
http://localhost:8080
```

You should see:

```text
Welcome to My Docker Compose Application

Frontend is running with Nginx.
```

Click:

```text
Call Backend
```

The frontend should display:

```text
Hello from Backend! 🚀
```

---

# 🔍 Useful Docker Commands

Check containers:

```bash
docker compose ps
```

View logs:

```bash
docker compose logs
```

View backend logs:

```bash
docker compose logs backend
```

Enter the backend container:

```bash
docker compose exec backend bash
```

Check environment variables inside the backend:

```bash
docker compose exec backend env | grep MONGO
```

Stop the application:

```bash
docker compose down
```

Stop the application and remove volumes:

```bash
docker compose down -v
```

Rebuild containers:

```bash
docker compose up -d --build
```

---

# 💾 Docker Volume

MongoDB uses a named volume:

```text
mongo-data
```

The volume is mounted at:

```text
/data/db
```

This means MongoDB data can survive container recreation.

List Docker volumes:

```bash
docker volume ls
```

Inspect the volume:

```bash
docker volume inspect docker-compose-practice_mongo-data
```

> ⚠️ Running `docker compose down -v` deletes the Compose-managed volume and therefore the MongoDB data stored in it.

---

# 🧪 Troubleshooting

## Check Compose configuration

Before starting the application:

```bash
docker compose config
```

This helps detect YAML and environment-variable problems.

---

## MongoDB Authentication Failed

If you see:

```text
MongoServerError: Authentication failed
```

and this is only a practice environment, the MongoDB volume may contain credentials from an earlier initialization.

You can recreate the database:

```bash
docker compose down -v
docker compose up -d --build
```

> ⚠️ This deletes the MongoDB data stored in the Docker volume.

---

## Check backend connection

```bash
docker compose logs backend
```

A successful connection should show:

```text
Connected to MongoDB
Server running on port 5000
```

---

# 📚 What I Learned

Through this project I learned:

### Docker

* Docker images
* Docker containers
* Dockerfiles
* Docker networks
* Docker volumes
* Port mapping

### Docker Compose

* `services`
* `build`
* `image`
* `ports`
* `environment`
* `depends_on`
* named volumes
* service-to-service communication

### Backend

* Node.js
* Express
* Mongoose
* REST API basics
* Environment variables

### Networking

I learned that containers communicate using Docker Compose service names:

```text
backend → mongo:27017
```

instead of:

```text
backend → localhost:27017
```

### Nginx

I learned how Nginx can work as a reverse proxy:

```text
/api → backend:5000
```

### Database

I learned:

* MongoDB authentication
* MongoDB initialization
* persistent Docker volumes
* database credentials
* connection strings

---

# 🎯 Future DevOps Improvements

This project will be extended into a complete DevOps project.

Planned improvements:

```text
Docker Compose
      ↓
GitHub
      ↓
GitHub Actions
      ↓
Jenkins CI/CD
      ↓
AWS EC2
      ↓
Nginx + HTTPS
      ↓
Prometheus
      ↓
Grafana
      ↓
Loki + Alloy
      ↓
Terraform
      ↓
Ansible
      ↓
Kubernetes
```

Future features include:

* CI/CD pipeline
* Automated Docker builds
* AWS EC2 deployment
* Nginx reverse proxy
* HTTPS/SSL
* Monitoring with Prometheus
* Grafana dashboards
* Centralized logging with Loki
* Infrastructure as Code with Terraform
* Server configuration with Ansible
* Kubernetes deployment

---

# 👨‍💻 Author

**Ajay Pokharel**

CSIT Graduate | Junior DevOps Learner | Developer & Educator

GitHub:

```text
https://github.com/iamajaypokharel
```

Portfolio:

```text
https://ajaypokharel.com.np/
```

---

# ⭐ Project Goal

The goal of this project is to understand how a real application moves from:

```text
Application Development
        ↓
Containerization
        ↓
Multi-container Deployment
        ↓
CI/CD
        ↓
Cloud Deployment
        ↓
Monitoring
        ↓
Infrastructure as Code
        ↓
Kubernetes
```

This project is being developed as a hands-on DevOps learning and portfolio project.
