import React, { forwardRef, useState, useEffect } from "react";
import axios from "axios";
import { Checkmark } from "react-checkmark";
import { Textarea,} from "@windmill/react-ui";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@windmill/react-ui";
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

const Complains = () => {
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

  const [receiver, setReceiver] = useState("")
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [id, setId] = useState("");
  const [reply, setReply] = useState("");
  const [sent, setSent] = useState(false);
  const [columns, setColumns] = useState([
    {
      title: "Sno",
      field: "sno", //editable: "never",//
      hidden: true,
    },
    {
      title: "Date",
      field: "date_of_complain", //editable: "never",//
      type: "date",
    },
    {
      title: "Status",
      field: "status", //editable: "never",//
    },

    {
      title: "Student ID",
      field: "std_id", //editable: "never",//
    },
    {
      title: "Name",
      field: "name", //editable: "never",//
    },
    {
      title: "Contact",
      field: "contact", //editable: "never",//
    },
    {
      title: "Subject",
      field: "subject", //editable: "never",//
    },
    {
      title: "Complain",
      field: "complain",

      //   editable: "never",
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  function openModal(row) {
    setSubject(row.subject);
    setId(row.std_id);
    // setPhone(row.phone_number);
    // setName(row.first_name);
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  useEffect(() => {

    axios
      .post("http://localhost:3000/api/get-complains", {
        Receiver: window.localStorage.getItem("role")
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setData(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleReply = () => {
    const date = new Date(Date.now()).toISOString().slice(0, 10);
    const time = new Date().toLocaleTimeString();

    setSent(false);
    axios
      .post(
        "http://localhost:3000/api/send-reply",
        {
          Id: id,
          Current_date: date,
          Current_time: time,
          Counter: 1,
          Subject: subject,
          Message: reply,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSent(true);
        setReply("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='mt-3'>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>{`Reply: ${subject}`}</ModalHeader>
        <ModalBody>
          <Textarea
            rows='10'
            value={reply}
            onChange={(e) => setReply(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={closeModal}>
            Cancel
          </Button>
          <Button className='w-full sm:w-auto' onClick={handleReply}>
            Send Reply
          </Button>
          {sent && <Checkmark />}
        </ModalFooter>
      </Modal>
      <MaterialTable
        icons={tableIcons}
        title='Student Complains'
        columns={columns}
        options={{
          exportButton: true,
          actionsColumnIndex: -1,
        }}
        data={data}
        onRowClick={(event, rowData) => openModal(rowData)}
        editable={{
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                axios
                  .delete(
                    "http://localhost:3000/api/delete-complain/" + null + "/" + oldData.sno
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

export default Complains;
