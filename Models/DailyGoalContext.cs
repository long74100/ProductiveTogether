using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace ProductiveTogether.Models
{
    public class DailyGoalContext : DbContext
    {
        public DailyGoalContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<DailyGoal> DailyGoals { get; set; }
    }
}
