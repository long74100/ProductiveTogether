using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace SignalRtc
{
    public class SignalRtcHub : Hub
    {
        public async Task AddToGroup(string userName, string groupName)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

            var data = new
            {
                connectionId = Context.ConnectionId,
                userName
            };

            await Clients.Group(groupName).SendAsync("AddToGroup", data);
        }

        public async Task RemoveFromGroup(string groupName)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);

            var data = new
            {
                connectionId = Context.ConnectionId
            };

            await Clients.Group(groupName).SendAsync("RemoveFromGroup", data);
        }

        public async Task SendSignal(string userName, string dest, string groupName)
        {
            var data = new
            {
                connectionId = Context.ConnectionId,
                userName,
                dest
            };
            await Clients.Group(groupName).SendAsync("SendSignal", data);
        }

        public async Task Ice(object ice, string dest, string groupName)
        {
            var data = new
            {
                ice,
                connectionId = Context.ConnectionId,
                dest
            };
            await Clients.Group(groupName).SendAsync("Ice", data);
        }

        public async Task Sdp(object sdp, string dest, string groupName)
        {
            var data = new
            {
                sdp,
                connectionId = Context.ConnectionId,
                dest
            };
            await Clients.Group(groupName).SendAsync("Sdp", data);
        }
    }
}
