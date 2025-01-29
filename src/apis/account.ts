import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApi = {
    me: (sessionToken: string) => http.get<AccountResType>('/account/me', {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    })
}

export default accountApi