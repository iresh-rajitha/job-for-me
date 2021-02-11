using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Model
{
    public class UserWithToken: User
    {
        string token { get; set; }
    }
}
