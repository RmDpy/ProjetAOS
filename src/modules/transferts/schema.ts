import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    reference: String,
    libelle: String,
    quantite: Number,
    mag_fournisseur: String,
    mag_demandeur: String,
    num_bon: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('transferts', schema);