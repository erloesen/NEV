import { defineStore } from "pinia";
import { getUserInfo} from "@/api/userinfo.js";

export const useUserInfoStore = defineStore('userinfo', {
    state: () => {
        return {
            account: '',
            imageurl: '',
            name: '',
            sex: '',
            phone: '',
            email: '',
            role: '',
            company: '',
            job: ''
        }
    },
    actions : {
        async userinfo (id) {
            const res = await getUserInfo(id);
            this.account = res.data.account
            this.imageurl = res.data.imageurl
            this.name = res.data.name
            this.sex = res.data.sex
            this.phone = res.data.phone
            this.email = res.data.email
            this.role = res.data.role
            this.company = res.data.company
            this.job = res.data.job
        }
    }
}, {
    persist: {
        // store all the data
        enabled: true,
        key: 'userinfo',
        storage: localStorage
    }
})