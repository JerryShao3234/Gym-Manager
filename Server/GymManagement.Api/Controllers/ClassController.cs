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

    [HttpGet("get")]
    public IActionResult Get(string price, string start_time, string end_time, string instructor_name, string exercise_name, string name, string class_ID) {
        Console.WriteLine("Class get called!");
        //sample request url: http://localhost:5000/class/get?price=1&start_time=2019-01-01%2001:01:00&end_time=2019-01-01%2002:01:00&instructor_name=test&exercise_name=Squat&name=test&class_ID=1
        //get the parameters from the request
        try
        {
            var req = new List<string>();
            if(!price.Equals("null"))
                req.Add("price");
            if(!start_time.Equals("null"))
                req.Add("start_time");
            if(!end_time.Equals("null"))
                req.Add("end_time");
            if(!instructor_name.Equals("null"))
                req.Add("instructor_name");
            if(!exercise_name.Equals("null"))
                req.Add("exercise_name");
            if(!name.Equals("null"))
                req.Add("name");
            if(!class_ID.Equals("null"))
                req.Add("class_ID");
            var classes = _classService.Get(req);
            return Ok(classes);
        }
        catch (Exception e)
        {
            Console.WriteLine("something went wrong");
            return BadRequest(e.Message);
        }
    }
}
