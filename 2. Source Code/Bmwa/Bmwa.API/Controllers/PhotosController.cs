using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Data.Repositories;
using Bmwa.API.Dtos;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Bmwa.API.Controllers
{
    [Authorize]
    [Route("api/admins/{adminId}/photos")]
    [ApiController]
    public class PhotosController : ControllerBase
    {
        private readonly IAdminRepository _repo;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public PhotosController(IAdminRepository repo, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        [HttpGet("{id}", Name = "GetPhoto")]
        public async Task<IActionResult> GetPhoto(int id)
        {
            var photoFromRepo = await _repo.GetPhoto(id);

            var photoForReturn = _mapper.Map<PhotoForReturnDto>(photoFromRepo);

            return Ok(photoForReturn);
        }

        [HttpPost]
        public async Task<IActionResult> AddPhotoForUser(int adminId, [FromForm]PhotoForCreationDto photoForCreationDto)
        {
            if (adminId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
            {
                return Unauthorized();
            }

            var userFromRepo = await _repo.GetAdmin(adminId);

            // Upload file to https://res.cloudinary.com/
            var file = photoForCreationDto.File;
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            photoForCreationDto.Url = uploadResult.Uri.ToString();
            photoForCreationDto.PublicId = uploadResult.PublicId;

            var photo = _mapper.Map<Photo>(photoForCreationDto);

            if (!userFromRepo.Photos.Any(u => u.IsMain))
            {
                photo.IsMain = true;
            }

            userFromRepo.Photos.Add(photo);

            if (await _repo.SaveAll())
            {
                var photoForReturn = _mapper.Map<PhotoForReturnDto>(photo);

                return CreatedAtRoute("GetPhoto", new { id = photo.Id }, photoForReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("{id}/setMain")]
        public async Task<IActionResult> SetMainPhoto(int adminId, int id)
        {
            if (adminId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetAdmin(adminId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();

            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("This is already the main photo");

            Photo currentMainPhoto = await _repo.GetMainPhotoForAdmin(adminId);
            currentMainPhoto.IsMain = false;
            photoFromRepo.IsMain = true;

            if (await _repo.SaveAll())
                return NoContent();
            
            return BadRequest("Could not set photo to main");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhoto(int adminId, int id) {
            if (adminId != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var user = await _repo.GetAdmin(adminId);

            if (!user.Photos.Any(p => p.Id == id))
                return Unauthorized();
            
            var photoFromRepo = await _repo.GetPhoto(id);

            if (photoFromRepo.IsMain)
                return BadRequest("This is already the main photo");

            if (photoFromRepo.PublicId != null)
            {
                var deleteParams = new DeletionParams(photoFromRepo.PublicId);

                var result = await _cloudinary.DestroyAsync(deleteParams);

                if (result.Result == "ok")
                {
                    _repo.Delete(photoFromRepo);
                }
            }

            if (photoFromRepo.PublicId == null) {
                _repo.Delete(photoFromRepo);
            }

            if (await _repo.SaveAll())
            {
                return Ok();
            }

            return BadRequest("Failed to delete the photo");
        }
    }
}