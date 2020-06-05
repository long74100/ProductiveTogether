using Contracts;
using Entities;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Repository
{
    public class ActionItemRepository : RepositoryBase<ActionItem>, IActionItemRepository
    {
        public ActionItemRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public void CreateActionItem(ActionItem actionItem)
        {
            Create(actionItem);
        }

        public void UpdateActionItem(ActionItem actionItem)
        {
            Update(actionItem);
        }
    }
}
