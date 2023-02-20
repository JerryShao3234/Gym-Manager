# project_b4e3b_c1i3b_s4v2b

# How to run the backend? 
dotnet run --project .\GymManagement.Api\

# How to create a new route -> controller -> service -> repo (?) 

1. Create a contract that defines what your request and reponses should look like (kind of like interfaces). Example files in: GymManagement.Contracts\User
2. Create a api controller that to handle that request. Example files in: GymManagement.Api\Controllers (sort of needs step 3 to be done (see steps 3 and 4))
3. Create a service. Example files in: GymManagement.Application\Services\User
4. Once you created the service, go and fix the controller so that it actually uses that service. Example files in: GymManagement.Api\Controllers
5. Add the route (?) to Program.cs in GymManagement.Api

