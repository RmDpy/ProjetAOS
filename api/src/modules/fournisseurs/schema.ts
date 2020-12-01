import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    code: String,
    nom: String,
    pays: String,
    devise: String,
    fabriquant: Boolean,
    sav: Boolean,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('fournisseurs', schema);