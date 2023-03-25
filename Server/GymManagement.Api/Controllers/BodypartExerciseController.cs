using GymManagement.Application.Services.Users;
using GymManagement.Contracts.User;
using GymManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers;

[ApiController]
[Route("bpe/")]

public class BodypartExerciseController : ControllerBase{
    private readonly IBPEService _bpeService;
    public BodypartExerciseController(IBPEService bpeService) {
        _bpeService = bpeService;
    }

    //user url parameters
    [HttpGet("bodypartexercise/{exercise}")]
    //get bodyparts given the exercise
    public IActionResult GetBodypartExercise() {
        //access the url parameter
        var exercise = Request.RouteValues["exercise"]?.ToString();
        Console.WriteLine(exercise);
        var response = exercise == null ? null : _bpeService.GetBodyPart(exercise);
        return Ok(response);
    }
}