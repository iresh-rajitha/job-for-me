using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
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
            //Console.WriteLine(User.Password + ":" + GetHashString(User.Password));
            User.Password = GetHashString(User.Password);
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
        public byte[] GetHash(string inputString)
        {
            using (HashAlgorithm algorithm = SHA256.Create())
                return algorithm.ComputeHash(Encoding.UTF8.GetBytes(inputString));
        }

        public string GetHashString(string inputString)
        {
            StringBuilder sb = new StringBuilder();
            foreach (byte b in GetHash(inputString))
                sb.Append(b.ToString("X2"));

            return sb.ToString();
        }
    }
}
