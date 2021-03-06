import React, { forwardRef, useState, useEffect } from "react";
import PageTitle from "../components/Typography/PageTitle";
import { Label, Button, Select, Input } from "@windmill/react-ui";
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

const UploadPastQuestions = () => {
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
  const [programme, setProgramme] = useState("BCom(Level 100)");
  const [courseName, setCourseName] = useState("");
  const [level, setLevel] = useState("100");
  const [disableLevel, setDisableLevel] = useState(true);
  const [removeLevel, setRemoveLevel] = useState(false);
  const [doc, setDoc] = useState("PDF");
  const [trimester, setTrimester] = useState("First");
  const [url, setUrl] = useState("");
  const [error, setError] = useState(false);
  const [published, setPublished] = useState(false);

  const [columns, setColumns] = useState([
    { title: "Serial", field: "sno", hidden: true },
    {
      title: "Level",
      field: "level",
      type: "numeric",
    },
    { title: "Programme", field: "programme", editable: "never" },
    {
      title: "Course Name",
      field: "course_name",
    },
    {
      title: "Trimester",
      field: "trimester",
    },
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
      .get(`${baseUrl.baseUrl}/uploaded-past-questions`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpload = () => {
    setPublished(false);

    if (/^ *$/.test(url)) {
      return setError(true);
    } else {
      axios
        .post(
          `${baseUrl.baseUrl}/upload-past-questions`,
          {
            Programme: programme,
            Level: level,
            CourseName: courseName,
            Trimester: trimester,
            Doc: doc,
            Url: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setPublished(true);
          setUrl("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="mt-12 md:mt-2">
      <PageTitle>Upload Past Questions</PageTitle>

      <div className='px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800'>
        <Label className='mt-4'>
          <span>Select Programme</span>
          <Select
            className='mt-1'
            onChange={(e) => {
              setRemoveLevel(false);
              setProgramme(e.target.value);
              if (e.target.value === "BCom(Level 100)") {
                setLevel("100");

                return setDisableLevel(true);
              }

              if (e.target.value === "BCom(Level 200)") {
                setLevel("200");

                return setDisableLevel(true);
              }

              if (
                e.target.value === "BCom(Human Resource Management)" ||
                e.target.value === "BCom(Accounting)" ||
                e.target.value === "BCom(Banking and Finance)" ||
                e.target.value === "BCom(Marketing)" ||
                e.target.value === "BCom(Procurement and Supply Chain Management)"
              ) {
                setLevel(300)
                setRemoveLevel(true);
              }

              return setDisableLevel(false);
            }}>
            <option>BCom(Level 100)</option>
            <option>BCom(Level 200)</option>
            <option>BCom(Human Resource Management)</option>
            <option>BCom(Accounting)</option>
            <option>BCom(Banking and Finance)</option>
            <option>BCom(Marketing)</option>
            <option>BCom(Procurement and Supply Chain Management)</option>
            <option>Bsc Accounting</option>
            <option>Bsc Accounting and Finance</option>
            <option>BA Management/BA Integrated Business Studies</option> 
            <option>BA Integrated Business Studies (Accounting)</option>
            <option>BA Integrated Business Studies (Management)</option>
            <option>BA Management</option>
            <option>Diploma in Business Studies</option>
          </Select>
        </Label>
        <Label
          style={{ display: disableLevel ? "none" : null }}
          className='mt-4'>
          <span>Select Level</span>
          <Select
            value={level}
            className='mt-1'
            onChange={(e) => {
              setLevel(e.target.value);
            }}>
            {!removeLevel && <option>100</option>}
            {!removeLevel && <option>200</option>}
            <option>300</option>
            <option>400</option>
          </Select>
        </Label>
        <Label className='mt-4'>
          <span>Select Trimester</span>
          <Select
            className='mt-1'
            onChange={(e) => {
              setTrimester(e.target.value);
            }}>
            <option>First</option>
            <option>Second</option>
          </Select>
        </Label>
        <Label>
          <span>Course Name</span>
          <Input
            value={courseName}
            className='mt-1'
            placeholder='Introduction to Accounting'
            onChange={(e) => {
              setCourseName(e.target.value);
            }}
          />
        </Label>
        <Label className='mt-4'>
          <span>Select Doc Type</span>
          <Select
            className='mt-1'
            onChange={(e) => {
              setDoc(e.target.value);
            }}>
            <option>PDF</option>
            <option>Word</option>
            <option>PPT</option>
          </Select>
        </Label>
        <Label>
          <span>File Url</span>
          <Input
            value={url}
            placeholder='https://'
            className='mt-1'
            onChange={(e) => {
              setUrl(e.target.value);
            }}
          />
        </Label>
        <Label className="w-2">
          <Button className='mt-5' onClick={handleUpload}>
            Upload
          </Button>
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
            Error uploading Past Questions. Make sure that the Url is not empty.
          </h1>
        </div>
      )}
      <MaterialTable
      components={{
    Pagination: PatchedPagination,
  }}
        icons={tableIcons}
        title='Uploaded Past Questions'
        columns={columns}
        options={{
          exportButton: true,
        }}
        data={data}
        onRowClick={(event, rowData) => alert(rowData)}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000);
            }),

          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .delete(
                    `${baseUrl.baseUrl}/delete-past-question/` + oldData.sno
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

export default UploadPastQuestions;
