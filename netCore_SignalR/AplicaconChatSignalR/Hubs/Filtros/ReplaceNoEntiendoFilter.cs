using Microsoft.AspNetCore.SignalR;

namespace netCore_SiganlR.Hubs.Filtros
{
    public class ReplaceNoEntiendoFilter : IHubFilter
    {
        public async ValueTask<object> InvokeMethodAsync(HubInvocationContext invocationContext, Func<HubInvocationContext, ValueTask<object>> next)
        {
            // Obtener el nombre del método que se está invocando
            var methodName = invocationContext.HubMethod.Name;

           // Si el nombre del método es "NoLoEntiendo"
            if (methodName == "NoLoEntiendo")
            {
                // Obtener los argumentos del método
                var arguments = invocationContext.HubMethodArguments[0];

                var arg = new List<string>(["Lo entiendo"]);
               

                invocationContext = new HubInvocationContext(invocationContext.Context,
                invocationContext.ServiceProvider,
                invocationContext.Hub,
                invocationContext.HubMethod,
                arg.AsReadOnly());

            }

            return await next(invocationContext);
        }
    }
}
