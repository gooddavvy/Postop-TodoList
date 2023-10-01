// import { InterInstance as inter } from "./_app";

import React, { useState, useEffect } from "react";
import type { TodoItem } from "@/types";
import useFetch from "@/hooks/useFetch";
import Heading from "@/components/Heading";
import SpinningLoader from "@/components/Loading";
import TodoList from "@/components/TodoList";

export default function Home() {
  let url = "http://localhost:3000/api/items";

  // States
  const [data, setData] = useState<TodoItem[] | unknown>([]);
  const [error, setError] = useState<Error | unknown | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Initialize loading as true

  // Data fetching
  let fetchData = async () => {
    try {
      const response = await useFetch(url);
      setData(response as unknown);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run this effect once when the component mounts

  if (error) {
    throw error;
  } else if (loading) return <SpinningLoader loading={loading} />; //
  else
    return (
      <main
        className={`flex min-h-screen flex-col items-center justify-between p-24`}
      >
        <Heading headerSize={1}>Hello Postop!</Heading>
        <br />
        <br />
        <TodoList
          data={data}
          listIsEmpty={!((data as TodoItem[]).length > 0)}
        />
      </main>
    );
}
