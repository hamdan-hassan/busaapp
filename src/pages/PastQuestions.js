import React, { useEffect, useState } from "react";
import PageTitle from "../components/Typography/PageTitle";
import {
  Label,
  Button,
  Select,
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@windmill/react-ui";
import axios from "axios";
import { UserDetails } from "../userDetails";
import { Link } from "react-router-dom";

const PastQuestions = () => {
  const [programme, setProgramme] = useState("BCom(Level 100)");
  const [level, setLevel] = useState("300");
  const [disableLevel, setDisableLevel] = useState(true);
  const [removeLevel, setRemoveLevel] = useState(false);
  const [data, setData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/isRegistered/" + UserDetails.studentId)
      .then((res) => {
        if (res.data[0].registered === "true") {
          setRegistered(true);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = () => {
    axios
      .post(
        "http://localhost:3000/api/get-past-questions",
        {
          Programme: programme,
          Level: level,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.rows.length === 0) {
          setNoData(true);
          return;
        }
        setNoData(false);
        console.log(res.data.rows);
        setData(res.data.rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      {!registered ? (
        <div
          className="dark:text-gray-200"
          style={{
            marginTop: "50px",
            fontSize: "2rem",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <h1>
            Please register as a member in order to get access to this page
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Button
              tag={Link}
              to="/app/registration"
              style={{
                width: 200,
              }}
            >
              Go to Registration
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <PageTitle>Past Questions</PageTitle>

          <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
            <Label className="mt-4">
              <span>Select Programme</span>
              <Select
                className="mt-1"
                onChange={(e) => {
                  setRemoveLevel(false);
                  setProgramme(e.target.value);
                  if (e.target.value === "BCom(Level 100)") {
                    setLevel(100);

                    return setDisableLevel(true);
                  }

                  if (e.target.value === "BCom(Level 200)") {
                    setLevel(200);

                    return setDisableLevel(true);
                  }

                  if (
                    e.target.value === "BCom(Human Resource Management)" ||
                    e.target.value === "BCom(Accounting)" ||
                    e.target.value === "BCom(Banking and Finance)" ||
                    e.target.value === "BCom(Marketing)" ||
                    e.target.value === "BCom(Procurement and Supply Chain Management)"
                  ) {
                    setRemoveLevel(true);
                  }

                  return setDisableLevel(false);
                }}
              >
                <option>BCom(Level 100)</option>
                <option>BCom(Level 200)</option>
                <option>BCom(Human Resource Management)</option>
                <option>BCom(Accounting)</option>
                <option>BCom(Banking and Finance)</option>
                <option>BCom(Marketing)</option>
                <option>BCom(Procurement and Supply Chain Management)</option>
                <option>Bsc Accounting</option>
                <option>Bsc Accounting and Finance</option>
                <option>BA Management</option>
                <option>Diploma in Business Studies</option>
              </Select>
            </Label>
            <Label
              className="mt-4"
              style={{ display: disableLevel ? "none" : null }}
            >
              <span>Select Level</span>
              <Select
                className="mt-1"
                onChange={(e) => {
                  setLevel(e.target.value);
                }}
              >
                {!removeLevel && <option>100</option>}
                {!removeLevel && <option>200</option>}
                <option>300</option>
                <option>400</option>
              </Select>
            </Label>

            <Label>
              <Button
                style={{ background: "#21c42a" }}
                className="mt-5" onClick={handleSearch}>
                Search
              </Button>
            </Label>
          </div>
          <Label>
            <PageTitle>Past Questions For First and Second Trimester</PageTitle>
          </Label>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Trimester</TableCell>
                  <TableCell>Doc type</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {noData ? (
                  <TableRow>
                    <TableCell>
                      <h1 style={{ fontSize: "25px" }}>
                        Opps No data found :(
                      </h1>
                    </TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                ) : (
                  data.map((item, index) => {
                    return (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="flex items-center text-sm">
                            <span className="font-semibold ml-2">
                              {item.trimester}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{item.doc}</span>
                        </TableCell>
                        <TableCell>
                          <Button
                            style={{ background: "#21c42a" }}
                          >
                            <a href={item.url}>View and Download</a>
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default PastQuestions;
