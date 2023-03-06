using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
namespace GymManagement.Infrastructure.Persistence;

public class UserRepository : IUserRepository
{
    private static readonly List<User> _users = new();
    private IConfiguration _config;

    public UserRepository(IConfiguration config) {
        _config = config;
    }
    public void Add(User user)
    {
        _users.Add(user);
    }

    public User? GetUserByEmail(string email)
    {
        return _users.SingleOrDefault(u => u.Email == email);
    }

    public List<User> GetAll () {
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

        var user1 =  new User{Name = "Bobby", Email = "Hey", MembershipType = "Yes"};
        _users.Add(user1);
        return _users;
    }
}