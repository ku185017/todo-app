import React from "react";

export const textFieldStyle = {
  p: 1,
  "& .css-1gctnaj-MuiInputBase-input-MuiFilledInput-input": {
    padding: "17px 12px",
    height: "27px",
  },
  "& .css-e4w4as-MuiFormLabel-root-MuiInputLabel-root": {
    padding: "10px",
  },
};

export const textFieldBgColor: React.CSSProperties = {
  backgroundColor: "	#F0F0F0",
};

export const addButtonStyle = {
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  "&.Mui-disabled": {
    cursor: "not-allowed",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    pointerEvents: "auto",
    backgroundColor: "	#FFFFFF",
    color: "#A19F9D",
  },
};

export const radioCellStyle = {
  width: 30,
  ":hover": {
    border: "0.5px solid",
    cursor: "pointer",
  },
};

export const todoNoteCellStyle = {
  fontSize: 15,
  maxWidth: 20,
  overflowX: "hidden",
  textOverflow: "ellipsis",
};

export const editButtonStyle = {
  ":hover": {
    color: "white",
    backgroundColor: "#1976d2",
  },
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

export const deleteButtonTableStyle = {
  ":hover": {
    color: "white",
    backgroundColor: "red",
  },
  boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
};

export const accordionStyle = {
  maxHeight: "290px",
  overflowY: "scroll",
};

export const accordionSummaryStyle = {
  flexDirection: "row-reverse",
  wordSpacing: 6,
  position: "sticky",
  top: 0,
  backgroundColor: "white",
  zIndex: 2,
  borderBottom: "0.4px solid",
};

export const avatarStyle = {
  width: 33,
  height: 33,
  display: "inline-flex",
  bgcolor: "#1976d2",
};

export const accordionDetailsStyle = {
  "&.MuiAccordionDetails-root": {
    p: 0,
  },
};

export const checkboxCellStyle = {
  width: 30,
  ":hover": {
    border: "0.5px solid",
    cursor: "pointer",
  },
};

export const todoNoteCompletedCellStyle = {
  fontSize: 15,
  maxWidth: 20,
  overflowX: "hidden",
  textOverflow: "ellipsis",
};

export const editFieldStyle: React.CSSProperties = {
  padding: "13px",
  border: "none",
  fontSize: "16px",
  fontFamily: "sans-serif",
  fontWeight: "bolder",
  resize: "none",
  backgroundColor: "#FFFFFF",
};

export const buttonBoxStyle = {
  display: "flex",
  justifyContent: "space-between",
};

export const tableContainerStyle = {
  maxHeight: "360px",
};

export const tableButtonsCellWidth = {
  width: 20,
};

export const appBarStyle = {
  mr: 2,
};

export const stackStyle = {
  mt: 3,
  ml: 5,
  mr: 5,
};
