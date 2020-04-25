using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProductiveTogether.Models;

namespace ProductiveTogether.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DailyGoalsController : ControllerBase
    {
        private readonly DailyGoalContext _context;

        public DailyGoalsController(DailyGoalContext context)
        {
            _context = context;
        }

        // GET: api/DailyGoals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DailyGoal>>> GetDailyGoals()
        {
            return await _context.DailyGoals.ToListAsync();
        }

        // GET: api/DailyGoals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DailyGoal>> GetDailyGoal(long id)
        {
            var dailyGoal = await _context.DailyGoals.FindAsync(id);

            if (dailyGoal == null)
            {
                return NotFound();
            }

            return dailyGoal;
        }

        // PUT: api/DailyGoals/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDailyGoal(long id, DailyGoal dailyGoal)
        {
            if (id != dailyGoal.Id)
            {
                return BadRequest();
            }

            _context.Entry(dailyGoal).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DailyGoalExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DailyGoals
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DailyGoal>> PostDailyGoal(DailyGoal dailyGoal)
        {
            _context.DailyGoals.Add(dailyGoal);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDailyGoal", new { id = dailyGoal.Id }, dailyGoal);
        }

        // DELETE: api/DailyGoals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DailyGoal>> DeleteDailyGoal(long id)
        {
            var dailyGoal = await _context.DailyGoals.FindAsync(id);
            if (dailyGoal == null)
            {
                return NotFound();
            }

            _context.DailyGoals.Remove(dailyGoal);
            await _context.SaveChangesAsync();

            return dailyGoal;
        }

        private bool DailyGoalExists(long id)
        {
            return _context.DailyGoals.Any(e => e.Id == id);
        }
    }
}
