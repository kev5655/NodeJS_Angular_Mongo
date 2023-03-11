import {AbstractControl} from "@angular/forms";

export const PasswordMatchValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
  const validator = (from: AbstractControl) => {
    const passwordControl = from.get(passwordControlName);
    const confirmPasswordControl = from.get(confirmPasswordControlName);

    if (!passwordControl || !confirmPasswordControl) return;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({notMatch: true});
    } else {
      const errors = confirmPasswordControl.errors;
      if(!errors) return;

      delete errors.notMatch;
      confirmPasswordControl.setErrors(errors);

    }
  }

  return validator;
}
