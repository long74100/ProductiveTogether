using System;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.DataTransferObjects.Relationship;
using Entities.FilterModels;
using Entities.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Serilog;

namespace ProductiveTogether.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RelationshipsController : ControllerBase
    {

        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public RelationshipsController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll([FromQuery] RelationshipParameters parameters)
        {
            var relationships = await _repository.Relationship.GetAllRelationshipsAsync(parameters);

            var pagedResult = new PagedResult<Relationship>
            {
                Items = relationships,
                TotalCount = relationships.TotalCount,
                PageSize = relationships.PageSize,
                CurrentPage = relationships.CurrentPage,
                TotalPages = relationships.TotalPages,
                HasNext = relationships.HasNext,
                HasPrevious = relationships.HasPrevious
            };

            return Ok(pagedResult);
        }

        [HttpGet("{id}", Name = "RelationshipById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var relationship = await _repository.Relationship.GetRelationshipByIdAsync(id);

            if (relationship == null)
            {
                return NotFound();
            }

            var relationshipResult = _mapper.Map<RelationshipDto>(relationship);

            return Ok(relationshipResult);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] RelationshipForCreationDto relationship)
        {
            var relationshipEntity = _mapper.Map<Relationship>(relationship);

            _repository.Relationship.CreateRelationship(relationshipEntity);
            await _repository.SaveAsync();

            var createdRelationship = _mapper.Map<RelationshipDto>(relationshipEntity);

            return CreatedAtRoute("RelationshipById", new { id = createdRelationship.Id }, createdRelationship);
        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] Relationship relationship)
        {
            if (id != relationship.Id)
            {
                return BadRequest();
            }

            _repository.Relationship.UpdateRelationship(relationship);
            await _repository.SaveAsync();

            return NoContent();

        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
