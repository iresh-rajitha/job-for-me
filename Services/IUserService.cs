﻿using OnlineFreelancinPlatform.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform.Services
{
    public interface IUserService
    {
        void Add(User User);
        List<User> GetAll();
        User GetOne(int id);
        void Delete(int id);
        void Update(int id, User User);
        public string GetHashString(string inputString);

    }
}
