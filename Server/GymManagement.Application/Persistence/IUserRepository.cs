using GymManagement.Domain.Entities;

namespace GymManagement.Application.Persistence;

public interface IUserRepository {
    User? GetUserByEmail(string email);

    void Add(User user);

    List<User> GetAll();
}