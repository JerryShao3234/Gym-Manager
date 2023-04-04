using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Class;

public interface IClassService {
    void Add(string name, string class_ID, string price, string start_time, string end_time, string instructor_name, string exercise_name);

    List<GymManagement.Domain.Entities.Class> Get(List<string> req, Object? optionalFilter);
}