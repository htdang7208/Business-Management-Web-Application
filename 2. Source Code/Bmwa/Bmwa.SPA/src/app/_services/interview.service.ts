import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Interview } from '../_models/interview';
import { PaginationResult } from '../_models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InterviewService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getInterviews(page?, itemsPerPage?, interviewParams?): Observable<PaginationResult<Interview[]>> {
    const paginationResult: PaginationResult<Interview[]> = new PaginationResult<Interview[]>();
    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (interviewParams != null) {
      if (interviewParams.name != null) {
        params = params.append('name', interviewParams.name);
      }
      if (interviewParams.date != null) {
        params = params.append('date', interviewParams.date);
      }
    }
    console.log('params: ', params);
    return this.http.get<Interview[]>(this.baseUrl + 'interviews', { observe: 'response', params})
    .pipe(
      map((response) => {
        paginationResult.result = response.body;

        if (response.headers.get('pagination') != null) {
          paginationResult.pagination = JSON.parse(response.headers.get('pagination'));
        }

        return paginationResult;
      })
    );
  }
  getInterview(id: number): Observable<Interview> {
    return this.http.get<Interview>(this.baseUrl + 'interviews/' + id);
  }
  add(interview: Interview) {
    return this.http.post(this.baseUrl + 'interviews', interview);
  }
  update(id: number, interview: Interview) {
    return this.http.put(this.baseUrl + 'interviews/' + id, interview);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'interviews/' + id);
  }
}
