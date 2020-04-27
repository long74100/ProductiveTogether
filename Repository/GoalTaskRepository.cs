﻿using Contracts;
using Entities;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class GoalTaskRepository : RepositoryBase<GoalTask>, IGoalTaskRepository
    {
        public GoalTaskRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }
    }
}
