import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validIP(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => { //arg of type control, return value : ValidationErrors | null
    const ip = control.value;

    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /^([0-9a-fA-F]{1,4}:){7}([0-9a-fA-F]{1,4}|:)$/;
    const isValid = ipv4Pattern.test(ip) || ipv6Pattern.test(ip);

    return isValid ? null : { invalidIpAddress: true };
  };
}
