import React, { useState, useEffect } from "react";

// export const UserDetails = {
//   role: "",
//   studentId: "",
//   level: "",
//   gender: "",
//   programme: "",
//   receiver: "",
// };

export const UserDetailsContext = React.createContext();

export const UserDetailsContextProvider = ({ children }) => {
  const [role, setRole] = useState("");
  const [studentId, setStudentId] = useState("");
  const [level, setLevel] = useState("");
  const [gender, setGender] = useState("");
  const [programme, setProgramme] = useState("");
  const [receiver, setReceiver] = useState("");

  return (
    <UserDetailsContext.Provider
      value={{
        role,
        studentId,
        level,
        gender,
        programme,
        receiver,
        setRole,
        setStudentId,
        setLevel,
        setGender,
        setProgramme,
        setReceiver,
      }}
    >
      {children}
    </UserDetailsContext.Provider>
  );
};
