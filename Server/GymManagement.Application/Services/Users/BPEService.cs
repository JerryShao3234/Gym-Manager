using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Users;

public class BPEService : IBPEService {
    private readonly IBPERepository _bpeRepository;

    public BPEService(IBPERepository bpeRepository) {
        _bpeRepository = bpeRepository;
    }

    public List<string> GetBodyPart(string exercise) {
        return _bpeRepository.GetBodyPart(exercise);
    }

    public List<string> GetExercise(string bodypart) {
        return _bpeRepository.GetExercise(bodypart);
    }
}