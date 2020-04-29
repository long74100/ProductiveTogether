using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DataTransferObjects
{
    public class GoalForCreationDto
    {
        public GoalType GoalType { get; set; }

        public DateTime Date { get; set; }

    }
}
