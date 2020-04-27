using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("goal_task")]
    public class GoalTask
    {
        public Guid GoalTaskId { get; set; }

        [ForeignKey(nameof(Goal))]
        public Guid GoalId { get; set; }
        public Goal Goal { get; set; }
    }
}