using AutoMapper;
using Entities.DataTransferObjects;
using Entities.Models;

namespace ProductiveTogether.API
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Goal
            CreateMap<Goal, GoalDto>();
            CreateMap<GoalForCreationDto, Goal>();

            // Goal Task
            CreateMap<ActionItem, ActionItemDto>();
            CreateMap<ActionItemForCreationDto, ActionItem>();

            // User
            CreateMap<User, UserDto>();
            CreateMap<UserForCreationDto, User>();
            CreateMap<UserForLoginDto, User>();
        }
    }
}
