import React, {forwardRef, useState, useEffect} from "react";
import { Textarea, Label, Input } from "@windmill/react-ui";
import { Checkmark } from "react-checkmark";
import {baseUrl} from '../api/busa-api.js'
import axios from "axios";
import CustomModal from "./Modal";
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

const UploadArticle = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [articleTitle,setArticleTitle] = useState("")
  const [article, setArticle] = useState("");
  const [articleID, setArticleID] = useState("");
  const [published, setPublished] = useState(false);
  const [updated,setUpdated] =  useState(false)
   const [isModalOpen, setIsModalOpen] = useState(false);

   const [data, setData] = useState([]);

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

  const [columns, setColumns] = useState([
    {
      title: "Article ID",
      field: "article_id", 
      editable: "never"
      //editable: "never",//
    },
    {
      title: "Article Title",
      field: "title",
      
    },
  
  ]);

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/uploaded-articles`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function openModal(row) {
    setArticle(row.content)
    setArticleID(row.article_id)
    setArticleTitle(row.title)
    // setSubject(row.subject);
    // setId(row.std_id);
    // setPhone(row.phone_number);
    // setName(row.first_name);
    setIsModalOpen(true);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  // Publish Article
  const handleSubmit = () => {
    console.log(content);
    setPublished(false);
    axios
      .post(
        `${baseUrl.baseUrl}/publish-article`,
        {
          Title: title,
          Content: content,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);

        // setTitle("");
        // setContent("");
        setPublished(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleArticleUpdate = () => {

          const config = {
                  headers: { "Content-Type": "application/json" },
                };

                axios
                  .put(
                    `${baseUrl.baseUrl}/update-article`,
                    {
                         article_id: articleID,
                         title: articleTitle,
                         content: article
                    },
                    config
                  )
                  .then(res => {
                    if(res.data === "updated") {
                      setUpdated(true)
                    }
                  })
                  .catch((err) => console.log(err));
  }

  return (
    <div className="mt-20 md:mt-2">
      <h1 style={{ color: "green" }}>Write Article</h1>
      <Label>
        <span>Title</span>
        <Input
          className='mt-1'
          placeholder='Busa week celebration'
          onChange={(e) => setTitle(e.target.value)}
        />
      </Label>
      <Textarea
        valid
        className='mt-1'
        rows='10'
        placeholder='...'
        onChange={(e) =>
          setContent(
            e.target.value
              .split("")
              .map((item) => {
                if (item === "'") {
                  return item + "'";
                }
                return item;
              })
              .join("")
          )
        }
      />

      <CustomModal
        ModalTitle={"Publish Article"}
        handleClick={handleSubmit}
        ModalHead={"Publish Article"}
        ModalContent={"Are you sure you want to publish the article?"}
      />
      {published && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}>
          <h1
            style={{
              fontSize: 40,
            }}>
            Published
            <Checkmark size='100' />
          </h1>
        </div>
      )}
       <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalHeader>{`Edit Article`}</ModalHeader>
        <ModalBody>
          <Textarea
            rows='10'
            value={article}
            onChange={(e) => setArticle(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button
            className='w-full sm:w-auto'
            layout='outline'
            onClick={closeModal}>
            Cancel
          </Button>
          <Button 
           className='w-full sm:w-auto'
           onClick={handleArticleUpdate}
           >
           Update
          </Button>
          {updated && <Checkmark />}
        </ModalFooter>
      </Modal>
      <div className="mt-5">
      <MaterialTable
          icons={tableIcons}
          title='Published Articles'

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
                const id = oldData.article_id;
                const content = newData.content
                const title = newData.title
                

                const config = {
                  headers: { "Content-Type": "application/json" },
                };

                axios
                  .put(
                    `${baseUrl.baseUrl}/update-article`,
                    {
                         article_id: id,
                         title: title,
                         content: content
                    },
                    config
                  )
                  .then()
                  .catch((err) => console.log(err));
                 dataUpdate[index] = newData;
                setData([...dataUpdate]);
                console.log(title,content)
                resolve();
              }, 1000);
            }),

            onRowDelete: (oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  axios
                    .delete(
                      `${baseUrl.baseUrl}/delete-article/` + oldData.article_id
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
    </div>
  );
};

export default UploadArticle;
