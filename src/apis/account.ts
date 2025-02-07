import http from "@/lib/http";
import { AccountResType, UpdateMeBodyType } from "@/schemaValidations/account.schema";

const accountApi = {
    MeFromServer: (sessionToken: string) => http.get<AccountResType>('/account/me', {
        headers: {
            Authorization: `Bearer ${sessionToken}`
        }
    }),
    me: () => http.get<AccountResType>('/account/me'),
    updateMe: (body: UpdateMeBodyType) => http.put<AccountResType>('/account/me', body)
}

export default accountApi