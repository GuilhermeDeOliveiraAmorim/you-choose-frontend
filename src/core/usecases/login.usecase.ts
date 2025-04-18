import { IAuthRepository } from "../interfaces/auth-repository.interface";
import { ProblemDetailsResponse } from "@/shared/types/problem-details";

export interface LoginInput {
  email: string;
  password: string;
}

export interface LoginOutput {
  name: string;
  access_token: string;
  success_message: string;
  content_message: string;
}

export class LoginUseCase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(
    input: LoginInput
  ): Promise<[LoginOutput | null, ProblemDetailsResponse | null]> {
    return await this.authRepo.login(input);
  }
}
