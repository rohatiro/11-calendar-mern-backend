// Todo debe regresar esto
// {
//     ok: true,
//     msg: 'nombre de la ruta'
// }

const express = require('express');
const Event = require('./../models/Event');

const obtenerEventos = async (req, res) => {
    const eventos = await Event.find().populate('user', 'name');

    return res.json({
        ok: true,
        msg: 'obtenerEventos',
        eventos,
    })
}

const crearEvento = async (req, res) => {
    const event = new Event(req.body);

    try {
        event.user = req.uid;
        const eventDB = await event.save();

        return res.json({
            ok: true,
            msg: 'crearEvento',
            eventDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Por favor hable con el administrador",
        });
    }
}

const actualizarEvento = async (req, res) => {
    const event_id = req.params.id;

    try {
        const event = await Event.findById(event_id);

        if(!event) {
            return res.status(404).json({
                ok: false,
                message: "Evento no existe por ese id",
            });
        }

        if(event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: "No tiene permisos para editar este evento",
            });
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const updatedEvent = await Event.findByIdAndUpdate(event_id, newEvent, { new: true });

        return res.json({
            ok: true,
            msg: 'actualizarEvento',
            event: updatedEvent,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Por favor hable con el administrador",
        });
    }
}

const borrarEvento = async (req, res) => {
    const event_id = req.params.id;

    try {
        const event = await Event.findById(event_id);

        if(!event) {
            return res.status(404).json({
                ok: false,
                message: "Evento no existe por ese id",
            });
        }

        if(event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: "No tiene permisos para eliminar este evento",
            });
        }

        await Event.findByIdAndDelete(event_id);

        return res.json({
            ok: true,
            event_id,
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: "Por favor hable con el administrador",
        });
    }
}

module.exports = {
    obtenerEventos,
    crearEvento,
    actualizarEvento,
    borrarEvento,
}