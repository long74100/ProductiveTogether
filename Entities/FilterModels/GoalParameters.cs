using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.FilterModels
{
    public class GoalParameters : QueryStringParameters
    {
        public DateTime? Date { get; set; }
        public GoalType? Type { get; set; }

     }
}
