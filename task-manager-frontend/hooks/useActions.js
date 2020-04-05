import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";

export default (actions) => {
  const dispatch = useDispatch();

  return bindActionCreators(actions, dispatch);
};
