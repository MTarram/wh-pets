import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { ToasterService } from '../../../shared/services/toaster.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toaster: ToasterService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { username, password } = this.form.value;

    console.log('test: ', username, password);

    this.authService.login(username!, password!).subscribe({
      next: () => {
        this.router.navigate(['/users']);
        this.toaster.showMessage(`Login successful`);
      },
      error: (err) => {
        if (err.error.status == 'error') {
          this.toaster.showMessage(`Invalid credentials`);
        }
      },
    });
  }
}
