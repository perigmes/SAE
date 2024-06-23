import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { useUserStore } from "../stores";
import { Fieldset, Field, Button } from "@headlessui/react";

function UserUpdate({ userSelected, validate }) {
  const userStore = useUserStore();
  let [user, setUser] = useState(null);
  let [error, setError] = useState(null);
  const [imageURL, setImageURL] = useState("");

  useEffect(
    () => setUser(userStore.getUserById(userSelected)),
    [userSelected, userStore, userStore.users]
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
    const id= userSelected;
    console.log(userSelected)
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.target));
    data.pp = user.pp;

    let { success, message } = await userStore.updateUser(
      id,
      data,
    );
    if (success) {
      validate()
    } else {
      setError(message);
    }
  };

  const handleDelete = async () => {
    try {
      let { success, message } = await userStore.deleteUser(user.id);
      if (success) {
        validate();
      } else {
        setError(message);
      }
    } catch (error) {
      console.error("Error deleting the user:", error);
      setError("An error occurred while deleting the user.");
    }
  };

  return (
    <>
      {user ? (
        <main>
          <h1>Fiche Admin {user.id}</h1>
          <Button onClick={handleDelete}>Supprimer</Button>
          <form
            key={user.id}
            action="#"
            className="cur sm:grid-cols-2 gap-1 sm:gap-4 mx-auto mt-8 w-fit"
            onSubmit={handleSubmit}
          >
            <Fieldset>
              <Field>
                <label htmlFor="pseudo" className="block dfu awe dfx">Pseudo</label>
                <input
                  type="text"
                  name="pseudo"
                  id="pseudo"
                  required
                  minLength={2}
                  maxLength={25}
                  className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
                  title="Le pseudo doit comporter entre 2 et 25 caractères alphabétiques non accentués, espaces, tirets ou apostrophes"
                  defaultValue={user.pseudo}
                />
              </Field>
              <Field>
                <label htmlFor="email" className="block dfu awe dfx">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp"
                  title="Entrez un email valide"
                  defaultValue={user.email}
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
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="L'image doit être au format jpeg,png ou webp"
              />
            </Field>
            </Fieldset>
            <div className="lx caw zn zg">
              <Button
                className="text-blue cev cfg dbb bg-white"
                type="button"
                onClick={() => validate()}
              >
                Annuler
              </Button>
              <Button
                className="text-white border-blue cev cfg dbb bg-blue py-1.5 px-3 text-sm/6 font-semibold shadow-inner shadow-white/10 focus:outline-none data-[hover]:bg-gray-600 data-[open]:bg-gray-700 data-[focus]:outline-1 data-[focus]:outline-white"
                type="submit"
              >
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
        <p>Personne inexistante</p>
      )}
    </>
  );
}

export default observer(UserUpdate);
