using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Contracts;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ProductiveTogether.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private ILogger _logger;
        private IRepositoryWrapper _repository;

        public GoalsController(ILogger logger, IRepositoryWrapper repository)
        {
            _logger = logger;
            _repository = repository;
        }

        [HttpGet]
        public IActionResult GetAllGoals()
        {
            try
            {
                var goals = _repository.Goal.GetAllGoals();
                return Ok(goals);
            }
            catch (Exception ex)
            {
                _logger.Debug($"Something went wrong inside GetAllGoals action : {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}