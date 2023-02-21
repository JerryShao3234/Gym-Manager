using Microsoft.Extensions.Configuration;

namespace GymManagement.Infrastructure;


public class CommonHelper {
    private IConfiguration _config;

    public CommonHelper(IConfiguration config) {
        _config = config;
    }

    

}