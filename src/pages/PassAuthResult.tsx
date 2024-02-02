import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { usePassResult } from "../apis";

function PassAuthResult() {
  const {
    state: { certNum },
  } = useLocation();
  const navigate = useNavigate();

  const { data } = usePassResult({ certNum });

  useEffect(() => {
    if (!data) {
      return;
    }

    if (data.status === "SUCCESS") {
      /** 본인인증이 성공했을 경우 */
      console.log("본인인증 성공", data);
      navigate("/");
    }

    if (data.status === "FAIL") {
      /**
       * 본인인증이 실패했을 경우
       * 예시로는 사용자가 본인인증을 하다가 본인인증 팝업을 닫아버리는 경우가 존재합니다.
       */
      console.log("본인인증 실패", data);
      navigate("/");
    }
  }, [data, navigate]);

  if (!data) {
    return <>Loading...</>;
  }

  return <div>pass auth result page</div>;
}

export default PassAuthResult;
