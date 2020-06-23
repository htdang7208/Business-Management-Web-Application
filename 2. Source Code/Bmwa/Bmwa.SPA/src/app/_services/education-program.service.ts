import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { EducationProgram } from '../_models/education-program';
import { map } from 'rxjs/operators';
import { Subject } from '../_models/subject';
import { SucjectProgramForAdd, SucjectProgramForUpdate } from '../_models/subject-program';

@Injectable({
  providedIn: 'root'
})
export class EducationProgramService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getEducationPrograms(pageNumber?, pageSize?, nameFilter?): Observable<PaginationResult<EducationProgram[]>> {
    const paginationResult: PaginationResult<EducationProgram[]> = new PaginationResult<EducationProgram[]>();

    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }
    if (nameFilter != null) {
      params = params.append('name', nameFilter);
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
  getEducationProgram(id: number): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl + 'educationPrograms/' + id);
  }
  add(sucjectProgramForAdd: SucjectProgramForAdd) {
    return this.http.post(this.baseUrl + 'educationPrograms/', sucjectProgramForAdd);
  }
  update(id: number, sucjectProgramForUpdate: SucjectProgramForUpdate) {
    return this.http.post(this.baseUrl + 'educationPrograms/', sucjectProgramForUpdate);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'educationPrograms/' + id);
  }
}
