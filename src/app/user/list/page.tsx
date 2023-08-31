"use client";

import { useUsers } from "@/app/context/UserContext";
import { Plus, Trash } from "@phosphor-icons/react";
import { fuzzyFilter } from "fuzzbunny";
import NextLink from "next/link";
import { useState } from "react";
import { UserSearchInput } from "../components/UserSearchInput";
import { UserTable } from "../components/UserTable";

export default function UserListPage() {
  const { users, deleteMany } = useUsers();
  const [searchValue, setSearchValue] = useState("");
  const [userSelection, setUserSelection] = useState<string[]>([]);

  const userTableData = !searchValue
    ? users
    : fuzzyFilter(
        users.map((user) => ({ ...user, verified: user.verified ? "yes" : "no" })),
        searchValue,
        {
          fields: ["company", "name", "role", "status", "verified"],
        }
      ).map(({ item }) => ({ ...item, verified: item.verified === "yes" ? true : false }));

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
      <main className="flex flex-col gap-8">
        <div className="flex justify-between p-4">
          <UserSearchInput onSearch={setSearchValue} />
          {userSelection.length !== 0 && (
            <button
              className="btn btn-error flex gap-4 items-center"
              onClick={() => {
                deleteMany(userSelection);
                setUserSelection([]);
              }}
            >
              <Trash />
              Delete selected
            </button>
          )}
        </div>
        <UserTable userData={userTableData} onSelect={setUserSelection} selected={userSelection} />
      </main>
    </div>
  );
}
