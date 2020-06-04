using System;
using System.Collections.Generic;
using System.Text;
using static Entities.Models.ActionItem;

namespace Entities.DataTransferObjects
{
    public class ActionItemDto
    {
        public Guid Id { get; set; }
        public Guid GoalId { get; set; }
        public ActionItemStatus Status { get; set; }
        public string Description { get; set; }
    }
}
