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

    public List<User> GetAll (Object? optionalFilter) {
        List<User> _users = new List<User>();
        string connectionString = "Data Source=localhost;Initial Catalog=Tutorial2;Integrated Security=True";
            using (SqlConnection connection = new SqlConnection(connectionString)) {
            connection.Open();

            string sql = "SELECT * FROM Users";
            SqlCommand command = new SqlCommand(sql, connection);
            SqlDataReader reader = command.ExecuteReader();
            Console.WriteLine("Reading data from table");
            while (reader.Read()) {
                var user = new User{Name = reader["Name"].ToString() ?? "", Email = reader["Email"].ToString() ?? "", MembershipType = reader["MembershipType"].ToString() ?? ""};
                _users.Add(user);
            }
            connection.Close();
        }

        return _users;
    }
}