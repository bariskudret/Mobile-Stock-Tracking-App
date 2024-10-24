<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

use Doctrine\ORM\Mapping as ORM;

#[ApiResource]
#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $username = null;

    #[ORM\Column(length: 50)]
    private ?string $password = null;

    #[ORM\Column(length: 10)]
    private ?string $role = null;

    #[ORM\OneToMany(targetEntity: StockMovement::class, mappedBy: 'owner')]
    private Collection $stockMovements;

    #[ORM\ManyToOne(inversedBy: 'users')]
    private ?Branch $branch_id = null;

    public function __construct()
    {
        $this->stockMovements = new ArrayCollection();
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUsername(): ?string
    {
        return $this->username;
    }

    public function setUsername(string $username): static
    {
        $this->username = $username;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getRoles(): array
    {
        return [$this->role];
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): static
    {
        $this->role = $role;

        return $this;
    }
        // 3. Kimlik doğrulama sırasında hassas verileri temizlemek için (örneğin, düz şifreleri)
    public function eraseCredentials()
    {
            // Eğer hassas veriler (örn: düz şifre) varsa, burada temizlenebilir
    }

    public function getUserIdentifier(): string
    {
        return $this->username; // Symfony 5.3 ve sonrası için
    }


    /**
     * @return Collection<int, StockMovement>
     */
    public function getStockMovements(): Collection
    {
        return $this->stockMovements;
    }

    public function addStockMovement(StockMovement $stockMovement): static
    {
        if (!$this->stockMovements->contains($stockMovement)) {
            $this->stockMovements->add($stockMovement);
            $stockMovement->setOwner($this);
        }

        return $this;
    }

    public function removeStockMovement(StockMovement $stockMovement): static
    {
        if ($this->stockMovements->removeElement($stockMovement)) {
            // set the owning side to null (unless already changed)
            if ($stockMovement->getOwner() === $this) {
                $stockMovement->setOwner(null);
            }
        }

        return $this;
    }

    public function getBranchId(): ?Branch
    {
        return $this->branch_id;
    }

    public function setBranchId(?Branch $branch_id): static
    {
        $this->branch_id = $branch_id;

        return $this;
    }
}
