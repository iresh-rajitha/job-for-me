using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class UserService : IUserService
    {
        private readonly FreelancingDBContext _freelancingDBContext;

        public UserService(FreelancingDBContext datacontext)
        {
            _freelancingDBContext = datacontext;
        }
        public void Add(User User)
        {
            _freelancingDBContext.Users.Add(User);
            _freelancingDBContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _freelancingDBContext.Users.Remove(GetOne(id));
            _freelancingDBContext.SaveChanges();
        }

        public List<User> GetAll()
        {
            return _freelancingDBContext.Users.ToList();
        }

        public User GetOne(int id)
        {
            return _freelancingDBContext.Users.FirstOrDefault(user => user.UserId == id);
        }

        public void Update(int id, User User)
        {
            _freelancingDBContext.Users.Update(User);
            _freelancingDBContext.SaveChanges();
        }
    }
}
