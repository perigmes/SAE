<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Canard extends Article
{
    #[ORM\Column(length: 255,name: 'weight')]
    private ?float $weight = null;

    #[ORM\Column(length: 255, name: 'dimensions')]
    private ?array $dimensions = null;

    #[ORM\Column(length: 255, name: 'standard')]
    private ?string $standard = null;

    #[ORM\Column(length: 255, name: 'recyclable')]
    private ?bool $recyclable = null;
    
    #[ORM\Column(length: 255, name: 'matiere')]
    private ?string $matiere = null;

    #[ORM\Column(length: 255, name: 'fabrication')]
    private ?string $fabrication = null;
    
    public function getWeight(): ?float
    {
        return $this->weight;
    }

    public function setWeight(float $weight): static
    {
        $this->weight = $weight;

        return $this;
    }

    public function getDimensions(): ?array
    {
        return $this->dimensions;
    }

    public function setDimensions(string $dimensions): static
    {
        $parts = explode('x', $dimensions);
        $this->dimensions = [
            intval($parts[0]),
            intval($parts[1])
        ];
    
        return $this;
    }

    public function getStandard(): ?string
    {
        return $this->standard;
    }

    public function setStandard(string $standard): static
    {
        $this->standard = $standard;

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

    public function setMatiere(string $matiere):static
    {
        $this->matiere = $matiere;

        return $this;
    }
    public function getFabrication(): ?string
    {
        return $this->fabrication;
    }

    public function setFabrication(string $fabrication):static
    {
        $this->fabrication = $fabrication;

        return $this;
    }
}

