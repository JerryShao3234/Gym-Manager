using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Users;

public class UserService : IUserService {
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userReposity) {
        _userRepository = userReposity;
    }
    public RegisterResult Register(string name, string email, string membershipType){
        // Make sure user does not exist 
        if(_userRepository.GetUserByEmail(email) is not null) {
            throw new Exception("User with given email already exists");
        }

        var user = new User{Name = name, Email = email, MembershipType = membershipType};
        _userRepository.Add(user);
        return new RegisterResult(name, email, membershipType);
    }
}