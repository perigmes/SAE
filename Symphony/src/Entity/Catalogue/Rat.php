<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Rat extends Article
{
    #[ORM\Column(length: 255,name: 'solde')]
    private ?int $solde = null;

    #[ORM\Column(length: 255, name: 'taille')]
    private ?array $taille = null;

    #[ORM\Column(length: 255, name: 'age')]
    private ?string $age = null;
    
    public function getSolde(): ?int
    {
        return $this->solde;
    }

    public function setSolde(string $solde): static
    {
        $this->solde = $solde;

        return $this;
    }

    public function getTaille(): ?array
    {
        return $this->taille;
    }

    public function setTaille(string $taille): static
    {
        $this->taille = $taille;

        return $this;
    }

    public function getAge(): ?string
    {
        return $this->age;
    }

    public function setAge(int $age): static
    {
        $this->age = $age;

        return $this;
    }
}