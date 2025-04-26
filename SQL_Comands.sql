
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);



CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  class VARCHAR(50) NOT NULL,
  studentId VARCHAR(50) NOT NULL,
  bookingStatus VARCHAR(50),
  vaccinationName VARCHAR(100),
  vaccinationDate DATE,
  vaccinationStatus VARCHAR(50)
);


CREATE TABLE vaccination_drives (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vaccine VARCHAR(100) NOT NULL,
  date DATE NOT NULL,
  doses INT NOT NULL,
  classes VARCHAR(50) NOT NULL
);