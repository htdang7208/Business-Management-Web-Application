import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { University } from '../_models/university';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUniversities(pageNumber?, pageSize?, nameFilter?): Observable<PaginationResult<University[]>> {
    const paginationResult: PaginationResult<University[]> = new PaginationResult<University[]>();

    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    if (nameFilter != null && nameFilter !== '' && nameFilter !== undefined) {
      params = params.append('name', nameFilter);
    }

    return this.http.get<University[]>(this.baseUrl + 'universities', { observe: 'response', params })
      .pipe(
        map((response) => {
          paginationResult.result = response.body;

          if (response.headers.get('pagination') != null){
            paginationResult.pagination = JSON.parse(response.headers.get('pagination'));
          }

          return paginationResult;
        })
      );
  }

  getUniversity(id: number): Observable<University> {
    return this.http.get<University>(this.baseUrl + 'universities/' + id);
  }
  add(university: University) {
    return this.http.post(this.baseUrl + 'universities', university);
  }
  update(id: number, university: University) {
    return this.http.put(this.baseUrl + 'universities/' + id, university);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'universities/' + id);
  }
}
