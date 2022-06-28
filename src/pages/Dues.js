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
import {baseUrl} from '../api/busa-api.js'
import axios from "axios";
import { UserDetails } from "../userDetails";
function Dues() {
  const [loading,setLoading] = useState(true)
  const [l100, setL100] = useState("");
  const [l200, setL200] = useState("");
  const [l300, setL300] = useState("");
  const [l400, setL400] = useState("");
  // const [amount, setAmount] = useState("50");

  const [l100badge, setL100Badge] = useState("danger");
  const [l200badge, setL200Badge] = useState("danger");
  const [l300badge, setL300Badge] = useState("danger");
  const [l400badge, setL400Badge] = useState("danger");
  const [programmeType,setProgrammeType] = useState("")

  useEffect(() => {
    axios
      .post(
        `${baseUrl.baseUrl}/dues/`,
        {
        StudentID: UserDetails.studentId
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
       
        setProgrammeType(res.data[0].programme_type)
  
        setL100(res.data[0].level_100);
        if (res.data[0].level_100 !== 0) {
          setL100Badge("success");
        }
        setL200(res.data[0].level_200);
        if (res.data[0].level_200 !== 0) {
          setL200Badge("success");
        }
        setL300(res.data[0].level_300);
        if (res.data[0].level_300 !== 0) {
          setL300Badge("success");
        }
        setL400(res.data[0].level_400);
        if (res.data[0].level_400 !== 0) {
          setL400Badge("success");
        }
        setLoading(false)
      });
  }, []);

  return (
    <>
    <div className="mt-12 md:mt-2">
      <PageTitle>Dues</PageTitle>

      <div className='grid gap-6 mb-8 md:grid-cols-2'>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Dues</TableCell>
                <TableCell>Amount (₵)</TableCell>
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
                  <span className='text-sm'>65 ₵</span>
                </TableCell>
                <TableCell>
                  {loading ? <p>Loading...</p> : <Badge type={l100badge}>{l100 === 0 ? "Pending" : "Paid"}</Badge>}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <div className='flex items-center text-sm'>
                    <span className='font-semibold ml-2'>Level 200</span>
                  </div>
                </TableCell>
                <TableCell>
                  <span className='text-sm'>30 ₵</span>
                </TableCell>
                <TableCell>
                  {loading ? <p>Loading...</p> : <Badge type={l200badge}>{l200 === 0 ? "Pending" : "Paid"}</Badge>}
                </TableCell>
              </TableRow>
             {programmeType !== "Diploma" && <><TableRow>
                             <TableCell>
                               <div className='flex items-center text-sm'>
                                 <span className='font-semibold ml-2'>Level 300</span>
                               </div>
                             </TableCell>
                             <TableCell>
                               <span className='text-sm'>30 ₵</span>
                             </TableCell>
                             <TableCell>
                               {loading ? <p>Loading...</p> : <Badge type={l300badge}>{l300 === 0 ? "Pending" : "Paid"}</Badge>}
                             </TableCell>
                           </TableRow>
                           <TableRow>
                             <TableCell>
                               <div className='flex items-center text-sm'>
                                 <span className='font-semibold ml-2'>Level 400</span>
                               </div>
                             </TableCell>
                             <TableCell>
                               <span className='text-sm'>30 ₵</span>
                             </TableCell>
                             <TableCell>
                               {loading ? <p>Loading...</p> : <Badge type={l400badge}>{l400 === 0 ? "Pending" : "Paid"}</Badge>}
                             </TableCell>
                           </TableRow></>}
                         </TableBody>
          </Table>
        </TableContainer>
      </div>
      </div>
    </>
  );
}

export default Dues;
