using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Exercises;

public class ExerciseService : IExerciseService {
    private readonly IExerciseRepository _exerciseRepository;

    public ExerciseService(IExerciseRepository exerciseRepository) {
        _exerciseRepository = exerciseRepository;
    }

    public List<Exercise> Get()
    {
        return _exerciseRepository.Get();
    }

    public String Delete(String nameOfExerciseToDelete)
    {
        return _exerciseRepository.Delete(nameOfExerciseToDelete);
    }
}