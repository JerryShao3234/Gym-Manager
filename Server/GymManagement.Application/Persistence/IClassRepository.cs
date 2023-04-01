using GymManagement.Domain.Entities;

namespace GymManagement.Application.Persistence;

public interface IClassRepository {
    void Add(Class c);
    List<Class> Get(List<string> req);
}
