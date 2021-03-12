using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{
    public class Field
    {
        [Key]
        public int FieldID { get; set; }
        public string FieldName { get; set; }
        public string Description { get; set; }
    }
}
