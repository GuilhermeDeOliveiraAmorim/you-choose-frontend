import { IAuthRepository } from "@/core/interfaces/auth-repository.interface";
import {
  CreateUserInput,
  CreateUserOutput,
} from "@/core/usecases/create-user.usecase";
import { LoginInput, LoginOutput } from "@/core/usecases/login.usecase";
import { ProblemDetailsResponse } from "@/shared/types/problem-details";
import { AuthServiceHttp } from "../api/auth-api";

export class AuthService implements IAuthRepository {
  private authServiceHttp: AuthServiceHttp;

  constructor() {
    this.authServiceHttp = new AuthServiceHttp();
  }

  async login(
    input: LoginInput
  ): Promise<[LoginOutput | null, ProblemDetailsResponse | null]> {
    return await this.authServiceHttp.login(input);
  }

  async createUser(
    input: CreateUserInput
  ): Promise<[CreateUserOutput | null, ProblemDetailsResponse | null]> {
    return await this.authServiceHttp.createUser(input);
  }
}
