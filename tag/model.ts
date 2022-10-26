import type {Types} from 'mongoose';
import {Schema, model} from 'mongoose';

/**
 * This file defines the properties stored in a Tag
 * DO NOT implement operations here ---> use collection file
 */

// Type definition for Tag on the backend
export type Tag = {
  _id: Types.ObjectId; // MongoDB assigns each object this ID on creation
  content: string;
  tagged: Types.ObjectId[];
};

// Mongoose schema definition for interfacing with a MongoDB table
// Tags stored in this table will have these fields, with the
// type given by the type property, inside MongoDB
const TagSchema = new Schema<Tag>({
  // The content of the tag
  content: {
    type: String,
    required: true
  },
  tagged: {
    type: [Schema.Types.ObjectId],
    required: false,
    ref: 'Freet'
  },
});

const TagModel = model<Tag>('Tag', TagSchema);
export default TagModel;