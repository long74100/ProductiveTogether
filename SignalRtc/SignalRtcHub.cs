using Microsoft.AspNetCore.SignalR;
using SignalRtc.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace SignalRtc
{
    public class SignalRtcHub : Hub
    {
        public async Task AddToGroup(string userName, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("AddToGroup", $"{userName} - {Context.ConnectionId} has joined the group {groupName}.");
        }

        public async Task RemoveFromGroup(string userName, string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            await Clients.Group(groupName).SendAsync("RemoveFromGroup", $"{userName} - {Context.ConnectionId} has left the group {groupName}.");
        }

        public async Task SendSignalToGroup(string signal, string userName, string groupName)
        {
            await Clients.Group(groupName).SendAsync("SendSignalToGroup", Context.ConnectionId, signal);
        }
    }
}
