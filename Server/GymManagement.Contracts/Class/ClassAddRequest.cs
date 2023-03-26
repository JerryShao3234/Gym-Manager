namespace GymManagement.Contracts.Class;

public record ClassAddRequest(
    string Name,
    string Class_ID,
    string Price,
    string Start_time,
    string End_time,
    string Instructor_name,
    string Exercise_name
);