import { SSO_METHOD } from "@/utils/constants";

export interface ISso {
  method: SSO_METHOD;
  token: string;
}
