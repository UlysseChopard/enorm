const fs = require("fs");
const Expert = require("../models/expert");

exports.create = (req, res, next) => {
    const expertObj = JSON.parse(req.body.expert);
    delete expertObj._id;
    const expert = new Expert({
        ...expertObj,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    });

    expert.save()
      .then(() => res.status(201).json({ message: `Expert ${expert.name} enregistrée` }))
      .catch(e => res.status(400).json({ error: e }));
};

exports.get = (req, res, next) => {
  Expert.findById(req.params.id)
    .exec()
    .then(expert => res.status(200).json(expert))
    .catch(e => res.satus(404).json({
        error: e
    }));
};

exports.getAll = (req, res, next) => {
  Expert.find()
    .exec()
    .then(experts => res.status(200).json(experts))
    .catch(e => res.status(400).json({ error: e }));
};

exports.modify = (req, res, next) => {
  const modifiedExpert = req.file ? {
    ...JSON.parse(req.body.expert),
    imageUrl:`${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  } : { ...req.body };

  const deletePreviousImage = (expert) => {
    const filename = expert.imageUrl.split("/images/")[1];

    fs.unlink(`/app/images/${filename}`, err => {
      if (err) throw err;
    });
  }
 
  Expert.findByIdAndUpdate(req.params.id, { ...modifiedExpert, _id: req.params.id }, (err, expert) => {
    if (err) return res.status(400).json({ error: err });
    if (req.file) deletePreviousImage(expert);
    res.status(200).json({ message: `expert ${expert.name} modifiée`});
  })
};

exports.del = (req, res, next) => {
  Expert.findById(req.params.id)
      .exec()
      .then(expert => {
          const filename = expert.imageUrl.split("/images/")[1];
          fs.unlink(`images/${filename}`, () => {
              Expert.findByIdAndDelete(req.params.id)
                .exec()
                .then(deletedExpert => res.status(200).json({ message: `expert ${deletedExpert.name} supprimée` }))
                .catch(e => res.status(400).json({ error: e }))
              });
            })
      .catch(e => res.status(500).json({ error: e }));
};

exports.recordLikes = (req, res, next) => {
  const expertId = req.params.id;
  const { userId, like } = req.body;

  const previousOpinion = (expert, user) => {
    if (expert.usersLiked.includes(user)) return 1;
    if (expert.usersDisliked.includes(user)) return -1;
    return 0;
  };

  const manageExpertLikesState = (expert, user, liked, modify) => {
    if (modify && liked === 1) {
      expert.dislikes--;
      expert.usersDisliked = expert.usersDisliked.filter(id => id !== user);
    } else if (modify && liked === -1) {
      expert.likes--;
      expert.usersLiked = expert.usersLiked.filter(id => id !== user);
    } else if (!liked && modify === 1) {
      expert.usersLiked = expert.usersLiked.filter(id => id !== user);
      expert.likes--;
      return expert;
    } else if (!liked && modify === -1) {
      expert.usersDisliked = expert.usersDisliked.filter(id => id !== user);
      expert.dislikes--;
      return expert;
    }

    if (liked === 1) {
      expert.likes++;
      expert.usersLiked.push(user);
      return expert;
    } else if (liked === -1) {
      expert.dislikes++;
      expert.usersDisliked.push(user);
      return expert;
    } else {
      return expert;
    }
  }


  const updateExpert = (expert, user, likeVal) => {
    const prevOpinion = previousOpinion(expert, user);
    
    if (prevOpinion === likeVal) return expert;

    return manageExpertLikesState(expert, user, likeVal, prevOpinion);
  };

  Expert.findById(expertId, (err, expert) => {
    if (err) return res.status(500).json({ error: err });

    const updatedExpert = updateExpert(expert, userId, like);

    updatedExpert.save()
      .then(newExpert => {
        if (newExpert !== updatedExpert) throw new Error("Problème à la sauvegarde de la modification des likes");
        res.status(200).json({ message: `expert ${newExpert.name} : likes modifiés` });
      })
      .catch(e => res.status(400).json({ error: e }))
  });
};