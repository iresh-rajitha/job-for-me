using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using OnlineFreelancinPlatform.Model;
using OnlineFreelancinPlatform.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace OnlineFreelancinPlatform.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[EnableCors(origins: "http://localhost:3000", headers: "*", methods: "get,post")]
    public class AccountController : ControllerBase
    {
        private readonly JWTSettings _jwtsettings;
        private readonly IAccountService _accountService;


        public AccountController(IOptions<JWTSettings> jwtSettings, IAccountService accountService)
        {
            _jwtsettings = jwtSettings.Value;
            _accountService = accountService;
        }
        
        //[HttpGet("Login")]
        //public String Login()
        //{
        //    // check valid use
        //    return GenerateAccessToken(1);
        //}

        // POST api/<AccountController>
        [HttpPost("Login")]
        public bool Post([FromBody] User User)
        {
            return _accountService.isValidLogin(User);
        }

        private string GenerateAccessToken(int userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_jwtsettings.SecretKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, Convert.ToString(userId))
                }),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)

            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
