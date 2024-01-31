using Microsoft.AspNetCore.SignalR;

namespace AplicacionChatSignalR.Hubs
{
    public class NotificationsHub : Hub
    {

        public static int TotalViews { get; set; } = 0;

        // Método que se ejecuta cuando se conecta un cliente y actualiza el total de vistas
        public async Task NewWindowLoaded()
        {
            TotalViews++;
            await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
        }
    }
}
