using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Targets;

public class TargetsService : ITargetsService {
    private readonly ITargetsRepository _targetsRepository;

    public TargetsService(ITargetsRepository targetsRepository) {
        _targetsRepository = targetsRepository;
    }

    public List<string> Get(int intensityRating)
    {
        return _targetsRepository.Get(intensityRating);
    }
}