import { makeAutoObservable } from "mobx";


class Produit {
    _id; _titre; _prix; _group; _photo;
    constructor({ id, titre, prix, disponibilite, photo }) {
        this._id = id;
        this._name = titre;
        this._prix = prix;
        this._disponibilite = disponibilite;
        this._photo = photo;
        makeAutoObservable(this);
    }

    get id() {
        return this._id;
    }
    get name() {
        return this.name;
    }
    get prix() {
        return this.prix;
    }
    get disponibilite() {
        return this.disponibilite;
    }
    get photo() {
        return this._photo;
    }

    

    set name(value) {
        this.name = value;
    }

    set prix(value) {
        this.prix = value;
    }

    set disponibilite(value) {
        this.disponibilite = value;
    }
    set photo(value) {
        this.photo = value;
    }


}
export default Produit;