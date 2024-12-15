
# PRODUCT MANAGEMENT

## **Prerequisites**
Ensure you have the following installed:
- **Go** 
- **Docker** and **Docker Compose**
- **Git**
- **PostgreSQL**
- **Angular CLI** (for the frontend)

---

## **Local Build and Run Instructions**

### **1. Clone the Repository**
Clone the repository to your local machine:
```bash
git clone https://github.com/briuin/th-product.git
```

---

### **2. Backend Instructions**

#### **Build the Backend**
Run the following command to build the backend locally:
```bash
go build -o backend .
```
This will produce a binary named `backend` in the current directory.

#### **Run the Backend**
Run the application using:
```bash
./backend
```
The server will start and listen on the port (default: 8080).

#### **Run Unit Tests**
- **Run All Tests**:
  ```bash
  go test ./... -v
  ```
- **Run Tests with Coverage**:
  ```bash
  go test ./... -cover
  ```
- **Generate a Detailed Coverage Report**:
  ```bash
  go test ./... -coverprofile=coverage.out
  go tool cover -html=coverage.out
  ```

---

### **3. Frontend Instructions**

#### **Install Dependencies**
Navigate to the `frontend` directory and install dependencies:
```bash
cd frontend
npm install
```

#### **Start the Frontend**
Run the following command to start the frontend locally:
```bash
npm start
```
The frontend will be accessible at `http://localhost:4200`.

#### **Build the Frontend**
To create a production build:
```bash
npm run build
```

#### **Run Cypress Tests**
To run end-to-end tests with Cypress:
```bash
npm run cypress:open
```

---

### **4. Run with Docker Compose**

#### **Start Services**
Run the entire application stack using Docker Compose:
```bash
docker-compose up --build
```
This will build and start the backend and PostgreSQL database in Docker containers.

#### **Stop Services**
To stop and clean up:
```bash
docker-compose down
```

> Add the `-v` flag to remove volumes:
> ```bash
> docker-compose down -v
> ```

---

## **Scripts for the Frontend**
Below are the available npm scripts for the frontend:

```json
"scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test",
    "cypress:open": "cypress open"
}
```

### Key Commands:
- **Start the Frontend**:
  ```bash
  npm start
  ```
- **Run Unit Tests**:
  ```bash
  npm run test
  ```
- **Run Cypress E2E Tests**:
  ```bash
  npm run cypress:open
  ```

---

### **Environment Variables**
For Docker Compose, the environment variables for the backend and database are defined in the `docker-compose.yml`. If needed, adjust the following settings:
- **Backend**:
  - `DB_HOST`: Database hostname
  - `DB_USER`: Database username
  - `DB_PASSWORD`: Database password
  - `DB_NAME`: Database name
  - `DB_PORT`: Database port
  - `DB_SSLMODE`: SSL mode
  - `DB_TIMEZONE`: Time zone
- **Database**:
  - `POSTGRES_USER`: PostgreSQL username
  - `POSTGRES_PASSWORD`: PostgreSQL password
  - `POSTGRES_DB`: PostgreSQL database name

---

### **Helpful Links**
- **Backend API**: `http://localhost:8080`
- **Frontend**: `http://localhost:4200`

Feel free to report any issues or request features. 🚀
