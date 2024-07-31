const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const create = async (req, res) => {
    try {
        const { id, descricao, colaborador, executor, abertura, encerramento, comentarios, colaboradores, executores } = req.body;
        const os = await prisma.os.create({
            data: {
                id: id,
                descricao: descricao,
                colaborador: colaborador,
                executor: executor,
                abertura: abertura,
                encerramento: encerramento,
                comentarios: comentarios,
                colaboradores: colaboradores,
                executores: executores
            }
        });
        return res.status(201).json(os);
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
};

const read = async (req, res) => {
    if (req.params.id !== undefined) {
        const os = await prisma.os.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.json(os);
    } else {
        const oss = await prisma.os.findMany();
        return res.json(oss);
    }
};

const update = async (req, res) => {
    try {
        const os = await prisma.os.update({
            where: {
                id: parseInt(req.body.id)
            },
            data: req.body
        });
        return res.status(202).json(os);
    } catch (error) {
        return res.status(404).json({ message: "os não encontrado" });
    }
};

const del = async (req, res) => {
    try {
        const os = await prisma.os.delete({
            where: {
                id: parseInt(req.params.id)
            }
        });
        return res.status(204).json(os);
    } catch (error) {
        return res.status(404).json({ message: "os não encontrado" });
    }
}

module.exports = {
    create,
    read,
    update,
    del,
};