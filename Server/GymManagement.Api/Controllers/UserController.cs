using GymManagement.Application.Services.Users;
using GymManagement.Contracts.User;
using GymManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers;

[ApiController]
[Route("user/")]

public class UserController : ControllerBase{
    private readonly IUserService _userService;
    public UserController(IUserService userService) {
        _userService = userService;
    }

    [HttpPost("register")]

    public IActionResult Register(RegisterRequest request) {
        var registerResult = _userService.Register(request.Name, request.Email, request.MembershipType);
        var response = new RegisterResult(registerResult.Name, registerResult.Email, registerResult.MembershipType);
        return Ok(response);
    }

    public OkObjectResult GetAll() {
        var response = _userService.GetAll();
        return Ok(response);
    }
}