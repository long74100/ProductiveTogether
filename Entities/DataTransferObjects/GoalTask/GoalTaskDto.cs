using System;
using System.Collections.Generic;
using System.Text;
using static Entities.Models.GoalTask;

namespace Entities.DataTransferObjects
{
    public class GoalTaskDto
    {
        public Guid Id { get; set; }
        public Guid GoalId { get; set; }
        public GoalTaskStatus Status { get; set; }
        public string description { get; set; }
    }
}
