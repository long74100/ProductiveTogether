using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Serilog;
using Entities.DataTransferObjects;
using Entities.Models;
using Helpers.Auth;
using Contracts;
using AutoMapper;

namespace ProductiveTogether.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticateController : ControllerBase
    {
        private readonly ILogger _logger;
        private readonly IRepositoryWrapper _repository;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;


        public AuthenticateController(ILogger logger, IRepositoryWrapper repository, IConfiguration configuration, IMapper mapper)
        {
            _logger = logger;
            _repository = repository;
            _configuration = configuration;
            _mapper = mapper;
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> Refresh(string token, string refreshToken)
        {
            var principal = AuthHelpers.GetPrincipalFromExpiredToken(token, _configuration);
            var username = principal.Identity.Name;

            var user = await _repository.User.GetUserByUsernameAsync(username);

            var userRefreshToken = await _repository.Token.GetTokenByIdAsync(refreshToken);

            if (userRefreshToken == null)
            {
                throw new SecurityTokenException("Invalid refresh token");
            }

            var newJwtToken = AuthHelpers.GenerateToken(user, _configuration);
            var newRefreshToken = AuthHelpers.GenerateRefreshToken();

            // support one refresh token per user for now
            _repository.Token.DeleteToken(userRefreshToken);
            await _repository.SaveAsync();

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(newJwtToken),
                refreshToken = newRefreshToken
            });
        }


        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto model)
        {
            var user = await _repository.User.GetUserByUsernameAsync(model.UserName);
            if (user != null && await _repository.User.CheckPasswordAsync(user, model.Password))
            {

                var token = AuthHelpers.GenerateToken(user, _configuration);

                var refreshToken = new Token
                {
                    Id = AuthHelpers.GenerateRefreshToken(),
                    Type = Token.TokenType.Refresh,
                    UserId = user.Id
                };

                _repository.Token.CreateToken(refreshToken);
                await _repository.SaveAsync();

                return Ok(new
                {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    refreshToken = refreshToken.Id,
                    expiration = token.ValidTo
                }); 
            }
            return Unauthorized();
        }

        [HttpGet]
        [Route("me")]
        public async Task<IActionResult> Me()
        {
            var username = HttpContext.User.Identity.Name;
            var user = await _repository.User.GetUserByUsernameAsync(username);
            var userResult = _mapper.Map<User>(user);
            return Ok(userResult);
        }
    }
}
