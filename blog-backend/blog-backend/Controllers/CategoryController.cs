using blog_backend.Data;
using blog_backend.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace blog_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly IRepo<Category> _repo;
        public CategoryController(IRepo<Category> repo)
        {
            _repo = repo;
        }
        [HttpGet]
        public async Task <ActionResult> GetAllCategory()
        {
            var categoryList = await _repo.GetAll();
            return Ok(categoryList);
        }
    }
}
