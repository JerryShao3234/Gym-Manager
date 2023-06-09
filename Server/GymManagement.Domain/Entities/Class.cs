namespace GymManagement.Domain.Entities;

public class Class {
    //make a constructor that takes in all the parameters
    public string Name {get; set;} = null!;
    public string Price {get; set;} = null!;
    public string Start_time {get; set;} = null!;
    public string End_time {get; set;} = null!;
    public string Instructor_name {get; set;} = null!;

    public string Class_ID {get; set;} = null!;
    public string? Num_of_reps {get; set;} = null; // need foreign key for does_exercise

    // need foreign key for does_exercise
    public string Exercise_Name {get; set;} = null!;
    public Class(string name, string class_ID, string price, string start_time, string end_time, string instructor_name, string exercise_name, string? num_of_reps = null) {
        Name = name;
        Price = price;
        Start_time = start_time;
        End_time = end_time;
        Instructor_name = instructor_name;
        Class_ID = class_ID;
        Exercise_Name = exercise_name;
        Num_of_reps = num_of_reps;
    }
}