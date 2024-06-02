import { HttpCode, HttpException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class SocketGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('AppGateway');
  private clients: Map<any, any> = new Map();
  private onlineClients: number = 0;
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
      if (payload.role == 'admin') {
        this.server.emit('onlineClients', this.onlineClients);
        this.server.emit('onlineList', [...this.clients.keys()]);
        return;
      }
      this.clients.set(payload.id, client.id);
      this.server.emit('onlineClients', ++this.onlineClients);
      this.server.emit('onlineList', [...this.clients.keys()]);
      this.logger.log(`Client connected: ${client.id}, User ID: ${payload.id}`);
    } catch (error) {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const token = client.handshake.headers.authorization?.split(' ')[1];
    const payload = this.jwtService.verify(token);
    if (payload.role == 'admin') {
      this.server.emit('onlineClients', this.onlineClients);
      this.server.emit('onlineList', [...this.clients.keys()]);
      return;
    }
    this.clients.delete(client.id);
    this.server.emit('onlineClients', --this.onlineClients);
    this.server.emit('onlineList', [...this.clients.keys()]);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  afterInit(server: Server) {
    this.logger.log('Init');
  }

  sendDefinedJobToPython(clientId: number, job: string) {
    const clientSocketId = this.clients.get(clientId);
    if (clientSocketId) {
      this.server.to(clientSocketId).emit('runDefinedJob', job);
      this.logger.log(`Defined job sent to Python client`);
      return HttpCode(200);
    } else {
      this.logger.warn(`Python client not connected`);
      return new HttpException('Client not connected', 400);
    }
  }

  sendScriptToPython(clientId: number, script: string) {
    const clientSocketId = this.clients.get(clientId);
    if (clientSocketId) {
      this.server.to(clientSocketId).emit('runScript', script);
      this.logger.log(`Script sent to Python client`);
      return HttpCode(200);
    } else {
      this.logger.warn(`Client not connected`);
      return new HttpException('Client not connected', 400);
    }
  }
}
