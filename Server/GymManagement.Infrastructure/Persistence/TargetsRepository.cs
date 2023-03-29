using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
namespace GymManagement.Infrastructure.Persistence;

public class TargetsRepository : ITargetsRepository
{
    private IConfiguration _config;

    public TargetsRepository(IConfiguration config) {
        _config = config;
    }
    public List<string> Get(int intensityRating)
    {
        Console.WriteLine("Getting target for intensity rating " + intensityRating);
        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();
            //select exercises that over all bodyparts have an average intensity rating of at least the given intensity rating
            string sql = "SELECT Exercise_Name FROM Targets GROUP BY Exercise_Name HAVING AVG(Intensity_rating) >= @Intensity_rating";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.Add("@Intensity_rating", System.Data.SqlDbType.Int).Value = intensityRating;
            SqlDataReader reader = command.ExecuteReader();
            List<string> exercises = new List<string>();
            while (reader.Read()) {
                exercises.Add(reader["Exercise_Name"].ToString());
            }
            connection.Close();
            return exercises;
        }
        return null;
    }
}