import React, { useEffect, useState } from "react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, getKeyValue, Radio, RadioGroup} from "@nextui-org/react";
import PostURL from "./postURL";


 

const columns = [
    {
      key: "srno",
      label: "Sr No.",
    },
    {
      key: "shortid",
      label: "Short ID",
    },
    {
      key: "redirectUrl",
      label: "Redirect URL",
    },
    {
      key: "no_of_clicks",
      label: "No. of clicks",
    },
  ];
export default function Homepage() {

    const [rows, setRows] = useState([]); // Store fetched data
    const [loading, setLoading] = useState(true); // Show loading state
     // Fetch data when the component mounts
    
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/getHomepagedata"); // API call to get data from MongoDB
        const result = await res.json();
        setRows(result.data); // Assuming data is in `result.data`
        setLoading(false); // Disable loading state after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false); 
      }
    };

    fetchData();
  }, []);
  console.log(rows);
  return (
    <>
    <PostURL/>
    <div className="flex flex-col items-center justify-start h-screen mt-16">
    <div className="table magnify">
      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        <Table 
        aria-label="Selection behavior table example with dynamic content"
        // selectionMode="multiple"
        // selectionBehavior={selectionBehavior}
      >
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
            </TableRow>
          )}
        </TableBody>
      </Table>
      )}
    </div>
  </div>
  </>
  );
}
