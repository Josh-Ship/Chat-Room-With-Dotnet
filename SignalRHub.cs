using Microsoft.AspNetCore.SignalR;

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }

    public async Task DeleteMessage()
    {
        await Clients.All.SendAsync("DeleteMessage");
    }
}
