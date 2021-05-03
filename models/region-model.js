const { model, Schema, ObjectId } = require('mongoose');

const regionSchema = new Schema(
	{
		id: {
			type: ObjectId,
			required: true
		},
		name: {
			type: String,
			required: true
		},
		capital: {
			type: String,
			required: true
		},
		leader: {
			type: String,
			required: true
		},
		landmarks: {
			type: [String],
			required: true
		}
	}
);

const Region = model('Region', itemSchema);
module.exports = Region;