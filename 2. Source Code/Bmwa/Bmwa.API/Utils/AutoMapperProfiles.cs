using System.Linq;
using AutoMapper;
using Bmwa.API.Dtos;
using Bmwa.API.Models;

namespace DatingApp.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Admin, AdminForListDto>()
            .ForMember(
                dest => dest.PhotoURL,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Admin, AdminForDetailDto>()
            .ForMember(
                dest => dest.PhotoURL,
                opt => opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<Photo, PhotoForDetailDto>();
            CreateMap<AdminForUpdateDto, Admin>();
            CreateMap<Student, StudentDto>();
            CreateMap<Interview, InterviewDto>();
        }
    }
}