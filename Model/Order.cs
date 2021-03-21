using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{ 
    public class Order
    {
        public int OrderID { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime Deadline { get; set; }
        public string Comment { get; set; }
        public int Rating { get; set; }
        public string Description { get; set; }
        public virtual User Seller{get;set;}
        public virtual User Buyer {get;set;}
        public int OrderDetailID { get; set; }
        public virtual OrderDetail OrderDetail { get; set; }
        //public string comment { get; set; }
        //public int rating { get; set; }

        //public virtual User User{get;set;}
        //public virtual Admin Admin{get;set;}
        //public virtual OrderDetail OrderDetail{get;set;}

    }
}
