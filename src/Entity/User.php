<?php

namespace App\Entity;

use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Metadata\ApiFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\Operations;
use ApiPlatform\Metadata\Post;
use App\Controller\UserController;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Doctrine\ORM\Mapping as ORM;
use PHPUnit\Framework\Constraint\Operator;

#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]

#[ApiResource(
    operations: [
        new Post(
            uriTemplate: '/login',
            controller: UserController::class . '::login',
            denormalizationContext: ['groups'=> ['user:login']]
        )
    ]
)]
#[ApiResource(
    operations:[
        new Post(
        uriTemplate:'register',
        controller: UserController::class . '::register',
        denormalizationContext: ['groups'=>['user:register']]
    )
    ]
)]
#[ApiFilter(
    filterClass: SearchFilter::class, 
    properties: [
        'username' => 'partial'
    ]
)]

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['user:read', 'branch:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['user:read', 'user:write', 'branch:read' , 'user:login' , 'user:register'])] //username login , register post atarken gerekli alandır
    private ?string $username = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write' ,'user:login', 'user:register'])]//login post atarken gerekli
    private ?string $password = null;

    #[ORM\Column(length: 10)]
    #[Groups(['user:read', 'user:write' , 'user:register'])]
    private ?string $role = null;

    #[ORM\OneToMany(targetEntity: StockMovement::class, mappedBy: 'owner')]
    private Collection $stockMovements;

    #[ORM\ManyToOne(targetEntity: Branch::class, inversedBy: 'users')]
    #[Groups(['user:read', 'user:write' , 'user:register'])]
    private ?Branch $branch = null;

    #[Groups(['user:read' , 'user:write' , 'user:register'])]
    #[ORM\Column(length: 150, nullable: true)]
    private ?string $email = null;

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

    public function getBranch(): ?Branch
    {
        return $this->branch;
    }

    public function setBranch(?Branch $branch): static
    {
        $this->branch = $branch;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(?string $email): static
    {
        $this->email = $email;

        return $this;
    }
}