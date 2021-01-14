using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    interface IMessageService
    {
        void Add(Message Message);
        List<Message> GetAll();
        Message GetOne(int id);
        void Delete(int id);
        void Update(int id, Message Message); 
    }
}
