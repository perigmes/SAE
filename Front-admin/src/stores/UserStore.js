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
                console.log(this._users);
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
        console.log(this._users);
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

    async updateUser(data) {
        let user = this.getUserById(data.id);
        if (!user) {
            return { success: false, message: "Administrateur inexistant" };
        } else {
            try {
                const response = await fetch(`${API_URL_USERS}/${user.id}`, {
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
        console.log(data)
        try {
            const response = await fetch(`${API_URL_USERS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const newUser = await response.json(); // Pour obtenir l'utilisateur ajouté depuis l'API
                runInAction(() => {
                    this._users.push(newUser); // Ajout du nouvel utilisateur à la liste
                });
                return { success: true, message: "Utilisateur ajouté" };
            } else {
                return { success: false, message: `Request failed with status ${response.status}` };
            }
        } catch (error) {
            return { success: false, message: `${error}` };
        }
    }
}

export default UserStore;
