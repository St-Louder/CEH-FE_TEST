import React, { useState, useRef, useEffect, useCallback } from "react";
import { Card, Col, Row, Spin } from "antd";
import { DollarOutlined, ShoppingOutlined, AppstoreOutlined, StockOutlined } from "@ant-design/icons";
import useFetchData from "../../data/useFetchData";
import axios from "axios";
import SearchBar from "../SearchBar/SearchBar";
import { debounce } from "lodash";

const InfiniteScroll: React.FC = () => {
  const [page, setPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [criteria, setCriteria] = useState<"title" | "price">("title");
  const { data, loading, setData, resetData } = useFetchData(page);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const debouncedFetch = useCallback(
    debounce(async (query: string, searchCriteria: "title" | "price") => {
      if (!query) {
        resetData(); 
        return;
      }

      try {
        const response = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
        const filteredData = response.data.products;
        setData(filteredData);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    }, 300),
    []
  );

  const handleSearch = (query: string, searchCriteria: "title" | "price") => {
    setSearchQuery(query);
    setCriteria(searchCriteria);
    debouncedFetch(query, searchCriteria); 
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1.0 }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => observer.disconnect();
  }, [loading, page]);

  return (
    <div className="infinite-scroll">

      <div
        className="title"
        style={{
          color: "#005EE9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <h2>
          <AppstoreOutlined style={{ marginLeft: 20  }} />
          List Products
        </h2>
        <SearchBar onSearchChange={handleSearch}  style={{ marginLeft: "10px"  }}/>

      </div>

      <Row style={{ overflowX: "hidden", marginBottom: "30px" }}>
        {data.map((item) => (
          <Col key={item.id} xs={24} sm={12} md={8} lg={6} style={{ padding: "15px" }}>
            <Card hoverable cover={<img alt={item.title} src={item.thumbnail} />} style={{ height: "100%" }}>
              <Card.Meta
                title={
                  <span>
                    <ShoppingOutlined style={{ marginRight: 8 }} />
                    {item.title}
                  </span>
                }
                description={
                  <>
                    <p>
                      <DollarOutlined style={{ marginRight: 5 }} /> Price: ${item.price}
                    </p>
                    <p>
                      <StockOutlined style={{ marginRight: 5 }} /> Stock: {item.stock}
                    </p>
                    
                  </>
                }
              />
              <p>{item.description}</p>
            </Card>
          </Col>
        ))}
      </Row>

      {loading && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "30px" }}>
          <Spin size="default" />
        </div>
      )}

      <div ref={loaderRef} style={{ height: "40px", background: "#005EE9" }}></div>
    </div>
  );
};

export default InfiniteScroll;
