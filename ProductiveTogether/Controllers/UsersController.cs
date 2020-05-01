using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using Entities.Models;
using Entities.DataTransferObjects;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using System;

namespace ProductiveTogether.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public UsersController(ILogger logger, IRepositoryWrapper repository, UserManager<User> userManager, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _userManager = userManager;
            _mapper = mapper;
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "UserById")]
        public async Task<IActionResult> GetUserById(string id)
        {
            try
            {
                var user = await _userManager.FindByIdAsync(id);
                return Ok(User);
            } 
            catch(Exception ex)
            {
                _logger.Error($"Something went wrong inside GetUserById action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
           
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserForCreationDto user)
        {
            try
            {
                if (user == null)
                {
                    _logger.Error("User object sent from client is null.");
                    return BadRequest("User object is null");
                }

                if (!ModelState.IsValid)
                {
                    _logger.Error("Invalid User object sent from client.");
                    return BadRequest("Invalid model object");
                }

                var userEntity = _mapper.Map<User>(user);
                var result = await _userManager.CreateAsync(userEntity, user.Password);
                await _repository.SaveAsync();

                if (result.Succeeded)
                {
                    var createdUser = _mapper.Map<UserDto>(userEntity);
                    return CreatedAtRoute("UserById", new { id = createdUser.Id }, createdUser);
                } else
                {
                    return BadRequest(result);
                }
                
            }
            catch (Exception ex)
            {
                _logger.Error($"Something went wrong inside CreateGoal action: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/User/5
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
