using System;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Bmwa.API.Dtos.Student;
using Bmwa.API.Models;
using Bmwa.API.Utils;
using Bmwa.API.Utils.Params;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Bmwa.API.Data.Repositories
{
    public interface IStudentRepository
    {
        Task<bool> SaveAll();
        Task<PagedList<Student>> GetStudents(StudentParams studentParams);
        Task<Student> GetStudent(int id);
        Task<string> Update(int id, StudentForDetailDto studentForDetailDto);
        Task<string> Add(Student student);
        Task<string> Delete(int id);
    }
    public class StudentRepository : IStudentRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public StudentRepository(DataContext context, IMapper mapper, IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _context = context;
            _mapper = mapper;
            _cloudinaryConfig = cloudinaryConfig;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }

        public async Task<Student> GetStudent(int id)
        {
            return await _context.Students.FirstOrDefaultAsync(s => s.Id == id && s.IsShown == true);
        }

        public async Task<PagedList<Student>> GetStudents(StudentParams studentParams)
        {
            var students = _context.Students.Where(s => s.IsShown == true);

            if (studentParams.Name != null)
                students = _context.Students.Where(s => s.Name.Contains(studentParams.Name));

            if (studentParams.IdentityNumber != null)
                students = _context.Students.Where(s => s.IdentityNumber.Contains(studentParams.IdentityNumber));

            if (studentParams.InterviewTime != TimeSpan.MinValue)
                students = _context.Students.Where(s => s.InterviewTime >= studentParams.InterviewTime);

            if (studentParams.Status == 1 || studentParams.Status == 0 || studentParams.Status == 2)
                students = _context.Students.Where(s => s.Status == studentParams.Status);

            if (studentParams.InterviewId != -1)
                students = _context.Students.Where(s => s.InterviewId == studentParams.InterviewId);

            return await PagedList<Student>
                .CreateAsync(students, studentParams.PageNumber, studentParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            var res = await _context.SaveChangesAsync();
            return res > 0;
        }

        public async Task<string> Update(int id, StudentForDetailDto studentForDetailDto)
        {
            var studentFromDB = await GetStudent(id);

            if (studentFromDB == null)
                return "Cannot find this student";

            // if studentForDetailDto.Photo != null --> Old photo --> Not update photo
            if (studentForDetailDto.Photo != null)
            {
                // Upload file to https://res.cloudinary.com/
                var file = studentForDetailDto.Photo;
                var uploadResult = new ImageUploadResult();

                if (file.Length > 0 || file != null)
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
                // Save to DB
                studentFromDB.PhotoUrl = uploadResult.Uri.ToString();
                studentFromDB.PhotoPublicId = uploadResult.PublicId;
            }

            // If studentForDetailDto.PhotoUrl != null --> Old Photo --> Not update
            if (studentForDetailDto.PhotoUrl == null)
            {
                if (studentFromDB.PhotoPublicId != null)
                {
                    var deleteParams = new DeletionParams(studentFromDB.PhotoPublicId);

                    var result = await _cloudinary.DestroyAsync(deleteParams);

                    if (result.Result != "ok")
                    {
                        return "Cannot update photo";
                    }
                }
            }

            // Save to DB, not update registerDate and isShown
            studentFromDB.Name = studentForDetailDto.Name;
            studentFromDB.IdentityNumber = studentForDetailDto.IdentityNumber;
            studentFromDB.InterviewTime = studentForDetailDto.InterviewTime;
            studentFromDB.Status = studentForDetailDto.Status;
            studentFromDB.Remark = studentForDetailDto.Remark;
            studentFromDB.Phone = studentForDetailDto.Phone;
            studentFromDB.Email = studentForDetailDto.Email;
            studentFromDB.Address = studentForDetailDto.Address;

            _context.Students.Update(studentFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }

        public Task<string> Add(Student student)
        {
            throw new System.NotImplementedException();
        }

        public async Task<string> Delete(int id)
        {
            var studentFromDB = await GetStudent(id);

            if (studentFromDB == null)
                return "Cannot find this student";

            studentFromDB.IsShown = false;

            _context.Students.Update(studentFromDB);

            if (await SaveAll() == false)
                return "Saving to be failed";
            return null;
        }

    }
}