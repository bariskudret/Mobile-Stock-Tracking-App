<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BranchRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BranchRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['branch:read']],
    denormalizationContext: ['groups' => ['branch:write']]
)]
class Branch
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['branch:read', 'user:read' ])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['branch:read', 'branch:write'])]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: Company::class, inversedBy: 'branches')]
    #[ORM\JoinColumn(name: "company_id", referencedColumnName: "id", nullable: true)]
    #[Groups(['branch:read', 'branch:write'])]
    private ?Company $company = null;

    #[ORM\OneToMany(targetEntity: User::class, mappedBy: 'branch', cascade: ['persist'])]
    #[Groups(['branch:read', 'branch:write'])]
    private Collection $users;

    #[ORM\OneToMany(targetEntity: BranchProduct::class, mappedBy: 'branch', cascade: ['persist'])]
    #[Groups(['branch:read'])]
    private Collection $branchProducts;

    public function __construct()
    {
        $this->users = new ArrayCollection();
        $this->branchProducts = new ArrayCollection();
    }
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getCompany(): ?Company
    {
        return $this->company;
    }

    public function setCompany(?Company $company): static
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, User>
     */
    public function getUsers(): Collection
    {
        return $this->users;
    }

    public function addUser(User $user): static
    {
        if (!$this->users->contains($user)) {
            $this->users->add($user);
            $user->setBranch($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getBranch() === $this) {
                $user->setBranch(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, BranchProduct>
     */
    public function getBranchProducts(): Collection
    {
        return $this->branchProducts;
    }

    public function addBranchProduct(BranchProduct $branchProduct): static
    {
        if (!$this->branchProducts->contains($branchProduct)) {
            $this->branchProducts->add($branchProduct);
            $branchProduct->setBranch($this);
        }

        return $this;
    }

    public function removeBranchProduct(BranchProduct $branchProduct): static
    {
        if ($this->branchProducts->removeElement($branchProduct)) {
            // set the owning side to null (unless already changed)
            if ($branchProduct->getBranch() === $this) {
                $branchProduct->setBranch(null);
            }
        }

        return $this;
    }
}
