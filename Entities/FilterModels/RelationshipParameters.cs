using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.FilterModels
{
    public class RelationshipParameters : QueryStringParameters
    {
        public RelationshipStatus? Status { get; set; }

        public Guid? UserId { get; set; }
        
    }
}
