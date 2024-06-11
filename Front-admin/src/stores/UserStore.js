import { makeAutoObservable, runInAction } from "mobx";
import { API_URL_PRODUITS } from "./config";
import User from "./User";

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
            let users = await fetch(API_URL_PRODUITS).then((value) => value.json());
            runInAction(() => {
                this._users = users.map((user) => new User(user));
                this._users = this._users.sort((a, b) => a.nom.localeCompare(b.nom));
                this._loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error;
                this._loading = false;
            });
        }
    }

    get course() {
        return this._course;
    }

    get users() {
        return this._users;
    }

    set users(value) {
        this._users = value;
    }

    get loading() {
        return this._loading;
    }

    get roles() {
        const roles = new Set(this._users.map(user => user.role))
        return [...roles].sort();
    }

    getStudentByRole(roleName) {
        const usersFromRole = this._users.filter(user => user.role === roleName);
        return usersFromRole
    }

    getUserById(id) {
        return this._users.find((user) => user.id === id)
    }

    async updateUser(data) {
        let user = this.getUserById(data.id);
        if (!user) {
            return { success: false, message: "Etudiant inexistant" };
        } else {
            try {
                const response = await fetch(`${API_URL_PRODUITS}/${user.id}`, {
                    method: 'PUT',
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
                    return { success: true, message: "Etudiant modifié" };
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