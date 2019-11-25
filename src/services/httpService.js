import axios from "axios";
import { toast } from "react-toastify";
import logger from "./log";

axios.interceptors.response.use(null, error => {
  // erreur inattendue
  const verif =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!verif) {
    console.log(
      "stocker l'erreur inattendu pour savoir ce qu'il a comme problème ??",
      new Error(error)
    );
    logger.log(error); // dès que j'aurai une erreur elle va être écrire sur sentry.io
    toast.error(
      "message pour l'internaute : service inutilisable pour l'instant merci de réessayer"
    );
  }

  return Promise.reject(error);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
