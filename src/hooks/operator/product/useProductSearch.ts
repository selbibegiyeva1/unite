import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductGroups } from "./useProductGroups";
import type { ProductGroup } from "../../../services/authService";

export function useProductSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const navigate = useNavigate();
  const { data: groups, isLoading } = useProductGroups();

  const filteredGroups: ProductGroup[] =
    groups?.filter((group) =>
      group.group_name.toLowerCase().includes(searchQuery.toLowerCase())
    ) ?? [];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProductSelect = (groupName: string) => {
    setSearchQuery("");
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    navigate(`/operator/product?group=${encodeURIComponent(groupName)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) =>
        prev < filteredGroups.length - 1 ? prev + 1 : prev
      );
      setIsDropdownOpen(true);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
    } else if (e.key === "Enter" && selectedIndex >= 0 && filteredGroups[selectedIndex]) {
      e.preventDefault();
      handleProductSelect(filteredGroups[selectedIndex].group_name);
    } else if (e.key === "Escape") {
      setIsDropdownOpen(false);
      setSelectedIndex(-1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
    setSelectedIndex(-1);
  };

  const handleInputFocus = () => {
    if (searchQuery && filteredGroups.length > 0) {
      setIsDropdownOpen(true);
    }
  };

  const handleSearchClick = () => {
    if (searchQuery && filteredGroups.length > 0) {
      handleProductSelect(filteredGroups[0].group_name);
    }
  };

  return {
    // state
    searchQuery,
    isDropdownOpen,
    selectedIndex,
    filteredGroups,
    isLoading,

    // refs
    searchRef,
    inputRef,

    // handlers
    handleKeyDown,
    handleInputChange,
    handleInputFocus,
    handleProductSelect,
    handleSearchClick,
  };
}

