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

        string connectionString = "Data Source=localhost;Initial Catalog=CPSC304_GymManagement;Integrated Security=True";
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

    public List<Class> Get(List<string> req)
    {
        //select from class table all the attributes in req
        Console.WriteLine("Getting class for " + req);
        string connectionString = "Data Source=localhost;Initial Catalog=CPSC304_GymManagement;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();
            //select from class table all the attributes in req
            string sql = "SELECT ";
            foreach (string s in req) {
                sql += s + ", ";
            }
            sql = sql.Substring(0, sql.Length - 2);
            sql += " FROM Class";
            Console.WriteLine(sql);
            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader reader = command.ExecuteReader();
            List<Class> classes = new List<Class>();
            while(reader.Read()) {
                //check if each attribute is in req before assigning them
                string name = "null";
                string class_ID = "null";
                string price = "null";
                string start_time = "null";
                string end_time = "null";
                string instructor_name = "null";
                string exercise_name = "null";

                //check if reader contains the attribute
                if(req.Contains("name"))
                    name = reader["Name"].ToString();
                if(req.Contains("class_ID"))
                    class_ID = reader["Class_ID"].ToString();
                if(req.Contains("price"))
                    price = reader["Price"].ToString();
                if(req.Contains("start_time"))
                    start_time = reader["Start_time"].ToString();
                if(req.Contains("end_time"))
                    end_time = reader["End_time"].ToString();
                if(req.Contains("instructor_name"))
                    instructor_name = reader["Instructor_name"].ToString();
                if(req.Contains("exercise_name"))
                    exercise_name = reader["Exercise_Name"].ToString();
                classes.Add(new Class(name, price, start_time, end_time, instructor_name, class_ID, exercise_name));
            }
            connection.Close();
            return classes;
        }
    }
}