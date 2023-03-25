using GymManagement.Domain.Entities;

namespace GymManagement.Application.Persistence;

public interface IBPERepository {
    List<string> GetBodyPart(string exercise);

    List<string> GetExercise(string bodypart);
}