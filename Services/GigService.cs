using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class GigService : IGigService
    {
        private readonly FreelancingDBContext _freelancingDBContext;

        public GigService(FreelancingDBContext datacontext)
        {
            _freelancingDBContext = datacontext;
        }

        public void Add(Gig Gig)
        {
            _freelancingDBContext.Gigs.Add(Gig);
            _freelancingDBContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _freelancingDBContext.Gigs.Remove(GetOne(id));
            _freelancingDBContext.SaveChanges();
        }

        public List<Gig> GetAll()
        {
            return _freelancingDBContext.Gigs.ToList();
        }

        public Gig GetOne(int id)
        {
            return _freelancingDBContext.Gigs.FirstOrDefault(gig => gig.GigId == id);
        }

        public void Update(int id, Gig Gig)
        {
            _freelancingDBContext.Gigs.Update(Gig);
            _freelancingDBContext.SaveChanges();
        }
    }
}
