using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using OnlineFreelancinPlatform.Model;
using OnlineFreelancinPlatform.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineFreelancinPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private IAdminService _adminService;

        public AdminController(IAdminService adminService)
        {
            _adminService = adminService;
        }
        // GET: api/<AdminController>
        [HttpGet]
        public List<Admin> Get()
        {
            return _adminService.GetAll();
        }

        // GET api/<AdminController>/5
        [HttpGet("{id}")]
        public Admin Get(int id)
        {
            return _adminService.Get(id);
        }

        // POST api/<AdminController>
        [HttpPost]
        public void Post([FromBody] Admin value)
        {
             _adminService.Add(value);
        }

        // PUT api/<AdminController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Admin value)
        {
            _adminService.Update(id,value);
        }

        // DELETE api/<AdminController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _adminService.Delete(id);
        }
    }
}
