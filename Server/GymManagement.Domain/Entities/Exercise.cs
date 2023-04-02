namespace GymManagement.Domain.Entities;

public class Exercise {
    //make a constructor that takes in all the parameters
    public string ExerciseName {get; set;} = null!;
    public int NumberOfSets {get; set;}
    public Exercise(string exerciseName, int numberOfSets) {
        ExerciseName = exerciseName;
        NumberOfSets = numberOfSets;
    }
}