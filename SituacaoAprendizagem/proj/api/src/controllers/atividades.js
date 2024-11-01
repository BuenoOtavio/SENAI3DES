const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { id, nome, idTurma } = req.body;
        const atividades = await prisma.atividades.create({
            data: {
                id: id,
                nome: nome,
                idTurma: idTurma
            }
        });
        return res.status(201).json(atividades);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const atividades = await prisma.atividades.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.json(atividades);
    } else {
        const atividades = await prisma.atividades.findMany();
        return res.json(atividades);
    }
};

const update = async (req, res) => {
    try {
        const atividades = await prisma.atividades.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        });
        return res.status(202).json(atividades);
    } catch (error) {
        return res.status(404).json({ message: "Atividade não encontrada" });
    }
};

const del = async (req, res) => {
    try {
        const atividades = await prisma.atividades.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).json(atividades);
    } catch (error) {
        return res.status(404).json({ message: "Atividade não encontrada" });
    }
}

module.exports = {
    create,
    read,
    update,
    del
};