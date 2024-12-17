<?php

namespace App\Repository;

use App\Entity\BranchProduct;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<BranchProduct>
 *
 * @method BranchProduct|null find($id, $lockMode = null, $lockVersion = null)
 * @method BranchProduct|null findOneBy(array $criteria, array $orderBy = null)
 * @method BranchProduct[]    findAll()
 * @method BranchProduct[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class BranchProductRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, BranchProduct::class);
    }
    public function findByFliters(?array $categories, ?int $minStock, ?int $maxStock, ?float $minPrice, ?float $maxPrice):array
    {
        $qb = $this->createQueryBuilder('bp')
        ->join('bp.product', 'p')
        ->join('p.category', 'c');

        if (!empty($categories)) {
            $qb->andWhere('c.name IN (:categories)')
                ->setParameter('categories', $categories);
        }

        if ($minStock !== null) {
            $qb->andWhere('bp.stockQuantity >= :minStock')
                ->setParameter('minStock', $minStock);
        }

        if ($maxStock !== null) {
            $qb->andWhere('bp.stockQuantity <= :maxStock')
                ->setParameter('maxStock', $maxStock);
        }

        if ($minPrice !== null) {
            $qb->andWhere('bp.price >= :minPrice')
                ->setParameter('minPrice', $minPrice);
        }

        if ($maxPrice !== null) {
            $qb->andWhere('bp.price <= :maxPrice')
                ->setParameter('maxPrice', $maxPrice);
        }

        return $qb->getQuery()->getResult();
    }



    //    /**
//     * @return BranchProduct[] Returns an array of BranchProduct objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('b.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?BranchProduct
//    {
//        return $this->createQueryBuilder('b')
//            ->andWhere('b.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
