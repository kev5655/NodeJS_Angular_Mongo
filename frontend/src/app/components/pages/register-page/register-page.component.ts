import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PasswordMatchValidator} from "../../../shared/validators/password_match_validators";
import {IUserRegister} from "../../../shared/interfaces/IUserRegister";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit{

  registerForm!: FormGroup;
  isSubmitted = false;
  returnUrl = '';

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private activatedRout: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      confirmPassword: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(10)]]
    }, {
      validators: PasswordMatchValidator('password', 'confirmPassword')
    });

    this.returnUrl = this.activatedRout.snapshot.queryParams.returnUrl;
  }

  get fc() {
    return this.registerForm.controls;
  }

  submit() {
    this.isSubmitted = true;
    if(this.registerForm.invalid) return;
    const fv = this.registerForm.value;
    const user: IUserRegister = {
      name: fv.name,
      email: fv.email,
      password: fv.password,
      confirmPassword: fv.confirmPassword,
      address: fv.address
    };

    this.userService.register(user).subscribe(() => {
      this.router.navigateByUrl(this.returnUrl).then();
    })
  }

}
