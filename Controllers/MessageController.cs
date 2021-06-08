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
    public class MessageController : ControllerBase
    {
        private IMessageService _messageService;

        public MessageController(IMessageService messageService)
        {
            _messageService = messageService;
        }

        // GET: api/<MessageController>
        //public IEnumerable<string> Get()
        [HttpGet]
        public List<Message> Get()
        {
            //return new string[] { "value1", "value2" };
            return _messageService.GetAll();
        }

        // GET api/<MessageController>/5
        //public string Get(int id)
        [HttpGet("{id}")]
        public Message Get(int id)
        {
            //return "value";
            return _messageService.GetOne(id);
        }

        // POST api/<MessageController>
        [HttpPost]
        public void Post([FromBody] Message Message)
        {
            _messageService.Add(Message);
        }

        // PUT api/<MessageController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Message Message)
        {
            _messageService.Update(id, Message);
        }
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<MessageController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _messageService.Delete(id);
        }
        //public void Delete(int id)
        //{
        //}
    }
}
