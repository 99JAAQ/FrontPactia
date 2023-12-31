import { AbstractControl, FormArray, FormGroup } from "@angular/forms";

export function forceValidation(form: AbstractControl) {
    if (form instanceof FormGroup || form instanceof FormArray) {
        for (const inner in form.controls) {
            const control = form.get(inner);
            control && forceValidation(control);
        }
    } else {
        form.markAsDirty();
        form.markAsTouched();
        form.updateValueAndValidity();
    }
}