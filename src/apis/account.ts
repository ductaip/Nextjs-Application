import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApi = {
    me: () => http.get<AccountResType>('/account/me')
}

export default accountApi