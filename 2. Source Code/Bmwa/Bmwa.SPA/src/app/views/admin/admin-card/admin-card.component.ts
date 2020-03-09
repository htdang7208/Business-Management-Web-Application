import { Component, OnInit, Input } from '@angular/core';
import { Admin } from 'src/app/_models/admin';

@Component({
  selector: 'app-admin-card',
  templateUrl: './admin-card.component.html',
  styleUrls: ['./admin-card.component.css']
})
export class AdminCardComponent implements OnInit {
  @Input() admin: Admin;

  constructor() { }

  ngOnInit(): void {
  }

}
