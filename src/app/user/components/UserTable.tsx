import { useUsers } from "@/app/context/UserContext";
import { Avatar } from "@/components/Avatar";
import { User } from "@/types/user";
import { DotsThreeVertical, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import NextLink from "next/link";

enum UserRoles {
  developer = "Developer",
  uidesigner = "Ui Designer",
  hrmanager = "HR Manager",
  leader = "Leader",
}

interface UserTableProps {
  userData?: User[];
}

export function UserTable({ userData }: UserTableProps) {
  const { deleteOne } = useUsers();

  return (
    <div className="max-sm:overflow-x-scroll min-w-[200px]">
      <table className="table max-md:table-sm max-[375px]:table-xs">
        <thead>
          <tr>
            <th>
              <input type="checkbox" className="checkbox border-2" disabled={userData?.length === 0}></input>
            </th>
            <th>Name</th>
            <th>Company</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {userData?.map(({ id, company, name, role, image, status, verified }) => (
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
                    status === "active" ? "badge-success" : status === "banned" ? "badge-error" : "badge-info"
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
                    <NextLink href={`edit/${id}`}>
                      <li>
                        <button>
                          <PencilSimple />
                          Edit
                        </button>
                      </li>
                    </NextLink>
                    <li>
                      <button onClick={() => deleteOne(id)}>
                        <TrashSimple />
                        Remove
                      </button>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
