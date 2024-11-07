<?php

use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;

class FliterController extends AbstractController{

public function fliter(Request $request , ProductRepository $productRepository):JsonResponse
{


    return new JsonResponse();
}


}