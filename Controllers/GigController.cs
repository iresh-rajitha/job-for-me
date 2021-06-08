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
    public class GigController : ControllerBase
    {
        private IGigService _gigService;

        public GigController(IGigService gigService)
        {
            _gigService = gigService;
        }

        // GET: api/<GigController>
        //public IEnumerable<string> Get()
        [HttpGet]
        public List<Gig> Get()
        {
            //return new string[] { "value1", "value2" };
            return _gigService.GetAll();
        }

        // GET api/<GigController>/5
        //public string Get(int id)
        [HttpGet("{id}")]
        public Gig Get(int id)
        {
            //return "value";
            return _gigService.GetOne(id);
        }

        // POST api/<GigController>
        [HttpPost]
        public void Post([FromBody] Gig Gig)
        {
            _gigService.Add(Gig);
        }

        // PUT api/<GigController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Gig Gig)
        {
            _gigService.Update(id, Gig);
        }
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        // DELETE api/<GigController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _gigService.Delete(id);
        }
        //public void Delete(int id)
        //{
        //}
    }
}
