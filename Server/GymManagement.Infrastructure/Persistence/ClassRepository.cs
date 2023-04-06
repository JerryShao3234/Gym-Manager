using System.Data;
using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace GymManagement.Infrastructure.Persistence;

public class ClassRepository : IClassRepository
{
    private IConfiguration _config;

    public ClassRepository(IConfiguration config)
    {
        _config = config;
    }

    public void Add(Class c)
    {
        Console.WriteLine("Adding class " + c.Name);

        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();

            string sql =
                "INSERT INTO Class (Name, Class_ID, Price, Start_time, End_time, Instructor_name, Exercise_Name) VALUES (@Name, @Class_ID, @Price, @Start_time, @End_time, @Instructor_name, @Exercise_Name)";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.Add("@Name", System.Data.SqlDbType.VarChar).Value = c.Name;
            command.Parameters.Add("@Class_ID", System.Data.SqlDbType.VarChar).Value = c.Class_ID;
            command.Parameters.Add("@Price", System.Data.SqlDbType.Int).Value = c.Price;
            command.Parameters.Add("@Start_time", System.Data.SqlDbType.Time).Value = TimeSpan.Parse(c.Start_time);
            command.Parameters.Add("@End_time", System.Data.SqlDbType.Time).Value = TimeSpan.Parse(c.Start_time);
            command.Parameters.Add("@Instructor_name", System.Data.SqlDbType.VarChar).Value = c.Instructor_name;
            command.Parameters.Add("@Exercise_Name", System.Data.SqlDbType.VarChar).Value = c.Exercise_Name;
            command.ExecuteNonQuery();
            connection.Close();
        }
    }

    public List<Class> Get(List<string> req, Object? optionalFilter)
    {
        //select from class table all the attributes in req
        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            //select from class table all the attributes in req
            string sql;
            SqlCommand command;
            if (optionalFilter != null)
            {
                sql = "SELECT C.Name, C.Class_ID, C.Instructor_name, C.Price, "
                      + " C.Start_time, C.End_time, DE.Exercise_Name, DE.Number_of_sets "
                      + " FROM Class C, Does_Exercise DE "
                      + " WHERE C.Exercise_Name = DE.Exercise_Name AND DE.Exercise_Name = @OptionalFilter";
                command = new SqlCommand(sql, connection);
                command.Parameters.AddWithValue("@OptionalFilter", ((string)optionalFilter).Trim());
            }
            else
            {
                sql = "SELECT ";
                foreach (string s in req)
                {
                    sql += s + ", ";
                }

                sql = sql.Substring(0, sql.Length - 2);
                sql += " FROM Class";
                command = new SqlCommand(sql, connection);
            }

            SqlDataReader reader = command.ExecuteReader();
            List<Class> classes = new List<Class>();
            while (reader.Read())
            {
                //check if each attribute is in req before assigning them
                string name = "null";
                string class_ID = "null";
                string price = "null";
                string start_time = "null";
                string end_time = "null";
                string instructor_name = "null";
                string exercise_name = "null";
                string number_of_sets = "null";

                //check if reader contains the attribute
                if (req.Contains("name"))
                    name = reader["Name"].ToString();
                if (req.Contains("class_ID"))
                    class_ID = reader["Class_ID"].ToString();
                if (req.Contains("price"))
                    price = reader["Price"].ToString();
                if (req.Contains("start_time"))
                    start_time = reader["Start_time"].ToString();
                if (req.Contains("end_time"))
                    end_time = reader["End_time"].ToString();
                if (req.Contains("instructor_name"))
                    instructor_name = reader["Instructor_name"].ToString();
                if (req.Contains("exercise_name"))
                    exercise_name = reader["Exercise_Name"].ToString();
                if (req.Contains("number_of_sets"))
                    number_of_sets = reader["Number_of_sets"].ToString();
                classes.Add(new Class(name, class_ID, price, start_time, end_time, instructor_name, exercise_name, number_of_sets));
            }

            connection.Close();
            return classes;
        }
    }

    public int GetMinPrice(string popularity)
    {
        Console.WriteLine("Looking for min price with popularity " + popularity);

        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString))
        {
            connection.Open();
            
            // ========================================================================
            // string sqltest =
            //     "SELECT C.Instructor_name, COUNT(*) " +
            //     "FROM Class C " +
            //     "GROUP BY C.Instructor_name " +
            //     "HAVING COUNT(*) >= @instructorPopularity";
            // SqlCommand commandtest = new SqlCommand(sqltest, connection);
            // commandtest.Parameters.Add("@instructorPopularity", System.Data.SqlDbType.Int).Value = popularity;
            // SqlDataReader reader = commandtest.ExecuteReader();
            // List<string> instructors = new List<string>();
            // while (reader.Read())
            // {
            //     string instructor_name = reader.GetString(0);
            //     int numClasses = reader.GetInt32(1);Console.WriteLine("Found {0} with {1} classes", instructor_name, numClasses);
            //     instructors.Add(instructor_name ?? "unknown name");
            // }
            // ========================================================================

            string sql =
                "SELECT MIN(C.Price) " +
                "FROM Class C " +
                "WHERE C.Instructor_name IN (" +
                    "SELECT CInner.Instructor_name " +
                    "FROM Class CInner " +
                    "GROUP BY CInner.Instructor_name " +
                    "HAVING COUNT(*) >= @instructorPopularity)";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.Add("@instructorPopularity", System.Data.SqlDbType.Int).Value = popularity;
            int minPrice = (int)command.ExecuteScalar();
            connection.Close();
            return minPrice;
        }
    }
}