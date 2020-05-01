using Entities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DataTransferObjects
{
    public class GoalForCreationDto
    {
        [Required(ErrorMessage = "UserId is required")]
        public Guid UserId { get; set; }

        [Required(ErrorMessage = "GoalType is required")]
        public GoalType? GoalType { get; set; }

        [Required(ErrorMessage = "Date is required")]
        public DateTime? Date { get; set; }

    }
}
