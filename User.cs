using System.ComponentModel.DataAnnotations.Schema;

namespace OnlineFreelancinPlatform
{
    public class User
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Role { get; set; }
        [NotMapped]
        public object Email { get; internal set; }
        public int UserId { get; internal set; }
    }
}