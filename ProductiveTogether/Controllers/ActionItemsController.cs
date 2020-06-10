using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Contracts;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Mvc;

namespace ProductiveTogether.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActionItemsController : ControllerBase
    {

        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public ActionItemsController(IRepositoryWrapper repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "ActionItemById")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var actionItem = await _repository.ActionItem.GetActionItemByIdAsync(id);

            if (actionItem == null)
            {
                return NotFound();
            }

            var actionItemResult = _mapper.Map<ActionItemDto>(actionItem);

            return Ok(actionItemResult);
        }

        [HttpGet]
        public IEnumerable<string> GetAll()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody]ActionItemForCreationDto actionItem)
        {

            var actionItemEntity = _mapper.Map<ActionItem>(actionItem);

            _repository.ActionItem.CreateActionItem(actionItemEntity);
            await _repository.SaveAsync();

            var createdActionItem = _mapper.Map<ActionItemDto>(actionItemEntity);

            return CreatedAtRoute("ActionItemById", new { id = createdActionItem.Id }, createdActionItem);

        }

        [HttpPatch("{id}")]
        public async Task<IActionResult> Update(Guid id, [FromBody] ActionItemDto actionItem)
        {
            if (id != actionItem.Id)
            {
                return BadRequest();
            }
            var actionItemEntity = _mapper.Map<ActionItem>(actionItem);
            _repository.ActionItem.UpdateActionItem(actionItemEntity);
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
