import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

const accountApi = {
    MeFromServer: (sessionToken: string) => http.get<AccountResType>('/account/me', {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    }),
    me: () => http.get<AccountResType>('/account/me')
}

export default accountApi