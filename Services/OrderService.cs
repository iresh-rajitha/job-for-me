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
        private readonly IUserService _userService;

        public OrderService(FreelancingDBContext datacontext,IUserService userService)
        {
            _userService = userService;
            _freelancingDBContext = datacontext;
        }
        public void Add(Order Order)
        {
            //Order.Buyer = _userService.GetOne(Order.Buyer.UserId);
            _freelancingDBContext.Orders.Add(Order);
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
