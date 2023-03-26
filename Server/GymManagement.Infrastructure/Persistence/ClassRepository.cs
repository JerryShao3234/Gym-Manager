using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
namespace GymManagement.Infrastructure.Persistence;

public class ClassRepository : IClassRepository
{
    private IConfiguration _config;

    public ClassRepository(IConfiguration config) {
        _config = config;
    }
    public void Add(Class c)
    {
        Console.WriteLine("Adding class " + c.Name);

        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();

            string sql = "INSERT INTO Class (Name, Class_ID, Price, Start_time, End_time, Instructor_name, Exercise_Name) VALUES (@Name, @Class_ID, @Price, @Start_time, @End_time, @Instructor_name, @Exercise_Name)";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.Add("@Name", System.Data.SqlDbType.VarChar).Value = c.Name;
            command.Parameters.Add("@Class_ID", System.Data.SqlDbType.VarChar).Value = c.Class_ID;
            command.Parameters.Add("@Price", System.Data.SqlDbType.Int).Value = c.Price;
            command.Parameters.Add("@Start_time", System.Data.SqlDbType.DateTime).Value = DateTime.ParseExact(c.Start_time, "yyyy-MM-dd HH:mm:ss", null);
            command.Parameters.Add("@End_time", System.Data.SqlDbType.DateTime).Value = DateTime.ParseExact(c.End_time, "yyyy-MM-dd HH:mm:ss", null);
            command.Parameters.Add("@Instructor_name", System.Data.SqlDbType.VarChar).Value = c.Instructor_name;
            command.Parameters.Add("@Exercise_Name", System.Data.SqlDbType.VarChar).Value = c.Exercise_Name;
            command.ExecuteNonQuery();
            connection.Close();
        }
    }
}