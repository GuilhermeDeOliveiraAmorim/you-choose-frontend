import { IAuthRepository } from "@/core/interfaces/auth-repository.interface";
import {
  CreateUserInput,
  CreateUserOutput,
} from "@/core/usecases/create-user.usecase";
import { LoginInput, LoginOutput } from "@/core/usecases/login.usecase";
import { ProblemDetailsResponse } from "@/shared/types/problem-details";

export class AuthServiceHttp implements IAuthRepository {
  async createUser(
    input: CreateUserInput
  ): Promise<[CreateUserOutput | null, ProblemDetailsResponse | null]> {
    try {
      const res = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const problems: ProblemDetailsResponse = await res.json();
        return [null, problems];
      }

      const data: CreateUserOutput = await res.json();

      return [data, null];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return [
          null,
          {
            errors: [
              {
                type: "InternalError",
                title: "Network Error",
                status: 500,
                detail: error.message || "An unknown error occurred",
              },
            ],
          },
        ];
      }

      return [
        null,
        {
          errors: [
            {
              type: "InternalError",
              title: "Unexpected Error",
              status: 500,
              detail: "An unexpected error occurred",
            },
          ],
        },
      ];
    }
  }

  async login(
    input: LoginInput
  ): Promise<[LoginOutput | null, ProblemDetailsResponse | null]> {
    try {
      const res = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        const problems: ProblemDetailsResponse = await res.json();
        return [null, problems];
      }

      const data: LoginOutput = await res.json();
      return [data, null];
    } catch (error: unknown) {
      if (error instanceof Error) {
        return [
          null,
          {
            errors: [
              {
                type: "InternalError",
                title: "Network Error",
                status: 500,
                detail: error.message || "An unknown error occurred",
              },
            ],
          },
        ];
      }

      return [
        null,
        {
          errors: [
            {
              type: "InternalError",
              title: "Unexpected Error",
              status: 500,
              detail: "An unexpected error occurred",
            },
          ],
        },
      ];
    }
  }
}
