using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Users;

public class UserService : IUserService {
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository) {
        _userRepository = userRepository;
    }
    public Object Register(string name, string email, string membershipType){
        // Make sure user does not exist 
        if(_userRepository.GetUserByEmail(email) is not null) {
            throw new Exception("User with given email already exists");
        }

        var user = new User{Name = name, Email = email, MembershipType = membershipType};
        _userRepository.Add(user);
        return _userRepository.GetAll(null);
    }

    public Object Update(UpdateRequest updateObj)
    {
        if (updateObj.SetEmail is null && updateObj.SetMembershipType is null && updateObj.SetName is null)
        {
            throw new Exception("Unable to update. At least 1 set clause must be non-empty.");
        }

        return _userRepository.Update(updateObj);
    }
    
    public Object Delete(string email)
    {
        var user = _userRepository.GetUserByEmail(email);
        
        if (user is null) {
            throw new Exception("Unable to delete. User with email " + email + " is not a registered user.");
        }

        _userRepository.Delete(user);
        return _userRepository.GetAll(null);
    }

    public Object GetAll(Object? optionalFilter) {
        return _userRepository.GetAll(optionalFilter);
    }
}