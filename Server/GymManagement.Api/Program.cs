using GymManagement.Application;
using GymManagement.Infrastructure;

const string frontendUrl = "http://localhost:3000";
const string policyName = "_myPermit3000";

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddApplication();
    builder.Services.AddInfrastructure();
    builder.Services.AddControllers();
    builder.Services.AddCors(options =>
    {
        options.AddPolicy(name: policyName,
            innerBuilder =>
            {
                innerBuilder
                    .WithOrigins(frontendUrl).AllowAnyMethod().AllowAnyHeader();
            });
    });
    builder.Services.AddMvc();
}

var app = builder.Build();
{
    app.UseHttpsRedirection();
    app.UseCors( policyName );
    app.MapControllers();
    app.Run();
}
