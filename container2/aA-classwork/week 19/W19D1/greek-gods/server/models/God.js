const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
const Schema = mongoose.Schema;

const GodSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  domains: [
    {
      type: String
    }
  ],
  abode: {
    type: Schema.Types.ObjectId,
    ref: 'abode'
  },
  emblems: [
    {
      type: Schema.Types.ObjectId,
      ref: 'emblem'
    }
  ],
  parents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'god'
    }
  ],
  children: [
    {
      type: Schema.Types.ObjectId,
      ref: 'god'
    }
  ],
  siblings: [
    {
      type: Schema.Types.ObjectId,
      ref: 'god'
    }
  ]
});

GodSchema.statics.findRelatives = function(godId, type) {
  return this.findById(godId)
    .populate(`${type}`)
    .then(god => god[type]);
};

GodSchema.statics.addRelative = (godId, relativeId, relationship) => {
  const God = mongoose.model('god');

  return God.find({
    _id: { $in: [godId, relativeId] }
  }).then(gods => {
    const god = godId === gods[0].id ? gods[0] : gods[1];
    const relative = relativeId === gods[0].id ? gods[0] : gods[1];

    switch (relationship) {
      case 'parent':
        god.parents.push(relative);
        relative.children.push(god);
        break;
      case 'child':
        god.children.push(relative);
        relative.parents.push(god);
        break;
      case 'sibling':
        god.siblings.push(relative);
        relative.siblings.push(god);
        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    );
  });
};

GodSchema.statics.removeRelative = (godId, relativeId, relationship) => {
  const God = mongoose.model('god');
  return God.find({ _id: { $in: [godId, relativeId] } }).then(gods => {
    const god = gods[0].id === godId ? gods[0] : gods[1];
    const relative = gods[0].id === relativeId ? gods[0] : gods[1];

    switch (relationship) {
      case 'parent':
        god.parents.pull(relative);
        relative.children.pull(god);
        break;
      case 'child':
        god.children.pull(relative);
        relative.parents.pull(god);
        break;
      case 'sibling':
        god.siblings.pull(relative);
        relative.siblings.pull(god);
        break;
    }

    return Promise.all([god.save(), relative.save()]).then(
      ([god, relative]) => god
    );
  });
};

GodSchema.statics.addEmblem = (godId, emblemId) => {
  const God = mongoose.model('god');
  const Emblem = mongoose.model('emblem');

  return God.findById(godId).then(god => {
    return Emblem.findById(emblemId).then(emblem => {
      god.emblems.push(emblem);
      emblem.gods.push(god);
      return Promise.all([god.save(), emblem.save()]).then(
        ([god, emblem]) => god
      );
    });
  });
};

GodSchema.statics.removeEmblem = (godId, emblemId) => {
  const God = mongoose.model('god');
  const Emblem = mongoose.model('emblem');

  return God.findById(godId).then(god => {
    return Emblem.findById(emblemId).then(emblem => {
      god.emblems.pull(emblem);
      emblem.gods.pull(god);
      return Promise.all([god.save(), emblem.save()]).then(
        ([god, emblem]) => god
      );
    });
  });
};

GodSchema.statics.updateAbode = (godId, abodeId) => {
  const God = mongoose.model('god');
  const Abode = mongoose.model('abode');

  return God.findById(godId).then(god => {
    if (god.abode) {
      Abode.findById(god.abode).then(abode => {
        abode.gods.pull(god);
        abode.save();
      });
    }
    return Abode.findById(abodeId).then(abode => {
      god.abode = abode;
      abode.gods.push(god);
      return Promise.all([god.save(), abode.save()]).then(
        ([god, abode]) => god
      );
    });
  });
};

GodSchema.statics.addDomain = (godId, domain) => {
  const God = mongoose.model('god');

  return God.findById(godId).then(god => {
    god.domains.push(domain);
    god.save().then(god => god);
  });
};

module.exports = mongoose.model('god', GodSchema);
