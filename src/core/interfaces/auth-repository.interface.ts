import { ProblemDetailsResponse } from "@/shared/types/problem-details";
import {
  CreateUserInput,
  CreateUserOutput,
} from "../usecases/create-user.usecase";
import { LoginInput, LoginOutput } from "../usecases/login.usecase";

export interface IAuthRepository {
  login(
    input: LoginInput
  ): Promise<[LoginOutput | null, ProblemDetailsResponse | null]>;
  createUser(
    input: CreateUserInput
  ): Promise<[CreateUserOutput | null, ProblemDetailsResponse | null]>;
}
