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
    
    async getUser(authToken) {
		let res = await fetch("/api/user",{
            method:"get",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            }
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        };
    }

    async deleteUser(authToken,userId) {
		let res = await fetch("/api/user/delete",{
            method:"delete",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            body: JSON.stringify({
                userId
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        };
    }

    async changePassword(authToken,userId,password) {
		let res = await fetch("/api/auth/changePassword",{
            method:"put",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            body: JSON.stringify({
                userId,password
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        };
    }

    async changeRole(authToken,userId,newRole) {
		let res = await fetch("/api/user/changeRole",{
            method:"put",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            body: JSON.stringify({
                userId,newRole
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        };
    }
    
    async getAllUsers(authToken) {
		let res = await fetch("/api/user/all",{
            method:"get",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            }
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
    
    async getEntries(authToken,lowerLimit,upperLimit,userId) {
		let res = await fetch(`/api/entry?userId=${userId}&lowerLimit=${lowerLimit}&upperLimit=${upperLimit}`,{
            method:"get",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            }
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        }
    }

    async getWeeklyStats(authToken,year,week) {
		let res = await fetch(`/api/entry/weeklyStats?year=${year}&week=${week}`,{
            method:"get",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            }
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        }
    }
    
    async addEntry(authToken,distance,duration,timestamp,location,userId) {
		let res = await fetch("/api/entry/add",{
            method:"post",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            body: JSON.stringify({
                distance,duration,timestamp,location,userId
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        }
    }

    async editEntry(authToken,entryId,distance,duration,timestamp,location) {
		let res = await fetch("/api/entry/edit",{
            method:"put",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            body: JSON.stringify({
                entryId,distance,duration,timestamp,location
            })
        });
        let data = await res.json();
        return {
        	data,
        	status:res.status
        }
    }
    
    async deleteEntry(authToken,entryId) {
		let res = await fetch("/api/entry/delete",{
            method:"delete",
            headers: {
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${authToken}`
            },
            body: JSON.stringify({
                entryId
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