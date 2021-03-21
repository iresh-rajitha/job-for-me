using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{
    public class Admin
    {
        [Key]
        public int AdminID { get; set; }
        public String AdminName { get; set; }

    }
}
