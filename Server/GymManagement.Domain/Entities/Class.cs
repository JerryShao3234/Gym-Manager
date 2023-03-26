namespace GymManagement.Domain.Entities;

public class Class {
    public string Name {get; set;} = null!;
    public string Price {get; set;} = null!;
    public string Start_time {get; set;} = null!;
    public string End_time {get; set;} = null!;
    public string Instructor_name {get; set;} = null!;

    public string Class_ID {get; set;} = null!;

    // need foreign key for does_exercise
    public string Exercise_Name {get; set;} = null!;
}