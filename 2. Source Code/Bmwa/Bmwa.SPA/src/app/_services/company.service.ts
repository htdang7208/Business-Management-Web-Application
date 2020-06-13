import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Company } from '../_models/company';
import { Observable } from 'rxjs';
import { PaginationResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getCompanies(pageNumber?, pageSize?, nameFilter?): Observable<PaginationResult<Company[]>> {
    const paginationResult: PaginationResult<Company[]> = new PaginationResult<Company[]>();

    let params = new HttpParams();

    if (pageNumber != null && pageSize != null) {
      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);
    }

    if (nameFilter != null && nameFilter !== '' && nameFilter !== undefined) {
      params = params.append('name', nameFilter);
    }

    return this.http.get<Company[]>(this.baseUrl + 'companies', { observe: 'response', params })
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

  getCompany(id: number): Observable<Company> {
    return this.http.get<Company>(this.baseUrl + 'companies/' + id);
  }
  add(company: Company) {
    return this.http.post(this.baseUrl + 'companies', company);
  }
  update(id: number, company: Company) {
    return this.http.put(this.baseUrl + 'companies/' + id, company);
  }
  delete(id: number) {
    return this.http.delete(this.baseUrl + 'companies/' + id);
  }
}
