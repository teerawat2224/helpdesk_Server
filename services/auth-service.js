const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getUserByEmail = (email) => {
    return prisma.users.findFirst({
        where: {
            email: email
        }
    });
};

const createUser = (email, hashPassword) => {
    // const hashPassword = bcryptjs.hashSync(password, 10);
    return prisma.users.create({
        data: {
            email: email,
            password: hashPassword,
            updated_at: new Date(),
        }
    });
};

const updateUser = async (id, data) => {
    return await prisma.users.update({
        where: {
            id: id,
        },
        data: data,
    });
};

module.exports = { getUserByEmail, createUser, updateUser };