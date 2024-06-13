import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useProductStore } from "../stores";

function UserUpdate() {
  const productStore = useProductStore();
  const navigate = useNavigate();
  let { id } = useParams();
  console.log(id);
  let [product, setProduct] = useState(productStore.getProductById(id));
  let [error, setError] = useState(null);
  useEffect(
    () => setProduct(productStore.getProductById(id)),
    [id, productStore, productStore.products]
  );

  let handleSubmit = async (event) => {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target));
    let { success, message } = await productStore.updateProduct({
      id,
      ...data,
    });
    if (success) {
      navigate(-1);
    } else {
      setError(message);
    }
  };

  return (
    <>
      {product ? (
        <main>
          <h1>Fiche Produit RP {product.id}</h1>
          <form
            action="#"
            className="grid sm:grid-cols-2 gap-1 sm:gap-4 mx-auto mt-8 w-fit"
            onSubmit={handleSubmit}
          >
            <label htmlFor="fistName">Titre</label>

            <input
              type="text"
              name="title"
              id="title"
              required
              minLength={2}
              maxLength={25}
              title="Le titre doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
              defaultValue={product.title}
            />
            <label htmlFor="Description">Description</label>

            <textarea
              type="text"
              name="description"
              id="description"
              required
              minLength={2}
              title="La description doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
              defaultValue={product.description}
            />
            <label htmlFor="cayegories">catégorie</label>

            <select
              name="categories"
              id="categories"
              defaultValue={product.group}
              required
              multiple="true"
            >
              {productStore.groups.map((group) => (
                <option key={group} value={group}>
                  {group}
                </option>
              ))}
            </select>
            <label htmlFor="price">prix</label>

            <input
              type="text"
              name="price"
              id="price"
              required
              minLength={2}
              maxLength={25}
              title="Le prix doit être soit le format 00.00"
              defaultValue={product.price}
            />
            <div className="col-start-2 flex gap-4">
              <button
                className="btn"
                type="button"
                onClick={() => navigate(-1)}
              >

                Annuler <FontAwesomeIcon icon={faRotateLeft} />
              </button>
              <button className="btn" type="submit">
                Sauvegarder <FontAwesomeIcon icon={faPaperPlane} />
              </button>
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
export default observer(UserUpdate);
