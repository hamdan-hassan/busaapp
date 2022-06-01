import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { Checkmark } from "react-checkmark";
import { Textarea, Label, Select } from "@windmill/react-ui";
import Modal from "./Modal";
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

const UploadIDs = () => {
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

  const [level, setLevel] = useState("100");
  const [disableLevel, setDisableLevel] = useState(false)
  const [deleteLevel, setDeleteLevel] = useState("100");
  const [content, setContent] = useState("");
  const [data, setData] = useState([]);
  const [programmeType, setProgrammeType] = useState("Degree");
  const [uploaded, setUploaded] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const [deleted2, setDeleted2] = useState(false);
  const [error, setError] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Student ID",
      field: "std_id", //editable: "never",//
    },
    {
      title: "Level",
      field: "level",
      type: "numeric",
      //   editable: "never",
    },
    {
      title: "Programme Type",
      field: "programme",

      //   editable: "never",
    },
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/uploaded-ids")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = () => {
    setUploaded(false);
    setError(false);

    if (/^ *$/.test(content)) {
      return setError(true);
    } else {
      axios
        .post(
          "http://localhost:3000/api/uploadids",
          {
            IDs: content,
            Level: level,
            ProgrammeType: programmeType
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response);
          if (response.data !== "error") {
            setUploaded(true);
          } else {
            setError(true);
          }
        })
        .catch((error) => {
          console.log(error.toString());
        });
    }
  };

  const handleDeleteIDs = () => {
    setDeleted(false);
    axios
      .delete("http://localhost:3000/api/delete-ids/" + deleteLevel)
      .then((res) => {
        setDeleted(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteDiplomaIDs = () => {
    setDeleted(false)
    axios
      .delete("http://localhost:3000/api/delete-diploma-ids/" + deleteLevel)
      .then((res) => {
        setDeleted2(true);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='mt-6 dark:text-gray-200'>
      <h1 style={{ fontSize: "20px" }}>Upload Students IDs</h1>
      <Label className='mt-4' onChange={(e) => {
        setProgrammeType(e.target.value)
        if (e.target.value === 'Diploma') {
          setDisableLevel(true)
        }
        else {
          setDisableLevel(false)
        }
      }}>
        <span>Select Programme type</span>
        <Select className='mt-1'>
          <option>Degree</option>
          <option>Diploma</option>
        </Select>
      </Label>

      <Label className='mt-4' onChange={(e) => setLevel(e.target.value)}>
        <span>Select Level</span>
        <Select className='mt-1'>
          <option>100</option>
          <option>200</option>
          {!disableLevel && <option>300</option>}
          {!disableLevel && <option>400</option>}
        </Select>
      </Label>
      <Textarea
        valid
        className='mt-1'
        rows='10'
        placeholder='Paste students IDs'
        onChange={(e) => setContent(e.target.value.split("\n"))}
      />

      <Modal
        ModalTitle={"Upload IDs"}
        handleClick={handleSubmit}
        ModalHead={"Publish Article"}
        ModalContent={"Are you sure you want to publish the article?"}
      />
      {uploaded && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <h1
            style={{
              fontSize: 40,
            }}>
            Uploaded
            <Checkmark size='100' />
          </h1>
        </div>
      )}
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
            Error uploading IDs. Make sure that the IDs are all unique and have
            not been uploaded before. Also make sure that the field is not empty
          </h1>
        </div>
      )}
      <div className='mt-5'>
        <MaterialTable
          icons={tableIcons}
          title='Uploaded Student IDs'
          columns={columns}
          options={{
            exportButton: true,
          }}
          data={data}
          onRowClick={(event, rowData) => alert(rowData.sno)}
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
                      "http://localhost:3000/api/delete-id/" + oldData.std_id
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

        <Label className='mt-4 mb-5' onChange={(e) => setLevel(e.target.value)}>
          <h1 style={{ fontSize: "20px" }}>Delete All IDs (Degree)</h1>
          <span>Select Level</span>
          <Select
            className='mt-1'
            onChange={(e) => {
              setDeleteLevel(e.target.value);
            }}>
            <option>100</option>
            <option>200</option>
            <option>300</option>
            <option>400</option>
          </Select>

          <Modal
            handleClick={handleDeleteIDs}
            ModalTitle={"Delete IDs"}
            ModalHead={"Delete Student IDs"}
            ModalContent={"Are you sure you want to delete all IDs the?"}
          />
          {deleted && <Checkmark />}
        </Label>

        <Label className='mt-4 mb-5' onChange={(e) => setLevel(e.target.value)}>
          <h1 style={{ fontSize: "20px" }}>Delete All IDs (Diploma)</h1>
          <span>Select Level</span>
          <Select
            className='mt-1'
            onChange={(e) => {
              setDeleteLevel(e.target.value);
            }}>
            <option>100</option>
            <option>200</option>
          </Select>

          <Modal
            handleClick={handleDeleteDiplomaIDs}
            ModalTitle={"Delete IDs"}
            ModalHead={"Delete Student IDs"}
            ModalContent={"Are you sure you want to delete all IDs the?"}
          />
          {deleted2 && <Checkmark />}
        </Label>
      </div>
    </div>
  );
};

export default UploadIDs;
