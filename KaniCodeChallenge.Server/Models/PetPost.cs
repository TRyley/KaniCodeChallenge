using System;
using System.Collections.Generic;

namespace KaniCodeChallenge.Models
{
    public class PetPost
    {
        public int Id { get; set; }

        public DateTime DateAdded { get; set; } = DateTime.Now;

        public string PostName { get; set; } = "";

        public byte[] FileContent { get; set; } = Array.Empty<byte>();

        public List<PostComment> Comments { get; set; } = new List<PostComment>();

        public int UpVotes { get; set; } = 0;

        public int DownVotes { get; set; } = 0;
    }
}
