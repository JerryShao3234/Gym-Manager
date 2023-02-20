using GymManagement.Contracts.User;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers;

[ApiController]
[Route("user/")]

public class UserController : ControllerBase{
    [HttpPost("register")]

    public IActionResult Register(RegisterRequest request) {
        return Ok(request);
    }
}