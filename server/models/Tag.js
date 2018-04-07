const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TagsSchema = new Schema({
  tag: {type: String, unique: true},
  tagMentors: {type: [String]}          // email/username
})



class TagsClass {
  static publicFields() {
    return [
      'tag',
      'tagMentors'
    ];
  }


static async addMentorToTag(newTag, mentor) {

  console.log(`------>addMentorToTag function`);

  const isTag  = await this.findOne({tag: newTag});
  if(!isTag){
    this.create({tag: newTag});
    console.log(`------> new "${newTag}"  has been created`);
  }
  else {console.log("-----> tag exists already ");}

  const addmentor = await this.findOneAndUpdate(
        {tag: newTag},
        {$addToSet:{tagMentors: mentor}},
        {new: true});

  console.log(`------->${mentor} is added to the "${newTag}" tag`);
  return addmentor;
  };







}


TagsSchema.loadClass(TagsClass);

const Tags = mongoose.model('Tags', TagsSchema);

module.exports = Tags;
