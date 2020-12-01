"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const model_1 = require("../common/model");
const Schema = mongoose.Schema;
const schema = new Schema({
    magasin: String,
    emplacement: String,
    reference: String,
    libelle: String,
    prix: Number,
    stock_qt: Number,
    stock_val: Number,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [model_1.ModificationNote]
});
exports.default = mongoose.model('stocks', schema);
