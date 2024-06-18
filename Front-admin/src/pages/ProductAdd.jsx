import React, { useEffect, useState,useId } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { observer } from "mobx-react";
import { useProductStore } from "../stores";
import { Fieldset,Field,Select,Button,Checkbox } from "@headlessui/react";

function ProductAdd({validate,close}) {
  const productStore = useProductStore();
  const [enabled, setEnabled] = useState(false);
  let [error, setError] = useState(null);
  const [categorie,setCategorie] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [dimensions, setDimensions] = useState([]);

  const id= useId();

  const handleBlurDim = (event) => {
    const value = event.target.value;
    const regex = /^\d{2}x\d{2}$/; // Valide le format 00x00

    if (regex.test(value)) {
      const [width, height] = value.split('x').map(Number);
      setDimensions([width, height]);
      setError(null); // Pas d'erreur
    } else {
      setDimensions([]);
      setError("Les dimensions doivent être sous le format 00x00");
    }
  };

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    let data = Object.fromEntries(new FormData(event.target));
    console.log(data);
    data.dimensions=dimensions;
    data.image = imageURL;
    data.article_type= categorie.toLowerCase();
    data.recyclable= enabled;
    data.id=id
    let { success, message } = await productStore.addProduct({
      ...data,
    });
    if (success) {
      close()
    } else {
      setError(message);
    }
  };

  return (
    <>
        <main>
          <h1>FAjouter un produit</h1>
          <form
            action="#"
            className="cur sm:grid-cols-2 adl sm:gap-4 mx-auto mt-8 w-fit"
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
            />
            </Field>
            <Field>
            <label htmlFor="categorie">catégorie</label>

            <Select
              name="categorie"
              id="categorie"
              required
              onChange={(e)=>setCategorie(e.target.value)}
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                defaultValue={null}
            >
              {productStore.categories.map((group) => (
                <option key={group} value={group}>
                  {group}
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
            />
            </Field>
            <Field>
            <label htmlFor="disponibilite" className="block dfu awe dfx">Disponibilité</label>

            <input
              type="number"
              name="disponibilite"
              id="disponibilite"
              required
              min={1}
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="La disponibilité doit être de minimum 1"
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
              required
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="L'image doit être au format jpeg,png ou webp"
            />
            </Field>
            </Fieldset>
            {categorie==="Canard"?( <Fieldset>
            <Field>
            <label htmlFor="dimensions" className="block dfu awe dfx">dimensions</label>

            <input
              type="string"
              name="dimensions"
              id="dimensions"
              required
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="Les dimensions doivent être sous le format 00x00"
              onBlur={handleBlurDim}
            />
            </Field>
            <Field>
            <label htmlFor="poids" className="block dfu awe dfx">poids</label>

            <input
              type="number"
              name="poids"
              id="poids"
              required
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="Les poids doit être au format 00.00kg"
            />
            </Field>
            <Field>
            <label htmlFor="normes" className="block dfu awe dfx">normes</label>

            <input
              type="string"
              name="normes"
              id="normes"
              required
              min={2}
              max={255}
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="Les normes doivent comporeter entre 2 et 255 caractères"
            />
            </Field>
            <Field>
            <label htmlFor="recyclable" className="block dfu awe dfx">recyclable</label>

            <Checkbox
      checked={enabled}
      name="recyclable"
      id="recyclable"
      onChange={setEnabled}
      className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
    >
      {/* Checkmark icon */}
      <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
        <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </Checkbox>
            </Field>
            <Field>
            <label htmlFor="matiere" className="block dfu awe dfx">matiere</label>
            <input
              type="string"
              name="matiere"
              id="matiere"
              required
              min={2}
              max={255}
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="La matière doivent comporeter entre 2 et 255 caractères"
            />
            </Field>
            <Field>
            <label htmlFor="fabrication" className="block dfu awe dfx">Fabrication</label>
            <input
              type="string"
              name="fabrication"
              id="fabrication"
              required
              min={2}
              max={255}
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="La fabrication doit comporter entre 2 et 255 caractères"
            />
            </Field>
            </Fieldset>):(null)}
            
            <div className="lx caw zn zg">
  <Button className="text-blue cev cfg dbb bg-white"
                type="button"
                onClick={() =>validate() }
              >
                Annuler
              </Button>
              <Button className="text-white border-blue cev cfg dbb bg-blue py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
type="submit">
                Ajouter 
              </Button>
            </div>
            {error && (
              <p className="text-red-600 bg-red-100 text-center col-span-2">
                {error}
              </p>
            )}
           
          </form>
        </main>
      
    </>
  );
}
export default observer(ProductAdd);
