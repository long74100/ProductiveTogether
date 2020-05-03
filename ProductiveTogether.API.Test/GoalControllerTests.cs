using Entities.Models;
using Newtonsoft.Json;
using ProductiveTogether.API.Tests;
using System;
using System.Net;
using System.Net.Http;
using System.Text;
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
        public async void GET_GetAll_Success(string url)
        {
            // Act
            var response = await _client.GetAsync(url);

            // Assert1
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);

            // Assert2
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [InlineData("/api/goals/08d7ef89-4bb8-4058-8c6f-3a31968b2e77")]
        public async void GET_GetById_NoSuchGoal_NotFound(string url)
        {
            // Act
            var response = await _client.GetAsync(url);

            // Assert1
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);

            // Assert2
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }

        [Theory]
        [InlineData("/api/goals")]
        public async void POST_CreateGoal_ValidInput_Success(string url)
        {
            var goal = new Goal
            {
                GoalType = GoalType.Daily,
                Date = DateTime.Now,
                UserId = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee"
            };

            var jsonObject = JsonConvert.SerializeObject(goal);
            var goalContent = new StringContent(jsonObject, Encoding.UTF8, "application/json");

            // Act
            var response = await _client.PostAsync(url, goalContent);

            // Assert1
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);

            // Assert2
            Assert.Equal("application/json; charset=utf-8",
                response.Content.Headers.ContentType.ToString());
        }


    }
}
