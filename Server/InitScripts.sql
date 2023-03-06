CREATE TABLE User (
  Name varchar(127),
  Email varchar(127),
  MembershipType varchar(31) NOT NULL,
  PRIMARY KEY (Email)
);

CREATE TABLE Gym (
  Name varchar(127),
  Opening_time time(0),
  Closing_time time(0),
  Address varchar(127),
  PRIMARY KEY (Address)
);

CREATE TABLE TShirt (
  Manufacturing_ID varchar(127),
  Size varchar(127),
  PRIMARY KEY (Manufacturing_ID)
);

CREATE TABLE ProteinPowder (
  Manufacturing_ID varchar(127),
  Volume int,
  PRIMARY KEY (Manufacturing_ID)
);

CREATE TABLE BodyPart (
  Name varchar(127),
  PRIMARY KEY (Name)
 );


CREATE TABLE Offers_Class_2 (
  Start_time TIME(0),
  End_time TIME(0),
  Instructor_name varchar(127),
  Room_number int,
  PRIMARY KEY (Start_time, End_time, Instructor_name)
);


CREATE TABLE Offers_Class_1 (
  Class_ID varchar(32),
  Price int,
  Name varchar(127),
  Start_time TIME(0) NOT NULL,
  End_time TIME(0) NOT NULL,
  Instructor_name varchar(127) NOT NULL,
  Gym_Address varchar(127) NOT NULL,
  PRIMARY KEY (Class_ID),
  FOREIGN KEY (Gym_Address) references Gym(address),
  FOREIGN KEY (Start_time, End_time, Instructor_name) 
    references Offers_Class_2(Start_time, End_time, Instructor_name)
);

CREATE TABLE Does_Exercise (
  Number_of_sets int,
  Exercise_Name varchar(127),
  Class_ID varchar(127),
  PRIMARY KEY (Exercise_Name),
  FOREIGN KEY (Class_ID) references Offers_Class_1(Class_ID)
);

CREATE TABLE Has_Equipment (
  Equipment_name varchar(127),
  Manufacturing_ID varchar(127),
  Ownership_status varchar(127),
  Gym_Address varchar(127) NOT NULL,
  PRIMARY KEY (Manufacturing_ID),
  FOREIGN KEY (Gym_Address) references Gym(Address)
);


CREATE TABLE Has_EmergencyContact(
  Email varchar(127),
  Phone_number bigint,
  Name varchar(127),
  Relationship varchar(127),
  PRIMARY KEY (Name, Email),
  FOREIGN KEY (Email) references User(Email)
);

CREATE TABLE Sells_Merchandise(
  Gym_Address varchar(127),
  Transaction_ID varchar(127),
  Manufacturing_ID varchar(127),
  Price int,
  PRIMARY KEY (Manufacturing_ID),
  FOREIGN KEY (Gym_Address) references Gym(Address)
);

CREATE TABLE Involves(
  Duration varchar(127),
  Exercise_Name varchar(127),
  Equipment_Manufacturing_ID varchar(127),
  PRIMARY KEY (Exercise_Name, Equipment_Manufacturing_ID),
  FOREIGN KEY (Exercise_Name) references Does_Exercise(Exercise_Name),
  FOREIGN KEY (Equipment_Manufacturing_ID) references Has_Equipment(Manufacturing_ID)
);

CREATE TABLE Targets(
  Exercise_Name varchar(127),
  BodyPart_name varchar(127),
  Intensity_rating int,
  PRIMARY KEY (Exercise_Name, BodyPart_name),
  FOREIGN KEY (Exercise_Name) references Does_Exercise(Exercise_Name),
  FOREIGN KEY (BodyPart_name) references BodyPart(Name)
);


CREATE TABLE Uses(
  Class_ID varchar(127),
  Manufacturing_ID varchar(127),
  Start_time TIME(0),
  End_time TIME(0),
  PRIMARY KEY (Manufacturing_ID, Class_ID),
  FOREIGN KEY (Manufacturing_ID) 
    references Has_Equipment(Manufacturing_ID),
  FOREIGN KEY (Class_ID) references Offers_Class_1(Class_ID)
);

CREATE TABLE Joins(
  Join_date DATE,
  User_Email varchar(127),
  Class_ID varchar(127),
  PRIMARY KEY (User_Email, Class_ID),
  FOREIGN KEY (User_Email) references User(Email),
  FOREIGN KEY (Class_ID) references Offers_Class_1(Class_ID)
);

CREATE TABLE Buys (
  Payment_method varchar(127),
  Merch_Manufacturing_ID varchar(127),
  User_Email varchar(127),
  PRIMARY KEY (Merch_Manufacturing_ID),
  FOREIGN KEY (Merch_Manufacturing_ID) REFERENCES Sells_Merchandise(Manufacturing_ID),
  FOREIGN KEY (User_Email) REFERENCES User(Email)
);

CREATE TABLE RegisteredTo(
  Join_date TIME(0),
  User_Email varchar(127),
  Gym_Address varchar(127),
  PRIMARY KEY (User_Email, Gym_Address),
  FOREIGN KEY (User_Email) references User(Email),
  FOREIGN KEY (Gym_Address) references Gym(Address)
);

INSERT INTO User (Name, Email, MembershipType) VALUES
  ('Raymond Ng', 'rng@gmail.com', 'Basic'),
  ('Jessica Wong', 'jwong@ubc.ca', 'Basic'),
  ('Jeff Clune', 'jeffclune@gmail.com', 'Pro'),
  (NULL, 'jjim@ubc.ca', 'Basic'),
  ('Norm Hutchinson', 'norm@ubc.ca', 'Pro');

INSERT INTO Gym VALUES
  ('Anytime Fitness', NULL, NULL, '1234 Anystreet Rd, Richmond, BC'),
  ('Golds', '3:30', '13:30', '3746 Maine St, Vancouver, BC'),
  ('24-Hour Fitness', '9:30', '23:00', '8686 Burns Rd, Burnaby, BC'),
  ('Trout Lake', '12:00', '23:00', '1234 Trout Place, Coquitlam, BC'),
  (NULL, '00:30', '9:30', '32567 Steveston Hwy, Richmond, BC');

INSERT INTO BodyPart VALUES
  ('Chest'),
  ('Arms'),
  ('Legs'),
  ('Back'),
  ('Shoulders');
  
INSERT INTO TShirt VALUES 
  ('1', 'XS'),
  ('2', 'S'),
  ('3', 'M'),
  ('4', 'L'),
  ('5', 'XL');

INSERT INTO ProteinPowder (Manufacturing_ID, Volume) VALUES
  ('1', 500),
  ('2', 300),
  ('3', 450),
  ('4', 450),
  ('5', 450);

  
INSERT INTO Offers_Class_2 VALUES
  ('5:15', '6:15', 'Andy Liang', 306),
  ('14:00', '15:00', 'Jerry Shao', 021),
  ('5:15', '6:15', 'Jerry Shao', 306),
  ('5:15', '6:30', 'Andy Liang', NULL),
  ('17:00', '17:01', 'Noreen Chan', 013);
 
INSERT INTO Offers_Class_1 VALUES
  ('1', 35, '1-on-1 Training', '5:15', '6:15', 'Andy Liang', '1234 Anystreet Rd, Richmond, BC'),
  ('2', 25, 'Cardio', '14:00', '15:00', 'Jerry Shao', '3746 Maine St, Vancouver, BC'),
  ('3', 85, 'Pilates', '5:15', '6:15', 'Jerry Shao', '8686 Burns Rd, Burnaby, BC'),
  ('4', 95, 'Yoga', '5:15', '6:30', 'Andy Liang', '1234 Anystreet Rd, Richmond, BC'),
  ('5', 0, 'Cycling', '17:00', '17:01', 'Noreen Chan', '32567 Steveston Hwy, Richmond, BC');

INSERT INTO Does_Exercise VALUES
  (5, 'Bench Press', '1'),
  (35, 'Push-ups', '2'),
  (35, 'Lunges', '3'),
  (10, 'Squats', '4'),
  (2, 'Cycling', '1');

INSERT INTO Has_Equipment VALUES
  ('Bench', '342', 'Rent', '1234 Anystreet Rd, Richmond, BC'),
  ('Bench', '343', 'Own', '1234 Anystreet Rd, Richmond, BC'),
  ('Bench', '000', NULL, '8686 Burns Rd, Burnaby, BC'),
  (NULL, '824', 'Own', '1234 Anystreet Rd, Richmond, BC'),
  ('Elliptical', '4327', 'Rent', '32567 Steveston Hwy, Richmond, BC');
  
INSERT INTO Has_EmergencyContact VALUES
  ('rng@gmail.com', 7784949396, 'Jessica Wong', 'Colleague'),
  ('rng@gmail.com', 7780183849, 'Mrs. Ng', 'Wife'),
  ('jeffclune@gmail.com', 6045729296, 'Andreas Lehrmann', 'Colleague'),
  ('norm@ubc.ca', 7784949396, 'Jessica Wong', 'Friend'),
  ('jjim@ubc.ca', 6045828272, 'Jessica Wong', NULL);
  
INSERT INTO Sells_Merchandise VALUES
  ('1234 Anystreet Rd, Richmond, BC', 'T83824', 'M1', 13),
  ('32567 Steveston Hwy, Richmond, BC', 'T83824', 'M2', 13),  
  ('1234 Trout Place, Coquitlam, BC', 'T3', 'M3', NULL),  
  ('3746 Maine St, Vancouver, BC', 'T5', 'M4', 13),  
  ('1234 Anystreet Rd, Richmond, BC', 'T6', 'M5', 13);
INSERT INTO Involves VALUES
  ('1 hour', 'Cycling', '4327'),
  ('10 mins', 'Bench Press', '343'),
  (NULL, 'Bench Press', '342'),
  ('15 mins', 'Squats', '824'),
  ('10 mins', 'Lunges', '824');
INSERT INTO Targets VALUES
  ('Push-ups', 'Arms', 2),
  ('Push-ups', 'Chest', 2),
  ('Squats', 'Legs', 2),
  ('Bench Press', 'Chest', 2),
  ('Cycling', 'Legs', 2);
INSERT INTO Uses VALUES
  ('1', '824', '14:00', '15:00'),
  ('1', '342', '14:30', '15:00'),
  ('3', '000', '11:00', '11:15'),
  ('4', '000', '11:15', '12:00'),
  ('5', '4327', '17:00', '17:01');
INSERT INTO Joins VALUES
  ('2023-03-01', 'norm@ubc.ca', '1'),
  ('2022-03-11', 'rng@gmail.com', '4'),
  ('2021-05-09', 'norm@ubc.ca', '3'),
  ('2023-04-01', 'jjim@ubc.ca', '3'),
  ('2023-03-01', 'jeffclune@gmail.com', '2');
INSERT INTO Buys VALUES 
  ('Cash', 'M1', 'rng@gmail.com'),
  ('Credit Card', 'M2', 'jwong@ubc.ca'),
  ('Cash', 'M3', 'jeffclune@gmail.com'),
  ('Debit Card', 'M4', 'jjim@ubc.ca'),
  ('Cash', 'M5', 'norm@ubc.ca');

INSERT INTO RegisteredTo VALUES
  ('13:00', 'norm@ubc.ca', '1234 Anystreet Rd, Richmond, BC'),
  ('16:00', 'norm@ubc.ca', '8686 Burns Rd, Burnaby, BC'),
  ('10:00', 'rng@gmail.com', '1234 Anystreet Rd, Richmond, BC'),
  ('13:00', 'jjim@ubc.ca', '32567 Steveston Hwy, Richmond, BC'),
  ('21:00', 'jwong@ubc.ca', '1234 Anystreet Rd, Richmond, BC');    


  