using Microsoft.AspNetCore.Authentication;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Text.Encodings.Web;
using System.Threading.Tasks;

namespace OnlineFreelancinPlatform
{
    public class BasicAuthenticationOptions : AuthenticationSchemeOptions
    {

    }

    public class CustomAuthenticationHandler : AuthenticationHandler<BasicAuthenticationOptions>
    {
        private readonly ICustomAuthenticationManager   customAuthenticationManager;

        public CustomAuthenticationHandler(
            IOptionsMonitor<BasicAuthenticationOptions> options, 
            ILoggerFactory logger, 
            UrlEncoder encoder, 
            ISystemClock clock,
            ICustomAuthenticationManager customAuthenticationManager) : base(options, logger, encoder, clock)
        {
            this.customAuthenticationManager = customAuthenticationManager;
        }

        protected override Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            if (!Request.Headers.ContainsKey("Authorization"))
                return Task.FromResult(AuthenticateResult.Fail("Unauthorized"));

            string authorizationHeader = Request.Headers["Authorization"];

            if (string.IsNullOrEmpty(authorizationHeader))
                return Task.FromResult(AuthenticateResult.Fail("Unauthorized"));

            if (!authorizationHeader.StartsWith("bearer", StringComparison.OrdinalIgnoreCase))
                return Task.FromResult(AuthenticateResult.Fail("Unauthorized"));

            string token = authorizationHeader.Substring("bearer".Length).Trim();

            if(string.IsNullOrEmpty(token))
                return Task.FromResult(AuthenticateResult.Fail("Unauthorized"));

            try
            {
                return Task.FromResult(ValidateToken(token));
            }
            catch (Exception)
            {
                return Task.FromResult(AuthenticateResult.Fail("Unauthorized"));
            }
        }

        private AuthenticateResult ValidateToken(string token)
        {
            var validatedToken = customAuthenticationManager.Tokens.FirstOrDefault(t => t.Key == token);

            if(validatedToken.Key == null)
            {
                return AuthenticateResult.Fail("Unauthorized");
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, validatedToken.Value.Item1),
                new Claim(ClaimTypes.Role, validatedToken.Value.Item2)
            };

            var identity = new ClaimsIdentity(claims, Scheme.Name);
            var principle = new GenericPrincipal(identity, new[] { validatedToken.Value.Item2 });
            var ticekt = new AuthenticationTicket(principle, Scheme.Name);

            return AuthenticateResult.Success(ticekt);
        }
    }
}
