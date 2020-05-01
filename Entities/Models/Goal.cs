using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
    public enum GoalType
    {
        Daily,
        Month,
        Year
    }

    [Table("goal")]
    public class Goal
    {
        public Guid Id { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }

        [Required]
        public GoalType GoalType { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public ICollection<GoalTask> Tasks { get; set; }
    }
}
