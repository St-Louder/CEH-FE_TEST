import { useState, useEffect } from "react";
import axios from "axios";

interface Post {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: string[];
    brand: string;
    sku: string;
    weight: number;
    dimensions: {
      width: number;
      height: number;
      depth: number;
    };
    warrantyInformation: string;
    shippingInformation: string;
    availabilityStatus: string;
    reviews: {
      rating: number;
      comment: string;
      date: string;
      reviewerName: string;
      reviewerEmail: string;
    }[];
    returnPolicy: string;
    minimumOrderQuantity: number;
    meta: {
      createdAt: string;
      updatedAt: string;
      barcode: string;
      qrCode: string;
    };
    images: string[];
    thumbnail: string;
  }
  const useFetchData = (page: number) => {
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
  
    useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`https://dummyjson.com/products?skip=${(page - 1) * 10}&limit=10`);
          const newData = response.data.products;
  
          setData((prevData) => [...prevData, ...newData]);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
        setLoading(false);
      };
  
      fetchData();
    }, [page]);
  
    const resetData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setData(response.data.products);
      } catch (error) {
        console.error("Error resetting data:", error);
      }
      setLoading(false);
    };
  
    return { data, loading, setData, resetData };
  };

export default useFetchData;
