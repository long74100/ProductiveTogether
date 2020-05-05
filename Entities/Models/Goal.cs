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
    public class Goal : TimeStampedEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }

        public User User { get; set; }

        [Required]
        public GoalType GoalType { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public ICollection<GoalTask> Tasks { get; set; }
    }
}
