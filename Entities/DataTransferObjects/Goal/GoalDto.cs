using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DataTransferObjects
{
    public class GoalDto
    {
        public Guid Id { get; set; }

        public Guid UserId { get; set; }

        public GoalType GoalType { get; set; }

        public DateTime Date { get; set; }

        public ICollection<GoalTaskDto> Tasks { get; set; }
    }
}
