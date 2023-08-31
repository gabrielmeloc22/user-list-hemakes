"use client";
import { User } from "@/types/user";
import { useEffect, useState } from "react";

export function useUsers() {
  const [users, setUsers] = useState<Record<string, User> | undefined>();

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
  const deleteOne = (id: string) => {
    const filtered = { ...users };
    delete filtered[id];
    setUsers(filtered);
  };
  const getById = (id: string): User | null | undefined => {
    if (users === undefined) return users;
    return users?.[id] ?? null;
  };
  const updateUser = (id: string, user: Omit<User, "id">) => {
    setUsers((prev) => ({ ...prev, [id]: { id, ...user } }));
  };

  return { users: Object.values(users || {}), save, deleteOne, getById, updateUser };
}

const getAllUsers = (): Record<string, User> => {
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
