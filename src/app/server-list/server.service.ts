import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Server } from '../model/models.model'; // Adjust path as needed
import { ResponseBody } from '../model/models.model'; // Adjust path as needed
import { environment } from '../environment';

@Injectable({
  providedIn: 'root'
})
export class ServerService {
  

  constructor(private http: HttpClient) {}

  getServers(): Observable<ResponseBody<{ servers: Server[] }>> {
    return this.http.get<ResponseBody<{ servers: Server[] }>>(`${environment}/list`);
  }

  getServer(id: number): Observable<ResponseBody<{ server: Server }>> {
    return this.http.get<ResponseBody<{ server: Server }>>(`${environment}/get/${id}`);
  }

  createServer(server: Server): Observable<ResponseBody<{ server: Server }>> {
    return this.http.post<ResponseBody<{ server: Server }>>(`${environment}/create`, server);
  }

  deleteServer(id: number): Observable<ResponseBody<{server: Server}>> {
    return this.http.delete<ResponseBody<{server: Server}>>(`${environment}/delete/${id}`);
  }

  pingServer(ipAddress: string): Observable<ResponseBody<{ server: Server }>> {
    return this.http.get<ResponseBody<{ server: Server }>>(`${environment}/ping/${ipAddress}`);
  }
}
