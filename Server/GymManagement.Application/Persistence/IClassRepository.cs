using GymManagement.Domain.Entities;

namespace GymManagement.Application.Persistence;

public interface IClassRepository {
    void Add(Class c);
}
