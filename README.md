
# School Vaccination Portal

A full-stack web application designed to manage and track vaccination drives in schools.
Built with React.js (frontend), Node.js/Express.js (backend), and MySQL (database).


## Project Overview

The School Vaccination Portal allows school coordinators to:
 - Manage student records
 - Schedule and update vaccination drives
 - Mark students as vaccinated
 - Track overall vaccination status
 - Generate and download detailed vaccination reports

This system simulates real-world workflows with a focus on data integrity, effective scheduling, and easy record management.

## Tech Stack

- Front end : React.js
- Backend : Node.js + Express.js
- Database: MYSQL 


## Key Features

#### Authentication & Access Control
- Simulated login flow
- Dashboard access after login
- Personalized dashboard view with important metrics

#### Dashboard Overview
- Total number of students
- Percentage of students vaccinated
- List of upcoming vaccination drives (within the next 30 days)
- Empty state handling (e.g., no upcoming drives)

#### Student Management
- Add/Edit/Delete student details individually
- Bulk upload student data through CSV file
- Search students by Name, Class, ID, or Vaccination Status
- Vaccinate students in the context of a specific drive
- Prevent duplicate vaccination for the same vaccine

#### Vaccination Drive Management
- Create vaccination drives (vaccine name, date, doses available, applicable classes)
- Enforce date validation (drives must be scheduled at least 15 days in advance)
- Prevent overlapping drives
- Edit upcoming drives (editing disabled for past drives)

#### Reporting
- Generate vaccination reports with:
- Student details
- Vaccination status
- Date of vaccination
- Vaccine name
- Filter reports based on vaccine name
- Download reports as CSV/Excel/PDF
- Pagination for large datasets

## Installation & Setup

### Prerequisites
- Node.js and npm installed
- MySQL Server running
- React CLI for frontend

### Steps
#### 1. Clone the repository

```bash
	git clone https://github.com/Prasanjit137/School_Vaccination.git
	cd School_Vaccination
```

#### 2. Setup Backend
```bash 
	cd server
	npm install
```
- Configure .env file for database connection:
```bash
	DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=12345678
    DB_NAME= my_school_vaccination
    JWT_SECRET=supersecretkey123
```
- Run the backend server:
```bash
	node server.js
```
#### 3. Setup Frontend
```bash
	cd client
	npm install
	npm start
```
#### 	4. Database Setup
- Create the database using the provided SQL script (SQL_Commands.sql).

## Database Schema

| id | username | password |
| :-------- | :------- | :------------------------- |
|  `1` | admin1   | $2b$10$yfV8.Ry1BkkuXNsUUTNOOutmwSeGmZ0wPUMX7LrzV5klT.1a6iEVC |
|  `2` | admin2   | $2b$10$toKlBLFXC8oh5ILfJcViv.jkRI7NEUh61KTFOcZvnoitTg6CTVYT6 |



| id  | name          | class | studentId | bookingStatus | vaccinationName | vaccinationDate | vaccinationStatus |
| --- | ------------- | ----- | --------- | ------------- | --------------- | --------------- | ----------------- |
| 53  | Sarah Clark   | 10F   | 9578      | Pending       | Hepatitis B     | 2025-05-19      | Not Vaccinated    |
| 54  | Sophia King   | 10F   | 3759      | Pending       | HPV             | 2025-04-26      | Vaccinated        |
| 55  | David Miller  | 10F   | 5051      | Pending       | DPT             | 2025-05-18      | Not Vaccinated    |
| 56  | John Smith    | 8E    | 8874      |               |                 | NULL            |                   |

| id  | vaccine | date       | doses | classes |
| --- | ------- | ---------- | ----- | ------- |
| 2   | Covaxin | 2025-05-24 | 12    | 3       |
| 3   | Covaxin | 2025-04-18 | 89    | 9       |
| 4   | MMR     | 2025-04-30 | 80    | 7       |


## Screenshots

#### LoginPage.png
![App Screenshot](https://github.com/Prasanjit137/School_Vaccination/blob/e33680aaf2d6c0a0758e4a3e473bebe4429ff5b0/demo_data/images/LoginPage.png)

#### Dashboard.png
![App Screenshot](https://github.com/Prasanjit137/School_Vaccination/blob/1b1c77378ab25d9e662fc45d296fed58d4c99012/demo_data/images/Dashboard.png)

#### ManageStudents.png
![App Screenshot](https://github.com/Prasanjit137/School_Vaccination/blob/e33680aaf2d6c0a0758e4a3e473bebe4429ff5b0/demo_data/images/ManageStudents.png)

#### ManageVaccinations.png
![App Screenshot](https://github.com/Prasanjit137/School_Vaccination/blob/e33680aaf2d6c0a0758e4a3e473bebe4429ff5b0/demo_data/images/ManageVaccinations.png)

#### Reports.png
![App Screenshot](https://github.com/Prasanjit137/School_Vaccination/blob/e33680aaf2d6c0a0758e4a3e473bebe4429ff5b0/demo_data/images/Reports.png)



## User Stories Implemented
- Login and Landing Page
- Add / Manage Students (including bulk upload)
- Book and Manage Vaccination Drives
- Generate and Download Reports
- Dashboard with Analytics
- Search and Filter Students/Drives
- Pagination in Reports
- Prevent Vaccination Duplication
- Form Validations and Date Validations
