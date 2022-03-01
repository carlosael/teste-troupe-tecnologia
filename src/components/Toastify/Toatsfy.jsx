import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

function CustomToastify(text) {
  return Toastify({
    text: text,
    duration: 3000,
  }).showToast();
}

export default CustomToastify;
