using Contracts;
using Entities;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly RepositoryContext _repositoryContext;
        private IGoalRepository _goal;
        private IGoalTaskRepository _goalTask;

        public RepositoryWrapper(RepositoryContext repositoryContext)
        {
            _repositoryContext = repositoryContext;
        }

        public IGoalRepository Goal
        {
            get
            {
                if (_goal == null)
                {
                    _goal = new GoalRepository(_repositoryContext);
                }

                return _goal;
            }
        }

        public IGoalTaskRepository GoalTask
        {
            get
            {
                if (_goalTask == null)
                {
                    _goalTask = new GoalTaskRepository(_repositoryContext);
                }

                return _goalTask;
            }
        }

        public void save()
        {
            throw new NotImplementedException();
        }
    }
}
