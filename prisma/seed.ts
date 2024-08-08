import { PetGender, PetSize, PetSpecie, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const customerAndPet1 = await prisma.customer.upsert({
    where: {
      id: '6682f3426607d34ad292fde0',
    },
    update: {},
    create: {
      id: '6682f3426607d34ad292fde0',
      name: 'Junin',
      phoneNumber: '77555553123',
      email: 'junin@prisma.com',
      address: {
        create: {
          houseNumber: '5465',
          neighborhood: 'Centro',
          street: 'Rua A',
          complement: 'Nothing',
        },
      },
      pets: {
        create: {
          id: '6682c60e3a7ef7b5e85f3a28',
          breed: 'Pincher',
          gender: PetGender.MACHO,
          name: 'Link',
          size: PetSize.GRANDE,
          specie: PetSpecie.CACHORRO,
        },
      },
      socialMedia: '@junin',
    },
  });

  const customerAndPet2 = await prisma.customer.upsert({
    where: {
      id: '6682da72b834f0f6a202da07',
    },
    update: {},
    create: {
      id: '6682da72b834f0f6a202da07',
      name: 'Beto',
      phoneNumber: '77654321987',
      address: {
        create: {
          houseNumber: '123-A',
          neighborhood: 'Boa City',
          street: 'Rua Street',
          complement: 'Condominio Jordania, Bloco 5, Apt. 304',
        },
      },
      email: 'beto@example.com',
      pets: {
        create: {
          id: '6682ee82200982707c4594ef',
          breed: 'Pastor',
          gender: PetGender.MACHO,
          name: 'Bet',
          size: PetSize.PEQUENO,
          specie: PetSpecie.CACHORRO,
          allergies: 'Arroz',
          additionalInfo: 'Odeia bolo',
          healthProblems: 'Asma',
          combo: true,
        },
      },
    },
  });

  const customerAndPet3 = await prisma.customer.upsert({
    where: {
      id: '6682eedf97a14c260c6c13d2',
    },
    update: {},
    create: {
      id: '6682eedf97a14c260c6c13d2',
      name: 'Jonas',
      phoneNumber: '77654321966',
      address: {
        create: {
          houseNumber: '12',
          neighborhood: 'Candeias',
          street: 'Rua J',
        },
      },
      email: 'joans@example.com',
      pets: {
        create: {
          id: '6682ef0de28f346e43e03fad',
          breed: 'Labrador',
          gender: PetGender.FEMEA,
          name: 'Lis',
          size: PetSize.MEDIO,
          specie: PetSpecie.GATO,
          additionalInfo: 'Odeia água',
        },
      },
    },
  });

  const grooming1 = await prisma.grooming.upsert({
    where: {
      id: '6682c5552a68fed0e844a1bb',
    },
    update: {},
    create: {
      id: '6682c5552a68fed0e844a1bb',
      type: 'banho',
      price: 50,
      pet: {
        connect: {
          id: '6682c60e3a7ef7b5e85f3a28',
        },
      },
    },
  });

  const grooming2 = await prisma.grooming.upsert({
    where: {
      id: '6682d9748c0190bb253d35bd',
    },
    update: {},
    create: {
      id: '6682d9748c0190bb253d35bd',
      type: 'banho e tosa',
      price: 75,
      pet: {
        connect: {
          id: '6682ee82200982707c4594ef',
        },
      },
    },
  });

  const product1 = await prisma.product.upsert({
    where: {
      id: '6682d85c036beab771114da5',
    },
    update: {},
    create: {
      id: '6682d85c036beab771114da5',
      brand: 'Pets',
      measure: '250g',
      name: 'Shampoo pet',
      price: 50,
      description: 'Bem xeiroso',
      stock: {
        create: {
          quantity: 25,
        },
      },
      category: {
        create: {
          label: 'comesticos',
        },
      },
    },
  });

  const product2 = await prisma.product.upsert({
    where: {
      id: '6682d90243fe59416b29403b',
    },
    update: {},
    create: {
      id: '6682d90243fe59416b29403b',
      brand: 'Whiska',
      measure: '500g',
      name: 'Ração Whiska',
      price: 75,
      description: 'Comível',
      stock: {
        create: {
          quantity: 80,
        },
      },
      category: {
        create: {
          id: '6686ae4c34b05428c5198887',
          label: 'comida',
        },
      },
    },
  });

  const product3 = await prisma.product.upsert({
    where: {
      id: '6682ec92bb47312baa9a01d6',
    },
    update: {},
    create: {
      id: '6682ec92bb47312baa9a01d6',
      brand: 'Pedigree',
      measure: '1kg',
      name: 'Ração Pedigree',
      description: 'Muito bom',
      price: 25,
      stock: {
        create: {
          quantity: 20,
        },
      },
      category: {
        connect: {
          id: '6686ae4c34b05428c5198887',
        },
      },
    },
  });

  const service1 = await prisma.service.upsert({
    where: {
      id: '6687ecadfb742ab296412b41',
    },
    update: {},
    create: {
      id: '6687ecadfb742ab296412b41',
      totalValue: 225,
      customer: {
        connect: {
          id: '6682f3426607d34ad292fde0',
        },
      },
      items: {
        createMany: {
          data: [
            {
              price: 150,
              type: 'produto',
              quantity: 2,
              productId: '6682d90243fe59416b29403b',
            },
            {
              price: 75,
              type: 'banho',
              quantity: 1,
              groomingId: '6682c5552a68fed0e844a1bb',
            },
          ],
        },
      },
    },
  });

  const service2 = await prisma.service.upsert({
    where: {
      id: '6682efba7d971c9e16dae198',
    },
    update: {},
    create: {
      id: '6682efba7d971c9e16dae198',
      totalValue: 175,
      customer: {
        connect: {
          id: '6682da72b834f0f6a202da07',
        },
      },
      items: {
        createMany: {
          data: [
            {
              price: 50,
              type: 'produto',
              quantity: 1,
              productId: '6682d85c036beab771114da5',
            },
            {
              price: 75,
              type: 'banho',
              quantity: 1,
              groomingId: '6682d9748c0190bb253d35bd',
            },
            {
              price: 25,
              type: 'produto',
              quantity: 1,
              productId: '6682ec92bb47312baa9a01d6',
            },
          ],
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

