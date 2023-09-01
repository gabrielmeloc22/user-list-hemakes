"use client";

import { notFound, useParams } from "next/navigation";
import { UserForm } from "../../components/UserForm";
import { useUsers } from "../../../context/UserContext";
import { useRouter } from "next/navigation";

export default function UserEditPage() {
  const { id } = useParams();
  const router = useRouter();
  const { getById, updateUser, deleteOne } = useUsers();
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
          <span className="capitalize">{user.name}&apos;s</span> info
        </h1>
      </header>
      <main>
        <UserForm
          onSubmit={(data) => {
            updateUser(id as string, data);
            router.push("/user/list");
          }}
          defaultValues={user}
        />
        <div className="flex border-neutral-300 border-t justify-center w-full p-10  mt-10">
          <button
            type="button"
            className="btn btn-error"
            onClick={() => {
              deleteOne(id as string);
              router.push("/user/list");
            }}
          >
            Delete user
          </button>
        </div>
      </main>
    </div>
  );
}
