<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\BranchProductRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use ApiPlatform\Metadata\Link;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;

#[ORM\Entity(repositoryClass: BranchProductRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['branchProduct:read']],
    denormalizationContext: ['groups' => ['branchProduct:write']]
)]
#[ApiResource(
    uriTemplate: '/branches/{branchId}/branch_products',
    uriVariables: [
        'branchId' => new Link(
            fromClass: Branch::class,
            fromProperty: 'branchProducts',
            toProperty: 'branch'
        ),
    ],
    operations: [new GetCollection()]
)]
#[ApiResource(
    uriTemplate: '/products/{productId}/branch_products',
    uriVariables: [
        'productId' => new Link(
            fromClass: Product::class,
            fromProperty: 'branchProducts',
            toProperty: 'product'
        ),
    ],
    operations: [new GetCollection()]
)]

#[ApiFilter(SearchFilter::class , properties :[
    'product.category.name'=>'partial'
])]

#[ApiFilter(RangeFilter::class , properties:[
    'stockQuantity',
    'price'
])]
class BranchProduct
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['branchProduct:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Branch::class, inversedBy: 'branchProducts')]
    #[Groups(['branchProduct:read', 'branchProduct:write'])]
    private ?Branch $branch = null;

    #[ORM\ManyToOne(targetEntity: Product::class, inversedBy: 'branchProducts')]
    #[Groups(['branchProduct:read', 'branchProduct:write'])]
    private ?Product $product = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['branchProduct:read', 'branchProduct:write'])]
    private ?int $stockQuantity = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2, nullable: true)]
    #[Groups(['branchProduct:read', 'branchProduct:write'])]
    private ?string $price = null;


    public function getId(): ?int
    {
        
        return $this->id;
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

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product= $product;

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
