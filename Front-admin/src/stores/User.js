import { makeAutoObservable } from "mobx";


class Student {
    _id; _mail; _mdp; _nom; _pp
    constructor({ id, mail, mdp, nom, pp }) {
        this._id = id;
        this._mail = mail;
        this._mdp = mdp;
        this._nom = nom;
        this._pp = pp;
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
    get nom() {
        return this._nom;
    }
    get pp() {
        return this._pp;
    }

    get fullName() {
        return `${this._mdp} ${this._mail}`;
    }

    set mail(value) {
        this._mail = value;
    }

    set mdp(value) {
        this._mdp = value;
    }

    set nom(value) {
        this._nom = value;
    }


}
export default Student;