
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
    
        $search = $request->query->get('search');

         $query = $productRepository->createQueryBuilder('p');
         if ($search) {
            $query->andWhere('p.name LIKE :search')
                  ->setParameter('search', '%' . $search . '%');
        }

        $products = $query->getQuery()->getResult();

        return $this->json($products);
    }
}