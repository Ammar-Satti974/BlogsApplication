
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace blog_backend.Data
{
    public class Repo<T> : IRepo<T> where T : class
    {
        private readonly AppDbContext dbcontext;
        public Repo(AppDbContext _dbContext)
        {
            dbcontext = _dbContext;
        }
        public async Task AddAsync(T entity)
        {
            await dbcontext.Set<T>().AddAsync(entity);
        }

        public async Task DeleteAsync(int id)
        {
            var entity = await dbcontext.Set<T>().FindAsync(id);
            dbcontext.Set<T>().Remove(entity);
        }

        public async Task<T> GetById(int id)
        {
            return await dbcontext.Set<T>().FindAsync(id);
        }

        public async Task<List<T>> GetAll()
        {
            return await dbcontext.Set<T>().ToListAsync();
        }

        public async Task SaveChangesAsync()
        {
            await dbcontext.SaveChangesAsync();
        }

        public async Task UpdateAsync(T entity, int id)
        {
            var existingEntity = await dbcontext.Set<T>().FindAsync(id);
            if (existingEntity != null) {
                dbcontext.Entry(existingEntity).CurrentValues.SetValues(entity);
            }
            else
            {
                throw new KeyNotFoundException($"Entity with id {id} not found.");
            }
           
        }

        public async Task<List<T>> GetAll(Expression<Func<T, bool>> filter)
        {
            return await dbcontext.Set<T>().Where(filter).ToListAsync();
        }

        public async Task<IEnumerable<T>> FindByConditionAsync(Expression<Func<T, bool>> expression)
        {
            return await dbcontext.Set<T>().Where(expression).ToListAsync();
        }
    }
}
