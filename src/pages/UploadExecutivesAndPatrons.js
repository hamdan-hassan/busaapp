import React, { forwardRef, useState, useEffect } from "react";
import Modal from "./Modal";
import { Label, Select, Input } from "@windmill/react-ui";
import PageTitle from "../components/Typography/PageTitle";
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
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import axios from "axios";
import {baseUrl} from '../api/busa-api.js'
import { Checkmark } from "react-checkmark";
import { TablePagination, TablePaginationProps } from '@material-ui/core';

const UploadExecutivesAndPatrons = () => {
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
  const [name, setName] = useState("");
  const [position, setPosition] = useState("Dean, School of Business");

  const [error, setError] = useState(false);
  const [published, setPublished] = useState(false);
  const [selectedFile, setSelectedFile] = useState("");

  const [columns, setColumns] = useState([
    { title: "Serial", field: "sno", hidden: true },
    {
      title: "Name",
      field: "name",
    },
    { title: "Position", field: "position" },
  ]);



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


  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/uploaded-key-people`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);
  };

  const handleSubmitFile = () => {
    setError(false);
    if (!selectedFile) return;
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      if (/^ *$/.test(name)) {
        return setError(true);
      }
      axios
        .post(
          `${baseUrl.baseUrl}/upload-key-people`,
          {
            ImageData: reader.result || "",
            Name: name,
            Position: position,
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          setPublished(true);
          setTimeout(() => {
            setPublished(false);
          }, 5000);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    reader.onerror = () => {
      console.error("AHHHHHHHH!!");
    };
  };

  return (
    <div className="mt-12 md:mt-2">
      <PageTitle>Upload Executives and Patrons</PageTitle>

      <div className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <Label className='mt-4'>
          <span>Select Position</span>
          <Select
            className='mt-1'
            onChange={(e) => {
              setPosition(e.target.value);
            }}>
            <option>Dean, School of Business</option>
            <option>Faculty Officer, School of Business</option>
            <option>Vice Dean, School of Business/Patron</option>
            <option>Patron</option>
            <option>HOD, Management Studies</option>
            <option>HOD, Banking and Finance</option>
            <option>HOD, Accountancy</option>
            <option>HOD, Procurement and Marketing</option>
            <option>President</option>
            <option>Vice President</option>
            <option>Financial Secretary</option>
            <option>Financial Treasurer</option>
            <option>Organiser</option>
            <option>General Secretary</option>
            <option>Public relations officer (PRO)</option>
            <option>Women Commissioner (Wocom)</option>
          </Select>
        </Label>
        <Label>
          <span>Name</span>
          <Input
            className='mt-1'
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </Label>
        <Label>
          <span>Upload Image</span>
          <Input
            type='file'
            className='mt-1'
            onChange={(e) => handleFileInputChange(e)}
          />
        </Label>
        <Label className='mt-1'>
          <Modal
            handleClick={handleSubmitFile}
            ModalTitle={"Upload"}
            ModalHead={"Upload Image"}
            ModalContent={"Are you sure you want to upload image?"}
          />
        </Label>
        {published && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <h1>
              Published
              <Checkmark />
            </h1>
          </div>
        )}
      </div>
      {error && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <h1
            style={{
              fontSize: 40,
            }}>
            Error uploading. Make sure that the name is not empty.
          </h1>
        </div>
      )}
      <MaterialTable
              components={{
    Pagination: PatchedPagination,
  }}
        icons={tableIcons}
        title='Uploaded'
        columns={columns}
        options={{
          exportButton: true,
        }}
        data={data}
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
                const name = newData.name;
                console.log(oldData.sno);

                const config = {
                  headers: { "Content-Type": "application/json" },
                };

                axios
                  .put(
                    `${baseUrl.baseUrl}/update-key-people`,
                    {
                      Sno: oldData.sno,
                      Name: name,
                    },
                    config
                  )
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              console.log(oldData.name);
              setTimeout(() => {
                axios
                  .delete(
                    `${baseUrl.baseUrl}/delete-key-people/` + oldData.sno
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
    </div>
  );
};

export default UploadExecutivesAndPatrons;
