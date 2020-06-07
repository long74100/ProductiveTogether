using Entities.Models;
using System;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IActionItemRepository : IRepositoryBase<ActionItem>
    {
        Task<ActionItem> GetActionItemByIdAsync(Guid actionItemId);
        void CreateActionItem(ActionItem actionItem);
        void UpdateActionItem(ActionItem actionItem);
    }
}
