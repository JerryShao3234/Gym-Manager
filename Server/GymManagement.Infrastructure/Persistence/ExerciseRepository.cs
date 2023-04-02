using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
namespace GymManagement.Infrastructure.Persistence;

public class ExerciseRepository : IExerciseRepository
{
    private IConfiguration _config;

    public ExerciseRepository(IConfiguration config) {
        _config = config;
    }
    public List<Exercise> Get()
    {
        Console.WriteLine("Getting exercises...");
        List<Exercise> exerciseList = new();
        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();
            string sql = "SELECT * FROM Does_Exercise";
            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader reader = command.ExecuteReader();
            while (reader.Read()) {
                String exerciseName = reader["Exercise_Name"].ToString();
                int numberOfSets = Convert.ToInt32(reader["Number_of_sets"].ToString());
                Exercise exercise = new(exerciseName!, numberOfSets);
                exerciseList.Add(exercise);
            }
            connection.Close();
            return exerciseList;
        }
    }

    public String Delete(String nameOfExerciseToDelete) {
        Console.WriteLine("Deleting exercise: " + nameOfExerciseToDelete);
        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();
            string sql = "DELETE FROM Does_Exercise WHERE Exercise_Name = @Exercise_Name";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.Add("@Exercise_Name", System.Data.SqlDbType.NVarChar).Value = nameOfExerciseToDelete;
            int rowsAffected = command.ExecuteNonQuery();
            Console.WriteLine(rowsAffected + " rows affected.");
            connection.Close();

        }
        return nameOfExerciseToDelete;
    }

    
}