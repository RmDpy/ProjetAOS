import * as mongoose from 'mongoose';
import { ModificationNote } from '../common/model';

const Schema = mongoose.Schema;

const schema = new Schema({
    magasin: String,
    emplacement: String,
    reference: String,
    libelle: String,
    stock_qt: Number,
    stock_val: Number,
    is_deleted: {
        type: Boolean,
        default: false
    },
    modification_notes: [ModificationNote]
});

export default mongoose.model('stocks', schema);