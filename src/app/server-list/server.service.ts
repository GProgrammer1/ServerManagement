import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Server } from '../model/models.model'; // Adjust path as needed
import { ResponseBody } from '../model/models.model'; // Adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  private baseUrl = `http://localhost:8080/server`;

  constructor(private http: HttpClient) {}

  getServers(): Observable<ResponseBody<{ servers: Server[] }>> {
    return this.http.get<ResponseBody<{ servers: Server[] }>>(`${this.baseUrl}/list`);
  }

  getServer(id: number): Observable<ResponseBody<{ server: Server }>> {
    return this.http.get<ResponseBody<{ server: Server }>>(`${this.baseUrl}/get/${id}`);
  }

  createServer(server: Server): Observable<ResponseBody<{ server: Server }>> {
    return this.http.post<ResponseBody<{ server: Server }>>(`${this.baseUrl}/create`, server);
  }

  deleteServer(id: number): Observable<ResponseBody<{server: Server}>> {
    return this.http.delete<ResponseBody<{server: Server}>>(`${this.baseUrl}/delete/${id}`);
  }

  pingServer(ipAddress: string): Observable<ResponseBody<{ server: Server }>> {
    return this.http.get<ResponseBody<{ server: Server }>>(`${this.baseUrl}/ping/${ipAddress}`);
  }
}
