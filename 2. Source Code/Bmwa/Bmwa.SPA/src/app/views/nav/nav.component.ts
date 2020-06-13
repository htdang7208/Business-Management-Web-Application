import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router } from '@angular/router';
import { BsDropdownConfig } from 'ngx-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }]
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;
  topicName: string;

  constructor(public authService: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit(): void {
    // which photo is photo now
    this.authService.currentPhotoUrl.subscribe(
      photoUrl => this.photoUrl = photoUrl
    );
    this.authService.currentTopicName.subscribe(
      topicName => this.topicName = topicName
    );
  }

  topicNameChanged(s: string) {
    localStorage.setItem('topicName', s);
    this.authService.changeTopicName(s);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    this.authService.decodedToken = null;
    this.authService.currentAdmin = null;
    this.alertify.message('Logged out successfully!');
    this.router.navigate(['/login']);
  }
}
