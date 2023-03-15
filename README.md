# Gym Manager (project_b4e3b_c1i3b_s4v2b)

## Summary
This application is a management tool for gym managers to keep track of gym logistics and users. Gym managers can query information like a list of users, equipment information such as exercises that use it, and the body parts that those exercises target.

## Code-related
### Project setup
The following commands are meant to be run from the project root. 

```bash
cd server; dotnet build
```
Additionally, connect to your Microsoft SQL Server Management Studio.

```bash
cd client; yarn install
```

### Running the Project
```bash
cd server; dotnet run --project .\GymManagement.Api\ 
```
```bash
cd client; yarn start
```

## Project-related

### Project Timeline & Task Breakdown

## Completed 
(Andy) Set up Backend infrastructure and have a working server 
(Jerry) Integrate first REST route with the database 
(Noreen) Set up Frontend 
Fetch from backend 
Create a table 
Populate table with backend data 

## Upcoming

### Routes - details in the next section 
(Noreen) CRUD for Merchandise, including Protein Powder and T-shirts 
(Jerry) CRUD for Equipment management (users and equipment in a gym)
(Andy) CRUD for Body part’s exercises and classes

### Tasks for each route
(Everyone) For each REST route used to perform CRUD operations on the database: 
Backend tasks (C#)
Create interfaces for repo
Create the controller
Create the service
Create the repository  
Backend tasks (SQL)
Create corresponding SQL code that interacts with the database for each route (can modify code from Milestone 2)
Frontend tasks
Fetch data from backend 

### Frontend Features
(Noreen, Mar 18) Implement tabs to let users switch between operations
(Noreen, Apr 1) Checkboxes to filter for Protein and/or T-shirt, dropdown for size, dropdown for volume 
(Jerry, March 25) Dropdown of body parts, user selects one body part, a table of exercises pop up that targets the body part 
Each exercise should have a list of equipment
Each exercise should have a class that teaches it, with information about the class (teacher, time, location, etc.)
(Andy, Apr 1) We have an equipment page, where manager can add/update/delete an equipment to their gym 

We are calling for 2 hours every Saturday and will be pairing with one another. As of us have full stack development experiences so this should not take long. 


### Previous Milestones
[Milestone 1 Deliverable PDF](assets/CPSC 304 Milestone 1 FINAL.pdf)

[Milestone 2 Deliverable PDF](assets/CPSC 304 Milestone 2 FINAL.pdf)
