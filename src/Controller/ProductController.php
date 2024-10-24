
<?php

//use App\Entity\Product;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ProductController extends AbstractController
{
    #[Route('/products', name: 'product_list', methods: ['GET'])]
    public function list(Request $request, ProductRepository $productRepository): JsonResponse
    {
        // Kategori ID'si URL'den alınıyor ?category=1 gibi
        $categoryId = $request->query->get('category');
        $minStock = $request->query->get('minStock');
        $maxStock = $request->query->get('maxStock');
        $search = $request->query->get('search');

         // QueryBuilder ile esnek sorgu oluşturuyoruz
         $query = $productRepository->createQueryBuilder('p');
         if ($search) {
            $query->andWhere('p.name LIKE :search')
                  ->setParameter('search', '%' . $search . '%');
        }


         // Kategori filtrelemesi 
        if ($categoryId) {
            $query->andWhere('p.category = :category')
            ->setParameter('category', $categoryId);
        }

        // Stok aralığı filtrelemesi 
        if ($minStock) {
            $query->andWhere('p.stockQuantity >= :minStock')
            ->setParameter('minStock', $minStock);
        }
        if ($maxStock) {
            $query->andWhere('p.stockQuantity <= :maxStock')
            ->setParameter('maxStock', $maxStock);
        }

        // Sonuçları getir
        $products = $query->getQuery()->getResult();

        return $this->json($products);
    }
}