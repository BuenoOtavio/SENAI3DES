const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { id, nome, idProfessor, atividades } = req.body;
        const turmas = await prisma.turmas.create({
            data: {
                id: id,
                nome: nome,
                idProfessor: idProfessor,
                atividades: atividades,
            }
        });
        return res.status(201).json(turmas);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const turmas = await prisma.turmas.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.json(turmas);
    } else {
        const turmas = await prisma.turmas.findMany();
        return res.json(turmas);
    }
};

const update = async (req, res) => {
    try {
        const turmas = await prisma.turmas.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        });
        return res.status(202).json(turmas);
    } catch (error) {
        return res.status(404).json({ message: "Turma não encontrada" });
    }
};

const del = async (req, res) => {
    try {
        const turmas = await prisma.turmas.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).json(turmas);
    } catch (error) {
        return res.status(404).json({ message: "Turma não encontrada" });
    }
}

module.exports = {
    create,
    read,
    update,
    del
};