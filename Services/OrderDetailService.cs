using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly FreelancingDBContext _freelancingDBContext;

        public OrderDetailService(FreelancingDBContext datacontext)
        {
            _freelancingDBContext = datacontext;
        }
        public void Add(OrderDetail OrderDetail)
        {
            _freelancingDBContext.OrderDetails.Add(OrderDetail);
            _freelancingDBContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _freelancingDBContext.OrderDetails.Remove(GetOne(id));
            _freelancingDBContext.SaveChanges();
        }

        public List<OrderDetail> GetAll()
        {
            return _freelancingDBContext.OrderDetails.ToList();
        }

        public OrderDetail GetOne(int id)
        {
            return _freelancingDBContext.OrderDetails.FirstOrDefault(OrderDetail => OrderDetail.OrderDetailID == id);
        }

        public void Update(int id, OrderDetail OrderDetail)
        {
            _freelancingDBContext.OrderDetails.Update(OrderDetail);
            _freelancingDBContext.SaveChanges();
        }
    }
}
