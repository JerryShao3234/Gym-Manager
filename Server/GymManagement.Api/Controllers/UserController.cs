using GymManagement.Application.Services.Users;
using GymManagement.Contracts.User;
using GymManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers;

[ApiController]
[Route("user/")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterRequest request)
    {
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

    [HttpPut("update")]
    public IActionResult Update(UpdateRequestRecord request)
    {
        try
        {
            Console.WriteLine("SE: " + request.setEmail + " WE: " + request.whereEmail + " SN: " + request.setName +
                              " WN: " + request.whereName + " SMT: " + request.setMembershipType + " WMT: " +
                              request.whereMembershipType);
            var result = _userService.Update(new UpdateRequest(request.setName, request.setEmail, request.setMembershipType, request.whereName, request.whereEmail, request.whereMembershipType));
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{email}")]
    public IActionResult Delete(string email)
    {
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
    public OkObjectResult GetAll(String? optionalFilter)
    {
        Object response;
        response = _userService.GetAll(optionalFilter);
        return Ok(response);
    }
}