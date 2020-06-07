using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
   

    [Table("chat_room")]

    public class ChatRoom
    {
        [Key]
        public Guid Id { get; set; }


    }
}
