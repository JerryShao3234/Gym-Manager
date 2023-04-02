using GymManagement.Domain.Entities;

namespace GymManagement.Application.Persistence;

public interface IExerciseRepository {
    String Delete(String nameOfExerciseToDelete);
    List<Exercise> Get();
}
