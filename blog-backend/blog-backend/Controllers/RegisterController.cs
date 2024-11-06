using blog_backend.Data;
using blog_backend.DTO;
using blog_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace blog_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RegisterController : ControllerBase
    {
        private readonly IRepo<User> _repo;
        public RegisterController(IRepo<User> repo)
        {
            _repo = repo;
        }
        [HttpPost]
        public async Task<IResult> Register([FromBody] RegisterDto model)
        {
            if (!ModelState.IsValid)
            {
                return Results.BadRequest(ModelState);
            }
            var existingUser = await _repo.FindByConditionAsync(u => u.Email == model.Email || u.UserName == model.UserName);
            if (existingUser.Any())
            {
                return Results.Conflict("A user with this email or username already exists.");
            }

            var user = new User
            {
                UserName = model.UserName,
                Email = model.Email,
                Password= model.Password,
                ConfirmPassword= model.ConfirmPassword,
            };
            await _repo.AddAsync(user);
            await _repo.SaveChangesAsync();

            return Results.Ok("Registration successful.");

        }
        [HttpGet]
        public async Task<IResult> GetAllUsers()
        {
            var users = await _repo.GetAll();
            if (users == null || !users.Any())
            {
                return Results.NotFound("No users found.");
            }

            return Results.Ok(users);
        }

    }
}
