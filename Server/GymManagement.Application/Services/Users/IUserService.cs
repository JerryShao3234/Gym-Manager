using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Users;

public interface IUserService {
    List<User> Register(string name, string email, string membershipType);
    
    List<User> Delete(string email);

    List<User> GetAll();
}