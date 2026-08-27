import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

interface HasCode {
  code: unknown;
}

function instanceOfCharacter(character: any): character is HasCode {
  return (
    !!character && // truthy
    typeof character !== 'string' && // Not just string input in the autocomplete
    'code' in character
  ); // Has some qualifying property of Character type
}

export const CharacterSelectionRequiredValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null =>
  !instanceOfCharacter(control?.value) ? { matchRequired: true } : null;
