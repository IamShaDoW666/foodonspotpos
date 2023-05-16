import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createCategory = () => {
    prisma.category.create({
        data: {
            name: faker.commerce.productName()
        }
    })
}

async function main() {
    try {
        //Seed Categories
        for (let i = 0; i < 10; i++) {
            const category = await prisma.category.create({
                data: {
                    name: faker.helpers.unique(faker.commerce.product)
                }
            })
            //Seed Products
            for (let i = 0; i < Math.floor(Math.random() * 10); i++) {
                const product = await prisma.product.create({
                    data: {
                        name: faker.helpers.unique(faker.commerce.productName),
                        price: Math.floor(Math.random() * 100),
                        categoryId: category.id
                    }
                })

                for (let j = 0; j < Math.floor(Math.random() * 10); j++) {
                    const option = await prisma.option.create({
                        data: {
                            name: faker.helpers.unique(faker.animal.insect),
                            productId: product.id
                        }
                    })
                    for (let k = 0; k < Math.floor(Math.random() * 10); k++) {
                        await prisma.variant.create({
                            data: {
                                name: faker.helpers.unique(faker.address.cityName),
                                price: Math.floor(Math.random() * 100),
                                optionId: option.id
                            }
                        })
                    }
                }
            }
        }
    } catch (error) {
        console.warn('Please define your seed data.');
        console.error(error);
    }
}

main()
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        process.exit(0);
    });