import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
  TableContainer,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Label,
  Modal,
  Select,
} from "@windmill/react-ui";
import CustomModal from "./Modal";
import MaterialTable from "material-table";

import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import axios from "axios";

import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import React, { forwardRef, useState, useEffect } from "react";

const Admin = () => {
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  };
  const [data, setData] = useState([]);

  const [columns, setColumns] = useState([
    { title: "Student ID", field: "std_id", editable: "never" },
    {
      title: "Level",
      field: "level",
      type: "numeric",
      initialEditValue: "initial edit value",
      editable: "never",
    },
    { title: "Programme", field: "programme", editable: "never" },
    {
      title: "Level 100 Due",
      field: "level_100",
    },
    {
      title: "Level 200 Due",
      field: "level_200",
    },
    {
      title: "Level 300 Due",
      field: "level_300",
    },
    {
      title: "Level 400 Due",
      field: "level_400",
    },
    {
      title: "T-Shirt",
      field: "t_shirt",
    },
    {
      title: "Books",
      field: "books",
    },
    { title: "Email", field: "email", hidden: true },
    { title: "Phone", field: "phone_number", hidden: true },
    { title: "Name", field: "first_name", hidden: true },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/getStudents")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal(row) {
    setId(row.stdId);
    setEmail(row.email);
    setPhone(row.phone_number);
    setName(row.first_name);
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h1>{id}</h1>
        <ModalHeader>Student Contact</ModalHeader>
        <ModalBody>
          <TableContainer>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableCell>Email</TableCell>
                  <TableCell>Phone number</TableCell>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <h1>{email}</h1>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{phone}</span>
                  </TableCell>
                  <TableCell>
                    <span className='text-sm'>{name}</span>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={closeModal}>
            Cancel
          </Button>
          <Button className='w-full sm:w-auto'>Accept</Button>
        </ModalFooter>
      </Modal>
      <MaterialTable
        icons={tableIcons}
        title='Students Informations'
        columns={columns}
        options={{
          exportButton: true,
        }}
        data={data}
        onRowClick={(event, rowData) => openModal(rowData)}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                const stdid = oldData.std_id;
                const level100 = newData.level_100;
                const level200 = newData.level_200;
                const level300 = newData.level_300;
                const level400 = newData.level_400;
                const tshirt = newData.t_shirt;
                const books = newData.books;

                const config = {
                  headers: { "Content-Type": "application/json" },
                };

                axios
                  .put(
                    "http://localhost:3000/update",
                    {
                      stdid: stdid,
                      level100: level100,
                      level200: level200,
                      level300: level300,
                      level400: level400,
                      tshirt: tshirt,
                      books: books,
                    },
                    config
                  )
                  .then()
                  .catch((err) => console.log(err));
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .delete("http://localhost:3000/remove/" + oldData.std_id)
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));

                axios
                  .delete(
                    "http://localhost:3000/remove-register/" + oldData.std_id
                  )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));

                axios
                  .delete(
                    "http://localhost:3000/remove-login/" + oldData.std_id
                  )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));

                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve();
              }, 1000);
            }),
        }}
      />
      <Label className='mt-4 mb-5'>
        <h1 style={{ fontSize: "20px" }}>Delete All IDs</h1>
        <span>Select Level</span>
        <Select className='mt-1'>
          <option>100</option>
          <option>200</option>
          <option>300</option>
          <option>400</option>
        </Select>
        <CustomModal
          ModalTitle={"Delete IDs"}
          ModalHead={"Delete Student IDs"}
          ModalContent={"Are you sure you want to delete all IDs the?"}
        />
      </Label>
    </div>
  );
};
export default Admin;
