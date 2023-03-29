using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Targets;

public interface ITargetsService {
    List<string> Get(int intensityRating);
}