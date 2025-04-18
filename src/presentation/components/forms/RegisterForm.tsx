"use client";

import {
  CreateUserInput,
  CreateUserUseCase,
} from "@/core/usecases/create-user.usecase";
import { AuthServiceHttp } from "@/infrastructure/api/auth-api";
import { useState } from "react";

export default function RegisterForm() {
  const [form, setForm] = useState<CreateUserInput>({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authRepo = new AuthServiceHttp();
    const usecase = new CreateUserUseCase(authRepo);
    const [output, errors] = await usecase.execute(form);

    if (errors) {
      const messages = errors.errors
        .map((e) => `• ${e.title}: ${e.detail}`)
        .join("\n");
      setMessage(messages);
    } else if (output) {
      setMessage(output.success_message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto p-4"
    >
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Cadastrar
      </button>
      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
