using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public interface IAdminService
    {
        List<Admin> GetAll();
        void Add(Admin admin);
        Admin Get(int id);
        void Delete(int id);
        void Update(int id, Admin admin);
    }
}
