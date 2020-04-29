using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
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
        private IMapper _mapper;

        public GoalsController(ILogger logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public IActionResult GetAllGoals()
        {
            try
            {
                var goals = _repository.Goal.GetAllGoals();
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
        public IActionResult GetGoalById(Guid id)
        {
            try
            {
                var goal = _repository.Goal.GetGoalById(id);
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
        public IActionResult CreateGoal([FromBody]GoalForCreationDto goal)
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
                    _logger.Error("Invalid goal object sent from client.");
                    return BadRequest("Invalid model object");
                }

                var goalEntity = _mapper.Map<Goal>(goal);

                _repository.Goal.CreateGoal(goalEntity);
                _repository.Save();

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