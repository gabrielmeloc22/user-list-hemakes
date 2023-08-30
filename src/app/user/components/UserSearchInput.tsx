import { MagnifyingGlass } from "@phosphor-icons/react";
import { DebounceInput } from "react-debounce-input";

interface UserSeachInputProps {
  setSearchValue: (value: string) => void;
}

export function UserSearchInput({ setSearchValue }: UserSeachInputProps) {
  return (
    <div className="p-4">
      <label className="flex gap-4 w-fit max-md:w-full border items-center border-neutral-300 rounded-md px-4 py-3 hover:cursor-pointer">
        <MagnifyingGlass size="1rem" />
        <DebounceInput
          className="outline-none"
          type="text"
          aria-label="user search"
          id="user-search"
          placeholder="Search user..."
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
      </label>
    </div>
  );
}
