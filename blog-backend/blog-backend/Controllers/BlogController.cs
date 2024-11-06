using blog_backend.Data;
using blog_backend.DTO;
using blog_backend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace blog_backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BlogController : ControllerBase
    {
        private readonly IRepo<Blog> _blog;
        public BlogController(IRepo<Blog> blog)
        {
            _blog = blog;
        }
        [HttpGet]
        public async Task<ActionResult> GetBlogList()
        {
            var blogList = await _blog.GetAll();
            return Ok(blogList);
        }
        [HttpGet("{id}")]
        public async Task<ActionResult> GetBlog([FromRoute] int id)
        {
            var blog = await _blog.GetById(id);
            return Ok(blog);
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult> AddBlog([FromBody] BlogDto model)
        {
            var blog = new Blog()
            {
                CategoryId = model.CategoryId,
                Content = model.Content,
                IsFeatured = model.IsFeatured,
                Image = model.Image,
                Title = model.Title,
                Description = model.Description,
            };
            await _blog.AddAsync(blog);
            await _blog.SaveChangesAsync();
            return Ok(model);
        }
        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBlog([FromRoute] int id, [FromBody] BlogDto model)
        {
            var blog = await _blog.GetById(id);
            if (blog == null)
            {
                return NotFound($"Blog with id {id} not found.");
            }
            blog.Description = model.Description;
            blog.Title = model.Title;
            blog.IsFeatured = model.IsFeatured;
            blog.Image = model.Image;
            blog.Content = model.Content;

            await _blog.UpdateAsync(blog, id);
            await _blog.SaveChangesAsync();

            return Ok(model);

        }
        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteBlog([FromRoute] int id)
        {
            await _blog.DeleteAsync(id);
            await _blog.SaveChangesAsync();
            return Ok();
        }
        [HttpGet("featured")]
        public async Task<ActionResult> GetBlogFeatureList()
        {
            var blogList = await _blog.GetAll(x=> x.IsFeatured== true);
            return Ok(blogList);
        }

    }
}
