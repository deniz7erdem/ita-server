import { Client } from "src/client/entities/client.entity";

export class CreateLogDto {
  message: string;
  level: string;
  client?: Client;
}
