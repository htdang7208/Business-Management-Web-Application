import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Admin } from '../_models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAdmins(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.baseUrl + 'admins');
  }
  getAdmin(id: number): Observable<Admin> {
    return this.http.get<Admin>(this.baseUrl + 'admins/' + id);
  }
  updateAdmin(id: number, admin: Admin) {
    return this.http.put(this.baseUrl + 'admins/' + id, admin);
  }
}
