<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Canard extends Article
{
    //Déclaration valeur weight
    #[Assert\Type(
        type: 'float',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[ORM\Column(name: 'weight')]
    private ?float $weight = null;

    //Déclaration valeur dimensions
    #[Assert\Type(
        type: 'array',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[ORM\Column( name: 'dimensions')]
    private ?array $dimensions = null;

    //Déclaration valeur standard
    #[Assert\Type(
        type: 'string',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255, name: 'standard')]
    private ?string $standard = null;

    //Déclaration valeur recyclable

    #[Assert\Type(
        type: 'boolean',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[ORM\Column( name: 'recyclable')]
    private ?bool $recyclable = null;

    //Déclaration valeur matiere
    #[Assert\Type(
        type: 'string',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[ORM\Column(length: 255, name: 'matiere')]
    #[Assert\NotBlank]
    private ?string $matiere = null;

    //Déclaration valeur fabrication

    #[Assert\Type(
        type: 'string',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\NotBlank]
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

