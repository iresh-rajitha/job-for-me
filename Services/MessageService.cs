using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public class MessageService : IMessageService
    {
        private readonly FreelancingDBContext _freelancingDBContext;

        public MessageService(FreelancingDBContext datacontext)
        {
            _freelancingDBContext = datacontext;
        }
        public void Add(Message Message)
        {
            _freelancingDBContext.Messages.Add(Message);
            _freelancingDBContext.SaveChanges();
        }

        public void Delete(int id)
        {
            _freelancingDBContext.Messages.Remove(GetOne(id));
            _freelancingDBContext.SaveChanges();
        }

        public List<Message> GetAll()
        {
            return _freelancingDBContext.Messages.ToList();
        }

        public Message GetOne(int id)
        {
            return _freelancingDBContext.Messages.FirstOrDefault(message => message.MessageID == id);
        }

        public void Update(int id, Message Message)
        {
            _freelancingDBContext.Messages.Update(Message);
            _freelancingDBContext.SaveChanges();
        }
    }
}
