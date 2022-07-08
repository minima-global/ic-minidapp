import Iframe from "react-iframe";

const Website = () => {
  return (
    <iframe
      src="https://incentive.minima.global"
      title="Incentive Cash Website"
      className="iframe-website"
      frameBorder="0"
      width="100%"
      height="100%"
      style={styling}
    ></iframe>
    // <Iframe
    //   url="https://incentive.minima.global/"
    //   position="fixed"
    //   width="100%"
    //   height="100%"
    //   id="myId"
    //   className="ic-website"
    //   styles={{
    //     height: "100%!important",
    //   }}
    // ></Iframe>
  );
};

export default Website;

const styling = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
  display: "block",
  border: "none",
};
