import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { EducationProgram } from '../_models/education-program';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EducationProgramService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getEducationPrograms(pageNumber?, pageSize?): Observable<PaginationResult<EducationProgram[]>> {
    const paginationResult: PaginationResult<EducationProgram[]> = new PaginationResult<EducationProgram[]>();

    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    return this.http.get<EducationProgram[]>(this.baseUrl + 'educationPrograms', { observe: 'response', params })
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
  getAll(): Observable<EducationProgram[]> {
    return this.http.get<EducationProgram[]>(this.baseUrl + 'educationprograms/nopage');
  }
}
