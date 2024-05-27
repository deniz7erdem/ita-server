export interface Client {
  id: number;
  name: string;
  os?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
