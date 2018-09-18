import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class DataService {

  constructor(
    private http: HttpClient
  ) { }

  getData() {
    return this.http.get(`${environment.api}/data`);
  }
}
