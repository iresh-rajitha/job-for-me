using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class FieldService : IFieldService
    {
        private readonly FreelancingDBContext _freelancingDBContext;

        public FieldService(FreelancingDBContext datacontext)
        {
            _freelancingDBContext = datacontext;
        }
        public void Add(Field Field)
        {
            _freelancingDBContext.Fields.Add(Field);
            _freelancingDBContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _freelancingDBContext.Fields.Remove(GetOne(id));
            _freelancingDBContext.SaveChanges();
        }

        public List<Field> GetAll()
        {
            return _freelancingDBContext.Fields.ToList();
        }

        public Field GetOne(int id)
        {
            return _freelancingDBContext.Fields.FirstOrDefault(field => field.FieldID == id);
        }

        public void Update(int id, Field Field)
        {
            _freelancingDBContext.Fields.Update(Field);
            _freelancingDBContext.SaveChanges();
        }
    }
}
