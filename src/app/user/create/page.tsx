"use client";

import { useRouter } from "next/navigation";
import { useUsers } from "@/app/context/UserContext";
import { UserForm } from "../components/UserForm";

export default function UserCreatePage() {
  const router = useRouter();
  const { save } = useUsers();

  return (
    <div className="flex flex-col items-center gap-20 p-6">
      <header className="w-full">
        <h1 className="text-start font-bold text-3xl pt-10">Create user</h1>
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
