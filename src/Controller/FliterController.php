<?php

use App\Repository\BranchProductRepository;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class FliterController extends AbstractController{

    #[Route('/api/branch_products/filter', name: 'app_filter_branch_products', methods: ['GET'])]
    public function filterBranchProducts(Request $request, BranchProductRepository $branchProductRepository): Response
{
    $categories = $request->query->get('categories',[]);
    if($categories === 'all'){
        $categories=[];
    }

    $minStock = $request->get('minStock');
    $maxStock = $request->get('maxStock');

    $minPrice = $request->get('minPrice');
    $maxPrice  = $request->get('maxPrice');

    $branchProducts = $branchProductRepository->findByFilters(
        $categories,
        $minStock,
        $maxStock,
        $minPrice,
        $maxPrice
    );

    return $this->json($branchProducts);
}


}