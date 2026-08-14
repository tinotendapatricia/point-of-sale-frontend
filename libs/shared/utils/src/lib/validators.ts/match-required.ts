import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { ProductsEntity } from '@pos-frontend/products/data-access';

function instanceOfCharacter(character: any): character is ProductsEntity {
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
