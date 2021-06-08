
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MailKit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.FileProviders;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using OnlineFreelancinPlatform.Data;
using OnlineFreelancinPlatform.Hubs;
using OnlineFreelancinPlatform.Model;
using OnlineFreelancinPlatform.Services;
using OnlineFreelancinPlatform.Settings;

namespace OnlineFreelancinPlatform
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // services.AddCors();

            services.AddCors(options =>
            {
                options.AddPolicy("ClientPermission", policy =>
                {
                    policy.AllowAnyHeader()
                        .AllowAnyMethod()
                        .WithOrigins("http://localhost:3000")
                        .AllowCredentials();
                });
            });

            services.AddMvc();
            services.AddControllers();
            services.AddSignalR();
            services.AddTransient<Services.IMailService, Services.MailService>();

            //services.AddAuthentication(x =>
            //{
            //    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            //    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            //}).AddJwtBearer(x => 
            //{
            //    x.RequireHttpsMetadata = false;
            //    x.SaveToken = true;
            //    x.TokenValidationParameters = new TokenValidationParameters
            //    {
            //        ValidateIssuerSigningKey = true,
            //        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.ASCII.GetBytes(key)),
            //        ValidateIssuer = false,
            //        ValidateAudience = false
            //    };
            //});

            // services.AddSingleton<IJwtAuthenticationManager>(new JwtAuthenticationManager(key));

            //services.AddAuthentication("Basic")
            //    .AddScheme<BasicAuthenticationOptions, CustomAuthenticationHandler>
            //    ("Basic", null);

            //services.AddSingleton<ICustomAuthenticationManager, CustomAuthenticationManager>();

            services.AddControllers().AddNewtonsoftJson();

            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IOrderDetailService, OrderDetailService>();
            services.AddScoped<IOrderService, OrderService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IGigService, GigService>();

            services.AddDbContext<FreelancingDBContext>(
                //options => options.UseSqlServer(@"Server=.\SQLEXPRESS;Database=Test1;Trusted_Connection=True;")
                options => options.UseSqlServer(Configuration.GetConnectionString("FreelancingDatabse"))
                ); ;

            var jwtSection = Configuration.GetSection("JWTSettings");
            services.Configure<JWTSettings>(jwtSection);

            services.Configure<MailSettings>(Configuration.GetSection("MailSettings"));
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseCors("ClientPermission");

            //app.UseCors(x => x
            //    .AllowAnyOrigin()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader());

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(Path.Combine(env.ContentRootPath, "Images")),
                RequestPath = "/Images"
            });

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapHub<ChatHub>("/hubs/chat");
            });
        }
    }
}
