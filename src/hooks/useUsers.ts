"use client";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState<Record<string, User> | null>();

  useEffect(() => {
    if (!users) {
      setUsers(getAllUsers());
    } else {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const save = (user: Omit<User, "id">) => {
    const id = self.crypto.randomUUID();
    setUsers((prev) => ({ ...prev, [id]: { id, ...user } }));
  };
  const removeOne = (id: string) => {
    const filtered = { ...users };
    delete filtered[id];
    setUsers(filtered);
  };

  return { users: Object.values(users || {}), save, removeOne };
}

const getAllUsers = (): Record<string, User> | null => {
  try {
    const users = localStorage.getItem("users");
    if (!users) {
      return {};
    }
    return JSON.parse(users);
  } catch (e) {
    return {};
  }
};
