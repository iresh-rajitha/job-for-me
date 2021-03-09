using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string UserType { get; set; }
        public string Category { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }

        public IList<Message> Messages { get; set; }
        public IList<Order> Orders { get; set; }

    }
}
