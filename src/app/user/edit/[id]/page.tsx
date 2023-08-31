"use client";

import { useUsers } from "@/hooks/useUsers";
import { notFound, useParams } from "next/navigation";
import { UserForm } from "../../components/UserForm";

export default function UserEditPage() {
  const { id } = useParams();
  const { getById, updateUser } = useUsers();
  const user = getById(id as string);

  if (user === undefined) {
    return;
  }
  if (user === null) {
    return notFound();
  }

  return (
    <div>
      <header className="flex flex-col gap-2 mb-20 pt-10">
        <h2>Edit user</h2>
        <h1 className="font-bold text-3xl">
          <span className="capitalize">{user.name}'s</span> info
        </h1>
      </header>
      <main>
        <UserForm onSubmit={(data) => updateUser(id as string, data)} defaultValues={user} />
      </main>
    </div>
  );
}