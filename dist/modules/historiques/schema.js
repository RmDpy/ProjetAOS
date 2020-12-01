"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const Schema = mongoose.Schema;
const schema = new Schema({
    date: String,
    reference: String,
    libelle: String,
    mouvement: String,
    quantite: Number,
    magasin: String,
    etat: String,
    num_bon: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('historiques', schema);
