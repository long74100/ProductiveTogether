using Entities.Models;

namespace Contracts
{
    public interface IActionItemRepository : IRepositoryBase<ActionItem>
    {
        void CreateActionItem(ActionItem actionItem);
    }
}
