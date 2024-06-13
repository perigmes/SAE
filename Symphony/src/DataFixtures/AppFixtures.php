<?php

namespace App\DataFixtures;

use App\Entity\Catalogue\Article;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

use GuzzleHttp\Client;

use DeezerAPI\Search;

use App\Entity\Catalogue\Livre;
use App\Entity\Catalogue\Musique;
use App\Entity\Catalogue\Piste;
use App\Entity\Catalogue\Canard;

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
			$entityCanard->setTitre("Le canard en or");
			$entityCanard->setPrix("8.95");
			$entityCanard->setDisponibilite(100);
			$entityCanard->setDesc("Le canard en OR  est dessiné et peint à la main avec soins et amour.Nous attachons la plus grande importance à sa qualité afin de satisfaire les plus exigeants des collectionneurs.

Nous pouvons envoyer vos canards dans le monde entier, alors n’hésitez pas à faire un cadeau à un ami ou à votre famille !

Tous nos canards sont homologués CE (Communauté Européenne), conformément à la législation de l’UE. Cela signifie que ce canard ne contient aucun matériau nocif ni élément toxique. En plus de l’approbation CE, nous avons un contrôle de qualité très strict pour nous assurer que votre canard est fabriqué dans un environnement responsable.");
			$entityCanard->setImage("https://www.parisduckstore.fr/wp-content/uploads/2022/01/710F1_7-1.png");
			$manager->persist($entityCanard);
		

			$entityCanard = new Canard();
			$entityCanard->setId(56299459);
			$entityCanard->setTitre("Le canard Jaune classique");
			$entityCanard->setPrix("12.00");
			$entityCanard->setDesc("Le canard jaune en plastique pour le bain est devenu un jouet populaire pour les enfants depuis les années 1950. L’origine exacte du canard jaune en plastique pour le bain n’est pas clairement établie, mais il est généralement considéré comme ayant été inventé aux États-Unis.
Le premier canard jaune en plastique pour le bain aurait été créé par un sculpteur américain nommé Peter Ganine dans les années 1940. Ganine a créé une sculpture en plastique d’un canard, qu’il a ensuite transformé en un jouet flottant pour le bain. Il a commercialisé le jouet sous le nom de “Rubber Duckie” et a déposé un brevet pour celui-ci en 1949.

Cependant, le canard jaune en plastique pour le bain est également souvent associé à la série télévisée pour enfants “Sesame Street”. En 1970, la chanson “Rubber Duckie” a été présentée dans l’émission et a rendu le jouet encore plus populaire.

Aujourd’hui, le canard jaune en plastique pour le bain est devenu un symbole emblématique de l’enfance et est vendu dans le monde entier comme un jouet pour le bain.

Ce canard est dessiné et peint à la main avec soins et amour ! Nous attachons la plus grande importance à sa qualité afin de satisfaire les plus exigeants des collectionneurs.

Nous pouvons envoyer vos canards dans le monde entier, alors n’hésitez pas à faire un cadeau à un ami ou à votre famille !

Tous nos canards sont homologués CE (Communauté Européenne), conformément à la législation de l’UE. Cela signifie que ce canard ne contient aucun matériau nocif ni élément toxique. En plus de l’approbation CE, nous avons un contrôle de qualité très strict pour nous assurer que votre canard est fabriqué dans un environnement responsable.

");
			$entityCanard->setDisponibilite(100);
			$entityCanard->setImage("https://www.parisduckstore.fr/wp-content/uploads/2020/03/1607_hr.jpg");

			$manager->persist($entityCanard);

			
			$entityCanard = new Canard();
			$entityCanard->setId(56299459);
			$entityCanard->setTitre("Le canard Jaune classique");
			$entityCanard->setPrix("12.00");
			$entityCanard->setDesc("Le canard jaune en plastique pour le bain est devenu un jouet populaire pour les enfants depuis les années 1950. L’origine exacte du canard jaune en plastique pour le bain n’est pas clairement établie, mais il est généralement considéré comme ayant été inventé aux États-Unis.
Le premier canard jaune en plastique pour le bain aurait été créé par un sculpteur américain nommé Peter Ganine dans les années 1940. Ganine a créé une sculpture en plastique d’un canard, qu’il a ensuite transformé en un jouet flottant pour le bain. Il a commercialisé le jouet sous le nom de “Rubber Duckie” et a déposé un brevet pour celui-ci en 1949.

Cependant, le canard jaune en plastique pour le bain est également souvent associé à la série télévisée pour enfants “Sesame Street”. En 1970, la chanson “Rubber Duckie” a été présentée dans l’émission et a rendu le jouet encore plus populaire.

Aujourd’hui, le canard jaune en plastique pour le bain est devenu un symbole emblématique de l’enfance et est vendu dans le monde entier comme un jouet pour le bain.

Ce canard est dessiné et peint à la main avec soins et amour ! Nous attachons la plus grande importance à sa qualité afin de satisfaire les plus exigeants des collectionneurs.

Nous pouvons envoyer vos canards dans le monde entier, alors n’hésitez pas à faire un cadeau à un ami ou à votre famille !

Tous nos canards sont homologués CE (Communauté Européenne), conformément à la législation de l’UE. Cela signifie que ce canard ne contient aucun matériau nocif ni élément toxique. En plus de l’approbation CE, nous avons un contrôle de qualité très strict pour nous assurer que votre canard est fabriqué dans un environnement responsable.

");
			$entityCanard->setDisponibilite(100);
			$entityCanard->setImage("https://www.parisduckstore.fr/wp-content/uploads/2020/03/1607_hr.jpg");

			$manager->persist($entityCanard);
			$manager->flush();
		}
	}
}
