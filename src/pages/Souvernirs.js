import React, { useState, useEffect } from "react";

import PageTitle from "../components/Typography/PageTitle";
import axios from "axios";
import {baseUrl} from '../api/busa-api.js'
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
    const [loading,setLoading] = useState(true)
  const [books, setBooks] = useState("");
  const [shirt, setShirt] = useState("");
  

  const [booksBadge, setBooksBadge] = useState("danger");
  const [shirtBadge, setShirtBadge] = useState("danger");

  useEffect(() => {
    axios
      .get(
        `${baseUrl.baseUrl}/souvenirs/` +
        UserDetails.studentId.toUpperCase()
      )
      .then((res) => {
        setBooks(res.data[0].books);
        if (res.data[0].books !== 0) {
          setBooksBadge("success");
        }
        setShirt(res.data[0].t_shirt);
        if (res.data[0].t_shirt !== 0) {
          setShirtBadge("success");
        }
        setLoading(false)
      });
  }, []);

  return (
    <>
    <div className="mt-12 md:mt-2">
      <PageTitle>Souvenirs</PageTitle>
      <div className='grid gap-6 mb-8 md:grid-cols-2'>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                {UserDetails.level === 100 && <TableCell>T-Shirts</TableCell>}
                <TableCell>Books</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                {UserDetails.level === 100 && <TableCell>
                  <Badge type={shirtBadge}>{shirt === 0 ? "Pending" : "Collected"}</Badge>
                </TableCell>}
                <TableCell>
                 {loading ? <p>Loading...</p> : <Badge type={booksBadge}>{books === 0 ? "Pending" : "Collected"}</Badge>}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>
    </>
  );
}

export default Sourverniers;
