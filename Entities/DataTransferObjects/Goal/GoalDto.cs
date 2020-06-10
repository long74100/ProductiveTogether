using Entities.Models;
using System;
using System.Collections.Generic;

namespace Entities.DataTransferObjects
{
    public class GoalDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public GoalType GoalType { get; set; }

        public DateTime Date { get; set; }

        public DateTime UpdatedAt { get; set; }

        public ICollection<ActionItemDto> ActionItems { get; set; }
    }
}
