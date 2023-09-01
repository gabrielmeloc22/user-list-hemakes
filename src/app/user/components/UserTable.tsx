import { useUsers } from "@/app/context/UserContext";
import { Avatar } from "@/components/Avatar";
import { User } from "@/types/user";
import { ArrowDown, ArrowUp, DotsThreeVertical, PencilSimple, TrashSimple } from "@phosphor-icons/react";
import NextLink from "next/link";
import { Dispatch, SetStateAction } from "react";

enum UserRoles {
  developer = "Developer",
  uidesigner = "Ui Designer",
  hrmanager = "HR Manager",
  leader = "Leader",
}

interface UserTableProps {
  userData?: User[];
  onSelect: Dispatch<SetStateAction<string[]>>;
  selected: string[];
  onSort: Dispatch<SetStateAction<"ASC" | "DESC">>;
  sorting: "ASC" | "DESC";
}

export function UserTable({ userData, onSelect, selected, onSort, sorting }: UserTableProps) {
  const { deleteOne } = useUsers();

  return (
    <div className="max-sm:overflow-x-scroll h-screen overflow-y-hidden min-w-[200px]">
      <table className="table max-md:table-sm max-[375px]:table-xs">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                className="checkbox border-2"
                disabled={userData?.length === 0}
                checked={selected.length === userData?.length}
                onChange={(e) =>
                  e.target.checked
                    ? userData && e.target.checked && onSelect(userData.map(({ id }) => id))
                    : onSelect([])
                }
              />
            </th>
            <th>
              <div className="flex items-center gap-2">
                Name
                <button onClick={() => onSort((prev) => (prev === "ASC" ? "DESC" : "ASC"))}>
                  {sorting === "ASC" ? <ArrowUp /> : <ArrowDown />}
                </button>
              </div>
            </th>
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
                <input
                  type="checkbox"
                  className="checkbox border-2"
                  checked={selected.includes(id)}
                  onChange={(e) =>
                    e.target.checked
                      ? onSelect((prev) => [...prev, id])
                      : onSelect((prev) => prev.filter((userId) => userId !== id))
                  }
                />
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
