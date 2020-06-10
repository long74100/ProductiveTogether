using Entities.FilterModels;
using Entities.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Contracts
{
    public interface IRelationshipRepository: IRepositoryBase<Relationship>
    {
        Task<PagedList<Relationship>> GetAllRelationshipsAsync(RelationshipParameters relationshipParameters);
        Task<Relationship> GetRelationshipByIdAsync(Guid relationshipId);
        void UpdateRelationship(Relationship relationship);
        void CreateRelationship(Relationship relationship);
    }
}
