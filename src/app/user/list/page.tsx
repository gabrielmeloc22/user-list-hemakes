"use client";

import { useUsers } from "@/app/context/UserContext";
import { Plus } from "@phosphor-icons/react";
import { fuzzyFilter } from "fuzzbunny";
import NextLink from "next/link";
import { useState } from "react";
import { UserSearchInput } from "../components/UserSearchInput";
import { UserTable } from "../components/UserTable";

export default function UserListPage() {
  const { users } = useUsers();
  const [searchValue, setSearchValue] = useState("");
  const [userSelection, setUserSelection] = useState<string[]>();

  const userTableData = !searchValue
    ? users
    : fuzzyFilter(users, searchValue, {
        fields: ["company", "name", "role", "status", "verified"],
      }).map(({ item }) => item);

  console.log(userTableData, users);

  return (
    <div className="flex flex-col w-full max-w-screen-2xl">
      <header className="p-4 flex justify-between">
        <h1 className="text-3xl font-bold">User</h1>
        <NextLink href="create">
          <button className="btn btn-primary">
            <Plus size="1rem" height="1rem" weight="bold" />
            New User
          </button>
        </NextLink>
      </header>
      <main>
        <UserSearchInput onSearch={setSearchValue} />
        <UserTable userData={userTableData} />
      </main>
    </div>
  );
}
