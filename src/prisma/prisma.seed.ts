import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function createTestUser() {
    const userExists = await prisma.user.findUnique({
        where: { email: 'teste@educ.al.gov.br' },
    });
    
    if (!userExists) {
        const hashedPassword = await bcrypt.hash('senhaSegura1', 10);
        await prisma.user.create({
            data: {
                email: 'teste@educ.al.gov.br',
                password: hashedPassword,
                first_name: 'Usuário',
                last_name: 'de Teste',
                full_name: 'Usuário de Teste',
                is_active: true,
                type: 'COORDINATOR',
            },
        });        
        
        console.log('Usuário de teste criado!');
    } else {
        console.log('Usuário de teste já existe!');
    }
}

if (process.env.NODE_ENV === 'development') {
    createTestUser().catch(e => {
        console.error(e);
        process.exit(1);
    }).finally(async () => {
        await prisma.$disconnect();
    });
} else {
    console.log('Não é ambiente de desenvolvimento, não foi criado usuário de teste.');
}