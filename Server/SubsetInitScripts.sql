
CREATE TABLE Does_Exercise (
  Number_of_sets int,
  Exercise_Name varchar(127),
  PRIMARY KEY (Exercise_Name),
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
  FOREIGN KEY (Exercise_Name) REFERENCES Does_Exercise(Exercise_Name)
);

INSERT INTO Does_Exercise VALUES (5, 'Bench Press');
INSERT INTO Does_Exercise VALUES (5, 'Squat');
INSERT INTO Does_Exercise VALUES (3, 'Deadlift');
INSERT INTO Does_Exercise VALUES (5, 'Curls');
INSERT INTO Does_Exercise VALUES (4, 'Shoulder Press');

INSERT INTO Class VALUES ('Class1', 10, 'Class1', '10:00:00', '11:00:00', 'Instructor1', 'Bench Press');
INSERT INTO Class VALUES ('Class2', 10, 'Class2', '11:00:00', '12:00:00', 'Instructor2', 'Squat');
INSERT INTO Class VALUES ('Class3', 10, 'Class3', '12:00:00', '13:00:00', 'Instructor3', 'Deadlift');
INSERT INTO Class VALUES ('Class4', 10, 'Class4', '13:00:00', '14:00:00', 'Instructor4', 'Curls');
INSERT INTO Class VALUES ('Class5', 10, 'Class5', '14:00:00', '15:00:00', 'Instructor5', 'Shoulder Press');