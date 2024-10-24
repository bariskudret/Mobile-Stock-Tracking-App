<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BranchRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BranchRepository::class)]
#[ApiResource]
class Branch
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'branches')]
    private ?Company $company_id = null;

    #[ORM\OneToMany(targetEntity: User::class, mappedBy: 'branch_id')]
    private Collection $users;

    #[ORM\OneToMany(targetEntity: BranchProduct::class, mappedBy: 'branch_id')]
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

    public function getCompanyId(): ?Company
    {
        return $this->company_id;
    }

    public function setCompanyId(?Company $company_id): static
    {
        $this->company_id = $company_id;

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
            $user->setBranchId($this);
        }

        return $this;
    }

    public function removeUser(User $user): static
    {
        if ($this->users->removeElement($user)) {
            // set the owning side to null (unless already changed)
            if ($user->getBranchId() === $this) {
                $user->setBranchId(null);
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
            $branchProduct->setBranchId($this);
        }

        return $this;
    }

    public function removeBranchProduct(BranchProduct $branchProduct): static
    {
        if ($this->branchProducts->removeElement($branchProduct)) {
            // set the owning side to null (unless already changed)
            if ($branchProduct->getBranchId() === $this) {
                $branchProduct->setBranchId(null);
            }
        }

        return $this;
    }
}
