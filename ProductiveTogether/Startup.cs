using AutoMapper;
using Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using ProductiveTogether.API.Extensions;
using Serilog;
using Swashbuckle.AspNetCore.Swagger;

namespace ProductiveTogether
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

            services.AddControllers();

            // Swagger
            services.ConfigureSwagger();

            // CORS
            services.ConfigureCors();

            // Db context
            services.ConfigureMySqlContext(Configuration);

            // Repository
            services.ConfigureRepositoryWrapper();

            // Logging
            services.ConfigureLogging();

            // Automapper
            services.AddAutoMapper(typeof(Startup));

            // Jwt
            services.ConfigureIdentity();
            services.ConfigureJwt(Configuration);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, RepositoryContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                context.Database.EnsureDeleted();
                context.Database.EnsureCreated();
            } else
            {
                context.Database.Migrate();
            }

            // Enable middleware to serve generated Swagger as a JSON endpoint.
            app.UseSwagger();

            // Enable middleware to serve swagger-ui (HTML, JS, CSS, etc.),
            // specifying the Swagger JSON endpoint.
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "ProductiveTogether API V1");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseSerilogRequestLogging();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
