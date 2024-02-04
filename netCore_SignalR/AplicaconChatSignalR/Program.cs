using AplicacionChatSignalR.Hubs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using netCore_SiganlR.EntityFramework;
using netCore_SiganlR.Hubs.Filtros;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
//builder.Services.AddSignalR();

builder.Services.AddSignalR(hubOptions =>
{
    hubOptions.AddFilter<ReplaceNoEntiendoFilter>();
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(opt => opt.AddPolicy("SignalRCors", builder =>
{
    builder.SetIsOriginAllowed(origin => true)
    .AllowCredentials()
    .AllowAnyMethod()
    .AllowAnyHeader();
}));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("SignalRCors");

app.MapControllers();

app.MapHub<NotificationsHub>("/notificationsHub");

app.Run();
