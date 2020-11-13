using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{
    public class Message
    {
        public int MessageID { get; set; }
        public int To { get; set; }
        public int From { get; set; }
        public string Text { get; set; }
        public bool IsRead { get; set; }

        public int AdminID { get; set; }
        public Admin Admin { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
    }
}
