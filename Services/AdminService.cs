using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class AdminService
    {
        private readonly FreelancingDBContext _freelancingDBContext;
        public AdminService(FreelancingDBContext datacontext)
        {
            _freelancingDBContext = datacontext;
        }

        public void Add(Admin admin)
        {
            _freelancingDBContext.Admins.Add(admin);
            _freelancingDBContext.SaveChanges();
        }
        public List<Admin> GetAll()
        {
            return _freelancingDBContext.Admins.ToList();
        }
        public Admin Get(int id)
        {
            return _freelancingDBContext.Admins.FirstOrDefault(admin => admin.AdminID == id);
        }
        public void Delete(int id)
        {
            _freelancingDBContext.Admins.Remove(Get(id));
            _freelancingDBContext.SaveChanges();
        }
        public void Update(int id, Admin admin)
        {
            _freelancingDBContext.Admins.Update(admin);
            _freelancingDBContext.SaveChanges();
        }
    }
}
