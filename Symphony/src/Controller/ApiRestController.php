<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use Psr\Log\LoggerInterface;

use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Catalogue\Livre;
use App\Entity\Catalogue\Musique;
use App\Entity\Catalogue\Canard;
use App\Entity\Users\Admin;


use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\Extension\Core\Type\CollectionType;
use Symfony\Component\Form\Extension\Core\Type\CheckboxType;


use Symfony\Component\Form\Extension\Core\Type\HiddenType;

use Doctrine\DBAL\Exception\ConstraintViolationException;

use function PHPSTORM_META\type;

class ApiRestController extends AbstractController
{
	private $entityManager;
	private $logger;

	public function __construct(EntityManagerInterface $entityManager, LoggerInterface $logger)
	{
		$this->entityManager = $entityManager;
		$this->logger = $logger;
	}

	#==========> LES PRODUITS
	#[Route('/wp-json/wc/v3/products', name: 'list-all-products', methods: ['GET'])]
	public function listAllProducts(): Response
	{
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Catalogue\Article a");
		$articles = $query->getArrayResult();
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->setContent(json_encode($articles));
		$response->headers->set('Content-Type', 'application/json');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		return $response;
	}

	#[Route('/wp-json/wc/v3/products', name: 'allow-create-a-product', methods: ['OPTIONS'])]
	#[Route('/wp-json/wc/v3/products/{id}', name: 'allow-retrieve-a-product', methods: ['OPTIONS'])]

	public function allowCreateAProduct(Request $request): Response
	{
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
		$response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
		return $response;
	}

	#[Route('/wp-json/wc/v3/products', name: 'create-a-product', methods: ['POST'])]
	public function createAProduct(Request $request): Response
	{
		$article = json_decode($request->getContent(), true);
		if (isset($article["article_type"])) {
			if ($article["article_type"] == "canard") {
				if (isset($article["title"])) {
					if (is_string($article["title"])) {
						if (isset($article['categorie'])) {
							if (is_string($article["categorie"])) {
								if (isset($article["price"])) {
									if (is_float($article["price"])) {
										if (isset($article["disponibilite"])) {
											if (is_int($article['disponibilite'])) {
												if (isset($article["image"])) {
													if (is_string($article["image"])) {
														if (isset($article['description'])) {
															if (is_string($article['description'])) {
																if (isset($article['weight'])) {
																	if (is_float($article['weight'])) {
																		if (isset($article['dimensions'])) {
																			if (is_string($article['dimensions'])) {
																				if (isset($article['standard'])) {
																					if (is_string($article['standard'])) {
																						if (isset($article['isRecyclable'])) {
																							if (is_bool($article['isRecyclable'])) {
																								if (isset($article['matiere'])) {
																									if (is_string($article['matiere'])) {
																										if (isset($article['fabrication'])) {
																											if (is_string($article['fabrication'])) {
																												$entity = new Canard();
																												$formBuilder = $this->createFormBuilder($entity, array('csrf_protection' => false));
																												$formBuilder->add("title", TextType::class);

																												$formBuilder->add("categorie", TextType::class);

																												$formBuilder->add("price", NumberType::class);

																												$formBuilder->add("disponibilite", IntegerType::class);

																												$formBuilder->add("image", TextType::class);

																												$formBuilder->add("description", TextType::class);

																												$formBuilder->add("weight", NumberType::class);

																												$formBuilder->add('dimensions', TextType::class);

																												$formBuilder->add("standard", TextType::class);

																												$formBuilder->add("isRecyclable", CheckboxType::class);

																												$formBuilder->add("matiere", TextType::class);

																												$formBuilder->add("fabrication", TextType::class);

																												// // Generate form
																												$form = $formBuilder->getForm();
																												$form->submit($article);
																												if ($form->isSubmitted()) {
																													try {
																														$entity = $form->getData();
																														$id = hexdec(uniqid()); // $id must be of type int
																														$entity->setId($id);
																														$entity->setSelled(0);
																														$this->entityManager->persist($entity);
																														$this->entityManager->flush();
																														$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Catalogue\Article a where a.id like :id");
																														$query->setParameter("id", $id);
																														$article = $query->getArrayResult();
																														$response = new Response();
																														$response->setStatusCode(Response::HTTP_CREATED); // 201 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																														$response->setContent(json_encode($article));
																														$response->headers->set('Content-Type', 'application/json');
																														$response->headers->set('Content-Location', '/wp-json/wc/v3/products/' . $id);
																														$response->headers->set('Access-Control-Allow-Origin', '*');
																														$response->headers->set('Access-Control-Allow-Headers', '*');
																														$response->headers->set('Access-Control-Expose-Headers', 'Content-Location');

																														return $response;
																													} catch (ConstraintViolationException $e) {
																														$errors = $form->getErrors();
																														$response = new Response();
																														$errorMessages = [];
																														foreach ($errors as $error) {
																															$errorMessages[] = $error->getMessage();
																														}
																														$response = new Response(json_encode(['message' => 'Invalid input', 'errors' => $errorMessages]), Response::HTTP_UNPROCESSABLE_ENTITY);
																														$response->headers->set('Content-Type', 'application/json');
																														$response->headers->set('Access-Control-Allow-Origin', '*');
																														$response->headers->set('Access-Control-Allow-Headers', '*');
																														return $response;
																													}
																												} else {
																													$errors = $form->getErrors();
																													$response = new Response();
																													$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																													$response->setContent(json_encode(array('message' => 'Invalid input', 'errors' => $errors->__toString())));
																													//$response->setContent(json_encode(array('message' => 'Invalid input'))) ;
																													$response->headers->set('Content-Type', 'application/json');
																													$response->headers->set('Access-Control-Allow-Origin', '*');
																													$response->headers->set('Access-Control-Allow-Headers', '*');
																													return $response;
																												}
																											} else {
																												$response = new Response();
																												$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																												$response->setContent(json_encode(array('message' => 'type of fabrication must be a string')));
																												$response->headers->set('Content-Type', 'application/json');
																												$response->headers->set('Access-Control-Allow-Origin', '*');
																												$response->headers->set('Access-Control-Allow-Headers', '*');
																												return $response;
																											}
																										} else {
																											$response = new Response();
																											$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																											$response->setContent(json_encode(array('message' => 'Invalid input: no fabrication found')));
																											$response->headers->set('Content-Type', 'application/json');
																											$response->headers->set('Access-Control-Allow-Origin', '*');
																											$response->headers->set('Access-Control-Allow-Headers', '*');
																											return $response;
																										}
																									} else {
																										$response = new Response();
																										$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																										$response->setContent(json_encode(array('message' => 'type of matiere must be a string')));
																										$response->headers->set('Content-Type', 'application/json');
																										$response->headers->set('Access-Control-Allow-Origin', '*');
																										$response->headers->set('Access-Control-Allow-Headers', '*');
																										return $response;
																									}
																								} else {
																									$response = new Response();
																									$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																									$response->setContent(json_encode(array('message' => 'Invalid input: no matiere found')));
																									$response->headers->set('Content-Type', 'application/json');
																									$response->headers->set('Access-Control-Allow-Origin', '*');
																									$response->headers->set('Access-Control-Allow-Headers', '*');
																									return $response;
																								}
																							} else {
																								$response = new Response();
																								$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																								$response->setContent(json_encode(array('message' => 'type of isRecyclable must be a boolean')));
																								$response->headers->set('Content-Type', 'application/json');
																								$response->headers->set('Access-Control-Allow-Origin', '*');
																								$response->headers->set('Access-Control-Allow-Headers', '*');
																								return $response;
																							}
																						} else {
																							$response = new Response();
																							$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																							$response->setContent(json_encode(array('message' => 'Invalid input: no isRecyclable found')));
																							$response->headers->set('Content-Type', 'application/json');
																							$response->headers->set('Access-Control-Allow-Origin', '*');
																							$response->headers->set('Access-Control-Allow-Headers', '*');
																							return $response;
																						}
																					} else {
																						$response = new Response();
																						$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																						$response->setContent(json_encode(array('message' => 'type of normes must be a string')));
																						$response->headers->set('Content-Type', 'application/json');
																						$response->headers->set('Access-Control-Allow-Origin', '*');
																						$response->headers->set('Access-Control-Allow-Headers', '*');
																						return $response;
																					}
																				} else {
																					$response = new Response();
																					$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																					$response->setContent(json_encode(array('message' => 'Invalid input: no normes found')));
																					$response->headers->set('Content-Type', 'application/json');
																					$response->headers->set('Access-Control-Allow-Origin', '*');
																					$response->headers->set('Access-Control-Allow-Headers', '*');
																					return $response;
																				}
																			} else {
																				$response = new Response();
																				$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																				$response->setContent(json_encode(array('message' => 'type of dimensions must be a string')));
																				$response->headers->set('Content-Type', 'application/json');
																				$response->headers->set('Access-Control-Allow-Origin', '*');
																				$response->headers->set('Access-Control-Allow-Headers', '*');
																				return $response;
																			}
																		} else {
																			$response = new Response();
																			$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																			$response->setContent(json_encode(array('message' => 'Invalid input: no dimensions found')));
																			$response->headers->set('Content-Type', 'application/json');
																			$response->headers->set('Access-Control-Allow-Origin', '*');
																			$response->headers->set('Access-Control-Allow-Headers', '*');
																			return $response;
																		}
																	} else {
																		$response = new Response();
																		$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																		$response->setContent(json_encode(array('message' => 'type of poids must be a float')));
																		$response->headers->set('Content-Type', 'application/json');
																		$response->headers->set('Access-Control-Allow-Origin', '*');
																		$response->headers->set('Access-Control-Allow-Headers', '*');
																		return $response;
																	}
																} else {
																	$response = new Response();
																	$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																	$response->setContent(json_encode(array('message' => 'Invalid input: no poids found')));
																	$response->headers->set('Content-Type', 'application/json');
																	$response->headers->set('Access-Control-Allow-Origin', '*');
																	$response->headers->set('Access-Control-Allow-Headers', '*');
																	return $response;
																}
															} else {
																$response = new Response();
																$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
																$response->setContent(json_encode(array('message' => 'type of description must be a string')));
																$response->headers->set('Content-Type', 'application/json');
																$response->headers->set('Access-Control-Allow-Origin', '*');
																$response->headers->set('Access-Control-Allow-Headers', '*');
																return $response;
															}
														} else {
															$response = new Response();
															$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
															$response->setContent(json_encode(array('message' => 'Invalid input: no description found')));
															$response->headers->set('Content-Type', 'application/json');
															$response->headers->set('Access-Control-Allow-Origin', '*');
															$response->headers->set('Access-Control-Allow-Headers', '*');
															return $response;
														}
													} else {
														$response = new Response();
														$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
														$response->setContent(json_encode(array('message' => 'type of image is invalid. It must be an string type')));
														$response->headers->set('Content-Type', 'application/json');
														$response->headers->set('Access-Control-Allow-Origin', '*');
														$response->headers->set('Access-Control-Allow-Headers', '*');
														return $response;
													}
												} else {
													$response = new Response();
													$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
													$response->setContent(json_encode(array('message' => 'Invalid input: no image found')));
													$response->headers->set('Content-Type', 'application/json');
													$response->headers->set('Access-Control-Allow-Origin', '*');
													$response->headers->set('Access-Control-Allow-Headers', '*');
													return $response;
												}
											} else {
												$response = new Response();
												$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
												$response->setContent(json_encode(array('message' => 'type of disponibilite is invalid. It must be an integer type')));
												$response->headers->set('Content-Type', 'application/json');
												$response->headers->set('Access-Control-Allow-Origin', '*');
												$response->headers->set('Access-Control-Allow-Headers', '*');
												return $response;
											}
										} else {
											$response = new Response();
											$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
											$response->setContent(json_encode(array('message' => 'Invalid input: no disponibilite found')));
											$response->headers->set('Content-Type', 'application/json');
											$response->headers->set('Access-Control-Allow-Origin', '*');
											$response->headers->set('Access-Control-Allow-Headers', '*');
											return $response;
										}
									} else {
										$response = new Response();
										$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
										$response->setContent(json_encode(array('message' => 'type of price is invalid. It must be an float type')));
										$response->headers->set('Content-Type', 'application/json');
										$response->headers->set('Access-Control-Allow-Origin', '*');
										$response->headers->set('Access-Control-Allow-Headers', '*');
										return $response;
									}
								} else {
									$response = new Response();
									$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
									$response->setContent(json_encode(array('message' => 'Invalid input: no price found')));
									$response->headers->set('Content-Type', 'application/json');
									$response->headers->set('Access-Control-Allow-Origin', '*');
									$response->headers->set('Access-Control-Allow-Headers', '*');
									return $response;
								}
							} else {
								$response = new Response();
								$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
								$response->setContent(json_encode(array('message' => 'type of price is invalid. It must be a float type')));
								$response->headers->set('Content-Type', 'application/json');
								$response->headers->set('Access-Control-Allow-Origin', '*');
								$response->headers->set('Access-Control-Allow-Headers', '*');
								return $response;
							}
						} else {
							$response = new Response();
							$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
							$response->setContent(json_encode(array('message' => 'Invalid input: no categorie found')));
							$response->headers->set('Content-Type', 'application/json');
							$response->headers->set('Access-Control-Allow-Origin', '*');
							$response->headers->set('Access-Control-Allow-Headers', '*');
							return $response;
						}
					} else {
						$response = new Response();
						$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
						$response->setContent(json_encode(array('message' => 'type of Title is invalid. It must be a string type')));
						$response->headers->set('Content-Type', 'application/json');
						$response->headers->set('Access-Control-Allow-Origin', '*');
						$response->headers->set('Access-Control-Allow-Headers', '*');
						return $response;
					}
				} else {
					$response = new Response();
					$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
					$response->setContent(json_encode(array('message' => 'Invalid input: no title found')));
					$response->headers->set('Content-Type', 'application/json');
					$response->headers->set('Access-Control-Allow-Origin', '*');
					$response->headers->set('Access-Control-Allow-Headers', '*');
					return $response;
				}
				// Assurez-vous que 'dim' est un tableau d'entiers
				// $article['dim'] = array_map('intval', $article['dim']);

			}
			// 	if($article["article_type"] == "rat") {
			// 		$entity = new Livre() ;
			// 		$formBuilder = $this->createFormBuilder($entity, array('csrf_protection' => false));
			// 		$formBuilder->add("id", TextType::class) ;
			// 		$formBuilder->add("title", TextType::class) ;
			// 		$formBuilder->add("auteur", TextType::class) ;
			// 		$formBuilder->add("prix", NumberType::class) ;
			// 		$formBuilder->add("disponibilite", IntegerType::class) ;
			// 		$formBuilder->add("image", TextType::class) ;
			// 		$formBuilder->add("ISBN", TextType::class, ['required' => true]) ;
			// 		$formBuilder->add("nbPages", IntegerType::class) ;
			// 		$formBuilder->add("dateDeParution", TextType::class) ;
			// 		// Generate form
			// 		$form = $formBuilder->getForm();
			// 		$form->submit($article);
			// 		if ($form->isSubmitted()) {
			// 			try {
			// 				$entity = $form->getData() ;
			// 				$id = hexdec(uniqid()) ; // $id must be of type int
			// 				$entity->setId($id);
			// 				$this->entityManager->persist($entity);
			// 				$this->entityManager->flush();
			// 				$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Catalogue\Article a where a.id like :id");
			// 				$query->setParameter("id", $id) ; 
			// 				$article = $query->getArrayResult();
			// 				$response = new Response() ;
			// 				$response->setStatusCode(Response::HTTP_CREATED); // 201 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			// 				$response->setContent(json_encode($article)) ;
			// 				$response->headers->set('Content-Type', 'application/json');
			// 				$response->headers->set('Content-Location', '/wp-json/wc/v3/products/' . $id);
			// 				$response->headers->set('Access-Control-Allow-Origin', '*');
			// 				$response->headers->set('Access-Control-Allow-Headers', '*');
			// 				$response->headers->set('Access-Control-Expose-Headers', 'Content-Location');
			// 				return $response ;
			// 			}
			// 			catch(ConstraintViolationException $e) {
			// 				$errors = $form->getErrors() ;
			// 				$response = new Response() ;
			// 				$response->setStatusCode(Response::HTTP_UNPROCESSABLE_ENTITY); // 422 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			// 				$response->setContent(json_encode(array('message' => 'Invalid input','errors' => 'Constraint violation'))) ;
			// 				$response->headers->set('Content-Type', 'application/json');
			// 				$response->headers->set('Access-Control-Allow-Origin', '*');
			// 				$response->headers->set('Access-Control-Allow-Headers', '*');
			// 				return $response ;
			// 			}
			// 		}
			// 		else {
			// 			$errors = $form->getErrors() ;
			// 			$response = new Response() ;
			// 			$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			// 			$response->setContent(json_encode(array('message' => 'Invalid input','errors' => $errors->__toString()))) ;
			// 			$response->headers->set('Content-Type', 'application/json');
			// 			$response->headers->set('Access-Control-Allow-Origin', '*');
			// 			$response->headers->set('Access-Control-Allow-Headers', '*');
			// 			return $response ;
			// 		}
			// 	}
			// }
			else {
				$response = new Response();
				$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
				$response->setContent(json_encode(array('message' => 'Invalid input: No article_type found')));
				$response->headers->set('Content-Type', 'application/json');
				$response->headers->set('Access-Control-Allow-Origin', '*');
				$response->headers->set('Access-Control-Allow-Headers', '*');
				return $response;
			}
		}
	}

	#[Route('/wp-json/wc/v3/products/{id}', name: 'retrieve-a-product', methods: ['GET'])]
	public function retrieveAProduct(string $id): Response
	{
		// http://127.0.0.1:8000/wp-json/wc/v3/products/B07KBT4ZRG
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Catalogue\Article a where a.id like :id");
		$query->setParameter("id", $id);
		$article = $query->getArrayResult();
		if (count($article) !== 0) {
			$response = new Response();
			$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode($article));
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
		
			return $response;
		} else {
			$response = new Response();
			$response->setStatusCode(Response::HTTP_NOT_FOUND); // 404 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode(array('message' => 'Resource not found: No article found for id ' . $id)));
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			return $response;
		}
	}
	#[Route('/wp-json/wc/v3/products/{id}', name: 'delete-a-product', methods: ['DELETE'])]
	public function DeleteAProduct(string $id): Response
	{
		// http://127.0.0.1:8000/wp-json/wc/v3/products/B07KBT4ZRG
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Catalogue\Article a where a.id like :id");
		$query->setParameter("id", $id);
		try {
			$article = $query->getSingleResult();
		} catch (\Doctrine\ORM\NoResultException $e) {
			$article = null;
		}

		//$article = $query->getArrayResult();
		if ($article !== null) {
			$result = clone $article;
			$this->entityManager->remove($article);
			$this->entityManager->flush(); // Apply all changes to the database
			$response = new Response();
			$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode($result));

			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			return $response;
		} else {
			$response = new Response();
			$response->setStatusCode(Response::HTTP_NOT_FOUND); // 404 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode(array('message' => 'Resource not found: No article found for id ' . $id)));
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			return $response;
		}
	}

	#[Route('/wp-json/wc/v3/products/{id}', name: 'update-a-product', methods: ['PUT'])]
	public function UpdateAProduct(string $id, Request $request, LoggerInterface $logger): Response
	{
		$logger->info("Received request to update product with ID: $id");
		$logger->info("Request body: " . $request->getContent());

		// Recherche de l'article par ID
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Catalogue\Article a WHERE a.id = :id");
		$query->setParameter("id", $id);

		try {
			$article = $query->getSingleResult();
		} catch (\Doctrine\ORM\NoResultException $e) {
			$logger->error("No article found for ID: $id");
			return new Response(
				json_encode(['message' => 'Resource not found: No article found for id ' . $id]),
				Response::HTTP_NOT_FOUND,
				['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
			);
		}

		// Construire le formulaire basé sur le type d'article
		$formBuilder = $this->createFormBuilder($article, [
			'csrf_protection' => false,
			'allow_extra_fields' => true // Autoriser des champs supplémentaires pour le débogage
		]);

		if ($article instanceof Musique) {
			$formBuilder->add("title", TextType::class);
			$formBuilder->add("artiste", TextType::class);
			$formBuilder->add("prix", NumberType::class);
			$formBuilder->add("disponibilite", IntegerType::class);
			$formBuilder->add("image", TextType::class);
			$formBuilder->add("dateDeParution", TextType::class);
		} elseif ($article instanceof Livre) {
			$formBuilder->add("title", TextType::class);
			$formBuilder->add("auteur", TextType::class);
			$formBuilder->add("prix", NumberType::class);
			$formBuilder->add("disponibilite", IntegerType::class);
			$formBuilder->add("image", TextType::class);
			$formBuilder->add("ISBN", TextType::class, ['required' => true]);
			$formBuilder->add("nbPages", IntegerType::class);
			$formBuilder->add("dateDeParution", TextType::class);
		}

		// Créer le formulaire et soumettre les données
		$form = $formBuilder->getForm();
		$form->submit(json_decode($request->getContent(), true), false); // Soumettre avec les données du corps de la requête

		// Validation du formulaire
		if ($form->isSubmitted() && $form->isValid()) {
			try {
				$this->entityManager->flush();
				$logger->info("Product updated successfully for ID: $id");
				return new Response(
					json_encode(['message' => 'Product updated successfully']),
					Response::HTTP_OK,
					['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
				);
			} catch (ConstraintViolationException $e) {
				$logger->error("Constraint violation: " . $e->getMessage());
				return new Response(
					json_encode(['message' => 'Invalid input', 'errors' => 'Constraint violation']),
					Response::HTTP_UNPROCESSABLE_ENTITY,
					['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
				);
			}
		}

		// Retourner les erreurs de validation du formulaire
		$errors = [];
		foreach ($form->getErrors(true) as $error) {
			$errors[] = $error->getMessage();
		}
		$logger->error("Form validation failed with errors: " . implode(", ", $errors));

		return new Response(
			json_encode(['message' => 'Invalid input', 'errors' => $errors]),
			Response::HTTP_BAD_REQUEST,
			['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
		);
	}

	#[Route('/wp-json/wc/v3/products/{id}', name: 'patch-a-product', methods: ['PATCH'])]
	public function patchAProduct(string $id, Request $request): Response
	{
		$articleData = json_decode($request->getContent(), true);
		$articleRepository = $this->entityManager->getRepository(Article::class);
		$article = $articleRepository->find($id);

		if (!$article) {
			return new Response(
				json_encode(['message' => 'Resource not found: No article found for id ' . $id]),
				Response::HTTP_NOT_FOUND,
				['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
			);
		}

		$formBuilder = $this->createFormBuilder($article, ['csrf_protection' => false]);

		if ($article instanceof Musique) {
			$formBuilder->add("title", TextType::class);
			$formBuilder->add("artiste", TextType::class);
			$formBuilder->add("price", NumberType::class);
			$formBuilder->add("disponibilite", IntegerType::class);
			$formBuilder->add("photo", TextType::class);
			$formBuilder->add("dateDeParution", TextType::class);
		} elseif ($article instanceof Livre) {
			$formBuilder->add("title", TextType::class);
			$formBuilder->add("auteur", TextType::class);
			$formBuilder->add("price", NumberType::class);
			$formBuilder->add("disponibilite", IntegerType::class);
			$formBuilder->add("photo", TextType::class);
			$formBuilder->add("ISBN", TextType::class, ['required' => true]);
			$formBuilder->add("nbPages", IntegerType::class);
			$formBuilder->add("dateDeParution", TextType::class);
		}

		$form = $formBuilder->getForm();
		$form->submit($articleData, false); // false to indicate partial update

		if ($form->isSubmitted() && $form->isValid()) {
			try {
				$this->entityManager->flush();

				return new Response(
					json_encode(['message' => 'Product updated successfully']),
					Response::HTTP_OK,
					['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
				);
			} catch (ConstraintViolationException $e) {
				return new Response(
					json_encode(['message' => 'Invalid input', 'errors' => 'Constraint violation']),
					Response::HTTP_UNPROCESSABLE_ENTITY,
					['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
				);
			}
		}

		$errors = $form->getErrors();
		return new Response(
			json_encode(['message' => 'Invalid input', 'errors' => $errors->__toString()]),
			Response::HTTP_BAD_REQUEST,
			['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
		);
	}


	#==========> LES ADMINS
	#[Route('/wp-json/wc/v3/users', name: 'allow-create-a-user', methods: ['OPTIONS'])]
	#[Route('/wp-json/wc/v3/users/{id}', name: 'allow-retrieve-a-user', methods: ['OPTIONS'])]

	public function allowCreateAUser(Request $request): Response
	{
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->headers->set('Access-Control-Allow-Origin', '*');
		$response->headers->set('Access-Control-Allow-Methods', $request->headers->get('Access-Control-Request-Method'));
		$response->headers->set('Access-Control-Allow-Headers', $request->headers->get('Access-Control-Request-Headers'));
		return $response;
	}
	
	#[Route('/wp-json/wc/v3/users', name: 'list-all-users', methods: ['GET'])]
	public function listAllUsers(): Response
	{
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Users\User a");
		$users = $query->getArrayResult();
		$response = new Response();
		$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
		$response->setContent(json_encode($users));
		$response->headers->set('Content-Type', 'application/json');
		$response->headers->set('Access-Control-Allow-Origin', '*');
		return $response;
	}

	#[Route('/wp-json/wc/v3/users/{id}', name: 'retrieve-a-user', methods: ['GET'])]
	public function retrieveAUser(string $id): Response
	{
		// http://127.0.0.1:8000/wp-json/wc/v3/users/B07KBT4ZRG
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Users\User a where a.id like :id");
		$query->setParameter("id", $id);
		$user = $query->getArrayResult();
		if (count($user) !== 0) {
			$response = new Response();
			$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode($user));
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			return $response;
		} else {
			$response = new Response();
			$response->setStatusCode(Response::HTTP_NOT_FOUND); // 404 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode(array('message' => 'Resource not found: No user found for id ' . $id)));
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			return $response;
		}
	}

	#[Route('/wp-json/wc/v3/users', name: 'create-a-user', methods: ['POST'])]
	public function createAUser(Request $request): Response
	{
		$user = json_decode($request->getContent(), true);
		
		$entity = new Admin();
		$formBuilder = $this->createFormBuilder($entity, array('csrf_protection' => false));
		$formBuilder->add("pseudo", TextType::class);
		$formBuilder->add("email", TextType::class);
		$formBuilder->add("mdp", TextType::class);
		$formBuilder->add("pp", TextType::class);
		$formBuilder->add("write", CheckboxType::class);
		$formBuilder->add("read", CheckboxType::class);
		// // Generate form
		$form = $formBuilder->getForm();
		$form->submit($user);
		if ($form->isSubmitted()) {
			try {
				$entity = $form->getData();
				$id = hexdec(uniqid()); // $id must be of type int
				$entity->setId($id);
				$this->entityManager->persist($entity);
				$this->entityManager->flush();
				$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Users\User a where a.id like :id");
				$query->setParameter("id", $id);
				$user = $query->getArrayResult();
				$response = new Response();
				$response->setStatusCode(Response::HTTP_CREATED); // 201 https://github.com/symfony/http-foundation/blob/5.4/Response.php
				$response->setContent(json_encode($user));
				$response->headers->set('Content-Type', 'application/json');
				$response->headers->set('Content-Location', '/wp-json/wc/v3/users/' . $id);
				$response->headers->set('Access-Control-Allow-Origin', '*');
				$response->headers->set('Access-Control-Allow-Headers', '*');
				$response->headers->set('Access-Control-Expose-Headers', 'Content-Location');

				return $response;
			} catch (ConstraintViolationException $e) {
				$errors = $form->getErrors();
				$response = new Response();
				$errorMessages = [];
				foreach ($errors as $error) {
					$errorMessages[] = $error->getMessage();
				}
				$response = new Response(json_encode(['message' => 'Invalid input', 'errors' => $errorMessages]), Response::HTTP_UNPROCESSABLE_ENTITY);
				$response->headers->set('Content-Type', 'application/json');
				$response->headers->set('Access-Control-Allow-Origin', '*');
				$response->headers->set('Access-Control-Allow-Headers', '*');
				return $response;
			}
		} else {
			$errors = $form->getErrors();
			$response = new Response();
			$response->setStatusCode(Response::HTTP_BAD_REQUEST); // 400 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode(array('message' => 'Invalid input', 'errors' => $errors->__toString())));
			//$response->setContent(json_encode(array('message' => 'Invalid input'))) ;
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			$response->headers->set('Access-Control-Allow-Headers', '*');
			return $response;
		}
	}

	#[Route('/wp-json/wc/v3/users/{id}', name: 'update-a-user', methods: ['PUT'])]
	public function UpdateAUser(string $id, Request $request, LoggerInterface $logger): Response
	{
		$logger->info("Received request to update user with ID: $id");
		$logger->info("Request body: " . $request->getContent());

		// Recherche de l'article par ID
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Users\User a WHERE a.id = :id");
		$query->setParameter("id", $id);

		try {
			$article = $query->getSingleResult();
		} catch (\Doctrine\ORM\NoResultException $e) {
			$logger->error("No article found for ID: $id");
			return new Response(
				json_encode(['message' => 'Resource not found: No article found for id ' . $id]),
				Response::HTTP_NOT_FOUND,
				['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
			);
		}

		// Construire le formulaire basé sur le type d'article
		$formBuilder = $this->createFormBuilder($article, [
			'csrf_protection' => false,
			'allow_extra_fields' => true // Autoriser des champs supplémentaires pour le débogage
		]);

		// Créer le formulaire et soumettre les données
		$form = $formBuilder->getForm();
		$form->submit(json_decode($request->getContent(), true), false); // Soumettre avec les données du corps de la requête

		// Validation du formulaire
		if ($form->isSubmitted() && $form->isValid()) {
			try {
				$this->entityManager->flush();
				$logger->info("User updated successfully for ID: $id");
				return new Response(
					json_encode(['message' => 'User updated successfully']),
					Response::HTTP_OK,
					['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
				);
			} catch (ConstraintViolationException $e) {
				$logger->error("Constraint violation: " . $e->getMessage());
				return new Response(
					json_encode(['message' => 'Invalid input', 'errors' => 'Constraint violation']),
					Response::HTTP_UNPROCESSABLE_ENTITY,
					['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
				);
			}
		}

		// Retourner les erreurs de validation du formulaire
		$errors = [];
		foreach ($form->getErrors(true) as $error) {
			$errors[] = $error->getMessage();
		}
		$logger->error("Form validation failed with errors: " . implode(", ", $errors));

		return new Response(
			json_encode(['message' => 'Invalid input', 'errors' => $errors]),
			Response::HTTP_BAD_REQUEST,
			['Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*']
		);
	}

	#[Route('/wp-json/wc/v3/users/{id}', name: 'delete-a-user', methods: ['DELETE'])]
	public function DeleteAUser(string $id): Response
	{
		$query = $this->entityManager->createQuery("SELECT a FROM App\Entity\Users\User a where a.id like :id");
		$query->setParameter("id", $id);
		try {
			$user = $query->getSingleResult();
		} catch (\Doctrine\ORM\NoResultException $e) {
			$user = null;
		}

		if ($user !== null) {
			$result = clone $user;
			$this->entityManager->remove($user);
			$this->entityManager->flush(); // Apply all changes to the database
			$response = new Response();
			$response->setStatusCode(Response::HTTP_OK); // 200 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode($result));

			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			return $response;
		} else {
			$response = new Response();
			$response->setStatusCode(Response::HTTP_NOT_FOUND); // 404 https://github.com/symfony/http-foundation/blob/5.4/Response.php
			$response->setContent(json_encode(array('message' => 'Resource not found: No article found for id ' . $id)));
			$response->headers->set('Content-Type', 'application/json');
			$response->headers->set('Access-Control-Allow-Origin', '*');
			return $response;
		}
	}
}
