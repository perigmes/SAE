import { makeAutoObservable } from "mobx";


class User {
    _id; _mail; _mdp; _name; _pp; _role
    constructor({ id, mail, mdp, name, pp, role }) {
        this._id = id;
        this._mail = mail;
        this._mdp = mdp;
        this._name = name;
        this._pp = pp;
        this._role = role;
        makeAutoObservable(this);
    }

    get id() {
        return this._id;
    }
    get mail() {
        return this._mail;
    }
    get mdp() {
        return this._mdp;
    }
    get name() {
        return this._name;
    }
    get pp() {
        return this._pp;
    }
    get role() {
        return this._role;
    } 
    set mail(value) {
        this._mail = value;
    }
    set mdp(value) {
        this._mdp = value;
    }
    set name(value) {
        this._name = value;
    }
    set role(value) {
        this._role = value;
    }


}
export default User;