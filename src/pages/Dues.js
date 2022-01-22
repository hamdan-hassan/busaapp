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
  // const [amount, setAmount] = useState("50");

  const [l100badge, setL100Badge] = useState("danger");
  const [l200badge, setL200Badge] = useState("danger");
  const [l300badge, setL300Badge] = useState("danger");
  const [l400badge, setL400Badge] = useState("danger");

  useEffect(() => {
    axios
      .get("http://localhost:3000/dues/" + UserDetails.studentId.toUpperCase())
      .then((res) => {
        console.log(UserDetails.studentId);
        console.log(UserDetails.level);
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
                  <span className='text-sm'>50 ₵</span>
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
                  <span className='text-sm'>40 ₵</span>
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
                  <span className='text-sm'>30 ₵</span>
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
                  <span className='text-sm'>20 ₵</span>
                </TableCell>
                <TableCell>
                  <Badge type={l400badge}>{l400}</Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* <div>
        <div className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
          <PageTitle>Pay your dues</PageTitle>
          <Label className='mt-4'>
            <span>Select Network</span>
            <Select className='mt-1'>
              <option>MTN</option>
              <option>VodaFone</option>
              <option>AirtelTigo</option>
            </Select>
          </Label>
          <Label className='mt-4'>
            <span>Select Level</span>
            <Select
              className='mt-1'
              onChange={(e) => {
                if (e.target.value === "100") {
                  setAmount(50);
                }
                if (e.target.value === "200") {
                  setAmount(40);
                }
                if (e.target.value === "300") {
                  setAmount(30);
                }
                if (e.target.value === "400") {
                  setAmount(20);
                }
              }}>
              <option>100</option>
              <option>200</option>
              <option>300</option>
              <option>400</option>
            </Select>
          </Label>
          <Label className='mt-4'>
            <span>Amount</span>
            <Input className='mt-1' value={amount} disabled />
          </Label>
          <Label className='mt-4'>
            <span>Enter Phone Number</span>
            <Input className='mt-1' placeholder='0535796563' />
          </Label>
          <Label>
            <Button className='mt-5'>Pay</Button>
          </Label>
        </div>
        <div>
          <Checkmark />
          <h1 style={{ fontSize: 20, textAlign: "center" }}>
            Payment Successful
          </h1>
        </div>
      </div> */}
    </>
  );
}

export default Dues;
