using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
namespace GymManagement.Infrastructure.Persistence;

public class UserRepository : IUserRepository
{
    private IConfiguration _config;

    public UserRepository(IConfiguration config) {
        _config = config;
    }
    public void Add(User user)
    {
        Console.WriteLine("Adding user " + user.Email);

        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();

            string sql = "INSERT INTO Users (Name, Email, MembershipType) VALUES (@Name, @Email, @MembershipType)";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.AddWithValue("@Name", user.Name);
            command.Parameters.AddWithValue("@Email", user.Email);
            command.Parameters.AddWithValue("@MembershipType", user.MembershipType);
            command.ExecuteNonQuery();
            connection.Close();
        }
    }
    public void Delete(User user)
    {
        Console.WriteLine("Deleting user " + user.Email);

        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();

            string sql = "DELETE FROM Users WHERE Email = @Email";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.AddWithValue("@Email", user.Email);
            command.ExecuteNonQuery();
            connection.Close();
        }
    }

    public User? GetUserByEmail(string email)
    {
        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
        using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();

            string sql = "SELECT * FROM Users WHERE Email = @Email";
            SqlCommand command = new SqlCommand(sql, connection);
            command.Parameters.AddWithValue("@Email", email);
            SqlDataReader reader = command.ExecuteReader();
            Console.WriteLine("Reading data from table");
            while (reader.Read()) {
                var user = new User{Name = reader["Name"].ToString() ?? "", Email = reader["Email"].ToString() ?? "", MembershipType = reader["MembershipType"].ToString() ?? ""};
                return user;
            }
            connection.Close();
        }

        return null;
    }


   
    public Object GetAll (Object? optionalFilter) {
        List<User> _users = new List<User>();
        var response = new{
            users = _users,
            countInfo =  new List<object>()
        };
        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
            using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();
            SqlCommand command;
            if(optionalFilter == null) {
                string sql = "SELECT * FROM Users";
                command = new SqlCommand(sql, connection); 
            } else {
                string sql = "SELECT * FROM Users WHERE MembershipType = @MembershipType";
                command = new SqlCommand(sql, connection);
                command.Parameters.AddWithValue("@MembershipType", ((string)optionalFilter).Trim() == "PRO" ? "Pro" : "Basic");
            }
            SqlDataReader reader = command.ExecuteReader();
            Console.WriteLine("Reading data from table");
            while (reader.Read()) {
                var user = new User{Name = reader["Name"].ToString() ?? "", Email = reader["Email"].ToString() ?? "", MembershipType = reader["MembershipType"].ToString() ?? ""};
                _users.Add(user);
            } 
            reader.Close();

            string sql2;
            string membershipType;
            SqlCommand getCountCommand;
            if(optionalFilter == null) {
                sql2 =  "SELECT MembershipType, COUNT(*) as NumberOfMembers "
                + "FROM Users "
                + "GROUP BY MembershipType "
                + "HAVING MembershipType LIKE '%'";
                getCountCommand = new SqlCommand(sql2, connection); 

            } else {
                sql2 = "SELECT MembershipType, COUNT(*) as NumberOfMembers "
                + "FROM Users "
                + "GROUP BY MembershipType "
                + "HAVING MembershipType = @MembershipType";
                membershipType = ((string)optionalFilter).Trim() == "PRO" ? "Pro" : "Basic";
                getCountCommand = new SqlCommand(sql2, connection); 
                getCountCommand.Parameters.AddWithValue("@MembershipType", membershipType);
            }

           
            SqlDataReader reader2 = getCountCommand.ExecuteReader();
            while (reader2.Read()) {
                var oneRow = new {
                    type= reader2["MembershipType"],
                    numMembers = reader2["NumberOfMembers"]
                };
                response.countInfo.Add(oneRow);
            } 
            connection.Close();
        }

        return response;
    }
}