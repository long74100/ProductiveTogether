using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ProductiveTogether.API.Controllers
{

    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class GoalsController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public GoalsController(ILogger logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGoals()
        {
            try
            {
                var goals = await _repository.Goal.GetAllGoalsAsync();
                var goalsResult = _mapper.Map<IEnumerable<GoalDto>>(goals);

                return Ok(goalsResult);
            }
            catch (Exception ex)
            {
                _logger.Debug($"Something went wrong inside GetAllGoals action : {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet("{id}", Name = "GoalById")]
        public async Task<IActionResult> GetGoalByIdAsync(Guid id)
        {
            try
            {
                var goal = await _repository.Goal.GetGoalByIdAsync(id);
                var goalResult = _mapper.Map<GoalDto>(goal);

                return Ok(goalResult);
            }
            catch (Exception ex)
            {
                _logger.Debug($"Something went wrong inside GoalById action : {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateGoal([FromBody]GoalForCreationDto goal)
        {
            try
            {
                if (goal == null)
                {
                    _logger.Error("Goal object sent from client is null.");
                    return BadRequest("Goal object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.Error("Invalid Goal object sent from client.");
                    return BadRequest("Invalid model object");
                }

                var goalEntity = _mapper.Map<Goal>(goal);

                _repository.Goal.CreateGoal(goalEntity);
                await _repository.SaveAsync();

                var createdGoal = _mapper.Map<GoalDto>(goalEntity);

                return CreatedAtRoute("GoalById", new { id = createdGoal.Id }, createdGoal);
            }
            catch (Exception ex)
            {
                _logger.Error($"Something went wrong inside CreateGoal action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}