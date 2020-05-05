using System;
using System.Collections.Generic;
using System.Text;

namespace Entities.Models
{
    public abstract class TimeStampedEntity
    {
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
