const { model, Schema, ObjectId } = require('mongoose');
const Region = require('./region-model').schema;

const mapSchema = new Schema(
	{
		id: {
			type: ObjectId,
			required: true
		},

		name: {
			type: String,
			required: true
		},
		regions: [Region],
	},
	{ timestamps: true }
);

const Map = model('Map', mapSchema);
module.exports = Map;