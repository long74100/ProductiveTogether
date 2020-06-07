using Contracts;
using Entities;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class ActionItemRepository : RepositoryBase<ActionItem>, IActionItemRepository
    {
        public ActionItemRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public async Task<ActionItem> GetActionItemByIdAsync(Guid actionItemId)
        {
            return await FindByCondition(actionItem => actionItem.Id.Equals(actionItemId)).FirstOrDefaultAsync();
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
