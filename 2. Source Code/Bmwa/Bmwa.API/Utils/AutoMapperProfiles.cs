using System.Linq;
using AutoMapper;
using Bmwa.API.Dtos;
using Bmwa.API.Dtos.Admin;
using Bmwa.API.Dtos.Interview;
using Bmwa.API.Dtos.Student;
using Bmwa.API.Models;

namespace Bmwa.API.Utils
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            // Admin - Photo
            CreateMap<Admin, AdminForListDto>()
            .ForMember(
                dest => dest.PhotoUrl,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Admin, AdminForDetailDto>()
            .ForMember(
                dest => dest.PhotoUrl,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Photo, PhotoForDetailDto>();
            CreateMap<AdminForUpdateProfileDto, Admin>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForReturnDto>();
            // Interview
            CreateMap<Interview, InterviewDto>();
            // Student
            CreateMap<Student, StudentForListDto>();
            CreateMap<Student, StudentForDetailDto>();
            CreateMap<StudentForDetailDto, Student>();
        }
    }
}