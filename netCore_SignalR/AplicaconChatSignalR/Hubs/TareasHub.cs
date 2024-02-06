using Microsoft.AspNetCore.SignalR;

namespace netCore_SiganlR.Hubs
{
    public class TareasHub: Hub
    {
        public async Task UpdateTarea(string tarea)
        {
            await Clients.All.SendAsync("TareaUpdated", tarea);
        }
    }
}
