# project_b4e3b_c1i3b_s4v2b

## How to run the backend? 
If you are using VSCode, the following extensions are helpful: NuGet Package Manager, NuGet Reverse Package Lookup or smt By Jess Chadwick, Roslynator, REST Client.  

First, there are a few "projects".  
The backend flows like this. When we hit an end point, the controller responsible for that uses a service. The service then uses a repository. The repository accesses the DB   
`GymManagement.Api` This is the web api, the one with controllers   
`GymManagement.Application` This is where our services are. As well as interfaces for our repositories   
`GymManagement.Contracts` This is where we define the request and response type of our routes/controllers. I am considering removing this  
`GymManagement.Domain` I do not fully understand its role in the clean architecture coding practice, but from what I gathered, this is where we define types of things we use throughout the application   
`GymManagement.Infrastructure` This is where we create our repository and things that have access to the DB   
![image](https://media.github.students.cs.ubc.ca/user/7083/files/dcf3357b-17b3-4c73-8972-25afa409e33f)

To run the solution, we need to add the dependencies for each of the projects above. The `GymManagement.X.csproj` file defines the dependencies needed in the project. It's like a `package.json` file :). For instance, there are no dependencies in the `GymManagement.Api` project, but `GymManagement.Application` has a dependency for `Microsoft.Extensions.DependencyInjection.Abstractions`. Dependencies are usually defined by the `<PackageReference Include="Blah"/>` in a `csproj` file.  
Here, we can simply run `dotnet add GymManagement.Application package Microsoft.Extensions.DependencyInjection.Abstractions` (if I remember correctly). Repeat this for every project.  

Next, create a DB called Tutorial2 (yea I will change the name later lol) inside your SQL Server Management Studio. Make sure that you create the DB INSIDE the localhost server db thingie. So I assume its the Server name without anything after it. 
![image](https://media.github.students.cs.ubc.ca/user/7083/files/a0b81534-00dd-4660-8b51-6b8fbcbd91d4)


Finally, run the command  
`dotnet run --project .\GymManagement.Api\`

Once the BE is running and you have the REST Client Extension, you can click use the `Requests` folder that has a `RegisterTest.http` (poor naming I know), and try to send the third request there (The GET one). That request interacts with DB. The other 2 requests purely test the routes and controllers and does not interact with db.  

## How to create a new route -> controller -> service -> repo (?) 
0. Create an interface for Persistence (this defines what our repository (the things that access DBs) do)
   
   Example files in: GymManagement.Application/Persistence 
   
1. Create the actual repository inside the GymManagement.Infrastructure/Persistence folder. This is the thing that interacts with the DB.  
   
   Ex: GymManagement.Infrastructure/Persistence
   
2. Add that repository to the DependencyInjection.cs file inside the GymManagementInfrastructure folder. This way, our application has access to all of our repositories    I guess. 
   
3. Create a contract that defines what your request and reponses should look like (kind of like interfaces) (am debating whether or not to remove this). 
   
   Example files in: GymManagement.Contracts\User
   
4. Create a service. 

   Example files in: GymManagement.Application\Services\Users
   
5. Add the service to the GymManagement.Application/DependencyInjection.cs file. This way, our Program.cs (the main kinda like index.js file) inside our                    GymManagement.Api/Program.cs can access any service in our GymManagement.Application/Services

6. Create a api controller that to handle that request. Example files in: GymManagement.Api\Controllers



