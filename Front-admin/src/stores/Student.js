import { makeAutoObservable } from "mobx";


class Student {
    _id; _lastName; _firstName; _group; _photo;
    constructor({ id, lastName, firstName, group, photo }) {
        this._id = id;
        this._lastName = lastName;
        this._firstName = firstName;
        this._group = group;
        this._photo = photo;
        makeAutoObservable(this);
    }

    get id() {
        return this._id;
    }
    get lastName() {
        return this._lastName;
    }
    get firstName() {
        return this._firstName;
    }
    get group() {
        return this._group;
    }
    get photo() {
        return this._photo;
    }

    get fullName() {
        return `${this._firstName} ${this._lastName}`;
    }

    set lastName(value) {
        this._lastName = value;
    }

    set firstName(value) {
        this._firstName = value;
    }

    set group(value) {
        this._group = value;
    }


}
export default Student;