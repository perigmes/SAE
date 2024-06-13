import { makeAutoObservable } from "mobx";


class Product {
    _id; _title; _price; _group; _photo;_categories;_description;_vendu;
    constructor({ id, titre, prix, disponibilite, vendu, image, categories, description }) {
        this._id = id;
        this._title = titre;
        this._price = prix;
        this._disponibilite = disponibilite;
        this._vendu = vendu;
        this._photo = image;
        this._categories = categories;
        this._description = description;
        makeAutoObservable(this);
    }

    get id() {
        return this._id;
    }
    get title() {
        return this._title;
    }
    get price() {
        return this._price;
    }
    get disponibilite() {
        return this._disponibilite;
    }
    get photo() {
        return this._photo;
    }
    get categories() {
        return this._categories;
    }
    get description() {
        return this._description;
    }
    get vendu() {
        return this._vendu;
    }

    set title(value) {
        this._name = value;
    }
    set price(value) {
        this._prix = value;
    }
    set disponibilite(value) {
        this._disponibilite = value;
    }
    set photo(value) {
        this._photo = value;
    }
    set categories(value) {
        this._categories = value;
    }
    set description(value) {
        this._description = value;
    }
    set vendu(value) {
        this._vendu = value;
    }


}
export default Product;