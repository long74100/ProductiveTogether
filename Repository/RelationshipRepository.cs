using Contracts;
using Entities;
using Entities.FilterModels;
using Entities.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Repository
{
    public class RelationshipRepository : RepositoryBase<Relationship>, IRelationshipRepository
    {
        public RelationshipRepository(RepositoryContext repositoryContext) : base(repositoryContext)
        {
        }

        public void CreateRelationship(Relationship relationship)
        {
            Create(relationship);
        }

        public async Task<PagedList<Relationship>> GetAllRelationshipsAsync(RelationshipParameters relationshipParameters)
        {
            var userId = relationshipParameters.UserId;
            var status = relationshipParameters.Status;

            return await PagedList<Relationship>.ToPagedListAsync(
                FindByCondition(r => 
                    (userId == null || (r.User1Id == userId || r.User2Id == userId)) &&
                    (status == null || r.Status == status)),
                    relationshipParameters.Page,
                    relationshipParameters.PageSize);
        }

        public async Task<Relationship> GetRelationshipByIdAsync(Guid relationshipId)
        {
            return await FindByCondition(r => r.Id == relationshipId).FirstOrDefaultAsync();
        }

        public void UpdateRelationship(Relationship relationship)
        {
            Update(relationship);
        }
    }
}
