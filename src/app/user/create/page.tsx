"use client";

import { useUsers } from "@/hooks/useUsers";
import { UserForm } from "../components/UserForm";
import { useRouter } from "next/navigation";

export default function UserCreatePage() {
  const router = useRouter();
  const { save } = useUsers();

  return (
    <div className="flex flex-col items-center gap-20 p-6">
      <header>
        <h1 className="font-bold text-3xl">Create user</h1>
      </header>
      <main>
        <UserForm
          onSubmit={(data) => {
            save(data);
            router.push("list");
          }}
        />
      </main>
    </div>
  );
}
