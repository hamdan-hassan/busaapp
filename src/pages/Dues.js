import React, { useEffect, useState } from "react";

import PageTitle from "../components/Typography/PageTitle";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  Badge,
} from "@windmill/react-ui";
import axios from "axios";
import { UserDetails } from "../userDetails";
function Dues() {
  const [l100, setL100] = useState("");
  const [l200, setL200] = useState("");
  const [l300, setL300] = useState("");
  const [l400, setL400] = useState("");

  const [l100badge, setL100Badge] = useState("danger");
  const [l200badge, setL200Badge] = useState("danger");
  const [l300badge, setL300Badge] = useState("danger");
  const [l400badge, setL400Badge] = useState("danger");

  useEffect(() => {
    axios
      .get("http://localhost:3000/dues/" + UserDetails.studentId.toUpperCase())
      .then((res) => {
        setL100(res.data[0].level_100);
        if (res.data[0].level_100.toLowerCase() !== "Pending".toLowerCase()) {
          setL100Badge("success");
        }
        setL200(res.data[0].level_200);
        if (res.data[0].level_200.toLowerCase() !== "Pending".toLowerCase()) {
          setL200Badge("success");
        }
        setL300(res.data[0].level_300);
        if (res.data[0].level_300.toLowerCase() !== "Pending".toLowerCase()) {
          setL300Badge("success");
        }
        setL400(res.data[0].level_400);
        if (res.data[0].level_400.toLowerCase() !== "Pending".toLowerCase()) {
          setL400Badge("success");
        }
      });
  }, []);

  return (
    <>
      <PageTitle>Dues</PageTitle>

      <div className='grid gap-6 mb-8 md:grid-cols-2'>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Dues</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <span className='font-semibold ml-2'>Level 100</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>100 ₵</span>
                </TableCell>
                <TableCell>
                  <Badge type={l100badge}>{l100}</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <span className='font-semibold ml-2'>Level 200</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>100 ₵</span>
                </TableCell>
                <TableCell>
                  <Badge type={l200badge}>{l200}</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <span className='font-semibold ml-2'>Level 300</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>100 ₵</span>
                </TableCell>
                <TableCell>
                  <Badge type={l300badge}>{l300}</Badge>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <span className='font-semibold ml-2'>Level 400</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>100 ₵</span>
                </TableCell>
                <TableCell>
                  <Badge type={l400badge}>{l400}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default Dues;
