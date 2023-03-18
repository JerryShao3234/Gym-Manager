using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Users;

public interface IUserService{
    // currently, there is code duplication where RegisterResult is the same
    // exact thing we defined in GymManagement.Contracts/User
    // but the tutorial hasn't really taught me how to fix that yet :c
    List<User> Register(string name, string email, string membershipType);

    List<User> GetAll();
}