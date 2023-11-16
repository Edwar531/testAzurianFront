import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { ValidatorsService } from 'src/app/services/validators.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: any = FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authS: AuthService,
    private toastrS: ToastrService,
    private validatorsS: ValidatorsService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.loading = true;
    this.form.markAllAsTouched();

    if (this.form.status == 'INVALID') {
      this.loading = false;
      return;
    }

    this.authS.login(this.form.value).subscribe(
      (response: any) => {
        this.loading = false;
        this.authS.saveAuth(response);
      },
      (error: any) => {
        this.loading = false;
        let detect_errors_server = this.validatorsS.detect_errors_server(
          error,
          this.form
        );

        if (detect_errors_server) {
          return;
        }

        if (error.error && error.error.message) {
          this.toastrS.warning(error.error.message);
        }
      }
    );
  }

  validate(name: string) {
    return this.validatorsS.sow_message(this.form, name);
  }
}
