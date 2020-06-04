using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DataTransferObjects
{
    public class ActionItemForCreationDto
    {
        [Required(ErrorMessage = "Goal ID is required")]
        public Guid GoalId { get; set; }
        
        [Required(ErrorMessage = "Description is required")]
        public string Description { get; set; }


    }
}
