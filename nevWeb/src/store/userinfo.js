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
            this.account = res.account
            this.imageurl = res.imageurl
            this.name = res.name
            this.sex = res.sex
            this.phone = res.phone
            this.email = res.email
            this.role = res.role
            this.company = res.company
            this.job = res.job
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