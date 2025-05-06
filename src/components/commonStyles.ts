export const inputFormStyle = {
  display: "flex",
  flexDirection: "row",
  textAlign: "center",
  paddingTop: "2%",
  paddingBottom: "3%",
  paddingLeft: "0%",
  width: "100%",
};

export const completedButtonStyle = {
  "&:hover": {
    backgroundColor: "rgb(205, 208, 224)",
    cursor: "pointer",
  },
  verticalAlign: "left",
  borderRadius: "15px",
  width: "50%",
  //paddingBottom: "10%",
};

export const listItemStyle = {
  display: "flex",

  "&:hover": { backgroundColor: "rgb(216, 225, 237)" },
  backgroundColor: "background.paper",
  border: "0.7px groove",

  justifyContent: "space-between",
};

export const listItemCompletedStyle = {
  display: "flex",

  "&:hover": { backgroundColor: "rgb(203, 222, 246)" },
  backgroundColor: "background.paper",
  border: "0.7px groove",
};
