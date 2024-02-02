using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using netCore_SiganlR.Hubs.Filtros;

namespace AplicacionChatSignalR.Hubs
{
    public class NotificationsHub : Hub
    {

        public static int TotalViews { get; set; } = 0;
        public static int TotalUsers { get; set; } = 0;

        // Método que se ejecuta cuando se conecta un cliente y actualiza el total de usuarios
        public override Task OnConnectedAsync()
        {
            TotalUsers++;
            Clients.All.SendAsync("UpdateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnConnectedAsync();
        }

        // Método que se ejecuta cuando se desconecta un cliente y actualiza el total de usuarios
        public override Task OnDisconnectedAsync(Exception? exception)
        {
            TotalUsers--;
            Clients.All.SendAsync("UpdateTotalUsers", TotalUsers).GetAwaiter().GetResult();
            return base.OnDisconnectedAsync(exception);

        }

        // Método que se ejecuta cuando se conecta un cliente y actualiza el total de vistas
        public async Task NewWindowLoaded()
        {
            TotalViews++;
            await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
        }

        //// Método que se ejecuta cuando se conecta un cliente y actualiza el total de vistas
        //public async Task<string> NewWindowLoaded()
        //{
        //    TotalViews++;
        //    await Clients.All.SendAsync("UpdateTotalViews", TotalViews);
        //    return $"Total de vistas: {TotalViews}";
        //}

        // Método que se ejecuta cuando se escribe un mensaje y se pulsa en enviar
        [ServiceFilter(typeof(ReplaceNoEntiendoFilter))]
        public async Task NoLoEntiendo(string message)
        {
            await Clients.All.SendAsync("NoLoEntiendo", message);

            await Clients.Group("grupo").SendAsync("NoLoEntiendo", message);
            await Clients.Groups("grupo1", "grupo2").SendAsync("NoLoEntiendo", message);
            await Clients.GroupExcept("grupo", "grupo").SendAsync("NoLoEntiendo", message);
            await Clients.OthersInGroup("grupo").SendAsync("NoLoEntiendo", message);

        }

    }
}
