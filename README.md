# PRODUCT MANAGEMENT

## **Prerequisites**
Ensure you have the following installed:
- **Go** 
- **Docker** and **Docker Compose**
- **Git**
- PostgreSQL
- **Angular**

---

## **Local Build and Run Instructions**

### **1. Clone the Repository**
```bash
git clone https://github.com/briuin/th-product.git
```

### **2. Build the Backend**
Run the following command to build the application locally:
```bash
go build -o backend .
```
This will produce a binary named `backend` in the current directory.

### **3. Run the Backend**
Run the application using:
```bash
./backend
```
The server will start and listen on the port (default: 8080).

---

## **Run Unit Tests**

### **1. Run All Tests**
To run all tests with verbose output:
```bash
go test ./... -v
```

### **2. Run Tests with Coverage**
To generate a coverage report:
```bash
go test ./... -cover
```

### **3. Generate Detailed Coverage Report**
To generate an HTML coverage report:
```bash
go test ./... -coverprofile=coverage.out
```
Then view it using:
```bash
go tool cover -html=coverage.out
```

---

## **Run with Docker Compose**

### **1. Run with Docker Compose**
Start the services:
```bash
docker-compose up --build
```

### **2. Stop the Services**
Stop the services and clean up:
```bash
docker-compose down
```

> Add the `-v` flag to `docker-compose down` to remove volumes:
> ```bash
> docker-compose down -v
> ```

---
