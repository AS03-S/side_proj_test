"use client";

import { User } from "@/types";

const DEMO_USER: User = {
  id: "user-001",
  name: "A. Meier",
  email: "a.meier@example.com",
  language: "English",
  country: "Sweden",
};

const STORAGE_KEY = "migradocs_user";

export function getUser(): User | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return null;
}

export function login(email: string, _password: string): User {
  const user = { ...DEMO_USER, email };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

export function logout(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function isAuthenticated(): boolean {
  return getUser() !== null;
}
