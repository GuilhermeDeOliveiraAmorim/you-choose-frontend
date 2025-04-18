"use client";

import { useState } from "react";
import { LoginInput, LoginUseCase } from "@/core/usecases/login.usecase";
import { AuthServiceHttp } from "@/infrastructure/api/auth-api";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [form, setForm] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const authRepo = new AuthServiceHttp();
    const usecase = new LoginUseCase(authRepo);
    const [output, errors] = await usecase.execute(form);

    if (errors) {
      const messages = errors.errors
        .map((e) => `• ${e.title}: ${e.detail}`)
        .join("\n");
      setMessage(messages);
    } else if (output) {
      setMessage(output.success_message);
      router.push("/vote");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-sm mx-auto p-4"
    >
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
        placeholder="Senha"
        value={form.password}
        onChange={handleChange}
        className="border p-2 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">
        Entrar
      </button>
      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
}
