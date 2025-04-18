"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AuthServiceHttp } from "@/infrastructure/api/auth-api";

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginFormData>();
  const router = useRouter();
  const authService = new AuthServiceHttp();

  interface LoginFormData {
    email: string;
    password: string;
  }

  const onSubmit = async (data: LoginFormData) => {
    try {
      await authService.login(data.email, data.password);
      router.push("/vote");
    } catch {
      alert("Erro ao fazer login.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <input
        {...register("email")}
        placeholder="Email"
        className="block mb-2"
      />
      <input
        {...register("password")}
        placeholder="Senha"
        type="password"
        className="block mb-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Entrar
      </button>
    </form>
  );
}
