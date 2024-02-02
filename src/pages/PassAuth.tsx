import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { usePassPopupInfo } from "../apis";

function PassAuth() {
  const formRef = useRef<HTMLFormElement>(null);
  const navigate = useNavigate();
  const { data } = usePassPopupInfo();

  useEffect(() => {
    if (!data) {
      return;
    }

    openPopup();
  }, [data]);

  if (!data) {
    return null;
  }

  const getPopupSizeByBrowser = (isSafari: boolean) => {
    if (isSafari) {
      return {
        popupWidth: "441",
        popupHeight: "560",
      };
    }

    return {
      popupWidth: "560",
      popupHeight: "770",
    };
  };

  const openPopup = () => {
    if (!formRef.current) {
      return;
    }

    const UserAgent = window.navigator.userAgent.toLowerCase();
    const { popupWidth, popupHeight } = getPopupSizeByBrowser(
      UserAgent.includes("safari")
    );

    const KMCIS_Window = window.open(
      "https://www.kmcert.com/kmcis/web/kmcisReq.jsp",
      "KMCISWindow",
      `width=${popupWidth}, height=${popupHeight}, resizable=0, scrollbars=no, status=0, titlebar=0, toolbar=0, left=435, top=250`
    ) as Window;

    if (!KMCIS_Window) {
      window.alert(
        " ※ 윈도우 XP SP2 또는 인터넷 익스플로러 7 사용자일 경우에는 \n    화면 상단에 있는 팝업 차단 알림줄을 클릭하여 팝업을 허용해 주시기 바랍니다. \n\n※ MSN,야후,구글 팝업 차단 툴바가 설치된 경우 팝업허용을 해주시기 바랍니다."
      );
    }

    const popupCloseChecker = setInterval(() => {
      if (KMCIS_Window.closed) {
        clearInterval(popupCloseChecker);

        navigate("/pass/result", {
          state: { certNum: data.cert_num },
        });
      }
    }, 1000);

    formRef.current.action = "https://www.kmcert.com/kmcis/web/kmcisReq.jsp";
    formRef.current.target = "KMCISWindow";
    formRef.current.submit();
  };

  return (
    <>
      <FlexCenter>
        <p>패스인증 페이지</p>
        <button type="button" onClick={() => navigate("/")}>
          혹시 아무 창도 나타나지 않나요? (홈으로 돌아가기)
        </button>
      </FlexCenter>

      <PassPopupForm
        ref={formRef}
        name="reqKMCISForm"
        method="post"
        onSubmit={openPopup}
      >
        <input type="hidden" name="tr_cert" value={data.tr_cert} />
        <input type="hidden" name="tr_url" value={data.tr_url} />
        <input type="hidden" name="tr_add" value={data.tr_add} />

        <input type="submit" value="KMC 본인확인서비스" />
      </PassPopupForm>
    </>
  );
}

const FlexCenter = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 2rem;
`;

const PassPopupForm = styled.form`
  display: none;
`;

export default PassAuth;
