import type {HydratedDocument} from 'mongoose';
import moment from 'moment';
import type {Tag} from '../tag/model';

// Update this if you add a property to the Tag type!
type TagResponse = {
  _id: string;
  content: string;
  tagged: string[];
};

/**
 * Transform a raw Tag object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Tag>} tag - A tag
 * @returns {TagResponse} - The tag object formatted for the frontend
 */
const constructTagResponse = (tag: HydratedDocument<Tag>): TagResponse => {
  const tagCopy: Tag = {
    ...tag.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };

  return {
    ...tagCopy,
    _id: tagCopy._id.toString(),
    tagged: tagCopy.tagged.map(freetId => freetId.toString())
  };
};

export {
  constructTagResponse
};