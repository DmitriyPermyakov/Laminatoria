using Microsoft.AspNetCore.Mvc;

namespace Laminatoria.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
