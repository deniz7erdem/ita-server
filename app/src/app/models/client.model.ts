export interface Client {
  id: number;
  name: string;
  os?: string;
  ip?: string;
  lastActiveAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  online?: boolean;
}
