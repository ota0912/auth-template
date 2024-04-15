import mongoose, { Schema, Model, Document } from 'mongoose';

interface SchemaNameModel extends Document {
    // Define your schema properties here
}

const SchemaNameSchema: Schema<SchemaNameModel> = new mongoose.Schema<SchemaNameModel>({
    // Define your schema properties here
});

const SchemaName: Model<SchemaNameModel> = mongoose.model<SchemaNameModel>('SchemaName', SchemaNameSchema);

export default SchemaName;
