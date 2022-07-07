import Iframe from "react-iframe";

const Website = () => {
  return (
    <Iframe
      url="https://incentive.minima.global/"
      position="absolute"
      width="100%"
      id="myId"
      className="myClassname"
      height="100%"
      styles={{ height: "25px", left: 0 }}
    ></Iframe>
  );
};

export default Website;
