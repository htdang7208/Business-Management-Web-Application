import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Intake } from '../_models/intake';

@Injectable({
  providedIn: 'root'
})
export class IntakeService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getIntakes(): Observable<Intake[]> {
    return this.http.get<Intake[]>(this.baseUrl + 'intakes');
  }
  getIntake(id: number): Observable<Intake> {
    return this.http.get<Intake>(this.baseUrl + 'intakes/' + id);
  }
  updateIntake(id: number, intake: Intake) {
    return this.http.put<Intake>(this.baseUrl + 'intakes/' + id, intake);
  }
  addIntake(intake: Intake) {
    return this.http.post<Intake>(this.baseUrl + 'intakes', intake);
  }
}
