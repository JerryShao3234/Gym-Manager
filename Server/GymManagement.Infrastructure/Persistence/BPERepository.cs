using GymManagement.Application.Persistence;
using GymManagement.Domain.Entities;

using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
namespace GymManagement.Infrastructure.Persistence;

public class BPERepository : IBPERepository
{
    private static readonly List<string> _bodyparts = new();
    private static readonly List<string> _exercises = new();
    private IConfiguration _config;

    public BPERepository(IConfiguration config) {
        _config = config;
    }
    public List<string> GetBodyPart(string exercise)
    {
        Console.WriteLine("Hello World2");
        
        return _bodyparts;
    }

    public List<string> GetExercise(string bodypart)
    {
        Console.WriteLine("Hello World3");
        return _exercises;
    }
}
