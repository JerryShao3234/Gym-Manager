using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

namespace GymManagement.Application.Services.Class;

public class ClassService : IClassService {
    private readonly IClassRepository _classRepository;

    public ClassService(IClassRepository classRepository) {
        _classRepository = classRepository;
    }

    public void Add(string name, string class_ID, string price, string start_time, string end_time, string instructor_name, string exercise_name) {
        var c = new Domain.Entities.Class
        (
            name,
            class_ID,
            price,
            start_time,
            end_time,
            instructor_name,
            exercise_name
        );
        _classRepository.Add(c);
    }

    public List<Domain.Entities.Class> Get(List<string> req, Object? optionalFilter) {
        return _classRepository.Get(req, optionalFilter);
    }
}