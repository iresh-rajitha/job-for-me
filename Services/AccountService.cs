using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class AccountService : IAccountService
    {
        private readonly FreelancingDBContext _freelancingDBContext;
        private readonly IUserService _userService;
        public AccountService(FreelancingDBContext freelancingDBContext, IUserService userService)
        {
            _freelancingDBContext = freelancingDBContext;
            _userService = userService;
        }
        public bool isValidLogin(User User)
        {
            User.Password = _userService.GetHashString(User.Password);
            var user=_freelancingDBContext.Users
                .Where(u=>u.Email ==User.Email && u.Password == User.Password).FirstOrDefault();
            return user == null ? false : true;
        }
    }
}
