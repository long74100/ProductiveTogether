using AutoMapper;
using Entities.DataTransferObjects;
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
            CreateMap<Goal, GoalDto>();
            CreateMap<GoalTask, GoalTaskDto>();
            CreateMap<GoalForCreationDto, Goal>();
            CreateMap<UserForCreation, User>();
            CreateMap<UserForLogin, User>();
        }
    }
}
