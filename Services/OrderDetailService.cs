using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class OrderDetailService : IOrderDetailService
    {
        private readonly FreelancingDBContext _freelancingDBContext;
        private readonly IWebHostEnvironment _hostEnvironment;

        public OrderDetailService(FreelancingDBContext datacontext, IWebHostEnvironment hostEnvironment)
        {
            _freelancingDBContext = datacontext;
            this._hostEnvironment = hostEnvironment;
        }
        public async void Add(OrderDetail OrderDetail)
        {
            if(OrderDetail.File != null)
            {
                OrderDetail.FileName = await SaveImage(OrderDetail.File);
            }
            _freelancingDBContext.OrderDetails.Add(OrderDetail);
            _freelancingDBContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _freelancingDBContext.OrderDetails.Remove(GetOne(id));
            _freelancingDBContext.SaveChanges();
        }

        public List<OrderDetail> GetAll()
        {
            return _freelancingDBContext.OrderDetails.ToList();
        }

        public OrderDetail GetOne(int id)
        {
            return _freelancingDBContext.OrderDetails.FirstOrDefault(OrderDetail => OrderDetail.OrderDetailID == id);
        }

        public void Update(int id, OrderDetail OrderDetail)
        {
            _freelancingDBContext.OrderDetails.Update(OrderDetail);
            _freelancingDBContext.SaveChanges();
        }

        public async Task<string> SaveImage(IFormFile imageFile)
        {
            string imageName = new String(Path.GetFileNameWithoutExtension(imageFile.FileName).Take(10).ToArray()).Replace(' ', '-');
            imageName = imageName + DateTime.Now.ToString("yymmssfff") + Path.GetExtension(imageFile.FileName);
            var imagePath = Path.Combine(_hostEnvironment.ContentRootPath, "Images", imageName);
            using (var fileStream = new FileStream(imagePath, FileMode.Create))
            {
                await imageFile.CopyToAsync(fileStream);
            }
            return imageName;
        }
    }
}
