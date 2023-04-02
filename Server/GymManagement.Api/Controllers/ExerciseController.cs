using GymManagement.Application.Services.Exercises;
using GymManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers;

[ApiController]
[Route("exercise/")]

public class ExerciseController : ControllerBase{
    private readonly IExerciseService _exerciseService;
    public ExerciseController(IExerciseService exerciseService) {
        _exerciseService = exerciseService;
    }

    [HttpDelete("{exerciseName}")]
    public IActionResult Delete(string exerciseName) {
        try
        {
            var result = _exerciseService.Delete(exerciseName);
            return Ok(result);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }

    }

    [HttpGet]
    public OkObjectResult Get() {
        var response = _exerciseService.Get();
        return Ok(response);
    }
}