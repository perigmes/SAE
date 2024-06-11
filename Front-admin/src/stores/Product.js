import { makeAutoObservable } from "mobx";


class Product {
    _id; _title; _price; _group; _photo;_categories;
    constructor({ id, title, price, disponibilite, photo,categories }) {
        this._id = id;
        this.title = title;
        this.price = price;
        this._disponibilite = disponibilite;
        this._photo = photo;
        this._categories = categories;
        makeAutoObservable(this);
    }

    get id() {
        return this._id;
    }
    get title() {
        return this.title;
    }
    get price() {
        return this.price;
    }
    get disponibilite() {
        return this.disponibilite;
    }
    get photo() {
        return this._photo;
    }
    get categories() {
        return this._categories;
    }

    

    set title(value) {
        this.name = value;
    }

    set price(value) {
        this.prix = value;
    }

    set disponibilite(value) {
        this.disponibilite = value;
    }
    set photo(value) {
        this.photo = value;
    }
    set categories(value) {
        this.categories = value;
    }


}
export default Product;