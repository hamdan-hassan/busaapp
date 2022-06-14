import React, { useEffect, useState, } from "react";

import PageTitle from "../components/Typography/PageTitle";
import SectionTitle from "../components/Typography/SectionTitle";
import Male from "../assets/img/male.png";
import Female from "../assets/img/female.png";
import {
  Input,
  Label,
  Select,
  Button,
  HelperText,
  Textarea,
} from "@windmill/react-ui";
import { Checkmark } from "react-checkmark";

import { MailIcon } from "../icons";
import { UserDetails } from "../userDetails";
import {baseUrl} from '../api/busa-api.js'
import Modal from "./Modal";
import Loader from "../loader/loader";
import axios from "axios";

function Profile() {
  const [fname, setFName] = useState("");
  const [mname, setMName] = useState("");
  const [lname, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [programme, setProgramme] = useState("")
  const [level, setLevel] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [size, setSize] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [error, setError] = useState(false);
  const [wrongId, setWrongId] = useState(false);
  const [wrongEmail, setWrongEmail] = useState(false);
  const [wrongPhone, setWrongPhone] = useState(false);
  const [complain, setComplain] = useState("");
  const [subject, setSubject] = useState("");
  const [receiver, setReceiver] = useState("Busa")

  const [complainError, setComplainError] = useState(false);
  const [sent, setSent] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [stdId, setStdId] = useState("");
  const [img, setimg] = useState("");

  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [wrongPass, setWrongPass] = useState(false);
  const [passMatch, setPassMatch] = useState(false);
  const [updated3, setUpdated3] = useState(false);
  const [loading,setLoading] = useState(true)

  const [editable, setEditable] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [updated2, setUpdated2] = useState(false);

  const emailValidation =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  const idValidation = /^(UG0|UD0)[0-9]{4}(19|20|21|22)$/i;
  const phoneValidation = /^[0-9]{10}$/;

  useEffect(() => {
    axios
      .get(`${baseUrl.baseUrl}/profile/` + UserDetails.studentId)
      .then((res) => {
        setFName(res.data.rows[0].first_name);
        setMName(res.data.rows[0].middle_name);
        setLName(res.data.rows[0].last_name);
        setProgramme(res.data.rows[0].programme)
        setEmail(res.data.rows[0].email);
        setGender(res.data.rows[0].gender);
        setSize(res.data.rows[0].size);
        setDob(res.data.rows[0].dob);
        setPhone(res.data.rows[0].phone_number);
        setLevel(res.data.rows[0].level);
        setStdId(res.data.rows[0].std_id.toUpperCase());
      })
      .catch((err) => console.log(err));
    axios
      .get(`${baseUrl.baseUrl}/isRegistered/` + UserDetails.studentId)
      .then((res) => {
        if (res.data[0].registered === "true") {
          setRegistered(true);
        }
      })
      .catch((err) => console.log(err));

    axios
      .post(
        `${baseUrl.baseUrl}/img`,
        {
          Id: UserDetails.studentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          setimg(res.data[0].img_data);
          setLoading(false)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleUpdate = () => {
    if (
      /^ *$/.test(fname) ||
      /^ *$/.test(lname) ||
      stdId.length === 0 ||
      dob.length === 0 ||
      gender.length === 0 ||
      level.length === 0 ||
      phone.length === 0 ||
      email.length === 0
    ) {
      return setError(true);
    }

    if (idValidation.test(stdId) === false) {

      return setWrongId(true);
    }

    if (emailValidation.test(email) === false) {

      return setWrongEmail(true);
    }
    if (phoneValidation.test(phone) === false) {

      return setWrongPhone(true);
    }
    axios
      .put(
        `${baseUrl.baseUrl}/updateProfile`,
        {
          id: UserDetails.studentId.toUpperCase(),
          firstName: fname,
          middleName: mname,
          lastName: lname,
          email: email.toLowerCase(),
          phone: phone,
          dob: dob,
          gender: gender,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        setEditable(false);
        setUpdated(true);
        window.localStorage.setItem("id", stdId);
        window.localStorage.setItem("gender", gender);
        setTimeout(() => {
          setUpdated(false);
        }, 5000);
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordUpdate = () => {
    axios
      .put(
        `${baseUrl.baseUrl}/updatePassword`,
        {
          id: UserDetails.studentId,
          password: oldPass,
          newPass: newPass,
          confirmPass: confirmPass,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        console.log(res);
        if (res.data === "wrong") {
          setWrongPass(false);
          return setPassMatch(true);
        }
        if (res.data === "wrong password") {
          setPassMatch(false);
          return setWrongPass(true);
        }
        if (res.data === "updated") {
          setWrongPass(false);
          setPassMatch(false);
          setUpdated3(true);
          setTimeout(() => {
            setUpdated3(false);
          }, 5000);
        }
      })
      .catch((err) => console.log(err));
  };

  const handleEdit = () => {
    setEditable(true);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    setSelectedFile(file);
  };

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

  const handleSubmitFile = () => {
    if (!selectedFile) return;
    const size = formatBytes(selectedFile.size)
    if(selectedFile.size > 1000000) return alert("The selected image size is " + size + " Please select an image which is not more then 1 MB")
    console.log(selectedFile.size)
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      axios
        .put(
          `${baseUrl.baseUrl}/upload`,
          {
            ImageData: reader.result,
            Id: UserDetails.studentId.toUpperCase(),
          },
          {
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          axios
      .post(
        `${baseUrl.baseUrl}/img`,
        {
          Id: UserDetails.studentId,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.data.length > 0) {
          setimg(res.data[0].img_data);
          
        }
      })
      .catch((err) => {
        console.log(err);
      });
          setUpdated2(true);
          setTimeout(() => {
            setUpdated2(false);
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

  const handleDeleteFile = () => {
    axios
      .put(`${baseUrl.baseUrl}/remove-img/`, {
        Id: UserDetails.studentId.toUpperCase(),
      })
      .then((res) => {
        gender === "Male" ? setimg(Male) : setimg(Female)
        setUpdated2(true);
        setTimeout(() => {
          setUpdated2(false);
        }, 5000);
      })
      .catch((err) => console.log(err));
  };

  const handleCompalin = () => {
    setComplainError(false);
    if (/^ *$/.test(subject) || /^ *$/.test(complain)) {
      return setComplainError(true);
    }

    const date = new Date(Date.now()).toISOString().slice(0, 10);

    axios
      .post(
        `${baseUrl.baseUrl}/send-complain`,
        {
          Date: date,
          Id: stdId,
          Name: fname,
          Contact: phone,
          Subject: subject,
          Complain: complain,
          Receiver: receiver
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        return console.log(err);
      });

    axios
      .post(
        `${baseUrl.baseUrl}/complains-count`,
        {
          Id: stdId,
          Count: 1,
          Receiver: receiver
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setSent(true);
        setSubject("");
        setComplain("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className="mt-12 md:mt-2"
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "1s0px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",

            marginBottom: "30px",
            marginTop: "30px",
          }}
        >
          {loading ? <Loader /> : <img
            src={img || (gender === "Male" ? Male : Female)}
            style={{ borderRadius: "50%", height: "200px", width: "200px" }}
          />}
          <div className="text-center">
            <PageTitle>{fname}</PageTitle>
          </div>
        </div>
      </div>
      <SectionTitle>Update Details</SectionTitle>

      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Fisrt Name</span>
          <Input
            className="mt-1"
            placeholder="Jane Doe"
            defaultValue={fname}
            disabled={!editable ? true : false}
            onChange={(e) => setFName(e.target.value)}
          />
        </Label>
        <Label>
          <span> Middle Name</span>
          <Input
            className="mt-1"
            defaultValue={mname}
            disabled={!editable ? true : false}
            onChange={(e) => setMName(e.target.value)}
          />
        </Label>
        <Label>
          <span>Last Name</span>
          <Input
            className="mt-1"
            placeholder="Jane Doe"
            defaultValue={lname}
            disabled={!editable ? true : false}
            onChange={(e) => setLName(e.target.value)}
          />
        </Label>
        <Label>
          <span>Programme</span>
          <Input
            className="mt-1"
            defaultValue={programme}
            disabled
          />
        </Label>
        <Label>
          <span>Email</span>
          {/* <!-- focus-within sets the color for the icon when input is focused --> */}
          <div className="relative text-gray-500 focus-within:text-purple-600 dark:focus-within:text-purple-400">
            <input
              className="block w-full pl-10 mt-1 text-sm text-black dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray form-input"
              placeholder="Jane Doe"
              defaultValue={email}
              disabled={!editable ? true : false}
              onChange={(e) => setEmail(e.target.value.toLowerCase())}
            />
            <div className="absolute inset-y-0 flex items-center ml-3 pointer-events-none">
              <MailIcon className="w-5 h-5" aria-hidden="true" />
            </div>
          </div>
          <HelperText valid={false}>
            {wrongEmail && "Please enter a valid email"}
          </HelperText>
        </Label>

        <Label>
          <span>Student ID</span>
          <Input
            className="mt-1"
            defaultValue={stdId}
            disabled
          />
        </Label>
        {UserDetails.level === 100 && <Label style={{ display: !registered ? "none" : null }}>
          <span>T-Shirt size</span>
          <Input
            className="mt-1"
            placeholder=""
            defaultValue={size}
            disabled
          />
        </Label>}
        <HelperText valid={false}>
          {wrongId && "Incorrect Student Id"}
        </HelperText>
        <Label className="mt-1">
          <span>Gender</span>
          <Select
            className="mt-1"
            value={gender}
            disabled={!editable ? true : false}
            onChange={(e) => {
              setGender(e.target.value);

            }}
          >
            <option>Male</option>
            <option>Female</option>
          </Select>
        </Label>
        <Label className="mt-1">
          <span>Level</span>
         <Input
            className="mt-1"
            defaultValue={level}
            disabled
          />
        </Label>
        <Label>
          <span>Birthday</span>
          <Input
            type="date"
            className="mt-1"
            placeholder="Jane Doe"
            defaultValue={dob}
            disabled={!editable ? true : false}
            onChange={(e) => setDob(e.target.value)}
          />
        </Label>
        <Label>
          <span>Phone Number</span>
          <Input
            type="number"
            className="mt-1"
            placeholder="Jane Doe"
            defaultValue={phone}
            disabled={!editable ? true : false}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Label>
        <HelperText valid={false}>
          {wrongPhone && "Please enter a valid Phone number"}
        </HelperText>
        <HelperText valid={false}>
          {error && "Please dont leave any field empty"}
        </HelperText>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "250px",
          }}
        >
          <Label>
            <Modal
              handleClick={handleUpdate}
              ModalTitle={"Update"}
              ModalHead={"Update Information"}
              ModalContent={"Are you sure you want to update your information?"}
            />
          </Label>
          <Label className="mt-6">
            <Button
              style={{ background: "#15d125" }}
              onClick={handleEdit}>Edit</Button>
          </Label>
          {updated && (
            <Label className="mt-4">
              <Checkmark />
            </Label>
          )}
        </div>
      </div>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <Label>
          <span>Upload Profile Image</span>

          <Input
            type="file"
            className="mt-1"
            onChange={(e) => handleFileInputChange(e)}
          />
        </Label>
         <HelperText valid={false}>
            Image size cannot be more then 1 MB
          </HelperText>

        <div
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Label className="mt-3">
            <Modal
              handleClick={handleSubmitFile}
              ModalTitle={"Upload"}
              ModalHead={"Upload Image"}
              ModalContent={"Are you sure you want to upload image?"}
            />
          </Label>
          <Label className="mt-3 ml-5">
            <Modal
              handleClick={handleDeleteFile}
              ModalTitle={"Remove Image"}
              ModalHead={"Remove Image"}
              ModalContent={"Are you sure you want to remove image?"}
            />
          </Label>
          {updated2 && (
            <Label className="mt-6 ml-5">
              <Checkmark />
            </Label>
          )}
        </div>
      </div>
      <div>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <p className="mb-5 dark:text-gray-300">Change Password</p>
          <Label>
            <span>Old Password</span>
            <Input
              type="password"
              className="mt-1"
              placeholder="*****"
              onChange={(e) => setOldPass(e.target.value)}
            />
          </Label>
          <Label>
            <span> New Password</span>
            <Input
              type="password"
              className="mt-1"
              placeholder="******"
              onChange={(e) => setNewPass(e.target.value)}
            />
          </Label>
          <Label>
            <span>Confirm New Password</span>
            <Input
              type="password"
              className="mt-1"
              placeholder="******"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
          </Label>
          <HelperText valid={false}>
            {passMatch && "Password do not match"}
          </HelperText>

          <Label>
            <HelperText valid={false}>
              {wrongPass && "Wrong old Password"}
            </HelperText>
          </Label>
          <Label className="w-2">
            <Modal
              handleClick={handlePasswordUpdate}
              ModalTitle={"Update"}
              ModalHead={"Update Password"}
              ModalContent={"Are you sure you want to update your password?"}
            />
          </Label>

          {updated3 && (
            <Label className="mt-4">
              <Checkmark />
            </Label>
          )}
        </div>
      </div>
      <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
        <PageTitle>Submit a Complain</PageTitle>
        <Label>
          <span>Name</span>
          <Input className="mt-1" value={fname} disabled />
        </Label>
        <Label>
          <span>Contact</span>
          <Input className="mt-1" value={phone} disabled />
        </Label>
        <Label className="mt-1">
          <span>To: </span>
          <Select
            className="mt-1"
            onChange={(e) => {
              setReceiver(e.target.value)
            }}

          >
            <option>Busa</option>
            <option>Department of Management Studies</option>
            <option>Department of Banking and Finance</option>
            <option>Department of Accountancy</option>
            <option>Department of Procurement and Marketing</option>
          </Select>
        </Label>
        <Label>
          <span>Student ID</span>
          <Input className="mt-1" value={stdId} disabled />
        </Label>
        <Label>
          <span>Subject</span>
          <Input
            value={subject}
            className="mt-1"
            onChange={(e) => setSubject(e.target.value)}
          />
        </Label>
        <Label>
          <span>Complain</span>
          <Textarea
            value={complain}
            className="mt-1"
            rows="10"
            onChange={(e) => setComplain(e.target.value)}
          />
        </Label>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
          }}
        >
          <Label className="mt-3 ml-5">
            <Modal
              handleClick={handleCompalin}
              ModalTitle={"Submit"}
              ModalHead={"Submit a Complain"}
              ModalContent={"Are you sure you want to submit your complain?"}
            />
          </Label>

          <Label className="mt-6">
            {sent && (
              <>
                <Checkmark />
                <p className="text-center text-base">Complain Sent</p>
              </>
            )}
          </Label>
        </div>
        {complainError && (
          <HelperText className="mt-5" valid={false}>
            Please don't leave any field empty
          </HelperText>
        )}
      </div>
    </>
  );
}

export default Profile;