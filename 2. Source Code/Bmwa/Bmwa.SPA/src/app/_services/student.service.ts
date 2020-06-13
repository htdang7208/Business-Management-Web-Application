import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { Student } from '../_models/student';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  baseUrl = environment.apiUrl;
  interviewId = new BehaviorSubject<number>(-1);
  interviewIdObserver = this.interviewId.asObservable();

  constructor(private http: HttpClient) {}

  changeInterviewId(id: number) {
    this.interviewId.next(id);
  }

  getStudents(
    page?,
    itemsPerPage?,
    studentParams?
  ): Observable<PaginationResult<Student[]>> {
    const paginationResult: PaginationResult<Student[]> = new PaginationResult<
      Student[]
    >();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (studentParams !== null) {
      if (
        studentParams.name !== null &&
        studentParams.name !== '' &&
        studentParams.name !== undefined
      ) {
        params = params.append('name', studentParams.name);
      }
      if (
        studentParams.identityNumber !== null &&
        studentParams.identityNumber !== '' &&
        studentParams.identityNumber !== undefined
      ) {
        params = params.append('identityNumber', studentParams.identityNumber);
      }
      if (
        studentParams.interviewTime !== null &&
        studentParams.interviewTime !== '' &&
        studentParams.interviewTime !== undefined
      ) {
        params = params.append('interviewTime', studentParams.interviewTime);
      }
      if (studentParams.status !== -1 && studentParams.status !== undefined) {
        params = params.append('status', studentParams.status);
      }
      if (
        studentParams.interviewId !== null &&
        studentParams.interviewId !== -1 &&
        studentParams.interviewId !== undefined
      ) {
        params = params.append('interviewId', studentParams.interviewId);
      }
    }

    return this.http
      .get<Student[]>(this.baseUrl + 'students', {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginationResult.result = response.body;

          if (response.headers.get('pagination') != null) {
            paginationResult.pagination = JSON.parse(
              response.headers.get('pagination')
            );
          }

          return paginationResult;
        })
      );
  }
  getStudent(id: number): Observable<Student> {
    return this.http.get<Student>(this.baseUrl + 'students/' + id);
  }
  // add(student: Student) {
  //   return this.http.post(this.baseUrl + 'students', Student);
  // }
  update(id: number, data: any) {
    return this.http.put(this.baseUrl + 'students/' + id, data);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'students/' + id);
  }
}
