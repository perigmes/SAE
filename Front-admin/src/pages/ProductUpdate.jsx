import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useProductStore } from "../stores";
import { Fieldset,Field,Select,Button } from "@headlessui/react";

function ProductUpdate({productSelected,validate}) {
  const productStore = useProductStore();
  let [product, setProduct] = useState(null);
  let [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(
    () => setProduct(productStore.getProductById(productSelected)),
    [productSelected, productStore, productStore.products]
  );
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Base64 URL
        setImageURL(reader.result);
        setError(null);
      };
      reader.onerror = () => {
        setError('Erreur lors de la lecture du fichier');
      };
      reader.readAsDataURL(file);
    }
  };
  let handleSubmit = async (event) => {
    const id= productSelected;
    console.log(productSelected)
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target));
    data.image = product.image;

    let { success, message } = await productStore.updateProduct(
      id,
      data,
    );
    if (success) {
      validate()
    } else {
      setError(message);
    }
  };

  return (
    <>
      {product ? (
        <main>
          <h1>Fiche Produit RP {product.id}</h1>
          <Button onClick={(async ()=>{ let { success, message } = await productStore.deleteProduct(
      product.id
    );
    if (success) {
      validate()
    } else {
      setError(message);
    }
  } )}> Supprimer</Button>
          <form
          key={product.id}
            action="#"
            className="cur sm:grid-cols-2 gap-1 sm:gap-4 mx-auto mt-8 w-fit"
            onSubmit={handleSubmit}
          >
            <Fieldset>
              <Field>
            <label htmlFor="title" className="block dfu awe dfx">Titre</label>

            <input
              type="text"
              name="title"
              id="title"
              required
              minLength={2}
              maxLength={25}
              className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
              title="Le titre doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
              defaultValue={product.title}
            />
            </Field>
            <Field>
            <label htmlFor="description" className="block dfu awe dfx">Description</label>

            <textarea
              type="text"
              name="description"
              id="description"
              required
              minLength={2}
              className="cur rfl dbc afb arq atq aub axv cio bbx bcf bya placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
              title="La description doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
              defaultValue={product.description}
            />
            </Field>
            <Field>
              <label htmlFor="image" className="block dfu awe dfx">image</label>

              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                id="image"
                accept="image/png, image/jpeg, image/webp"
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="L'image doit être au format jpeg,png ou webp"
              />
            </Field>
            <Field>
            <label htmlFor="categorie">catégorie</label>

            <Select
              name="categorie"
              id="categorie"
              defaultValue={product.categorie}
              required
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
  
            >
              {productStore.categories.map((categorie) => (
                <option key={categorie} value={categorie}>
                  {categorie}
                </option>
              ))}
            </Select>
            </Field>
            <Field>
            <label htmlFor="price" className="block dfu awe dfx">prix</label>

            <input
              type="text"
              name="price"
              id="price"
              required
              minLength={2}
              maxLength={25}
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="Le prix doit être soit le format 00.00"
              defaultValue={product.price}
            />
            </Field>
             </Fieldset>
            <div className="lx caw zn zg">
              <Button className="text-blue cev cfg dbb bg-white" type="button" onClick={() =>validate() }>
                Annuler
              </Button>
              <Button className="text-white border-blue cev cfg dbb bg-blue py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white" type="submit">
                Sauvegarder 
              </Button>
            </div>
            {error && (
              <p className="text-red-600 bg-red-100 text-center col-span-2">
                {error}
              </p>
            )}
           
          </form>
        </main>
      ) : (
        <p>Produit inexistant</p>
      )}
    </>
  );
}
export default observer(ProductUpdate);
