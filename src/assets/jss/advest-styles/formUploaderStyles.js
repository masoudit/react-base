export default {
  uploadWrapper: {
    display: "flex",
    background: "#eee",
    padding: "10px",
    margin: "20px 0"
  },
  dropZoneWrapper: {
    marginLeft: "20px",
    position: "relative",
    width: "150px",
    height: "150px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  dropZone: {
    position: "absolute!important",
    width: "100%",
    height: "100%",
    border: "2px dashed rgb(102, 102, 102)",
    borderRadius: "5px",
    "&:after": {
      content: '"+"',
      position: "absolute",
      top: "50%",
      left: "50%",
      fontSize: "36px",
      transform: "translate(-50%,-50%)",
      borderRadius: "50%",
      background: "#fff",
      width: "30px",
      height: "30px",
      textAlign: "center",
      lineHeight: "36px"
    }
  },
  dropZoneRejected: {
    border: "1px solid red"
  },
  title: {
    display: "block",
    borderBottom: "1px solid #ccc",
    paddingBottom: "13px"
  },
  specs: {
    "& dt": {
      float: "right",
      marginLeft: "5px"
    }
  },
  bannerPreview: {
    maxWidth: "100%",
    maxHeight: "145px"
  },
  accepted: {
    color: "green"
  },
  rejected: {
    color: "red"
  }
};
