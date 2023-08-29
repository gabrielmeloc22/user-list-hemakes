"use client";

import { Avatar } from "@/components/Avatar";
import { useUsers } from "@/hooks/useUsers";
import { DotsThreeVertical, PencilSimple, Plus, TrashSimple } from "@phosphor-icons/react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { UserSearch } from "../components/UserSearch";
import { User } from "@/types/user";
import { fuzzyFilter } from "fuzzbunny";

enum UserRoles {
  developer = "Developer",
  uidesigner = "Ui Designer",
  hrmanager = "HR Manager",
  leader = "Leader",
}

export default function UserListPage() {
  const { users, removeOne } = useUsers();
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>();

  const userTableData = searchResult?.length !== 0 ? searchResult : users;

  useEffect(() => {
    const rawResults = fuzzyFilter(users, searchValue, {
      fields: ["company", "name", "role", "status", "verified"],
    });
    setSearchResult(rawResults.map(({ item }) => item));
  }, [searchValue]);

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
        <UserSearch setSearchValue={setSearchValue} />
        <table className="table">
          <thead>
            <tr>
              <th>
                <input type="checkbox" className="checkbox border-2" disabled={users?.length === 0}></input>
              </th>
              <th>Name</th>
              <th>Company</th>
              <th>Role</th>
              <th>Verified</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody className="[& td]">
            {userTableData?.map(({ id, company, name, role, image, status, verified }) => (
              <tr key={id}>
                <td>
                  <input type="checkbox" className="checkbox border-2" />
                </td>
                <td>
                  <div className="flex gap-2 items-center font-semibold">
                    <Avatar image={image} size="sm" circle />
                    {name}
                  </div>
                </td>
                <td>{company}</td>
                <td>{UserRoles[role]}</td>
                <td>{verified ? "Yes" : "No"}</td>
                <td>
                  <div
                    className={`badge ${
                      status === "active"
                        ? "badge-success"
                        : status === "banned"
                        ? "badge-error"
                        : "badge-neutral"
                    } font-bold rounded-md px-3 py-1`}
                  >
                    {status}
                  </div>
                </td>
                <td className="w-1">
                  <div className="dropdown dropdown-end">
                    <label className="hover:cursor-pointer" tabIndex={0}>
                      <DotsThreeVertical size={24} />
                    </label>
                    <ul
                      tabIndex={0}
                      className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
                    >
                      <li>
                        <button>
                          <PencilSimple />
                          Edit
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            removeOne(id);
                          }}
                        >
                          <TrashSimple />
                          Remove
                        </button>
                      </li>
                    </ul>
                  </div>
                  <button type="button"></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
}
