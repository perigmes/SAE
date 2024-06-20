<?php

namespace App\DataFixtures;

use App\Entity\Catalogue\Article;
use App\Entity\Users\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use GuzzleHttp\Client;

use DeezerAPI\Search;

use App\Entity\Catalogue\Livre;
use App\Entity\Catalogue\Musique;
use App\Entity\Catalogue\Piste;
use App\Entity\Catalogue\Canard;
use App\Entity\Catalogue\Rat;
use App\Entity\Catalogue\Souris;
use App\Entity\Users\Admin;

use Psr\Log\LoggerInterface;

class AppFixtures extends Fixture
{
	protected $logger;

	public function __construct(LoggerInterface $logger)
	{
		$this->logger = $logger;
	}

	public function load(ObjectManager $manager): void
	{
		if (count($manager->getRepository("App\Entity\Catalogue\Article")->findAll()) == 0) {


			$entityCanard = new Canard();
			$entityCanard->setId(55677821);
			$entityCanard->setCategorie("Canard");
			$entityCanard->setTitle("Le canard en or");
			$entityCanard->setPrice("8.95");
			$entityCanard->setDisponibilite(100);
			$entityCanard->setSelled(37);
			$entityCanard->setDescription("Le canard en OR  est dessiné et peint à la main avec soins et amour.Nous attachons la plus grande importance à sa qualité afin de satisfaire les plus exigeants des collectionneurs.
	Nous pouvons envoyer vos canards dans le monde entier, alors n’hésitez pas à faire un cadeau à un ami ou à votre famille !
	Tous nos canards sont homologués CE (Communauté Européenne), conformément à la législation de l’UE. Cela signifie que ce canard ne contient aucun matériau nocif ni élément toxique. En plus de l’approbation CE, nous avons un contrôle de qualité très strict pour nous assurer que votre canard est fabriqué dans un environnement responsable.");
			$entityCanard->setImage("https://www.parisduckstore.fr/wp-content/uploads/2022/01/710F1_7-1.png");
			$manager->persist($entityCanard);
		

			$entityCanard = new Canard();
			$entityCanard->setId(56299459);
			$entityCanard->setCategorie("Canard");
			$entityCanard->setTitle("Le canard Jaune");
			$entityCanard->setPrice("12.00");
			$entityCanard->setDescription("Le canard jaune en plastique pour le bain est devenu un jouet populaire pour les enfants depuis les années 1950. L’origine exacte du canard jaune en plastique pour le bain n’est pas clairement établie, mais il est généralement considéré comme ayant été inventé aux États-Unis.
	Le premier canard jaune en plastique pour le bain aurait été créé par un sculpteur américain nommé Peter Ganine dans les années 1940. Ganine a créé une sculpture en plastique d’un canard, qu’il a ensuite transformé en un jouet flottant pour le bain. Il a commercialisé le jouet sous le nom de “Rubber Duckie” et a déposé un brevet pour celui-ci en 1949.
	Cependant, le canard jaune en plastique pour le bain est également souvent associé à la série télévisée pour enfants “Sesame Street”. En 1970, la chanson “Rubber Duckie” a été présentée dans l’émission et a rendu le jouet encore plus populaire.
	Aujourd’hui, le canard jaune en plastique pour le bain est devenu un symbole emblématique de l’enfance et est vendu dans le monde entier comme un jouet pour le bain.
	Ce canard est dessiné et peint à la main avec soins et amour ! Nous attachons la plus grande importance à sa qualité afin de satisfaire les plus exigeants des collectionneurs.
	Nous pouvons envoyer vos canards dans le monde entier, alors n’hésitez pas à faire un cadeau à un ami ou à votre famille !
	Tous nos canards sont homologués CE (Communauté Européenne), conformément à la législation de l’UE. Cela signifie que ce canard ne contient aucun matériau nocif ni élément toxique. En plus de l’approbation CE, nous avons un contrôle de qualité très strict pour nous assurer que votre canard est fabriqué dans un environnement responsable.");
			$entityCanard->setDisponibilite(100);
			$entityCanard->setSelled(3686);
			$entityCanard->setImage("https://www.parisduckstore.fr/wp-content/uploads/2020/03/1607_hr.jpg");
			$manager->persist($entityCanard);


			$entitySouris = new Souris();
			$entitySouris->setId(358614889);
			$entitySouris->setCategorie("Souris");
			$entitySouris->setTitle("DeathAdder Essential");
			$entitySouris->setPrice("25.25");
			$entitySouris->setDisponibilite(23);
			$entitySouris->setSelled(750);
			$entitySouris->setConnectivite("Filaire USB");
			$entitySouris->setUsage("Gaming");
			$entitySouris->setMarque("Razer");
			$entitySouris->setMatiere("Plastique");
			$entitySouris->setDescription("Véritable capteur optique de 6 400 DPI Pour des balayages rapides et précis: Gardez toujours le contrôle. La Razer DeathAdder Essential dispose d'un véritable capteur optique de 6 400 DPI avec une solide réputation de haute performance éprouvée pour des balayages rapides et précis. Cela vous permet un contrôle fluide et facile malgré la complexité de la bataille.
    Forme ergonomique Pour profiter confortablement de longues heures de jeu: Soyez hautement performant pendant les marathons de jeu. Sa forme ergonomique s'adapte facilement à vos mains, de sorte que vous soyez toujours d'attaque au cœur de la bataille pendant de longues heures de jeu.
    Haute durabilité Pour une souris de jeu conçue pour durer: La Razer DeathAdder Essential est conçue pour une grande durabilité afin de maintenir une performance de haute qualité pendant les sessions de jeu intenses. Ses 5 boutons Hyperesponse ont été testés en laboratoire pour résister jusqu'à 10 millions de clics afin de s'assurer qu'il s'agit de la meilleure souris de combat");
			$entitySouris->setImage("https://m.media-amazon.com/images/I/81LFjhG2I0L._AC_SL1500_.jpg");
			$manager->persist($entitySouris);


			$entitySouris = new Souris();
			$entitySouris->setId(85456987);
			$entitySouris->setCategorie("Souris");
			$entitySouris->setTitle("Rat X3");
			$entitySouris->setPrice("159.99");
			$entitySouris->setDisponibilite(2);
			$entitySouris->setSelled(1);
			$entitySouris->setConnectivite("Filaire USB");
			$entitySouris->setUsage("Gaming");
			$entitySouris->setMarque("Rat X3");
			$entitySouris->setMatiere("Plastique");
			$entitySouris->setDescription("2700 configurations physiques possibles pour parfaitement ajuster la RAT Pro x3 à votre main et style de jeu
    Capteur pixart PMW3389 (16000dpi max), taux de rapport USB (Polling rate) très élevé: jusqu'à 3000 Hz
    Molette révolutionnaire utilisant la technologie optique et la capacité d’axe analogique
    En plus d'ajuster leur longueur et leur hauteur, vous pouvez faire pivoter vos repose-mains - de 0 à 15 degrés - Le long de l'axe principal.
    Fourni avec 1 Module PMW3389, 2x repose main, 2x repose petit doigt, 1 repose pouce, 1 set de patins additionnel, 3 molettes, 1x outil d'ajustement, 1x brosse de nettoyage et 1x sac de rangement");
			$entitySouris->setImage("https://m.media-amazon.com/images/I/81iGVoUbGpL._AC_SL1500_.jpg");
			$manager->persist($entitySouris);


			$entityRat = new Rat();
			$entityRat->setId(65256932);
			$entityRat->setCategorie("Rat");
			$entityRat->setTitle("Logan");
			$entityRat->setPrice("0.35");
			$entityRat->setDisponibilite(1);
			$entityRat->setSelled(0);
			$entityRat->setDescription("Rencontrez Logan, le rat le plus astucieux et économe de tous les temps ! Toujours à l'affût des meilleures affaires, Logan transforme chaque centime en une opportunité de grandir. Son flair exceptionnel pour dénicher les bons plans et sa capacité à éviter les dépenses superflues font de lui le gardien idéal de votre budget. Avec son sourire frugal et son instinct infaillible pour les économies, Logan vous montrera comment profiter de la vie sans jamais compromettre vos finances. Que vous soyez un amateur de défis financiers ou simplement désireux de mieux gérer vos ressources, Logan est le partenaire parfait pour vous accompagner vers un avenir plus prospère. Ne manquez pas cette chance unique d'adopter un véritable expert de l'épargne !");
			$entityRat->setImage("https://media.licdn.com/dms/image/D4E03AQHlxT4FwcDzrQ/profile-displayphoto-shrink_800_800/0/1678958194743?e=2147483647&v=beta&t=K-OETZAsIZlP9tF0gfIdNtJLTHnIhVfL8CUOPngC_rE");
			$entityRat->setSolde(1000);
			$entityRat->setTaille(120);
			$entityRat->setAge(20);
			$manager->persist($entityRat);


			$entityRat = new Rat();
			$entityRat->setId(58969248);
			$entityRat->setCategorie("Rat");
			$entityRat->setTitle("Charlie");
			$entityRat->setPrice("0.15");
			$entityRat->setDisponibilite(1);
			$entityRat->setSelled(0);
			$entityRat->setDescription("Rencontrez Charlie, le rat malin et économe qui sait comment maximiser chaque sou. Toujours à l’affût des meilleures affaires, Charlie transforme chaque dépense en investissement intelligent. Son talent pour trouver les bons plans et sa prudence légendaire en matière de dépenses font de lui un compagnon de choix pour ceux qui cherchent à économiser sans sacrifier la qualité de vie. Avec Charlie à vos côtés, vous découvrirez comment naviguer dans le monde financier avec assurance et intelligence. Que vous soyez un collectionneur de trésors cachés ou un novice en quête de conseils avisés, Charlie est prêt à vous guider vers un avenir plus riche et plus responsable. Ne manquez pas l'opportunité d'accueillir cet expert de l'épargne dans votre vie !");
			$entityRat->setImage("https://scontent-mrs2-2.cdninstagram.com/v/t51.29350-15/274723903_697667204733986_6362683438566611371_n.webp?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE0NDAuc2RyLmYyOTM1MCJ9&_nc_ht=scontent-mrs2-2.cdninstagram.com&_nc_cat=102&_nc_ohc=ZlE97sqk-QcQ7kNvgG37BFw&edm=AEhyXUkBAAAA&ccb=7-5&ig_cache_key=Mjc4Mjk2NjM3ODg3MTY3NTA4MQ%3D%3D.2-ccb7-5&oh=00_AYBuEb0lF5a7zOmQpIsNHJvGyrh154C2g0J0WL98qb605Q&oe=666ED3BC&_nc_sid=cf751b");
			$entityRat->setSolde(1000);
			$entityRat->setTaille(120);
			$entityRat->setAge(20);
			$manager->persist($entityRat);


			$manager->flush();
		}


		if (count($manager->getRepository("App\Entity\Users\User")->findAll()) == 0) {

			$entityAdmin = new Admin();
			$entityAdmin->setId(68464684);
			$entityAdmin->setPseudo("Bob");
			$entityAdmin->setEmail("bob.lebricoleur@yep.com");
			$entityAdmin->setMdp("martreau");
			$entityAdmin->setRead(true);
			$entityAdmin->setWrite(true);
			$entityAdmin->setPp("https://risibank.fr/cache/medias/0/10/1091/109165/full.png");
			$manager->persist($entityAdmin);


			$entityAdmin = new Admin();
			$entityAdmin->setId(68746341);
			$entityAdmin->setPseudo("Dr La Peluche");
			$entityAdmin->setEmail("dr.lapeluche@yep.com");
			$entityAdmin->setMdp("BigJack");
			$entityAdmin->setRead(true);
			$entityAdmin->setWrite(true);
			$entityAdmin->setPp("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS54H4GkNwUqS-EsFm33x-0we48dxcXmIxuEw&s");
			$manager->persist($entityAdmin);

			
			$manager->flush();
		}
	}
}
