using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public interface IFieldService
    {
        void Add(Field Field);
        List<Field> GetAll();
        Field GetOne(int id);
        void Delete(int id);
        void Update(int id, Field Field);
        //public string GetHashString(string inputString);
    }
}
