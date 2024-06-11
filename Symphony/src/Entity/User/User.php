<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
#[ORM\InheritanceType("SINGLE_TABLE")]
#[ORM\DiscriminatorColumn(name: "article_type", type: "string")]
#[ORM\DiscriminatorMap(["article" => "Article", "livre" => "Livre", "musique" => "Musique", "user" => "User"])]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "NONE")]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, name: 'pseudo')]
    private ?string $pseudo = null;

    #[ORM\Column(name: 'email')]
    private ?string $email = null;

    #[ORM\Column(name: 'mdp')]
    private ?string $mdp = null;
	
    #[ORM\Column(length: 255, name: 'pp')]
    private ?string $pp = null;

    public function getId(): ?int
    {
        return $this->id;
    }
	
    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getPseudo(): ?string
    {
        return $this->pseudo;
    }

    public function setTitre(string $pseudo): static
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getEmail(): ?float
    {
        return $this->email;
    }

    public function setMail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getMdp(): ?string
    {
        return $this->mdp;
    }

    public function setMdp(int $mdp): static
    {
        $this->mdp = $mdp;

        return $this;
    }

    public function getPp(): ?string
    {
        return $this->pp;
    }

    public function setImage(string $pp): static
    {
        $this->pp = $pp;

        return $this;
    }
}

