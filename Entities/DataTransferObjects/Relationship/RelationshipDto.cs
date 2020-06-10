using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.DataTransferObjects.Relationship
{
    public class RelationshipDto
    {
        public Guid Id { get; set; }
        public Guid User1Id { get; set; }
        public Guid User2Id { get; set; }
        public RelationshipStatus Status { get; set; }

    }
}
