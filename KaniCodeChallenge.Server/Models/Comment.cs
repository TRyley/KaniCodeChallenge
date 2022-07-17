using System;

namespace KaniCodeChallenge.Models
{
    public class PostComment
    {
        public int UserId { get; set; }

        public int ImageId { get; set; }

        public string CommentText { get; set; } = "";

        public string DateAdded { get; set; } = "";
    }
}