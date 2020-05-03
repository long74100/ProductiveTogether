using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("goal_task")]
    public class GoalTask
    {
        public enum GoalTaskStatus
        {
            ToDo,
            InProgress,
            Complete,
            Revisit
        }

        [Key]
        public Guid Id { get; set; }

        public GoalTaskStatus Status { get; set; }

        [ForeignKey(nameof(Goal))]
        public Guid GoalId { get; set; }
        public Goal Goal { get; set; }
    }
}