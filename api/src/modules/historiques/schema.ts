import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    date: String,
    reference: String,
    libelle: String,
    mouvement: String,
    quantite: String,
    magasin: String,
    emplacement: String,
    num_bon: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('historiques', schema);