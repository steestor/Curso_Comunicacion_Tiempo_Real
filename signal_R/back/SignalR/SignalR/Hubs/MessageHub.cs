using Microsoft.AspNetCore.SignalR;

namespace SignalR.Hubs
{
    public class MessageHub: Hub
    {
        public async Task SendMessage(string user, string message)
            => await Clients.All.SendAsync("hubConnection", user, message);
    }
}
