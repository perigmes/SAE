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

    #[ORM\Column(name: 'categorie')]
    private ?string $categorie = null;

    #[ORM\Column(length: 255, name: 'title')]
    private ?string $title = null;

    #[ORM\Column(name: 'price')]
    private ?float $price = null;

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
        return $this->categorie;
    }
	
    public function setCategorie(string $categorie): static
    {
        $this->categorie = $categorie;

        return $this;
    }

    public function getTitre(): ?string
    {
        return $this->title;
    }

    public function setTitre(string $title): static
    {
        $this->title = $title;

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
        return $this->price;
    }

    public function setPrix(float $price): static
    {
        $this->price = $price;

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

