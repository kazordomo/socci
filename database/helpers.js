const { ObjectId } = require('mongodb');
const { createHash } = require('crypto');

const createObjectId = name => {
    const hash = createHash('sha1')
      .update(name, 'utf8')
      .digest('hex');
  
    return new ObjectId(hash.substring(0, 24));
};

const modelify = (object, Model) => {
    return new Model(object);
}

module.exports = {
    createObjectId,
    modelify,
};
  