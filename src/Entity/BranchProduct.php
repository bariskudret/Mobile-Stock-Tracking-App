<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\BranchProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: BranchProductRepository::class)]
#[ApiResource]
class BranchProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Branch::class, inversedBy: 'branchProducts')]
    #[Groups(['branchProduct:read', 'branchProduct:write'])]
    private ?Branch $branch = null;

    #[ORM\ManyToOne(inversedBy: 'branchProducts')]
    private ?Product $product_id = null;

    #[ORM\Column(nullable: true)]
    private ?int $stockQuantity = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    private ?string $price = null;

    public function getId(): ?int
    {
        
        return $this->id;
    }

    public function getBranch(): ?Branch
    {
        return $this->branch;
    }

    public function setBranch(?Branch $branch_id): static
    {
        $this->branch = $branch_id;

        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product_id;
    }

    public function setProduct(?Product $product_id): static
    {
        $this->product_id = $product_id;

        return $this;
    }

    public function getStockQuantity(): ?int
    {
        return $this->stockQuantity;
    }

    public function setStockQuantity(?int $stockQuantity): static
    {
        $this->stockQuantity = $stockQuantity;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(?string $price): static
    {
        $this->price = $price;

        return $this;
    }
}
