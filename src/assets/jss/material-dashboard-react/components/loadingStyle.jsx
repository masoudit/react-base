export default {
  wrapper:{
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.3)",
    zIndex: 1000
  },
  spinner:{
    width: "40px",
    height: "40px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    "&:before,&:after": {
      content: '""',
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      backgroundColor: "#333",
      opacity: 0.6,
      position: "absolute",
      top: 0,
      left: 0,
      "-webkit-animation": "rkd-bounce 2.0s infinite ease-in-out",
      animation: "rkd-bounce 2.0s infinite ease-in-out"
    },
    "&:after": {
      "animation-delay": "-1.0s"
    }
  },
  "@keyframes rkd-bounce": {
    "0%, 100%":{
      transform: "scale(0.0)",
    },
    "50%": {
      transform: "scale(1.0)",
    }
  }
}
