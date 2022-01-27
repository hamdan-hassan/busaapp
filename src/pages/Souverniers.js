import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import axios from "axios";
import { UserDetails } from "../userDetails";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@windmill/react-ui";

function Sourverniers() {
  const [books, setBooks] = useState("");
  const [shirt, setShirt] = useState("");

  const [booksBadge, setBooksBadge] = useState("danger");
  const [shirtBadge, setShirtBadge] = useState("danger");

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/api/souvenirs/" +
          UserDetails.studentId.toUpperCase()
      )
      .then((res) => {
        setBooks(res.data[0].books);
        if (res.data[0].books.toLowerCase() !== "Pending".toLowerCase()) {
          setBooksBadge("success");
        }
        setShirt(res.data[0].t_shirt);
        if (res.data[0].t_shirt.toLowerCase() !== "Pending".toLowerCase()) {
          setShirtBadge("success");
        }
      });
  }, []);

  return (
    <>
      <PageTitle>Souverniers</PageTitle>
      <div className='grid gap-6 mb-8 md:grid-cols-2'>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>T-Shirts</TableCell>
                <TableCell>Books</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Badge type={shirtBadge}>{shirt}</Badge>
                </TableCell>
                <TableCell>
                  <Badge type={booksBadge}>{books}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>{" "}
    </>
  );
}

export default Sourverniers;
