const graphql = require('graphql');
//const _ = require('lodash')
const axios = require('axios')

const{
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLNonNull
}= graphql

const ProductType = new GraphQLObjectType({
    name:'Product',
    fields:{
        id: {type:GraphQLInt},
        name: {type:GraphQLString},
        rating: {type:GraphQLInt},
        category:  {type:GraphQLString},
        price: {type:GraphQLInt},
        delivery: {type:GraphQLString},
        image: {type:GraphQLString},
        details: {type:GraphQLString}
    }
})


const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        product:{
            type:ProductType,
            args:{id:{type:GraphQLInt}},
            resolve(parentValue, args){
                return axios.get(`http://localhost:8900/product/${args.id}`)
                            .then((res) => res.data)
            }
        }
    }
})


const mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addProduct:{
            type:ProductType,
            args:{
                id:{type: new GraphQLNonNull(GraphQLInt)},
                name: {type:GraphQLString},
                rating: {type:GraphQLInt},
                category:  {type:GraphQLString},
                price: {type:GraphQLInt},
                delivery: {type:GraphQLString},
                image: {type:GraphQLString},
                details: {type:GraphQLString}
            },
            resolve(parentValue,{id,name,rating}){
                return axios.post(`http://localhost:8900/product`,{id,name,rating})
                .then((res) => res.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: mutation
})
