using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class OrderService : IOrderService
    {
        private readonly FreelancingDBContext _freelancingDBContext;
        private readonly IOrderDetailService _orderDetailService;

        public OrderService(FreelancingDBContext datacontext, IOrderDetailService orderDetailService)
        {
            _freelancingDBContext = datacontext;
            _orderDetailService = orderDetailService;
        }
        public void Add(Order Order)
        {
            ////_orderDetailService.Add(Order.OrderDetail);
            //var transaction = _freelancingDBContext.Database.BeginTransaction();
            //_freelancingDBContext.Database.ExecuteSqlCommand("SET IDENTITY_INSERT [dbo].[User] ON");
            _freelancingDBContext.Orders.Add(Order);
            //_freelancingDBContext.Orders.Attach(Order);

            _freelancingDBContext.SaveChanges();

        }

        public void Delete(int id)
        {
            _freelancingDBContext.Orders.Remove(GetOne(id));
            _freelancingDBContext.SaveChanges();
        }

        public List<Order> GetAll()
        {
            return _freelancingDBContext.Orders.ToList();
        }

        public Order GetOne(int id)
        {
            return _freelancingDBContext.Orders.FirstOrDefault(order => order.OrderID == id);
        }

        public void Update(int id, Order Order)
        {
            _freelancingDBContext.Orders.Update(Order);
            _freelancingDBContext.SaveChanges();
        }
    }
}
