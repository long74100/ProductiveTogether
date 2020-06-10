using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    [Table("action_item")]
    public class ActionItem : TimeStampedEntity
    {
        public enum ActionItemStatus
        {
            ToDo,
            InProgress,
            Complete,
            Revisit
        }

        [Key]
        public Guid Id { get; set; }

        public ActionItemStatus Status { get; set; }

        [Required]
        public string Description { get; set; }

        [ForeignKey(nameof(Goal))]

        public Guid GoalId { get; set; }

        public Goal Goal { get; set; }
    }
}