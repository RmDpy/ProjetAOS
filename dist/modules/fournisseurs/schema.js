"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const Schema = mongoose.Schema;
const schema = new Schema({
    code: String,
    nom: String,
    etat: String,
    pays: String,
    devise: String,
    fabriquant: Boolean,
    sav: Boolean,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('fournisseurs', schema);
