import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getPassPopupInfo = async () => {
  const response = await axios.get<BaseResponseType<PopupInfo>>(
    process.env.NODE_ENV === "development"
      ? "https://ft-externalapi-stg.deliveryservice.or.kr/v1/pass/auth?localYn=true"
      : "https://ft-externalapi-stg.deliveryservice.or.kr/v1/pass/auth"
  );
  return response.data.data;
};

export const usePassPopupInfo = () =>
  useQuery({
    queryKey: ["pass", "auth", "info"],
    queryFn: getPassPopupInfo,
  });

const getPassAuthResult = async (params: PassAuthResultProps) => {
  const response = await axios.get<BaseResponseType<PassAuthResult>>(
    "https://ft-externalapi-stg.deliveryservice.or.kr/v1/pass/auth/result",
    { params }
  );
  return response.data;
};

export const usePassResult = (params: PassAuthResultProps) =>
  useQuery({
    queryKey: ["pass", "auth", "result"],
    queryFn: () => getPassAuthResult(params),
    enabled: Boolean(params.certNum),
  });

export type BaseResponseType<T = any> = {
  status: string;
  message: string;
  data: T;
  error: string;
};

export type PopupInfo = {
  tr_cert: string;
  tr_url: string;
  tr_add: string;
  cert_num: string;
};

export type PassAuthResultProps = {
  certNum: string;
};

export type PassAuthResult = {
  result: string;
  gender: string;
  phoneNum: string;
  name: string;
  ci: string;
  birthDate: string;
};
