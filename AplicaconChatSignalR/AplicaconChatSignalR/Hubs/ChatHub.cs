using AplicacionChatSignalR.DataService;
using AplicacionChatSignalR.Models;
using Microsoft.AspNetCore.SignalR;

namespace AplicacionChatSignalR.Hubs
{
    public class ChatHub: Hub
    {

        private readonly SharedDb _sharedDb;

        public ChatHub(SharedDb sharedDb)
        {
            _sharedDb = sharedDb;
        }

        public async Task JoinChat(UserConnection connection)
        {
            await Clients.All.SendAsync("Recesive message", "admin", $"{connection.Username} has joined");
        }


        public async Task JoinSpecificChatRoom(UserConnection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.ChatRoom);

            _sharedDb.Connections[Context.ConnectionId] = connection;

            await Clients.Group(connection.ChatRoom).SendAsync("Recesive message", "admin", $"{connection.Username} has joined {connection.ChatRoom}");
        }

        public async Task SendMessage(string message)
        {
            if(_sharedDb.Connections.TryGetValue(Context.ConnectionId, out UserConnection connection))
            {
                await Clients.Group(connection.ChatRoom).SendAsync("Recesive message", connection.Username, message);
            }
        }
    }
}
