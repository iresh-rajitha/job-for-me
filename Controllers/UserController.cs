using Microsoft.AspNetCore.Mvc;
using OnlineFreelancinPlatform.Model;
using OnlineFreelancinPlatform.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineFreelancinPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }
        // GET: api/<UserController>
        [HttpGet]
        public List<User> Get()
        {
            return _userService.GetAll();
        }

        // GET api/<UserController>/5
        [HttpGet("{id}")]
        public User Get(int id)
        {
            return _userService.GetOne(id);
        }

        // POST api/<UserController>
        [HttpPost]
        public void Post([FromBody] User User)
        {
             _userService.Add(User);
        }

        // PUT api/<UserController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] User User)
        {
            _userService.Update(id, User);
        }

        // DELETE api/<UserController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _userService.Delete(id);
        }
    }
}
