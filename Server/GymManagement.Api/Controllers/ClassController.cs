using GymManagement.Application.Services.Class;
using GymManagement.Contracts.Class;
using GymManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers;

[ApiController]
[Route("class/")]

public class ClassController : ControllerBase{
    private readonly IClassService _classService;

    public ClassController(IClassService classService) {
        _classService = classService;
    }

    [HttpPost("add")]
    public IActionResult Add(ClassAddRequest request) {
        Console.WriteLine("Class add called!");
        try
        {
            //test data: _classService.Add("test", "1", "1", "2019-01-01 01:01:00", "2019-01-01 02:01:00", "test", "Squat");
            _classService.Add(request.Name, request.Class_ID, request.Price, request.Start_time, request.End_time, request.Instructor_name, request.Exercise_name);
            return Ok();
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
