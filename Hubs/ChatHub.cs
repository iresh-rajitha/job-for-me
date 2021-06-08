using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using OnlineFreelancinPlatform.Hubs.Clients;
using OnlineFreelancinPlatform.Model;

namespace OnlineFreelancinPlatform.Hubs
{
    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(ChatMessage message)
        {
            await Clients.All.ReceiveMessage(message);
        }
    }

    //public class ChatHub : Hub<IChatClient>
    //{
    //    public async Task SendMessage(ChatMessage message)
    //    {
    //        await Clients.All.ReceiveMessage(message);
    //    }
    //}
}
