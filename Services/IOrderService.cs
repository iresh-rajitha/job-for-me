using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public interface IOrderService
    {
        void Add(Order Order);
        List<Order> GetAll();
        Order GetOne(int id);
        void Delete(int id);
        void Update(int id, Order Order);
    }
}
