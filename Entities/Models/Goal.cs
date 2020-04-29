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

        [Required(ErrorMessage = "Goal type is required")]
        public GoalType GoalType { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime Date { get; set; }

        public ICollection<GoalTask> Tasks { get; set; }
    }
}
