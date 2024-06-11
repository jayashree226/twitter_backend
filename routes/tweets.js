import express from 'express';
import User from '../models/User.js'
import Tweet from '../models/Tweet.js';

const router = express.Router();

/**
 * POST /tweets/
 */
router.post("/", async (req, res) => {
    console.log(req.body);
    const { username, newTweet } = req.body;
  
    // check if user exists
    const dbUser = await User.findOne({ username });
  
    if (dbUser) {
      console.log(dbUser);
  
      const tweet = await Tweet.create({
        content: newTweet,
        user: dbUser._id,
        username: dbUser.username,
      });
      return res.json(tweet);
  
    } else {
      const newUser = await User.create({ username });
      console.log(newUser);
  
      const tweet = await Tweet.create({
        content: newTweet,
        user: newUser._id,
        username: newUser.username,
      });
      
      return res.json(tweet);
    }
  });

/**
 * GET /tweets/
 */
router.get("/", async (req, res) => {
  const tweets = await Tweet.find();
  res.send(tweets);
});


router.delete('/', async (req, res) => {
    res.send('deleting tweet....')
});

router.put('/', async (req, res) => {
    res.send('updating tweet....')
});




export default router;