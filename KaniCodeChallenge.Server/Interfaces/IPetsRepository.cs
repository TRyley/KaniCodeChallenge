using KaniCodeChallenge.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace KaniCodeChallenge.Interfaces
{
    public interface IPetsRepository
    {
        Task<PetPost> GetPetAsync(int id);

        Task<IEnumerable<PetPost>> GetRecentPetsAsync();

        Task<IEnumerable<PetPost>> GetAllPetsAsync();

        Task<PetPost> AddPostAsync(byte[] content, string imageName);

        Task<PostComment> AddCommentAsync(int postId, int userId, PostComment comment);

        Task VoteUpAsync(int postId, int userId);

        Task VoteDownAsync(int postId, int userId);
    }
}