import { io, Socket } from 'socket.io-client';
import { getHerdListApi } from 'src/pages/game/wah/wah.page';
import { getRandomID } from './randomizer';

const socketUrl = process.env.REACT_APP_SOCKET_URL;
const socket: Socket = io(socketUrl as string, {
  reconnectionDelay: 1000,
  reconnection: true,
  transports: ['websocket'],
  agent: false,
  upgrade: false,
  rejectUnauthorized: false,
});

socket.on('connect', () => {
  console.log('connected: ', socket.connected, ', socket id: ', socket.id); // true
  // TODO room id yi stora bağla
  socket.emit('create-general-room', { room: getRandomID() });
});

socket.on('room-created', (data: any) => {
  console.log('room-created: ', data);
});

socket.on('disconnect', (reason) => {
  console.log(reason);
  console.log(socket.id); // undefined
  console.log(socket.connected); // false
});

/**
 * Herd
 */

socket.on('update-herd-list', (data: any) => {
  console.log('#server chat message: ', data);
  getHerdListApi();
});

export default socket;

// **Create Room**
// "create-game-room" socket event emitted in metamask.component when user into game.
// On the server side "create-game-room" listener create custom room to the user with user walletadress.
// when room created on server, socket emit "room-created" event with room id (actually this id is user wallet address I talk about above).
// Then user has a private room with room wallet address and joined the room.

// **Fight Start**
// When user click "Get into a Fight" button in herd.component the fight start method triggered.
// Client send to herd data through the CreateFightApi to the '/fight/create' path.
// Server receive the data and return this Herd with status FIGHTING.
// Client shows Matchmaking loading animation, while server emit the "update-herd-list" event with the updated herd list.
// I added to sample code snippest here for understanding the process.

// Server:

/**
    // Creates Room when user enter the game:
    socket.on('create-game-room', (data: { room: string; user: string }) => {
      socket.join(data.room);
      socket.emit('room-created', { room: data.room });
    });

    // Sample event triggered when matching is completed:
    socket.on('matchmaking-demo', (data) => {
      console.log('matchmaking-demo', data);
      setTimeout(() => {
        io.to(data.room).emit('update-herd-list', { room: data.room });
      }, 5000);
    });

*/
