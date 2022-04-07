import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  user : any;
  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.getCurrentUser().subscribe({
      next: (res) => {
        this.user = res;
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }


  logout(): void {
    this.auth.logout();
  }
}
