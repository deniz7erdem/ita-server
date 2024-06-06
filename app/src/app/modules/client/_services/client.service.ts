import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import io from 'socket.io-client';
import { Observable } from 'rxjs';
import { Client } from '../../../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.api;
  private socket = io(this.apiUrl, {
    extraHeaders: {
      Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
  });

  getOnlineClients(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('onlineClients', (data) => {
        observer.next(data);
      });
    });
  }

  getOnlineList(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('onlineList', (data) => {
        observer.next(data);
      });
    });
  }

  getAll(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/client`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  }

  create(data: { name: string }): Observable<Client> {
    return this.http.post<Client>(`${this.apiUrl}/client`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  }

  sendDefinedJob(jobName: string, clientId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/client/run-defined-job`,
      { clientId, job: jobName },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      }
    );
  }
}
