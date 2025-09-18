export interface CodeGeneratorService {
  generateAPersonalCode(
    name: string,
    type: "outro" | "monitor" | "aluno",
    baptized: "yes" | "no"
  ): Promise<string>;
  generateAccessKey(name: string): string;
}
