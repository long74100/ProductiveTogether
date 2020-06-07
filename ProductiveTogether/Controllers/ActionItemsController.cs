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
    public class ActionItemsController : ControllerBase
    {

        private readonly ILogger _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IMapper _mapper;

        public ActionItemsController(ILogger logger, IRepositoryWrapper repository, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet("{id}", Name = "ActionItemById")]
        public async Task<IActionResult> Get(Guid id)
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

        [HttpPut("{id}")]
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
