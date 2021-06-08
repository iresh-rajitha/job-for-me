using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public interface IGigService
    {
        void Add(Gig Gig);
        List<Gig> GetAll();
        Gig GetOne(int id);
        void Delete(int id);
        void Update(int id, Gig Gig);
    }
}
