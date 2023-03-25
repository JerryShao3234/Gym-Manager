using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Users;

public interface IBPEService{
    // currently, there is code duplication where RegisterResult is the same
    // exact thing we defined in GymManagement.Contracts/User
    // but the tutorial hasn't really taught me how to fix that yet :c
    List<String> GetBodyPart(string exercise);
    List<String> GetExercise(string bodypart);
}