using GymManagement.Application.Services.User;

var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddControllers();
}

var app = builder.Build();
{
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}
