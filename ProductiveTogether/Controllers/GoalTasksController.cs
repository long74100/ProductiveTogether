using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Entities.DataTransferObjects.GoalTask;
using Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ProductiveTogether.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoalTasksController : ControllerBase
    {

        private readonly ILogger _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public GoalTasksController(ILogger logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }


        // GET: api/GoalTasks
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/GoalTasks/5
        [HttpGet("{id}", Name = "GoalTaskById")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/GoalTasks
        [HttpPost]
        public async Task<IActionResult> CreateGoalTaskAsync([FromBody]GoalTaskForCreationDto goalTask)
        {
            try
            {
                if (goalTask == null)
                {
                    _logger.Error("GoalTask object sent from client is null.");
                    return BadRequest("GoalTask object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.Error("Invalid GoalTask object sent from client.");
                    return BadRequest(ModelState);
                }

                var goalTaskEntity = _mapper.Map<GoalTask>(goalTask);

                _repository.GoalTask.CreateGoalTask(goalTaskEntity);
                await _repository.SaveAsync();

                var createdGoalTask = _mapper.Map<GoalTaskDto>(goalTaskEntity);

                return CreatedAtRoute("GoalTaskById", new { id = createdGoalTask.Id }, createdGoalTask);
            }
            catch (Exception ex)
            {
                _logger.Error($"Something went wrong inside CreateGoal action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/GoalTasks/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
