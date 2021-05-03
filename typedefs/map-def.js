const { gql } = require('apollo-server');


const typeDefs = gql `
	type Map {
		id: String!
		name: String!
		regions: [Region]
	}
	type Region {
		id: String!
		name: String!
		capital: String!
		leader: String!
		landmarks:  [String]
	}
	extend type Query {
		getAllMaps: [Map]
		getMap(id: String!): Map 
	}
	extend type Mutation {
		addRegion(region: RegionInput!, id: String!): String
		addMap(map: MapInput!): Map
		deleteRegion(id: String!): Region		
		deleteMap(id: String!): Boolean
		updateMapName(id: String!, name: String!): String
		updateRegionField(id: String!, field: String!, value: String!, flag: Int!): Region
	}
	input MapInput {
		id: String
		name: String
		regions: [RegionInput]
	}
	input RegionInput {
		id: String
		name: String
		capital: String
		leader: String
		landmarks: [String ]
	}
`;

module.exports = { typeDefs: typeDefs }