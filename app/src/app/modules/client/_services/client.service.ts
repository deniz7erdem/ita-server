import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  apiUrl = environment.api;
  private socket = io(this.apiUrl,{extraHeaders: {Authorization: `Bearer ${localStorage.getItem('authToken')}`}});

  getOnlineClients(): Observable<any> {
    return new Observable((observer) => {
      this.socket.on('onlineClients', (data) => {
        observer.next(data);
      });
    });
  }

  getAll() {
    return this.http.get(`${this.apiUrl}/client`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
      },
    });
  }
}
