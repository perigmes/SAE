<?php

namespace App\Entity\Users;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Admin extends User
{
    #[ORM\Column(length: 255, name: 'ecriture')]
    private ?bool $ecriture = null;

    #[ORM\Column(length: 255, name: 'lecture')]
    private ?bool $lecture = null;
    
    public function canWrite(): ?bool
    {
        return $this->ecriture;
    }

    public function setWrite(bool $ecriture): static
    {
        $this->ecriture = $ecriture;

        return $this;
    }

    public function canRead(): ?bool
    {
        return $this->lecture;
    }

    public function setRead(bool $lecture): static
    {
        $this->lecture = $lecture;

        return $this;
    }
}

