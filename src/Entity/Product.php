<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use ApiPlatform\Doctrine\Orm\Filter\ExistsFilter;
use ApiPlatform\Doctrine\Orm\Filter\BooleanFilter;
use ApiPlatform\Doctrine\Orm\Filter\RangeFilter;
use ApiPlatform\Doctrine\Orm\Filter\NumericFilter;
use ApiPlatform\Doctrine\Orm\Filter\DateFilter;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Serializer\Annotation\SerializedName;


#[ORM\Entity(repositoryClass: ProductRepository::class)]
// #[ApiFilter(filterClass: NumericFilter::class, properties : ['id', 'category.id'])]
// #[ApiFilter(filterClass: SearchFilter::class, properties: [
//     'name' => 'partial',
//     'description' => 'partial',
// ])]

#[ApiResource(
    normalizationContext:['groups'=>['product:read']],
    denormalizationContext:['groups'=>['product:write']],
)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read','product:write'])]
    private ?int $id = null;

    #[ORM\Column(length: 50)]
    #[Groups(['product:read' , 'product:write'])]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['product:read' , 'product:write'])]
    private ?string $description = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE)]
    #[Groups(['product:read' , 'product:write'])]
    private ?\DateTimeInterface $createdAt = null;

    #[ORM\Column(type: Types::DATETIME_MUTABLE, nullable: true)]
    #[Groups(['product:read' , 'product:write'])]
    private ?\DateTimeInterface $updateAt = null;

    #[ORM\OneToMany(targetEntity: BranchProduct::class, mappedBy: 'product')]
    #[Groups(['product:read'])]
    private Collection $branchProducts;

    #[Groups(['product:read' , 'product:write'])]
    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'products')]
    private ?Category $category = null;

   
    #[ORM\ManyToOne(inversedBy: 'products')]
    #[Groups(['product:read'])]
    private ?OrderHistory $orderHistory = null;

    public function __construct()
    {
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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getCreatedAt(): ?\DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getUpdateAt(): ?\DateTimeInterface
    {
        return $this->updateAt;
    }

    public function setUpdateAt(?\DateTimeInterface $updateAt): static
    {
        $this->updateAt = $updateAt;

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
            $branchProduct->setProduct($this);
        }

        return $this;
    }

    public function removeBranchProduct(BranchProduct $branchProduct): static
    {
        if ($this->branchProducts->removeElement($branchProduct)) {
            // set the owning side to null (unless already changed)
            if ($branchProduct->getProduct() === $this) {
                $branchProduct->setProduct(null);
            }
        }

        return $this;
    }

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

        return $this;
    }

    public function getOrderHistory(): ?OrderHistory
    {
        return $this->orderHistory;
    }

    public function setOrderHistory(?OrderHistory $orderHistory): static
    {
        $this->orderHistory = $orderHistory;

        return $this;
    }
}
