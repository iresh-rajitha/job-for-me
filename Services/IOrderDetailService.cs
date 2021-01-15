using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public interface IOrderDetailService
    {
        void Add(OrderDetail OrderDetail);
        List<OrderDetail> GetAll();
        OrderDetail GetOne(int id);
        void Delete(int id);
        void Update(int id, OrderDetail OrderDetail);
    }
}
