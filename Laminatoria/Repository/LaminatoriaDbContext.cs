using Laminatoria.Models;
using Microsoft.EntityFrameworkCore;

namespace Laminatoria.Repository
{
    public class LaminatoriaDbContext: DbContext
    {
        public LaminatoriaDbContext(DbContextOptions<LaminatoriaDbContext> opts): base(opts)  { }

        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
    }
}
