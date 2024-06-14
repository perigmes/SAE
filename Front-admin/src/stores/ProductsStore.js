import { makeAutoObservable, runInAction } from "mobx";
import { API_URL_PRODUITS } from "./config";
import Product from "./Product";

class ProductsStore {
    _loading;
    _error;
    _products;
    constructor() {
        this._products = [];
        this._loading = true;
        this._error = null;
        makeAutoObservable(this);
        this.loadProducts();
    }

    async loadProducts() {
        try {
            let products = await fetch(API_URL_PRODUITS).then((value) => value.json());
            runInAction(() => {
                this.products = products.map((product) => new Product(product));
                this.products = this.products.sort((a, b) => a.name.localeCompare(b.name));
                this._loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this._error = error;
                this._loading = false;
            });
        }
    }

    

    get products() {
        console.log(this._products);
        return this._products;
    }

    set products(value) {
        this._products = value;
    }

    get loading() {
        return this._loading;
    }

    get categories() {
        const categories =  new Set(this._products.flatMap(product => product.categories));
        return [...categories].sort();
    }

    getProductByGroup(categorie) {
        console.log(categorie);
        const productFromGroup = this._products.filter(product => product.includes(categorie) );
        return productFromGroup
    }

    getProductById(id) {
        console.log(this._products);
        console.log( this._products.find((product) => {
        console.log("Produit ID:", product.id, "Type:", typeof product.id);
        console.log("Cherché ID:", id, "Type:", typeof id);
        return product.id === id}))

        return this._products.find((product) => product.id === id)
    }

    async updateProduct(data) {
        console.log(data)
        let product = this.getProductById(data.id);
        if (!product) {
            return { success: false, message: "Produit inexistant" };
        } else {
            try {
                const response = await fetch(`${API_URL_PRODUITS}/${product.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });
                if (response.ok) {
                    let { id, ...updatedData } = data;
                    runInAction(() => {
                        Object.assign(product, updatedData);
                    });
                    return { success: true, message: "Produit modifié" };
                } else {
                    return { success: false, message: `Request failed with status ${response.status}` };
                }
            } catch (error) {
                return { success: false, message: `${error}` };
            }
        }
    }




}
export default ProductsStore;