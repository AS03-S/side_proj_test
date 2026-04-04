"use client";

import { User } from "@/types";

const DEMO_USER: User = {
  id: "user-001",
  name: "A. Meier",
  email: "a.meier@example.com",
  language: "English",
  country: "Germany",
};

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem("certa_user");
  if (stored) return JSON.parse(stored);
  return null;
}

export function login(email: string, _password: string): User {
  const user = { ...DEMO_USER, email };
  localStorage.setItem("certa_user", JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem("certa_user");
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}
