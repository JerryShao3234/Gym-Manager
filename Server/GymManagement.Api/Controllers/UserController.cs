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
        try
        {
            var result = _userService.Register(request.Name, request.Email, request.MembershipType);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [HttpDelete("delete/{email}")]
    public IActionResult Delete(string email) {
        try
        {
            var result = _userService.Delete(email);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{optionalFilter?}")]
    public OkObjectResult GetAll(String? optionalFilter) {
        List<User> response; 
        response = _userService.GetAll(optionalFilter);
        return Ok(response); 
    }
}