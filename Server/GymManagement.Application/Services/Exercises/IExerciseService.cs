using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Exercises;

public interface IExerciseService {
    List<Exercise> Get();
    String Delete(String nameOfExerciseToDelete);

    List<Exercise> GetExercisesThatTargetAll();
}