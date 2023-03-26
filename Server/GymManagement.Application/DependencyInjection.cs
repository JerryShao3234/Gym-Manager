using GymManagement.Application.Services.Users;
using GymManagement.Application.Services.Class;
using Microsoft.Extensions.DependencyInjection;

namespace GymManagement.Application;

public static class DependencyInjection {
    public static IServiceCollection AddApplication(this IServiceCollection services) {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IClassService, ClassService>();
        return services;
    }
}