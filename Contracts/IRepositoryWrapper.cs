﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRepositoryWrapper
    {
        IGoalRepository Goal { get; }
        IGoalTaskRepository GoalTask { get; }
        Task SaveAsync();
    }
}