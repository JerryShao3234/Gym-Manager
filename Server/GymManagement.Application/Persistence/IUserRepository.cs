using GymManagement.Domain.Entities;

namespace GymManagement.Application.Persistence;

public interface IUserRepository {
    User? GetUserByEmail(string email);

    void Add(User user);

    void Delete(User user);

    int Update(UpdateRequest user); // returns # of tuples updated 

    Object GetAll(Object? optionalFilter);
}