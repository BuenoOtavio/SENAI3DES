const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { id, nome, email, senha, idTurma } = req.body;
        const professores = await prisma.professores.create({
            data: {
                id: id,
                nome: nome,
                email: email,
                senha: senha,
                idTurma: idTurma
            }
        });
        return res.status(201).json(professores);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const professores = await prisma.professores.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.json(professores);
    } else {
        const professores = await prisma.professores.findMany();
        return res.json(professores);
    }
};

const update = async (req, res) => {
    try {
        const professores = await prisma.professores.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        });
        return res.status(202).json(professores);
    } catch (error) {
        return res.status(404).json({ message: "Professor não encontrado" });
    }
};

const del = async (req, res) => {
    try {
        const professores = await prisma.professores.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).json(professores);
    } catch (error) {
        return res.status(404).json({ message: "Professor não encontrado" });
    }
}

module.exports = {
    create,
    read,
    update,
    del
};