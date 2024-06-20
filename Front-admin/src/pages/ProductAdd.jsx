import React, {  useState} from "react";

import { observer } from "mobx-react";
import { useProductStore } from "../stores";
import { CheckIcon, ChevronDownIcon } from '@heroicons/react/20/solid'

import { Fieldset, Field, Button, Checkbox, Listbox, Label, ListboxButton, ListboxOptions, ListboxOption, Transition } from "@headlessui/react";

function ProductAdd({ validate, close }) {
  const productStore = useProductStore();
  const [isCheckedRecyclable, setIsCheckedRecyclable] = useState(false);
  let [error, setError] = useState(null);
  const [dimensions,setDimensions]= useState("");
  const [dimensions2,setDimensions2]= useState("");
  const [usageSelected,setUsageSelected]= useState("");
  const [categorieSelected, setCategorieSelected] = useState("");
  const [imageURL, setImageURL] = useState("");
  const categories = ["Canard","Rat","Souris"];
  const[connectivity, setConnectivity] = useState("")
  const usages= ["Bureau","Gaming"];




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
    if(categorieSelected==="Canard"){
          data.dimensions = dimensions+"x"+dimensions2;
              data.isRecyclable = isCheckedRecyclable;
    data.weight = parseFloat(data.weight);
    }
    if(categorieSelected==="Rat"){
      data.height = parseInt(data.height);
      data.solde = parseFloat(data.solde);
      data.age = parseInt(data.age);
    }
    if(categorieSelected=== "Souris"){
      data.connectivity= connectivity;
      data.usage= usageSelected;
    }
    data.price = parseFloat(data.price);
    data.categorie = categorieSelected;
    data.disponibilite = parseInt(data.disponibilite);
    data.image = imageURL;
    data.article_type = categorieSelected.toLowerCase();
    let { success, message } = await productStore.addProduct({
      ...data,
    });
    if (success) {
      validate()
      close()
    } else {
      setError(message);
    }
  };

  return (
    <>
      <main>
        <h1>Ajouter un produit</h1>
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
            <Field className="relative ">
              <Label htmlFor="categorie" className="rfl lu">Catégorie</Label>

              <Listbox value={categorieSelected} onChange={setCategorieSelected}>
                <ListboxButton className="relative to text-left arf"> {categorieSelected?categorieSelected:"Sélectionnez une catégorie"}<ChevronDownIcon
                  className="group pointer-events-none absolute do de"
                  aria-hidden="true"
                /></ListboxButton>
                <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <ListboxOptions
                    anchor="bottom"
                    className="w-16 cdf cek border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                  >
                    {categories.map((group) => (
                      <ListboxOption key={group} value={group}className="lx ysr zg xr">
                        {group}
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </Listbox>
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
          {categorieSelected === "Canard" ? (<Fieldset>
            <Field>
              <label htmlFor="dimensions" className="block dfu awe dfx">dimensions</label>
            <div className="bxm">
              <input
                type="number"
                name="dimensions"
                id="dimensions"
                onChange={(e)=>setDimensions(e.target.value)}

                required
                className='cur rfl ring-right afb avm arq axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="Les dimensions doivent être sous le format 00x00"
              />
              <span className=" bg-white-2">x</span><input
              type="number"
              name="dimensions"
              id="dimensions"
              onChange={(e)=>setDimensions2(e.target.value)}
              required
              className='cur rfl ring-left afb text-left arq axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
              title="Les dimensions doivent être sous le format 00x00"
            />
            </div>
            </Field>
            <Field>
              <label htmlFor="weight" className="block dfu awe dfx">poids</label>

              <input
                name="weight"
                id="weight"
                required
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="Les poids doit être au format 00.00kg"
              />
            </Field>
            <Field>
              <label htmlFor="standard" className="block dfu awe dfx">normes</label>

              <input
                type="string"
                name="standard"
                id="standard"
                required
                min={2}
                max={255}
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="Les normes doivent comporeter entre 2 et 255 caractères"
              />
            </Field>
            <Field>
              <label htmlFor="isRecyclable" className="block dfu awe dfx">recyclable</label>

              <Checkbox
                checked={isCheckedRecyclable}
                name="isRecyclable"
                id="isRecyclable"
                onChange={setIsCheckedRecyclable}
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
          </Fieldset>) : 
          (categorieSelected==="Rat"?(<Fieldset>
            <Field>
              <Label htmlFor="solde">Solde</Label>
              <input
                type="number"
                name="solde"
                id="solde"
                required
                min={1}
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="Le solde doit être de minimum 1"
              />
            </Field>
            <Field>
              <Label htmlFor="height">Taille</Label>
              <input
                type="number"
                name="height"
                id="height"
                required
                min={1}
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="La taille doit être de minimum 1"
              />
            </Field>
            <Field>
              <Label htmlFor="age">Age</Label>
              <input
                type="number"
                name="age"
                id="age"
                required
                min={1}
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="L'âge doit être de minimum 1"
              />
            </Field>
          </Fieldset>):
          (categorieSelected==="Souris"?(<Fieldset>
            <Field>
              <Label htmlFor="brand">Marque</Label>
              <input
                name="brand"
                id="brand"
                required
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="La marque doit contenir au moins 2 caractères"
              />
            </Field>
            <Field>
              <Label htmlFor="usage">
                Usage
              </Label>
              <Listbox name="usage" value={usageSelected} onChange={setUsageSelected}>
                <ListboxButton className="relative to text-left arf"> {usageSelected?usageSelected:"Sélectionnez un usage"}<ChevronDownIcon
                  className="group pointer-events-none absolute do de"
                  aria-hidden="true"
                /></ListboxButton>
                <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <ListboxOptions
                    anchor="bottom"
                    className="w-16 cdf cek border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                  >
                    {usages.map((usage) => (
                      <ListboxOption key={usage} value={usage}className="lx ysr zg xr">
                        {usage}
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </Transition>
              </Listbox>
            </Field>
            <Field>
              <Label htmlFor="connectivity">Connectivité</Label>
              <Listbox name="connectivity" value={connectivity} onChange={setConnectivity}>
                <ListboxButton className="relative to text-left arf"> {connectivity?connectivity:"Sélectionnez un mode de connectivité"}<ChevronDownIcon
                  className="group pointer-events-none absolute do de"
                  aria-hidden="true"
                /></ListboxButton>
                <Transition leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                  <ListboxOptions
                    anchor="bottom"
                    className="w-16 cdf cek border border-white/5 bg-white p-1 [--anchor-gap:var(--spacing-1)] focus:outline-none"
                  >
                      <ListboxOption key="bluetooth" value="bluetooth" className="lx ysr zg xr">
                        Bluetooth
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      </ListboxOption>
                      <ListboxOption key="filaire" value="filaire" className="lx ysr zg xr">
                        Filaire
                        <CheckIcon className="invisible size-4 fill-white group-data-[selected]:visible" />
                      </ListboxOption>
                  </ListboxOptions>
                </Transition>
              </Listbox>
            </Field>
            <Field>
              <Label htmlFor="matiere">Matière</Label>
              <input
                name="matiere"
                id="matiere"
                required
                className='cur rfl dbc afb arq atq aub axv cio bbx bcf placeholder:axr focus:ring-2 focus:ring-inset focus:ring-indigo-600 awa awp'
                title="La matière doit contenir 2 caractères minimum"
              />
            </Field>
            </Fieldset>):(null)))}

          <div className="lx caw zn zg">
            <Button className="text-blue cev cfg dbb bg-white"
              type="button"
              onClick={() => close()}
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
