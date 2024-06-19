import React, { useState,useId } from "react";
import { observer } from "mobx-react";
import { useUserStore } from "../stores";
import { Fieldset,Field,Button } from "@headlessui/react";

function UserAdd({validate,close}) {
  const userStore = useUserStore();
  const [enabled, setEnabled] = useState(false);
  let [error, setError] = useState(null);
  const [categorie,setCategorie] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [dimensions, setDimensions] = useState([]);

  const id= useId();

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
    let { success, message } = await userStore.addUser({
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
          <h1>Ajouter un administrateur</h1>
          <form
            action="#"
            className="cur sm:grid-cols-2 adl sm:gap-4 mx-auto mt-8 w-fit"
            onSubmit={handleSubmit}
          >
            <Fieldset>
              <Field>
            <label htmlFor="name" className="block dfu awe dfx">Nom</label>

            <input
              type="text"
              name="name"
              id="name"
              required
              className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
            />
            </Field>

            <Field>
            <label htmlFor="email" className="block dfu awe dfx">Email</label>

            <input
              type="text"
              name="name"
              id="name"
              required
              className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
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
export default observer(UserAdd);
