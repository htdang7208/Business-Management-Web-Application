import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor() { }
  baseUrl = "https://localhost:44351/api/";
  apiUrl = {
    login: this.baseUrl + "admin/login"
  }
}
