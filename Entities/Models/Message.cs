using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
    [Table("message")]

    class Message
    {
        [Key]
        public Guid Id { get; set; }
    }
}
