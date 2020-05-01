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
            var user = await _userManager.FindByIdAsync(id);
            return Ok(User);
        }

        // POST: api/User
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] UserForCreationDto user)
        {

            var userEntity = _mapper.Map<User>(user);
            var result = await _userManager.CreateAsync(userEntity, user.Password);
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
