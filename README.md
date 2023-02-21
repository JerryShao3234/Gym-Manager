# project_b4e3b_c1i3b_s4v2b

## How to run the backend? 
dotnet run --project .\GymManagement.Api\

## How to create a new route -> controller -> service -> repo (?) 
0. Create an interface for Persistence (this defines what our repository (the things that access DBs) do)
   
   Example files in: GymManagement.Application/Persistence 
   
1. Create the actual repository inside the GymManagement.Infrastructure/Persistence folder. This is the thing that interacts with the DB.  
   
   Ex: GymManagement.Infrastructure/Persistence
   
2. Add that repository to the DependencyInjection.cs file inside the GymManagementInfrastructure folder. This way, our application has access to all of our repositories    I guess. 
   
3. Create a contract that defines what your request and reponses should look like (kind of like interfaces). 
   
   Example files in: GymManagement.Contracts\User
   
4. Create a service. 

   Example files in: GymManagement.Application\Services\Users
   
5. Add the service to the GymManagement.Application/DependencyInjection.cs file. This way, our Program.cs (the main kinda like index.js file) inside our                    GymManagement.Api/Program.cs can access any service in our GymManagement.Application/Services

6. Create a api controller that to handle that request. Example files in: GymManagement.Api\Controllers



