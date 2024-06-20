import React, { useState } from "react";
import { observer } from "mobx-react";
import { useUserStore } from "../stores";
import { Fieldset,Field,Button,Checkbox } from "@headlessui/react";

function UserAdd({validate,close}) {
  const userStore = useUserStore();
  let [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [isChekedReadMode, setIsChekedReadMode] = useState(false);
  const [isChekedWriteMode, setIsChekedWriteMode] = useState(false);

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
    data.pp = imageURL;
    data.write = isChekedReadMode;
    data.read = isChekedWriteMode;
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
            <label htmlFor="pseudo" className="block dfu awe dfx">Nom</label>

            <input
              type="text"
              name="pseudo"
              id="pseudo"
              required
              className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
            />
            </Field>

            <Field>
            <label htmlFor="email" className="block dfu awe dfx">Email</label>

            <input
              type="text"
              name="email"
              id="email"
              required
              className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
            />
            </Field>

            <Field>
            <label htmlFor="mdp" className="block dfu awe dfx">Mot de passe</label>

            <input
              type="text"
              name="mdp"
              id="mdp"
              required
              className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
            />
            </Field>

            <Field>
            <label htmlFor="pp" className="block dfu awe dfx">Image</label>

            <input
              type="file"
              name="pp"
              onChange={handleImageChange}
              id="pp"
                accept="image/png, image/jpeg, image/webp"
              required
              className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="L'image doit être au format jpeg,png ou webp"
            />
            </Field>

            <Field>
              <label htmlFor="lecture" className="block dfu awe dfx">Lecture</label>

              <Checkbox
                checked={isChekedWriteMode}
                name="lecture"
                id="lecture"
                onChange={setIsChekedWriteMode}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
              >
                {/* Checkmark icon */}
                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Checkbox>
            </Field>
            
            <Field>
              <label htmlFor="write" className="block dfu awe dfx">Ecriture</label>

              <Checkbox
                checked={isChekedReadMode}
                name="write"
                id="write"
                onChange={setIsChekedReadMode}
                className="group block size-4 rounded border bg-white data-[checked]:bg-blue-500"
              >
                {/* Checkmark icon */}
                <svg className="stroke-white opacity-0 group-data-[checked]:opacity-100" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Checkbox>
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
