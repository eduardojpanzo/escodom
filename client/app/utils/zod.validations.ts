import { z } from "zod";

export class Z {
  static requiredString(fieldName: string) {
    return z
      .string({
        required_error: `${fieldName} é obrigatório`,
        invalid_type_error: `${fieldName} tem que ser uma string`,
      })
      .min(1, `${fieldName} não pode ser vazio`);
  }

  static optionalString(fieldName: string) {
    return z
      .string({
        invalid_type_error: `${fieldName} tem que ser uma string`,
      })
      .optional();
  }

  static email() {
    return z
      .string({
        message: "o e-mail é obrigatório",
      })
      .email("O formato do e-mail é inválido");
  }

  static password(minLength: number = 6) {
    return z
      .string({
        message: "A senha é obrigatório",
      })
      .min(minLength, `a senha deve ter pelo menos ${minLength} caracteres`);
  }

  static requiredNumber(fieldName: string) {
    return z.coerce.number({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} tem que ser um number`,
    });
  }

  static requiredBoolean(fieldName: string) {
    return z.boolean({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} tem que ser um boolean`,
    });
  }

  static optionalBoolean(fieldName: string) {
    return z
      .boolean({
        invalid_type_error: `${fieldName} tem que ser um boolean`,
      })
      .optional();
  }

  static requiredDate(fieldName: string) {
    return z.coerce.date({
      required_error: `${fieldName} é obrigatório`,
      invalid_type_error: `${fieldName} tem que ser uma data`,
    });
  }

  static optionalDate(fieldName: string) {
    return z.coerce
      .date({
        invalid_type_error: `${fieldName} tem que ser uma data`,
      })
      .optional();
  }

  static requiredOptionField(fieldName: string) {
    return z.object(
      {
        label: z.string({ message: "o label é o brigadotório" }),
        value: z.coerce.string({ message: "o valor é obrigatório" }),
      },
      {
        required_error: `${fieldName} é obrigatório`,
        invalid_type_error: `${fieldName} tem que ser um objecto`,
        message: `${fieldName} é obrigatório`,
      }
    );
  }
}
