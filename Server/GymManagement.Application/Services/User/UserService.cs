namespace GymManagement.Application.Services.User;

public class UserService : IUserService {
    public RegisterResult Register(string name, string email, string membershipType){
        return new RegisterResult(name, email, membershipType);
    }
}