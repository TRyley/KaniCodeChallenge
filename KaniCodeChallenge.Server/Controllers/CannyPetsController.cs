using KaniCodeChallenge.Interfaces;
using KaniCodeChallenge.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;

namespace KaniCodeChallenge.Controllers
{

[ApiController]
[Route("[controller]")]
public class CannyPetsController : ControllerBase
{
    private readonly ILogger<CannyPetsController> _logger;
    private readonly IPetsRepository _petsRepository;

    public CannyPetsController(ILogger<CannyPetsController> logger, IPetsRepository petsRepository)
    {
        _logger = logger;
        _petsRepository = petsRepository;
    }


    [HttpGet("GetById/{id}")]
    public async Task<PetPost> GetById(int id)
    {
        return await _petsRepository.GetPetAsync(id);
    }

    [HttpGet("GetRecent")]
    public async Task<IEnumerable<PetPost>> GetRecent()
    {
        return await _petsRepository.GetRecentPetsAsync();
    }

    [HttpGet("GetAll")]
    public async Task<IEnumerable<PetPost>> GetAll()
    {
       return await _petsRepository.GetAllPetsAsync();
    }

    [HttpGet("Image/{Id}")]
    public async Task<ActionResult> GetImage(int Id)
    {
            Console.WriteLine($"Received request to return image with Id {Id}");
        //Note: this assumes all posts bytestreams are jpegs, either restrict this on upload or alter the backend to correctly serve other image formats
        var post = await _petsRepository.GetPetAsync(Id);
        return base.File(post.FileContent, "image/jpeg", $"{post.Id}.jpg");
    }

    [HttpPost("AddImage")]
    public async Task<PetPost> PostImage([FromForm] IFormFile Image)
    {
        Console.WriteLine($"Received file {Image.FileName}");
        byte[] arr;
        string fileName = Image.FileName.Replace(".jpg", "");
        using (var ms = new MemoryStream())
        {
            Image.CopyTo(ms);
            arr = ms.ToArray();
        }
        return await _petsRepository.AddPostAsync(arr, fileName);
    }

    [HttpPut("AddComment")]
    public async Task AddCommentAsync([FromBody]PostComment comment)
    {
            Console.WriteLine($"Adding comment to post with id {comment.ImageId}");
            await _petsRepository.AddCommentAsync(comment.ImageId, GetUserId(), comment);
    }

    [HttpPut("VoteUp")]
    public async Task VoteUpAsync([FromBody]int postId)
    {
        await _petsRepository.VoteUpAsync(postId, GetUserId());
    }

    [HttpPut("VoteDown")]
    public async Task VoteDownAsync([FromBody]int postId)
    {
        await _petsRepository.VoteDownAsync(postId, GetUserId());
    }


    private int GetUserId()
    {
        // Just a mock implementation, no need to implement login/security cookies as part of this challenge 
        return 1;
    }
}

}
