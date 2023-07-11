// UserModel.find({}).sort("firstName lastName email createdAt updatedAt")


// // find all documents
// await MyModel.find({});

// // find all documents named john and at least 18
// await MyModel.find({ name: 'john', age: { $gte: 18 } }).exec();

// // executes, name LIKE john and only selecting the "name" and "friends" fields
// await MyModel.find({ name: /john/i }, 'name friends').exec();

// // passing options
// await MyModel.find({ name: /john/i }, null, { skip: 10 }).exec();

// {name: {$regex: search, $options:"i"}} //i means case sensitive


