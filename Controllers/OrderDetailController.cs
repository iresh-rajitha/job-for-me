using Microsoft.AspNetCore.Mvc;
using OnlineFreelancinPlatform.Model;
using OnlineFreelancinPlatform.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineFreelancinPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        IOrderDetailService _orderDetailService; 

        public OrderDetailController(IOrderDetailService orderDetailService)
        {
            _orderDetailService = orderDetailService;
        }
        // GET: api/<OrderDetailController>
        [HttpGet]
        public List<OrderDetail> Get()
        {
            return _orderDetailService.GetAll();
        }

        // GET api/<OrderDetailController>/5
        [HttpGet("{id}")]
        public OrderDetail Get(int id)
        {
            return _orderDetailService.GetOne(id);
        }

        // POST api/<OrderDetailController>
        [HttpPost]
        public void Post([FromForm] OrderDetail orderDetail)
        {
            _orderDetailService.Add(orderDetail);
        }

        // PUT api/<OrderDetailController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromForm] OrderDetail orderDetail)
        {
            _orderDetailService.Update(id, orderDetail);
        }

        // DELETE api/<OrderDetailController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _orderDetailService.Delete(id);
        }
    }
}
