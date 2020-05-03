using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Entities.Models
{
    public class Token
    {
        public enum TokenType
        {
            Refresh
        }

        public string Id { get; set; }

        [Required]
        public TokenType Type { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
    }
}
