using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{
    public class OrderDetail
    {
        public int OrderDetailID { get; set; }
        public string Description { get; set; }
        public string FileName { get; set; }
        public int OrderID { get; set; }
        public Order Order { get; set; }
    }
}
