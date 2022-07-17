using KaniCodeChallenge.Interfaces;
using KaniCodeChallenge.Repository;
using KaniCodeChallenge.Models;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace KaniCodeChallenge.Tests
{
    [TestClass]
    public class RepositoryTests
    {
        private async Task<IPetsRepository> TestSetup(int numOfImages)
        {
            IPetsRepository repo = new PetsRepository();

            for (var i = 1; i <= numOfImages; i++)
            {
                await repo.AddPostAsync(new byte[] { (byte)i, 2, 3, 4, (byte)i }, $"Test_Image_{i}");
            }

            return repo;
        }

        [TestMethod]
        public async Task AddingAddPostAsync_AddsPost()
        {
            IPetsRepository repo = new PetsRepository();

            var addedPost = await repo.AddPostAsync(new byte[] { 1, 2, 3, 4, 5 }, "Test_Image");

            Assert.AreEqual(0, addedPost.Id);
            Assert.AreEqual("Test_Image", addedPost.PostName);
        }

        [TestMethod]
        public async Task GetAllPetsAsync_ReturnsAllPets()
        {
            IPetsRepository repo = await TestSetup(2);

            var allPets = (await repo.GetAllPetsAsync()).ToList();

            Assert.AreEqual(2, allPets.Count());
            Assert.AreEqual(1, allPets[1].Id);
            Assert.AreEqual("Test_Image_2", allPets[1].PostName);
        }

        [TestMethod]
        public async Task GetPetAsync_ReturnsCorrectPet()
        {
            IPetsRepository repo = await TestSetup(3);

            var pet = await repo.GetPetAsync(1);

            Assert.AreEqual(1, pet.Id);
            Assert.AreEqual("Test_Image_2", pet.PostName);
        }

        [TestMethod]
        public async Task GetRecentPetsAsync_Returns10Posts()
        {
            IPetsRepository repo = await TestSetup(11);

            var pets = await repo.GetRecentPetsAsync();

            Assert.AreEqual(10, pets.Count());
        }

        [TestMethod]
        public async Task GetRecentPetsAsync_ReturnsMostRecentPosts()
        {
            IPetsRepository repo = await TestSetup(11);

            var pets = await repo.GetRecentPetsAsync();

            foreach (var pet in pets)
            {
                Assert.AreNotEqual("Test_Image_1", pet.PostName);
            }
        }

        [TestMethod]
        public async Task AddCommentAsync_AddsACommentToTheCorrectPost()
        {
            IPetsRepository repo = await TestSetup(3);

            int postId = 1;
            int userId = 5;
            string text = "test comment 1";
            PostComment comment = new PostComment
            {
                UserId = userId,
                CommentText = text,
                ImageId = postId
            };

            await repo.AddCommentAsync(postId, userId, comment);

            PetPost actual = await repo.GetPetAsync(postId);
            Assert.AreEqual(1, actual.Comments.Count);
        }

        [TestMethod]
        public async Task AddCommentAsync_HasCorrectUserId()
        {
            IPetsRepository repo = await TestSetup(3);

            int postId = 1;
            int userId = 8;
            string text = "test comment 1";
            PostComment comment = new PostComment
            {
                UserId = userId,
                CommentText = text,
                ImageId = postId
            };

            await repo.AddCommentAsync(postId, userId, comment);

            PetPost actual = await repo.GetPetAsync(postId);
            Assert.AreEqual(userId, actual.Comments.First().UserId);
        }

        [TestMethod]
        public async Task AddCommentAsync_HasCorrectPostId()
        {
            IPetsRepository repo = await TestSetup(3);

            int postId = 2;
            int userId = 5;
            string text = "test comment 1";
            PostComment comment = new PostComment
            {
                UserId = userId,
                CommentText = text,
                ImageId = postId
            };

            await repo.AddCommentAsync(postId, userId, comment);

            PetPost actual = await repo.GetPetAsync(postId);
            Assert.AreEqual(postId, actual.Comments.First().ImageId);
        }

        [TestMethod]
        public async Task AddCommentAsync_HasCorrectText()
        {
            IPetsRepository repo = await TestSetup(3);

            int postId = 1;
            int userId = 5;
            string text = "different comment";
            PostComment comment = new PostComment
            {
                UserId = userId,
                CommentText = text,
                ImageId = postId
            };

            await repo.AddCommentAsync(postId, userId, comment);

            PetPost actual = await repo.GetPetAsync(postId);
            Assert.AreEqual(text, actual.Comments.First().CommentText);
        }

        [TestMethod]
        public async Task VoteUpAsync_IncreasesUpVotesByOne()
        {
            IPetsRepository repo = await TestSetup(3);

            int postId = 0;
            int userId = 3;

            await repo.VoteUpAsync(postId, userId);

            PetPost actual = await repo.GetPetAsync(postId);
            Assert.AreEqual(1, actual.UpVotes);
        }

        [TestMethod]
        public async Task VoteDownAsync_IncreasesDownVotesByOne()
        {
            IPetsRepository repo = await TestSetup(3);

            int postId = 0;
            int userId = 3;

            await repo.VoteDownAsync(postId, userId);

            PetPost actual = await repo.GetPetAsync(postId);
            Assert.AreEqual(1, actual.DownVotes);
        }
    }
}