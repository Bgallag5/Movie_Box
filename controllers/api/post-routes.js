const router = require('express').Router();
const { User, Post, Genre, Movie } = require('../../models');
const withAuth = require('../../utils/auth');


router.get('/', (req, res) => {
   
    Post.findAll({
        attributes: ["id", "title", "post_url", "user_id"],
        include: [
            {
                model: User,
                attributes: ["id", "username"]
            }
        ]
    })
        .then(dbCategoryData => res.json(dbCategoryData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'post_url',
        'user_id',
        
      ],
      include: [
        {
          model: User,
          attributes: ['id', 'username'],
          include: {
            model: Movie,
            attributes: ['id', 'title', 'genre_id']
          }
        },
      
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.post('/', withAuth, (req, res) => {
    
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.session.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  ///// still need 'put' to 'favorite/update' a movie  /////////////////////


  router.delete('/:id', withAuth, (req, res) => {
    console.log('id', req.params.id);
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  
  module.exports = router;

