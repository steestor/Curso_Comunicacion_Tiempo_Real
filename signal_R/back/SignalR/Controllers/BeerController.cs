using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalR.Hubs;

namespace SignalR.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class BeerController : ControllerBase
    {
        private IHubContext<MessageHub> _hubContext;

        public BeerController(IHubContext<MessageHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet]
        public async Task<IActionResult> SendMessage(string message)
        {
            await _hubContext.Clients.All.SendAsync("sendMessage", message);
            return Ok();
        }
    }
}
