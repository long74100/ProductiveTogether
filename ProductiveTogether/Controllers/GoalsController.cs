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
            var goals = await _repository.Goal.GetAllGoalsAsync();
            var goalsResult = _mapper.Map<IEnumerable<GoalDto>>(goals);
            return Ok(goalsResult);
        }

        [HttpGet("{id}", Name = "GoalById")]
        public async Task<IActionResult> GetGoalByIdAsync(Guid id)
        {

            var goal = await _repository.Goal.GetGoalByIdAsync(id);

            if (goal == null)
            {
                return NotFound();
            }

            var goalResult = _mapper.Map<GoalDto>(goal);

            return Ok(goalResult);
        }

        [HttpPost]
        public async Task<IActionResult> CreateGoalAsync([FromBody]GoalForCreationDto goal)
        {

            var goalEntity = _mapper.Map<Goal>(goal);

            _repository.Goal.CreateGoal(goalEntity);
            await _repository.SaveAsync();

            var createdGoal = _mapper.Map<GoalDto>(goalEntity);

            return CreatedAtRoute("GoalById", new { id = createdGoal.Id }, createdGoal);

        }
    }
}