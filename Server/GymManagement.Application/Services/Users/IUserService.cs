using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Users;

public interface IUserService {
    Object Register(string name, string email, string membershipType);
    
    Object Delete(string email);

    Object GetAll(Object? optionalFilter);
}