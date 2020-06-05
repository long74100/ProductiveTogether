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


        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        [HttpGet("{id}", Name = "ActionItemById")]
        public string Get(Guid id)
        {
            return "value";
        }

        [HttpPost]
        public async Task<IActionResult> CreateActionItemAsync([FromBody]ActionItemForCreationDto actionItem)
        {

            var actionItemEntity = _mapper.Map<ActionItem>(actionItem);

            _repository.ActionItem.CreateActionItem(actionItemEntity);
            await _repository.SaveAsync();

            var createdActionItem = _mapper.Map<ActionItemDto>(actionItemEntity);

            return CreatedAtRoute("ActionItemById", new { id = createdActionItem.Id }, createdActionItem);

        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] ActionItemDto actionItem)
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
