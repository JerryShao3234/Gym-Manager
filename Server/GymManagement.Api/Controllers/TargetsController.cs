using GymManagement.Application.Services.Targets;
using GymManagement.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace GymManagement.Api.Controllers;

[ApiController]
[Route("targets/")]

public class TargetsController : ControllerBase{
    private readonly ITargetsService _targetsService;

    public TargetsController(ITargetsService targetsService) {
        _targetsService = targetsService;
    }

    [HttpGet("get/{intensityRating}")]
    public IActionResult Get(int intensityRating) {
        Console.WriteLine("Targets get called!");
        try
        {
            return Ok(_targetsService.Get(intensityRating));
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
}
