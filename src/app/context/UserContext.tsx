"use client";

import { User } from "@/types/user";
import { createContext, useContext, useEffect, useState } from "react";

interface UserContextData {
  users: User[];
  deleteOne: (id: string) => void;
  save: (user: Omit<User, "id">) => void;
  updateUser: (id: string, user: Omit<User, "id">) => void;
  getById: (id: string) => User | null | undefined;
  deleteMany: (ids: string[]) => void;
}

const UserContext = createContext<UserContextData>({} as UserContextData);

interface UserContextProps {
  children: React.ReactNode;
}
export function UserProvider({ children }: UserContextProps) {
  const [users, setUsers] = useState<Record<string, User> | undefined>();
  const usersArray = Object.values(users || {});

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
    if (users) {
      setUsers((prev) => {
        const filtered = Object.entries(prev || []).filter(([userId]) => userId !== id);
        return Object.fromEntries(filtered);
      });
    }
  };
  const getById = (id: string): User | null | undefined => {
    if (users === undefined) return users;
    return users?.[id];
  };
  const updateUser = (id: string, user: Omit<User, "id">) => {
    setUsers((prev) => ({ ...prev, [id]: { id, ...user } }));
  };
  const deleteMany = (ids: string[]) => {
    setUsers((prev) => {
      const filtered = Object.entries(prev || []).filter(([userId]) => !ids.includes(userId));
      return Object.fromEntries(filtered);
    });
  };

  return (
    <UserContext.Provider value={{ users: usersArray, save, deleteOne, updateUser, getById, deleteMany }}>
      {children}
    </UserContext.Provider>
  );
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

export function useUsers() {
  return useContext(UserContext);
}
