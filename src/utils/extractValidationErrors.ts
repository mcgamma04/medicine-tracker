import { ValidationError } from "class-validator";

interface FieldError {
  field: string;
  message: string;
}

export function extractValidationErrors(errors: ValidationError[]): FieldError[] {
  const errorMessages: FieldError[] = [];

  errors.forEach((error) => {
    if (error.constraints) {
      Object.values(error.constraints).forEach((message) => {
        errorMessages.push({ field: error.property, message });
      });
    }
  });

  return errorMessages;
}
