using GymManagement.Application.Services.Users;
using GymManagement.Application.Services.Class;
using GymManagement.Application.Services.Targets;
using Microsoft.Extensions.DependencyInjection;

namespace GymManagement.Application;

public static class DependencyInjection {
    public static IServiceCollection AddApplication(this IServiceCollection services) {
        services.AddScoped<IUserService, UserService>();
        services.AddScoped<IClassService, ClassService>();
        services.AddScoped<ITargetsService, TargetsService>();
        return services;
    }
}