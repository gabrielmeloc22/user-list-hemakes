import { MagnifyingGlass } from "@phosphor-icons/react";
import { DebounceInput } from "react-debounce-input";

interface UserSeachInputProps {
  onSearch: (value: string) => void;
}

export function UserSearchInput({ onSearch }: UserSeachInputProps) {
  return (
    <label className="flex gap-4 w-fit max-md:w-full border items-center border-neutral-300 rounded-md px-4 py-3 hover:cursor-pointer">
      <MagnifyingGlass size="1rem" />
      <DebounceInput
        className="outline-none bg-transparent"
        type="text"
        aria-label="user search"
        id="user-search"
        placeholder="Search user..."
        onChange={(e) => {
          onSearch(e.target.value);
        }}
      />
    </label>
  );
}
