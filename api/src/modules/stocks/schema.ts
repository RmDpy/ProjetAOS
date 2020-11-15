import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    emplacement: String,
    etat: String,
    reference: String,
    libelle: String,
    prix: String,
    stock_qt: String,
    stock_val: String,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('stocks', schema);