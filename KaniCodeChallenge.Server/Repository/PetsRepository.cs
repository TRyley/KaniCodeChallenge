using KaniCodeChallenge.Interfaces;
using KaniCodeChallenge.Models;

namespace KaniCodeChallenge.Repository
{
    /// <summary>
    /// Basic in-memory repository layer
    /// </summary>
    public class PetsRepository : IPetsRepository
    {
        private readonly Dictionary<int, PetPost> Posts = new Dictionary<int, PetPost>();
        
        public async Task<PetPost> AddPostAsync(byte[] content, string imageName)
        {
            var id = Posts.Count > 0 ? Posts.Keys.Max() + 1 : 0;

            var post = new PetPost { Id = id, PostName = imageName, FileContent = content };
            Posts[id] = post;

            // temporary await
            return await Task.FromResult(post);
        }

        public async Task<IEnumerable<PetPost>> GetAllPetsAsync()
        {
            return await Task.FromResult(Posts.Values);
        }

        public async Task<PetPost> GetPetAsync(int id)
        {
            PetPost post = Posts[id];
            return await Task.FromResult(post);
        }

        public async Task<IEnumerable<PetPost>> GetRecentPetsAsync()
        {
            // Get the most recent 10 posts from the dictionary
            List<PetPost> mostRecent = new List<PetPost>();

            int maxPosts = Posts.Count > 10 ? 10 : Posts.Count;
            for (var i = 0; i < maxPosts; i++)
            {
                int key = Posts.Keys.Max() - i;
                mostRecent.Add(Posts[key]);
            }
            return await Task.FromResult(mostRecent);
        }

        public async Task<PostComment> AddCommentAsync(int postId, int userId, PostComment comment)
        {
            Posts[postId].Comments.Add(comment);

            return await Task.FromResult(comment);
        }

        public Task VoteUpAsync(int postId, int userId)
        {
            return Task.FromResult(Posts[postId].UpVotes++);
        }

        public Task VoteDownAsync(int postId, int userId)
        {
            return Task.FromResult(Posts[postId].DownVotes++);
        }
    }
}
