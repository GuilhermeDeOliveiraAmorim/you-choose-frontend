import { IAuthRepository } from "../interfaces/auth-repository.interface";
import { ProblemDetailsResponse } from "@/shared/types/problem-details";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
}

export interface CreateUserOutput {
  name: string;
  success_message: string;
  content_message: string;
}

export class CreateUserUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(
    input: CreateUserInput
  ): Promise<[CreateUserOutput | null, ProblemDetailsResponse | null]> {
    return await this.authRepo.createUser(input);
  }
}
