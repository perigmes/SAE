<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\InheritanceType("SINGLE_TABLE")]
#[ORM\DiscriminatorColumn(name: "article_type", type: "string")]
#[ORM\DiscriminatorMap(["article" => "Article", "livre" => "Livre", "musique" => "Musique", "canard"=>"Canard", "rat"=>"Rat","souris"=>"Souris"])]
class Article
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "NONE")]
    #[ORM\Column]
    private ?string $id = null;

    #[ORM\Column(name: 'categories')]
    private ?array $categories = null;

    #[ORM\Column(length: 255, name: 'titre')]
    private ?string $titre = null;

    #[ORM\Column(name: 'prix')]
    private ?float $prix = null;

    #[ORM\Column(name: 'disponibilite')]
    private ?int $disponibilite = null;

    #[ORM\Column(name: 'vendu')]
    private ?int $vendu = null;
	
    #[ORM\Column(length: 255, name: 'image')]
    private ?string $image = null;

    #[ORM\Column(length: 255, name: 'description')]
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }
	
    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getCategorie(): ?int
    {
        return $this->categories;
    }
	
    public function setCategorie(array $categories): static
    {
        $this->categories = $categories;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->titre;
    }

    public function setTitre(string $titre): static
    {
        $this->titre = $titre;

        return $this;
    }
    public function getDesc(): ?string
    {
        return $this->description;
    }
    public function setDesc(string $description): static
    {
        $this->description = $description;

        return $this;
    }
    public function getPrix(): ?float
    {
        return $this->prix;
    }

    public function setPrix(float $prix): static
    {
        $this->prix = $prix;

        return $this;
    }

    public function getDisponibilite(): ?int
    {
        return $this->disponibilite;
    }

    public function setDisponibilite(int $disponibilite): static
    {
        $this->disponibilite = $disponibilite;

        return $this;
    }

    public function getVendu(): ?int
    {
        return $this->vendu;
    }

    public function setVendu(int $vendu): static
    {
        $this->vendu = $vendu;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): static
    {
        $this->image = $image;

        return $this;
    }
}

