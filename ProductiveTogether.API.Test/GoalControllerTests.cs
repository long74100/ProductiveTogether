using ProductiveTogether.API.Tests;
using System;
using System.Net;
using System.Net.Http;
using Xunit;

namespace ProductiveTogether.API.Test
{
    public class GoalsControllerIntegrationTests : IClassFixture<TestingWebAppFactory<Startup>>
    {
        private readonly HttpClient _client;

        public GoalsControllerIntegrationTests(TestingWebAppFactory<Startup> factory)
        {
            _client = factory.CreateClient();
        }

        [Theory]
        [InlineData("/api/goals")]
        [InlineData("/api/goals/08d7ef89-4bb8-4058-8c6f-3a31968b2e77")]
            public async void Get_GetAll_Valid_Success(string url)
        {
            // Act
            var response = await _client.GetAsync(url);
            // Assert1
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            // Assert2
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }
    }
}
