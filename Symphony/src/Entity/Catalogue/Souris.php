<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Souris extends Article
{
    #[ORM\Column(length: 255,name: 'connectivite')]
    private ?string $connectivite = null;

    #[ORM\Column(length: 255, name: 'usage')]
    private ?string $usage = null;

    #[ORM\Column(length: 255, name: 'marque')]
    private ?string $marque = null;
    
    #[ORM\Column(length: 255, name: 'matiere')]
    private ?string $matiere = null;
    
    public function getConnectivite(): ?string
    {
        return $this->connectivite;
    }

    public function setConnectivite(string $connectivite): static
    {
        $this->connectivite = $connectivite;

        return $this;
    }

    public function getUsage(): ?string
    {
        return $this->usage;
    }

    public function setUsage(string $usage): static
    {
        $this->usage = $usage;

        return $this;
    }

    public function getMarque(): ?string
    {
        return $this->marque;
    }

    public function setMarque(string $marque): static
    {
        $this->marque = $marque;

        return $this;
    }

    public function getMatiere(): ?string
    {
        return $this->matiere;
    }

    public function setMatiere(string $matiere):static
    {
        $this->matiere = $matiere;

        return $this;
    }
}

