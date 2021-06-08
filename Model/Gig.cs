using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{
    public class Gig
    {
        public int GigId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime Deadline { get; set; }
        public string Category { get; set; }
        public int BuyerRating { get; set; }
        public int SellerRating { get; set; }
        public string Description { get; set; }
        public int BuyerId { get; set; }
        public int SellerId { get; set; }
        public bool Delivered { get; set; }
        public int price { get; set; }
    }
}
