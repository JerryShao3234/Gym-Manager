CREATE TABLE Users (
	Name varchar(127),
	Email varchar(127),
	MembershipType varchar(31) NOT NULL,
	PRIMARY KEY (Email)
);

CREATE TABLE Does_Exercise (
    Number_of_sets int,
    Exercise_Name varchar(127),
    PRIMARY KEY (Exercise_Name),
);

CREATE TABLE BodyPart (
	bp_Name varchar(127),
	PRIMARY KEY (bp_Name)
);

CREATE TABLE Targets(
    Exercise_Name varchar(127),
    BodyPart_name varchar(127),
    Intensity_rating int,
    PRIMARY KEY (Exercise_Name, BodyPart_name),
    FOREIGN KEY (Exercise_Name) references Tutorial2.dbo.Does_Exercise(Exercise_Name) ON DELETE CASCADE,
    FOREIGN KEY (BodyPart_name) references Tutorial2.dbo.BodyPart(bp_Name)
);

CREATE TABLE Class (
    Class_ID varchar(127),
    Price int,
    Name varchar(127),
    Start_time TIME(0) NOT NULL,
    End_time TIME(0) NOT NULL,
    Instructor_name varchar(127) NOT NULL,
    Exercise_Name varchar(127) NOT NULL,
    PRIMARY KEY (Class_ID),
    FOREIGN KEY (Exercise_Name) REFERENCES Does_Exercise(Exercise_Name) ON DELETE CASCADE
);

INSERT INTO Does_Exercise VALUES (5, 'Bench Press');
INSERT INTO Does_Exercise VALUES (5, 'Squat');
INSERT INTO Does_Exercise VALUES (3, 'Deadlift');
INSERT INTO Does_Exercise VALUES (5, 'Curls');
INSERT INTO Does_Exercise VALUES (4, 'Shoulder Press');

INSERT INTO Class VALUES ('Class1', 40, 'C1', '10:00:00', '11:00:00', 'Anon Atom', 'Bench Press');
INSERT INTO Class VALUES ('Class2', 15, 'C2', '11:00:00', '12:00:00', 'Anon Beaker', 'Squat');
INSERT INTO Class VALUES ('Class3', 10, 'C3', '12:00:00', '13:00:00', 'Anon Beaker', 'Deadlift');
INSERT INTO Class VALUES ('Class4', 30, 'C4', '13:00:00', '14:00:00', 'Anon Atom', 'Curls');
INSERT INTO Class VALUES ('Class5', 1, 'C5', '14:00:00', '15:00:00', 'Anon Comp', 'Shoulder Press');
INSERT INTO Class VALUES ('Class6', 15, 'C6', '12:00:00', '13:00:00', 'Anon Book', 'Deadlift');
INSERT INTO Class VALUES ('Class7', 50, 'C7', '13:00:00', '14:00:00', 'Anon Book', 'Curls');
INSERT INTO Class VALUES ('Class8', 20, 'C8', '14:00:00', '15:00:00', 'Anon Atom', 'Shoulder Press');


INSERT INTO BodyPart VALUES
	('Chest'),
	('Arms'),
	('Legs'),
	('Back'),
	('Shoulders');

INSERT INTO Targets VALUES
	('Curls', 'Arms', 2),
	('Shoulder Press', 'Shoulders', 2),
	('Bench Press', 'Chest', 9),
	('Bench Press', 'Arms', 7),
	('Bench Press', 'Legs', 2),
	('Bench Press', 'Back', 2),
	('Bench Press', 'Shoulders', 7),
	('Squat', 'Arms', 2),
	('Squat', 'Legs', 10),
	('Squat', 'Back', 5),
	('Squat', 'Shoulders', 2);

INSERT INTO Users (Name, Email, MembershipType) VALUES
	('Raymond Ng', 'rng@gmail.com', 'BASIC'),
	('Jessica Wong', 'jwong@ubc.ca', 'BASIC'),
	('Jeff Clune', 'jeffclune@gmail.com', 'PRO'),
	('JJim', 'jjim@ubc.ca', 'BASIC'),
	('Norm Hutchinson', 'norm@ubc.ca', 'PRO');
