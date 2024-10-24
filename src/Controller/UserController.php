<?php
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;


class UserController extends AbstractController
{
    private $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    #[Route("/register", name:"user_register", methods:["POST"])]
    public function register(Request $request, EntityManagerInterface $em)
    {
        $data = json_decode($request->getContent(), true);
        $username = $data['username'];

        $existingUser = $em->getRepository(User::class)->findOneBy(['username' => $username]);

        if ($existingUser) {
            return new JsonResponse(['error' => 'Username already exists.'], 400);
        }

        $user = new User();
        $user->setUsername($username);

        // Şifreyi güvenli bir şekilde hashlemek
        $hashedPassword = $this->passwordHasher->hashPassword($user, $data['password']);
        $user->setPassword($hashedPassword);

        $em->persist($user);
        $em->flush();

        return new JsonResponse(['message' => 'User registered successfully.']);
    }

    
    
    /**
     * Bu route, /login URI'sine yapılan POST isteklerini yakalar ve login metodunu çalıştırır.
     *
     * @param Request $request
     * @param EntityManagerInterface $em
     * @return void
     */
    #[Route("/login", name:"user_login", methods:["POST"])]
    public function login(Request $request , EntityManagerInterface $em)
    {
         $data = json_decode($request->getContent(), true);
        $username = $data['username'];
        $password = $data['password'];

        // username contoller
        $loginUser = $em->getRepository(User::class)->findOneBy(['username' => $username]);

        if(!$loginUser){
            return new jsonResponse(['error' => ' Invalid credentials'], 401);
        }

        // password controller
        if(!$this->passwordHasher->isPasswordValid($loginUser, $password)){

            return new jsonResponse(['error' => ' Invalid credebtials'], 401);
        }

        return new JsonResponse(['message' => 'Login successful.']);
    }

}
