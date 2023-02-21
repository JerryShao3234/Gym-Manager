using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

namespace GymManagement.Infrastructure.Persistence;

public class UserRepository : IUserRepository
{
    private static readonly List<User> _users = new();

    public void Add(User user)
    {
        _users.Add(user);
    }

    public User? GetUserByEmail(string email)
    {
        return _users.SingleOrDefault(u => u.Email == email);
    }

    public List<User> GetAll () {
        var user1 =  new User{Name = "Bobby", Email = "Hey", MembershipType = "Yes"};
        _users.Add(user1);
        return _users;
    }
}