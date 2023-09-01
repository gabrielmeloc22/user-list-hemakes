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
  const [users, setUsers] = useState<User[]>();

  useEffect(() => {
    if (users === undefined) {
      setUsers(getAllUsers());
    } else {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const save = (user: Omit<User, "id">) => {
    const id = self.crypto.randomUUID();
    setUsers((prev) => [...(prev || []), { id, ...user }]);
  };
  const deleteOne = (id: string) => {
    setUsers((prev) => prev?.filter((user) => user.id !== id));
  };
  const getById = (id: string): User | undefined => {
    return users?.find((user) => user.id === id);
  };
  const updateUser = (id: string, user: Omit<User, "id">) => {
    setUsers((prev) => prev?.map((u) => (u.id === id ? { id, ...user } : u)));
  };
  const deleteMany = (ids: string[]) => {
    console.log(users?.filter((user) => !ids.includes(user.id)));

    setUsers((prev) => prev?.filter((user) => !ids.includes(user.id)));
  };

  return (
    <UserContext.Provider value={{ users: users || [], save, deleteOne, updateUser, getById, deleteMany }}>
      {children}
    </UserContext.Provider>
  );
}

const getAllUsers = (): User[] => {
  try {
    const users = localStorage.getItem("users");
    if (!users) {
      return [];
    }
    return Object.values(JSON.parse(users));
  } catch (e) {
    return [];
  }
};

export function useUsers() {
  return useContext(UserContext);
}
