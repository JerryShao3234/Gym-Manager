using GymManagement.Infrastructure.Persistence;
using GymManagement.Application.Persistence;
using Microsoft.Extensions.DependencyInjection;

namespace GymManagement.Infrastructure;

public static class DependencyInjection {
    public static IServiceCollection AddInfrastructure(this IServiceCollection services) {
        services.AddScoped<IUserRepository, UserRepository>();
        return services;
    }
}