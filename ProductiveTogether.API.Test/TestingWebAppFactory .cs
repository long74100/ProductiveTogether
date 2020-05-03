using Entities;
using Entities.DataTransferObjects;
using Entities.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Hosting.Internal;
using Serilog;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Text;

namespace ProductiveTogether.API.Tests
{
    public class TestingWebAppFactory<T> : WebApplicationFactory<Startup>
    {
        //DbConnection _connection;

        protected override IHostBuilder CreateHostBuilder()
        {
            var builder = Host.CreateDefaultBuilder()
                .UseSerilog()
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>().UseTestServer();
                })
                .ConfigureHostConfiguration(config =>
                {
                    config
                    .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                    .AddEnvironmentVariables();
                })
                .ConfigureAppConfiguration((hostingContext, config) =>
                {
                    config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: false);
                });

            return builder;
        }

        protected override void ConfigureWebHost(IWebHostBuilder builder)
        {
            builder.ConfigureServices(services =>
            {

                var descriptor = services.FirstOrDefault(
                  d => d.ServiceType ==
                     typeof(DbContextOptions<RepositoryContext>));

                if (descriptor != null)
                {
                    services.Remove(descriptor);
                }

                var serviceProvider = new ServiceCollection()
                  .AddEntityFrameworkInMemoryDatabase()
                  .BuildServiceProvider();

                services.AddDbContext<RepositoryContext>(options =>
                {
                    //var connection = CreateInMemoryDatabase();
                    //_connection = connection;
                    //options.UseSqlite(connection);
                    options.UseInMemoryDatabase("InMemoryTest");
                    options.UseInternalServiceProvider(serviceProvider);
                });

                var sp = services.BuildServiceProvider();

                using var scope = sp.CreateScope();
                using (var appContext = scope.ServiceProvider.GetRequiredService<RepositoryContext>())
                {
                    try
                    {
                        appContext.Database.EnsureDeleted();
                        appContext.Database.EnsureCreated();
                        SeedDb(appContext);
                    }
                    catch (Exception ex)
                    {
                        //Log errors or do anything you think it's needed
                        throw;
                    }
                }
            });
        }


        private void SeedDb(RepositoryContext context)
        {
            var hasher = new PasswordHasher<User>();
            User user = new User
            {
                Id = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
                UserName = "testuser",
                FirstName = "first",
                LastName = "last",
                NormalizedUserName = "admin",
                Email = "tester@nonce.fake",
                NormalizedEmail = "tester@nonce.fake",
                EmailConfirmed = true,
                PasswordHash = hasher.HashPassword(null, "Password123@"),
                SecurityStamp = string.Empty
            };
            context.Set<User>().Add(user);
        }
        /**
        private static DbConnection CreateInMemoryDatabase()
        {
            var connection = new SqliteConnection("Data Source=:memory:;");

            connection.Open();

            return connection;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _connection.Close();
            }

            base.Dispose(disposing);
        }
        **/

    }
}
