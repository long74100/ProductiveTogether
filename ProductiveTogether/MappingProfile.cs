using AutoMapper;
using Entities.DataTransferObjects;
using Entities.DataTransferObjects.GoalTask;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            CreateMap<GoalTask, GoalTaskDto>();
            CreateMap<GoalTaskForCreationDto, GoalTask>();

            // User
            CreateMap<User, UserDto>();
            CreateMap<UserForCreationDto, User>();
            CreateMap<UserForLoginDto, User>();
        }
    }
}
