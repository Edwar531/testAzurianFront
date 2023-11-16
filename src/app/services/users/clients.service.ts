import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  constructor(private http: HttpClient) {}
  url = `${environment.api_url}usuarios/clientes`;
  url_disable = `${this.url}/disable`;
  url_enable = `${this.url}/enable`;

  store(values: any) {
    return this.http.post(this.url, values);
  }


}
