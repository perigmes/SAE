<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Canard extends Article
{
    #[ORM\Column(length: 255,name: 'poids')]
    private ?int $poids = null;

    #[ORM\Column(length: 255, name: 'dimensions')]
    private ?array $dim = null;

    #[ORM\Column(length: 255, name: 'normes')]
    private ?string $normes = null;

    #[ORM\Column(length: 255, name: 'Recyclable')]
    private ?bool $recyclable = null;
    
#[ORM\Column(length: 255, name: 'matiere')]
    private ?string $matiere = null;

    #[ORM\Column(length: 255, name: 'fabrication')]
    private ?string $fabrication = null;
    
    public function getPoids(): ?int
    {
        return $this->poids;
    }

    public function setPoids(string $poids): static
    {
        $this->poids = $poids;

        return $this;
    }

    public function getDim(): ?array
    {
        return $this->dim;
    }

    public function setDim(string $dim): static
    {
        $this->dim = $dim;

        return $this;
    }

    public function getNormes(): ?string
    {
        return $this->normes;
    }

    public function setNormes(int $normes): static
    {
        $this->normes = $normes;

        return $this;
    }

    public function getIsRecyclable(): ?bool
    {
        return $this->recyclable;
    }

    public function setIsRecyclable(bool $recyclable):static
    {
        $this->recyclable = $recyclable;

        return $this;
    }
    public function getMatiere(): ?string
    {
        return $this->matiere;
    }

    public function setMatiere(bool $matiere):static
    {
        $this->matiere = $matiere;

        return $this;
    }
    public function getFabrication(): ?string
    {
        return $this->fabrication;
    }

    public function setFabrication(bool $fabrication):static
    {
        $this->fabrication = $fabrication;

        return $this;
    }
}

