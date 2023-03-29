using GymManagement.Domain.Entities;

namespace GymManagement.Application.Persistence;

public interface ITargetsRepository {
    List<string> Get(int intensityRating);
}
