import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intake } from '../_models/intake';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIntakes(page?, itemsPerPage?, intakeParams?): Observable<PaginationResult<Intake[]>> {
    const paginationResult: PaginationResult<Intake[]> = new PaginationResult<Intake[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (intakeParams != null) {
      if (intakeParams.name != null) {
        params = params.append('name', intakeParams.name);
      }

      if (intakeParams.weekAmount != null) {
        params = params.append('weekAmount', intakeParams.weekAmount);
      }

      if (intakeParams.dateBeginFrom != null) {
        // toJSON(): example-2020-06-03T06:46:01.000Z
        params = params.append('dateBeginFrom', intakeParams.dateBeginFrom.toJSON());
      }

      if (intakeParams.dateBeginTo != null) {
        params = params.append('dateBeginTo', intakeParams.dateBeginTo.toJSON());
      }

      if (intakeParams.dateEndFrom != null) {
        params = params.append('dateEndFrom', intakeParams.dateEndFrom.toJSON());
      }

      if (intakeParams.dateEndTo != null) {
        params = params.append('dateEndTo', intakeParams.dateEndTo.toJSON());
      }
    }

    return this.http.get<Intake[]>(this.baseUrl + 'intakes', { observe: 'response', params })
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
  getIntake(id: number): Observable<Intake> {
    return this.http.get<Intake>(this.baseUrl + 'intakes/' + id);
  }
  updateIntake(id: number, intake: any): Observable<Intake> {
    return this.http.put<Intake>(this.baseUrl + 'intakes/' + id, intake);
  }
  addIntake(intake: Intake) {
    return this.http.post<Intake>(this.baseUrl + 'intakes', intake);
  }
  deleteIntake(id: number) {
    return this.http.delete(this.baseUrl + 'intakes/' + id);
  }
}
