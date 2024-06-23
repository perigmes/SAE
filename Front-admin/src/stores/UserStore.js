import { makeAutoObservable, runInAction } from "mobx";
import { API_URL_USERS } from "./config";

class UserStore {
    _loading;
    _error;
    _users;
    constructor() {
        this._users = [];
        this._loading = true;
        this._error = null;
        makeAutoObservable(this);
        this.loadUsers();
    }

    async loadUsers() {
        try {
            let users = await fetch(API_URL_USERS).then((value) => value.json());
            runInAction(() => {
                this._users = users.map((user) => user);
                this._users = this._users.sort((a, b) => a.pseudo.localeCompare(b.pseudo));
                this._loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error;
                this._loading = false;
            });
        }
    }

    get users() {
        return this._users;
    }

    get loading() {
        return this._loading;
    }

    get roles() {
        const roles = new Set(this._users.flatMap(user => user.role))
        return [...roles].sort();
    }

    getUserByRole(roleName) {
        return this._users.filter(user => user.role === roleName); // Correction de la propriété role
    }

    getUserById(id) {
        return this._users.find((user) => user.id === id)
    }

    async updateUser(id,data) {
        console.log("Data du boug:", data);
        console.log("Id du boug:", id)
        let user = this.getUserById(id);
        if (!user) {
            console.error("User not found:", data.id);
            return { success: false, message: "Administrateur inexistant" };
        } else {
            try {
                const response = await fetch(`${API_URL_USERS}/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                
                if (response.ok) {
                    let { id, ...updatedData } = data;
                    runInAction(() => {
                        Object.assign(user, updatedData);
                    });
                    return { success: true, message: "Administrateur modifié" };
                } else {
                    return { success: false, message: `Request failed with status ${response.status}` };
                }
            } catch (error) {
                return { success: false, message: `${error}` };
            }
        }
    }
    

    async addUser(data) {
        console.log(data);
        try {
            const response = await fetch(`${API_URL_USERS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const newUser = await response.json();
                console.log(newUser)
                runInAction(() => {
                    this._users.push(newUser);
                    this.loadUsers()

                });
                return { success: true, message: "Utilisateur ajouté" };
            } else {
                return { success: false, message: `Request failed with status ${response.status}` };
            }
        } catch (error) {
            return { success: false, message: `${error}` };
        }
    }

    async deleteUser(id) {
        console.log(id)
        let user = this.getUserById(id);
        if (!user) {
            return { success: false, message: "Utilisateur inexistant" };
        } else {
            try {
                const response = await fetch(`${API_URL_USERS}/${user.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });
                if (response.ok) {
                    runInAction(() => {
                        this._users.filter((user)=>{return user.id !==id});
                        this.loadUsers()
                    });
                    return { success: true, message: "Utilisateur supprimé" };
                } else {
                    return { success: false, message: `Request failed with status ${response.status}` };
                }
            } catch (error) {
                return { success: false, message: `${error}` };
            }
        }
    }
}

export default UserStore;
