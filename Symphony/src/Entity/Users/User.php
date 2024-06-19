<?php

namespace App\Entity\Users;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;


#[ORM\Entity]
#[ORM\InheritanceType("SINGLE_TABLE")]
#[ORM\DiscriminatorColumn(name: "article_type", type: "string")]
#[ORM\DiscriminatorMap(["user" => "User", "admin" => "Admin"])]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue(strategy: "NONE")]
    #[Assert\Positive]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\Positive]
    #[ORM\Column(length: 255, name: 'pseudo')]
    private ?string $pseudo = null;

    #[Assert\Positive]
    #[ORM\Column(name: 'email')]
    private ?string $email = null;

    #[Assert\Positive]
    #[ORM\Column(name: 'mdp')]
    private ?string $mdp = null;
	
    #[Assert\Positive]
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

    public function setPseudo(string $pseudo): static
    {
        $this->pseudo = $pseudo;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getMdp(): ?string
    {
        return $this->mdp;
    }

    public function setMdp(string $mdp): static
    {
        $this->mdp = $mdp;

        return $this;
    }

    public function getPp(): ?string
    {
        return $this->pp;
    }

    public function setPp(string $pp): static
    {
        $this->pp = $pp;

        return $this;
    }
}

