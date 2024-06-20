<?php

namespace App\Entity\Users;

use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity]
class Admin extends User
{
    #[ORM\Column(length: 255, name: 'write')]
    private ?bool $write = null;

    #[ORM\Column(length: 255, name: 'read')]
    private ?bool $read = null;
    
    public function getWrite(): ?bool
    {
        return $this->write;
    }

    public function setWrite(bool $write): static
    {
        $this->write = $write;

        return $this;
    }

    public function getRead(): ?bool
    {
        return $this->read;
    }

    public function setRead(bool $read): static
    {
        $this->read = $read;

        return $this;
    }
}

