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
    public class FieldController : ControllerBase
    {
        private readonly IFieldService _fieldService;
        public FieldController(IFieldService fieldService)
        {
            _fieldService = fieldService;
        }
        // GET: api/<FieldController>
        [HttpGet]
        public List<Field> Get()
        {
            return _fieldService.GetAll();
        }

        // GET api/<FieldController>/5
        [HttpGet("{id}")]
        public Field Get(int id)
        {
            return _fieldService.GetOne(id);
        }

        // POST api/<FieldController>
        [HttpPost]
        public void Post([FromBody] Field Filed)
        {
            _fieldService.Add(Filed);
        }

        // PUT api/<FieldController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] Field Field)
        {
            _fieldService.Update(id, Field);
        }

        // DELETE api/<FieldController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _fieldService.Delete(id);
        }
    }
}
