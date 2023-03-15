import { FormControl, ValidationErrors } from "@angular/forms";

export const DATE_FORMAT = {
    parse: {
        dateInput: 'YYYY/MM/DD',
    },
    display: {
        dateInput: 'YYYY/MM/DD',
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    },
};

export function dobValidator(control: FormControl): ValidationErrors | null {
    const dob = new Date(control.value);
    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();

    if (isNaN(dob.getTime())) {
        return { invalidDate: true };
    }
    if (age < 15 || age >= 120) {
        return { invalidAge: true };
    }
    return null;
}