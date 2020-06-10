using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
    public enum RelationshipStatus
    {
        Pending,
        Accepted,
        Declined,
    }

    [Table("relationship")]
    public class Relationship : TimeStampedEntity
    {
        [Key]
        public Guid Id { get; set; }

        [ForeignKey(nameof(User))]
        public Guid User1Id { get; set; }

        [ForeignKey(nameof(User))]
        public Guid User2Id { get; set; }

        public RelationshipStatus Status {  get; set;   }

    }
}
