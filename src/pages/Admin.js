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
import SaveAlt from "@material-ui/icons/SaveAlt";
import axios from "axios";
import PageTitle from "../components/Typography/PageTitle";
import {baseUrl} from '../api/busa-api.js'
import Search from "@material-ui/icons/Search";
import { Checkmark } from "react-checkmark";
import React, { forwardRef, useState, useEffect } from "react";
import { TablePagination, TablePaginationProps } from '@material-ui/core';

const Admin = () => {
  // Table Icons
  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
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
  };



function PatchedPagination(props: TablePaginationProps) {
  const {
    ActionsComponent,
    onChangePage,
    onChangeRowsPerPage,
    ...tablePaginationProps
  } = props;

  return (
    <TablePagination
      {...tablePaginationProps}
      // @ts-expect-error onChangePage was renamed to onPageChange
      onPageChange={onChangePage}
      onRowsPerPageChange={onChangeRowsPerPage}
      ActionsComponent={(subprops) => {
        const { onPageChange, ...actionsComponentProps } = subprops;
        return (
          // @ts-expect-error ActionsComponent is provided by material-table
          <ActionsComponent
            {...actionsComponentProps}
            onChangePage={onPageChange}
          />
        );
      }}
    />
  );
}



  const [data, setData] = useState([]);
  const [level, setLevel] = useState(100);

  const [columns, setColumns] = useState([
    { title: "Student ID", field: "std_id", editable: "never" },
    { title: "Registration Status", field: "status", editable: "never" },
    {
      title: "Level",
      field: "level",
      type: "numeric",
      initialEditValue: "initial edit value",
      lookup: { 100: 100, 200: 200, 300: 300, 400: 400 }

    },
    { title: "Programme", field: "programme", editable: "never" },
    {
      title: "Level 100 Due",
      field: "level_100",
      lookup: { 0: 'Pending', 1: 'Paid' }
    },

    {
      title: "Level 200 Due",
      field: "level_200",
      lookup: { 0: 'Pending', 1: 'Paid' }

    },
    {
      title: "Level 300 Due",
      field: "level_300",
      lookup: { 0: 'Pending', 1: 'Paid' }
    },
    {
      title: "Level 400 Due",
      field: "level_400",
      lookup: { 0: 'Pending', 1: 'Paid' }
    },
    {
      title: "T-Shirt",
      field: "t_shirt",
      lookup: { 0: 'Pending', 1: 'Collected' }
    },
    {
      title: "Books",
      field: "books",
      lookup: { 0: 'Pending', 1: 'Collected' }
    },
    { title: "Email", field: "email", hidden: true },
    { title: "Phone", field: "phone_number", hidden: true },
    { title: "Name", field: "first_name", hidden: true },
  ]);

  // Fetch All Students from api
  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/getStudents`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [delDiploma, setDelDiploma] = useState(false)
  const [delDegree, setDelDegree] = useState(false)
  const [name, setName] = useState("");
  const [degreeFromLevel,setDegreeFromLevel] = useState(100)
  const [degreeToLevel,setDegreeToLevel] = useState(100)
  const [diplomaFromLevel,setDiplomaFromLevel] = useState(100)
  const [diplomaToLevel,setDiplomaToLevel] = useState(100)
  const [updatedDegreeLevel,setUpdatedDegreeLevel] = useState(false)
  const [updatedDiplomaLevel,setUpdatedDiplomaLevel] = useState(false)

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

  const handleDeleteIDs = () => {
    axios
      .delete(`${baseUrl.baseUrl}/remove-register/` + null + "/" + level)
      .then((res) => {
        axios
          .delete(`${baseUrl.baseUrl}/remove/` + null + "/" + level)
          .then((res) => {
            axios
              .delete(`${baseUrl.baseUrl}/remove-login/` + null + "/" + level)
              .then((res) => setDelDegree(true))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

      })
      .catch((err) => console.log(err));



  };


  const handleDeleteDiplomaIDs = () => {
    axios
      .delete(`${baseUrl.baseUrl}/remove-register-diploma/` + level)
      .then((res) => {
        axios
          .delete(`${baseUrl.baseUrl}/remove-diploma/` + level)
          .then((res) => {
            axios
              .delete(`${baseUrl.baseUrl}/remove-login-diploma/` + level)
              .then((res) => setDelDiploma(true))
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));

      })
      .catch((err) => console.log(err));
  };

  const handleUpdateDegreeLevels = () => {
 
 axios.put(`${baseUrl.baseUrl}/update-degree-levels`,

{
  fromlevel: degreeFromLevel,
  tolevel: degreeToLevel
},
   {
                  headers: { "Content-Type": "application/json" },
                }

  ).then((res) => {
    setUpdatedDegreeLevel(true)
    setTimeout(() => {
      setUpdatedDegreeLevel(false)
    },5000)
  })
    .catch(err => console.log(err))
}


 const handleUpdateDiplomaLevels = () => {
  axios.put(`${baseUrl.baseUrl}/update-diploma-levels`,

{
  fromlevel: diplomaFromLevel,
  tolevel: diplomaToLevel
},
   {
                  headers: { "Content-Type": "application/json" },
                }

  ).then(res => {
    setUpdatedDiplomaLevel(true)
    setTimeout(() => {
      setUpdatedDiplomaLevel(false)
    },5000)
  })
    .catch(err => console.log(err))
}


  return (
    <div style={{ overflow: "hidden" }} className="mt-20 md:mt-2">
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
         components={{
    Pagination: PatchedPagination,
  }}
        icons={tableIcons}
        title="Students information's"
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
                const newLevel = newData.level;
                const tshirt = newData.t_shirt;
                const books = newData.books;

                const config = {
                  headers: { "Content-Type": "application/json" },
                };

                axios
                  .put(
                    `${baseUrl.baseUrl}/update`,
                    {
                      stdid: stdid,
                      level100: level100,
                      level200: level200,
                      level300: level300,
                      level400: level400,
                      tshirt: tshirt,
                      level: newLevel,
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
                  .delete(
                    `${baseUrl.baseUrl}/remove/` +
                    oldData.std_id +
                    "/" +
                    "null"
                  )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));

                axios
                  .delete(
                    `${baseUrl.baseUrl}/remove-register/` +
                    oldData.std_id +
                    "/" +
                    "null"
                  )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));

                axios
                  .delete(
                    `${baseUrl.baseUrl}/remove-login/` +
                    oldData.std_id +
                    "/" +
                    "null"
                  )
                  .then((res) => console.log(res))
                  .catch((err) => console.log(err));

                axios
                  .delete(
                    `${baseUrl.baseUrl}/delete-complain/` + oldData.std_id + "/" + null
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
        <h1 style={{ fontSize: "20px" }}>Delete All IDs (Degree)</h1>
        <span>Select Level</span>
        <Select className='mt-1' onChange={(e) => setLevel(e.target.value)}>
          <option>100</option>
          <option>200</option>
          <option>300</option>
          <option>400</option>
        </Select>
        <CustomModal
          handleClick={handleDeleteIDs}
          ModalTitle={"Delete IDs"}
          ModalHead={"Delete Student IDs"}
          ModalContent={"Are you sure you want to delete all IDs the?"}
        />
        {delDegree && <Checkmark />}
      </Label>

      <Label className='mt-4 mb-5'>
        <h1 style={{ fontSize: "20px" }}>Delete All IDs (Diploma)</h1>
        <span>Select Level</span>
        <Select className='mt-1' onChange={(e) => setLevel(e.target.value)}>
          <option>100</option>
          <option>200</option>
        </Select>
        <CustomModal
          handleClick={handleDeleteDiplomaIDs}
          ModalTitle={"Delete IDs"}
          ModalHead={"Delete Student IDs"}
          ModalContent={"Are you sure you want to delete all IDs the?"}
        />
        {delDiploma && <Checkmark />}
      </Label>
      <div className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
      <PageTitle>Update All Students Level</PageTitle>
       <Label
          className='mt-4'>
          <h1 style={{ fontSize: "20px" }}>Update Levels (Degree)</h1>
          <span>From:</span>
          <Select onChange={(e) => setDegreeFromLevel(e.target.value)}>
            <option>100</option>
            <option>200</option>
            <option>300</option>
            <option>400</option>
          </Select>
          <span>To:</span>
          <Select onChange={(e) => setDegreeToLevel(e.target.value)}>
            <option>100</option>
            <option>200</option>
            <option>300</option>
            <option>400</option>
          </Select>
          <CustomModal
          handleClick={handleUpdateDegreeLevels}
          ModalTitle={"Update"}
          ModalHead={"Update Student Levels"}
          ModalContent={"Are you sure you want to update?"}
        />
        {updatedDegreeLevel && <Checkmark />}
        </Label>
        
       <Label
          className='mt-4'>
          <h1 style={{ fontSize: "20px" }}>Update Levels (Diploma)</h1>
          <span>From:</span>
          <Select onChange={(e) => setDiplomaFromLevel(e.target.value)}>
            <option>100</option>
            <option>200</option>
          </Select>
          <span>To:</span>
          <Select onChange={(e) => setDiplomaToLevel(e.target.value)}>
            <option>100</option>
            <option>200</option>
          </Select>
          <CustomModal
          handleClick={handleUpdateDiplomaLevels}
          ModalTitle={"Update"}
          ModalHead={"Update Student Levels"}
          ModalContent={"Are you sure you want to update?"}
        />
        {updatedDiplomaLevel && <Checkmark />}
        </Label>
      </div>
    </div>
  );
};
export default Admin;
