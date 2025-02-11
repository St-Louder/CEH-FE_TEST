import React, { useState, useCallback } from "react";
import { Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { debounce } from "lodash";

interface SearchBarProps {
  onSearchChange: (query: string, criteria: string) => void;
}

type Criteria = "title" | "price";

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [criteria, setCriteria] = useState<Criteria>("title");

  
  const debouncedSearch = useCallback(
    debounce((value: string, crit: Criteria) => {
      onSearchChange(value, crit);
    }, 300), 
    []
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value, criteria); 
  };

  const handleCriteriaChange = (value: Criteria) => {
    setCriteria(value);
    debouncedSearch(searchQuery, value); 
  };

  return (
    <div className="search-bar" style={{ gap: 10 }}>
      <Select value={criteria} onChange={handleCriteriaChange}>
        <Select.Option value="title">Title</Select.Option>
        <Select.Option value="price">Price</Select.Option>
      </Select>

      <Input
        placeholder="Tìm kiếm..."
        prefix={<SearchOutlined />}
        allowClear
        style={{ width: 500, color: "#005EE9" }}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
