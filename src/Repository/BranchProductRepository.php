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
