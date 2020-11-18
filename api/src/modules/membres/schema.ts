import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    utilisateur: String,
    prenom: String,
    nom: String,
    email: String,
    role: String,
    organisation: String,
    date_fin: String,
    etat: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote],
    password: String
});

export default mongoose.model('membres', schema);