<?php

namespace App\Entity\Catalogue;
use Symfony\Component\Validator\Constraints as Assert;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Rat extends Article
{
    #[ORM\Column(length: 255, name: 'solde')]
    private ?int $solde = null;

    #[ORM\Column(length: 255, name: 'height')]
    private ?int $height = null;

    #[Assert\NotBlank]
    #[ORM\Column(length: 255, name: 'age')]
    private ?int $age = null;
    
    public function getSolde(): ?int
    {
        return $this->solde;
    }

    public function setSolde(int $solde): static
    {
        $this->solde = $solde;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setTaille(int $height): static
    {
        $this->height = $height;

        return $this;
    }

    public function getAge(): ?int
    {
        return $this->age;
    }

    public function setAge(int $age): static
    {
        $this->age = $age;

        return $this;
    }
}