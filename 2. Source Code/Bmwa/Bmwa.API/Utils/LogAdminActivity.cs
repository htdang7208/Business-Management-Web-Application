using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Bmwa.API.Data.Repositories;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Bmwa.API.Utils
{
    public class LogAdminActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultContext = await next();

            var adminId = int.Parse(resultContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultContext.HttpContext.RequestServices.GetService<IAdminRepository>();

            var admin = await repo.GetAdmin(adminId);
            admin.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}