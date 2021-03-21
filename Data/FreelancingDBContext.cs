using Microsoft.EntityFrameworkCore;
using OnlineFreelancinPlatform.Model;

namespace OnlineFreelancinPlatform.Data
{
    public class FreelancingDBContext: DbContext
    {
        public FreelancingDBContext(DbContextOptions<FreelancingDBContext> options) : base(options)
        {

        }


        //protected override void onconfiguring(dbcontextoptionsbuilder optionsbuilder)
        //{
        //    optionsbuilder.usesqlserver(@"server=.\sqlexpress;database=test1;trusted_connection=true;");
        //}

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //}
        public DbSet<Admin> Admins { get; set; }
        public DbSet<Message> Messages { get; set; }
        public DbSet<OrderDetail> OrderDetails { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<EmployeeModel> Employers { get; set; }
    }
}
