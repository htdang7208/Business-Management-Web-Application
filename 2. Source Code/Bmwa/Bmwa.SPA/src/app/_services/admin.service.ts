import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Admin } from '../_models/admin';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;
  adminId = new BehaviorSubject<number>(-1);
  adminIdObserver = this.adminId.asObservable();

  constructor(private http: HttpClient) { }

  changeAdminId(id: number) {
    this.adminId.next(id);
  }

  getAdmins(page?, itemsPerPage?, adminParams?): Observable<PaginationResult<Admin[]>> {
    const paginationResult: PaginationResult<Admin[]> = new PaginationResult<Admin[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (adminParams != null) {
      params = params.append('username', adminParams.username);
      params = params.append('gender', adminParams.gender);
      params = params.append('orderBy', adminParams.orderBy);
    }

    return this.http.get<Admin[]>(this.baseUrl + 'admins', { observe: 'response', params })
    .pipe(
      map((response) => {
        paginationResult.result = response.body;

        if (response.headers.get('Pagination') != null) {
          paginationResult.pagination = JSON.parse(
            response.headers.get('Pagination')
          );
        }
        return paginationResult;
      })
    );
  }
  getAdmin(id: number): Observable<Admin> {
    return this.http.get<Admin>(this.baseUrl + 'admins/' + id);
  }
  updateAdminProfile(id: number, admin: Admin) {
    return this.http.put(this.baseUrl + 'admins/' + id + '/profile', admin);
  }
  updateAdminPassword(id: number, passObj: any) {
    console.log('pass:', passObj);
    return this.http.put(this.baseUrl + 'admins/' + id + '/password', passObj);
  }
  setMainPhoto(adminId: number, id: number) {
    return this.http.post(
      this.baseUrl + 'admins/' + adminId + '/photos/' + id + '/setMain',
      {}
    );
  }

  deletePhoto(adminId: number, id: number) {
    return this.http.delete(this.baseUrl + 'admins/' + adminId + '/photos/' + id);
  }

  deleteAdmin(id: number) {
    return this.http.delete(this.baseUrl + 'admins/' + id);
  }
}
