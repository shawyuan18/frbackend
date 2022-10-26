import type {NextFunction, Request, Response} from 'express';
import express from 'express';
import TagCollection from './collection';
import * as userValidator from '../user/middleware';
import * as freetValidator from '../freet/middleware';
import * as util from './util';

const router = express.Router();

/**
 * Get all the tags
 *
 * @name GET /api/tags
 *
 * @return {TagResponse[]} - A list of all the tags sorted in alphabetical order by content
 */
 router.get(
    '/',
    async (req: Request, res: Response) => {

      const allTags = await TagCollection.findAll();
      const response = allTags.map(util.constructTagResponse);
      res.status(200).json(response);
    },
  );

/**
 * Create a new tag.
 *
 * @name POST /api/tags
 *
 * @param {string} content - The content of the tag
 * @return {TagResponse} - The created tag
 */
router.post(
  '/',
  async (req: Request, res: Response) => {
    const tag = await TagCollection.addOne(req.body.content);

    res.status(201).json({
      message: 'Your tag was created successfully.',
      tag: util.constructTagResponse(tag)
    });
  }
);

/**
 * Add a tag to a freet.
 * 
 * @name PUT /api/tags/add
 * 
 * @param {string} freetId - The ID of freet to add tag to
 * @param {string} content - The content of the tag
 * 
 * @return {string} A success message
 */
 router.put(
    '/',
    async (req: Request, res: Response) => {
      const tag = await TagCollection.addTag(req.body.freetId, req.body.content);
  
      res.status(201).json({
        message: 'Your tag was added successfully.',
      });
    }
  );


/**
 * Remove a tag from a freet.
 * 
 * @name PUT /api/tags/remove
 * @return {string} A success message
 */
 router.put(
    '/',
    async (req: Request, res: Response) => {
      const tag = await TagCollection.removeTag(req.body.freetId, req.body.content);
  
      res.status(201).json({
        message: 'Your tag was removed successfully.',
      });
    }
  );

export {router as tagRouter};