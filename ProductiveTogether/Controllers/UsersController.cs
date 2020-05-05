using Microsoft.AspNetCore.Mvc;
using Serilog;
using Entities.Models;
using Entities.DataTransferObjects;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;

namespace ProductiveTogether.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public UsersController(ILogger logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _repository.User.GetAllUsersAsync();
            var usersResult = _mapper.Map<IEnumerable<UserDto>>(users);
            return Ok(usersResult);
        }

        // GET: api/User/5
        [HttpGet("{id}", Name = "UserById")]
        public async Task<IActionResult> GetUserById(string id)
        {
            var user = await _repository.User.GetUserByIdAsync(id);
            
            if (user == null)
            {
                return NotFound();
            }

            var userResult = _mapper.Map<UserDto>(user);

            return Ok(userResult);
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserForCreationDto user)
        {

            var userEntity = _mapper.Map<User>(user);
            var result = await _repository.User.CreateAsync(userEntity, user.Password);
            await _repository.SaveAsync();

            if (result.Succeeded)
            {
                var createdUser = _mapper.Map<UserDto>(userEntity);
                return CreatedAtRoute("UserById", new { id = createdUser.Id }, createdUser);
            }
            else
            {
                return BadRequest(result);
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
