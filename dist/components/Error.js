import { jsx as _jsx } from "react/jsx-runtime";
const Error = _ref => {
  let {
    error
  } = _ref;
  return _jsx("h3", {
    style: {
      color: "red"
    },
    children: error
  });
};
export default Error;