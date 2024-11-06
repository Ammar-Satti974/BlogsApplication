using blog_backend.Data;
using blog_backend.DTO;
using blog_backend.Models;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace blog_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly IRepo<User> _repo;
        public LoginController(IRepo<User> repo)
        {
            _repo = repo;
        }
        [HttpPost]
        public async Task<IResult> Login([FromBody] AuthDto model)
        {
            var user= (await _repo.GetAll(x=> x.Email==model.Email)).FirstOrDefault();
            if(user is not null && user.Password == model.Password)
            {
                var claimsPrinciple = new ClaimsPrincipal(
                    new ClaimsIdentity(
                        new[] { new Claim(ClaimTypes.Name, model.Email) },
                        BearerTokenDefaults.AuthenticationScheme
                        )
                    );
                return Results.SignIn( claimsPrinciple);
            }
            else
            {
                return Results.BadRequest();
            }

        }
    }
}
