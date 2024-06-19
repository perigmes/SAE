import { Link } from "react-router-dom";
import img404 from "../assets/images/404.webp";
function Page404() {
    return (
        <main className="grid gap-2 mx-auto content-center justify-items-center  max-w-7xl min-h-screen">
            <Link to={"/"} className="btn">Prendre un nouveau départ</Link>
            <img width="1200" height="628" src={img404} alt="404" className="w-full" />
            <div className="pb-5">
                <h1 className="my-4">Égaré dans la vallée infernale</h1>
                <p>Le héros s'appelle Bob Morane
À la recherche de l'Ombre Jaune
Le bandit s'appelle mister Kali Jones
Avec l'ami Bill Ballantine
Sauvé de justesse des crocodiles
Stop au trafic des Caraïbes
Escale dans l'opération Nadawieb
Le cœur tendre dans le lit de Miss Clark
Prisonnière du Sultan de Jarawak
En pleine terreur à Manicouagan
Isolé dans la jungle birmane
Emprisonnant les flibustiers
L'ennemi y est démasqué
On a volé le collier de Civa
Le Maharadjah en répondra
Et soudain surgit face au vent
Le vrai héros de tous les temps
Bob Morane contre tout chacal
L'aventurier contre tout guerrier
Bob Morane contre tout chacal
L'aventurier contre tout guerrier
Dérivant à bord du Sampang
L'aventure au parfum d'Ylalang
Son surnom, Samouraï du Soleil
En démantelant le gang de l'Archipel
L'otage des guerriers du Doc Xhatan
Il s'en sortira toujours à temps
Tel L'aventurier solitaire
Bob Morane est le roi de la terre
Et soudain surgit face au vent
Le vrai héros de tous les temps
Bob Morane contre tous chacal
L'aventurier contre tout guerrier
Bob Morane contre tout chacal
L'aventurier contre tout guerrier
</p>
            </div>
        </main >
    )
}
export default Page404;