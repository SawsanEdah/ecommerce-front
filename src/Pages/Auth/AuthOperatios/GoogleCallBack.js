import axios from "axios";
import { useEffect } from "react";
import { Google_Call_Back, baseURL } from "../../../Api/Api";
import { useLocation } from "react-router-dom";
import Cookie from "cookie-universal";

export default function GoogleCallBack() {
  const cookie = Cookie();
  const location = useLocation();
  useEffect(() => {
    async function googleCall() {
      try {
        const res = await axios.get(
          `${baseURL}/${Google_Call_Back}/${location.search}`
        );
        const token = res.data.access_token;
        cookie.set("ecommerce", token);
      } catch (err) {
        console.log(err);
      }
    }
    googleCall();
  }, []);

  return <div>GoogleCallBack</div>;
}
