class ApiClientClass {
	async registerUser(username,password) {
		let res = await fetch("/api/auth/register",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        };
	}

	async login(username,password) {
		let res = await fetch("/api/auth/login",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        }
	}

	async sendActivationEmail(activationCodeGenerator) {
		let res = await fetch("/api/auth/sendActivationCode",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                activationCodeGenerator
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        }
	}

	async activateAccount(activationCode) {
		let res = await fetch("/api/auth/activate",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                activationCode
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        }
	}
}

export let ApiClient = new ApiClientClass();