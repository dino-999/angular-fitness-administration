import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoading = false;
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    if (email == 'admin@admin.com' && password == 'tester123') {
      let authObs: Observable<AuthResponseData>;

      this.isLoading = true;

      authObs = this.authService.login(email, password);

      authObs.subscribe(
        (resData) => {
          console.log(resData);
          this.isLoading = false;
          this.router.navigate(['/news']);
        },
        (errorMessage) => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }
    else{
      alert('Only admin can enter this site');
    }

    form.reset();
  }
}
