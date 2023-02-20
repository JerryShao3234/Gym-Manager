namespace GymManagement.Application.Services.User;

public interface IUserService{
    // currently, there is code duplication where RegisterResult is the same
    // exact thing we defined in GymManagement.Contracts/User
    // but the tutorial hasn't really taught me how to fix that yet :c
    RegisterResult Register(string name, string email, string membershipType);
}