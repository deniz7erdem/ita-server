import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway()
export class SocketGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private clients: Map<any, any> = new Map();

  constructor(private jwtService: JwtService) {}

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any): string {
    return 'Hello world!';
  }

  async handleConnection(client: Socket, ...args: any[]) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    if (!token) {
      client.disconnect();
      return;
    }

    try {
      const payload = this.jwtService.verify(token);
      this.clients.set(payload.id, client.id);
      this.server.emit('onlineClients', this.clients.size);
      this.logger.log(`Client connected: ${client.id}, User ID: ${payload.id}`);
    } catch (error) {
      client.disconnect();
    }
  }


  handleDisconnect(client: Socket) {
    this.clients.delete(client.id);
    this.server.emit('onlineClient', this.clients.size);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  sendScriptToPython(clientId: number, script: string) {
    console.log(this.clients.size);
    const clientSocketId = this.clients.get(clientId);


    if (clientSocketId) {
      this.server.to(clientSocketId).emit('runScript', script);
      this.logger.log(`Script sent to Python client`);
      return 'OK';
    } else {
      this.logger.warn(`Python client not connected`);
      return 'sad';
    }
  }
}
