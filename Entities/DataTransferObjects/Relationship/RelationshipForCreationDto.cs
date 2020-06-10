using Entities.Models;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Entities.DataTransferObjects.Relationship
{
    public class RelationshipForCreationDto
    { 
        [Required(ErrorMessage = "User1Id is required")]
        public Guid User1Id { get; set; }

        [Required(ErrorMessage = "User2Id is required")]
        public Guid User2Id { get; set; }

        public RelationshipStatus? Status { get; set; }

    }
}
