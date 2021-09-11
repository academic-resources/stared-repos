const router = require('express').Router();
const { Op } = require('sequelize');

const { Thread, Post, User } = require('../db/models');
const { asyncHandler } = require('../utils');

router.get('/new/:mode/:page(\\d+)', asyncHandler(async (req, res, next) => {
  const { params: { mode, page }, query: { entry } } = req;
  if (!mode.match(/[(recent)(popular)(search)]/)) return next(new Error('No.'));
  if (mode === 'search') {
    try {
      const threadsByTitle = await Thread.findAll({
        where: {
          title: {
            [Op.like]: `%${entry}%`
          }
        },
        include: [
          User,
          {
            model: Post,
            where: { isQuestion: true },
            attributes: ['score', 'createdAt']
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      const postsByBody = await Post.findAll({
        where: {
          body: {
            [Op.like]: `%${entry}%`
          },
          isQuestion: true
        },
        include: [
          {
            model: Thread,
            include: [
              User,
              {
                model: Post,
                where: { isQuestion: true },
                attributes: ['score', 'createdAt']
              }
            ]
          }
        ],
        order: [['createdAt', 'DESC']]
      });
      let threads = [...threadsByTitle, ...postsByBody.map(({ Thread: PostThread }) => PostThread)];
      const filteredRepeatThreads = [];
      const filter = new Set();
      threads.forEach(thread => {
        if (!filter.has(thread.id)) filteredRepeatThreads.push(thread);
        filter.add(thread.id);
      });
      threads = await filteredRepeatThreads.asyncMap(async thread => ({
        ...thread.dataValues,
        numberOfAnswers: await thread.countPosts({
          where: { isQuestion: false }
        }),
        score: thread.Posts[0].score
      }));
      const pages = Math.ceil(threads.length / 10);
      if (page > pages) return next(new Error('No.'));
      const effectivePage = (page - 1) * 10;
      threads = threads.slice(effectivePage, effectivePage + 10);
      return res.json({ threads, pages });
    } catch (err) {
      console.error(err);
      console.error(err.toString());
    }
  } else {
    const count = await Thread.count();
    const pages = Math.ceil(count / 10);
    if (page > pages) return next(new Error('No.'));
    const sort = mode === 'popular' ? 'score' : 'createdAt';
    let threads = await Thread.findAll({
      include: [
        User,
        {
          model: Post,
          where: { isQuestion: true },
          attributes: ['score', 'createdAt']
        }
      ],
      order: [
        [Post, sort, 'DESC']
      ],
      limit: 10,
      offset: page * 10 - 10
    });
    threads = await threads.asyncMap(async thread => ({
      ...thread.dataValues,
      numberOfAnswers: await thread.countPosts({
        where: { isQuestion: false }
      }),
      score: thread.Posts[0].score
    }));
    return res.json({ threads, pages });
  }
}));

module.exports = router;
