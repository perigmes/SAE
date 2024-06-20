<?php

namespace App\Entity\Catalogue;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Souris extends Article
{
    //Déclaration valeur connectivity
    #[Assert\Type(
        type: 'string',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255,name: 'connectivity')]
    private ?string $connectivity = null;

        //Déclaration valeur usage
    #[Assert\Type(
        type: 'string',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255, name: 'usage')]
    private ?string $usage = null;

    //Déclaration valeur brand
    #[Assert\Type(
        type: 'string',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255, name: 'brand')]
    private ?string $brand = null;
    
    //Déclaration valeur matiere
    #[Assert\Type(
        type: 'string',
        message: 'The value {{ value }} is not a valid {{ type }}.',
    )]
    #[Assert\NotBlank]
    #[ORM\Column(length: 255, name: 'matiere')]
    private ?string $matiere = null;
    
    public function getConnectivity(): ?string
    {
        return $this->connectivity;
    }

    public function setConnectivity(string $connectivity): static
    {
        $this->connectivity = $connectivity;

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

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): static
    {
        $this->brand = $brand;

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

