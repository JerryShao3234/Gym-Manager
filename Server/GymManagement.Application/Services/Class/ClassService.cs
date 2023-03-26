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
        {
            Name = name,
            Class_ID = class_ID,
            Price = price,
            Start_time = start_time,
            End_time = end_time,
            Instructor_name = instructor_name,
            Exercise_Name = exercise_name
        };
        _classRepository.Add(c);
    }
}