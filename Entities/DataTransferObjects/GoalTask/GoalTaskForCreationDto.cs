using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DataTransferObjects.GoalTask
{
    public class GoalTaskForCreationDto
    {
        [Required(ErrorMessage = "Goal ID is required")]
        public Guid GoalId { get; set; }

    }
}
