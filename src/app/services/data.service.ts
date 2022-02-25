import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../components/utils';

const API_URL = 'https://jsonplaceholder.typicode.com/'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

   getUsersList(): Observable<User[]> {
    return this.http.get<User[]>(API_URL + 'users');
  }
}
