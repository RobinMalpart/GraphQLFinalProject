import { GraphQLError } from "graphql";
import { getClosestColor } from "./colors.js";
import { Resolvers, Speciality } from "./types.js";
import { createUser } from "./mutations/user/createUser.js";
import { signIn } from "./mutations/user/signIn.js";

const doctorsData = [
  {
    id: '1',
    name: 'Samia Mekame',
    speciality: Speciality.Ophtalmologist,
  },
  {
    id: '2',
    name: 'Catherine Bedoy',
    speciality: Speciality.Psychologist,
  },
  {
    id: '3',
    name: 'John Doe',
    speciality: Speciality.Ophtalmologist,
  },
];
export const resolvers: Resolvers = {
  Query: {
    doctors: (parent, args, context, info) => {
      const {specialities} = args
      return doctorsData.filter(doctor => (specialities ?? []).includes(doctor.speciality))
    },
    doctor: (parent, args, context, info) => {
      const id = args.id
      return doctorsData.find(d => d.id === id) ?? null
    },
    divide: (parent, args, context, info) => {
      const {number1, number2} = args
      if (number2 === 0) {
        throw new GraphQLError('cannot divide by 0')
      }
      return number1 / number2
    },
    multiply: (parent, args, context, info) => {
      const {number1, number2} = args
      return number1 * number2
    },
    closestColor: (parent, args, context, info) => {
      const {color} = args
      if (!(color.match(/^#[0-9a-fA-F]{6}/))) {
        throw new GraphQLError('color pattern does not match')
      }
      return getClosestColor(color, ["#FF5733", "#33FF57", "#3357FF"])
    },
    getTracks: (parent, args, context, info) => {
      return context.dataSources.trackApi.getTracks()
    },
    getFilms: (_, __, {dataSources}) => dataSources.ghibliApi.getFilms(),
    getPeople: (_, __, {dataSources}) => dataSources.ghibliApi.getPeople(),
  },
  Mutation: {
    incrementTrackViews: async (_, {id}, {dataSources}) => {
      try {
        const track = await dataSources.trackApi.incrementTrackView(id)
        return {
          code: 200,
          track,
          success: true,
          message: 'Number of views has been incremented'
        }
      } catch(e) {
        return {
          code: 304,
          message: 'Resource not modified',
          success: false,
          track: null,
        }
      }
    },
    incrementLikes:  async (_, {id}, {dataSources}) => {
      try {
        const track = await dataSources.trackApi.incrementLikes(id)
        return {
          code: 200,
          track,
          success: true,
          message: 'Number of likes has been incremented'
        }
      } catch(e) {
        return {
          code: 304,
          message: 'Resource not modified',
          success: false,
          track: null,
        }
      }
    },
    createUser,
    signIn,
  },

  Track: {
    author: ({authorId}, args, context, info) => {
      return context.dataSources.trackApi.getAuthorBy(authorId)
    }
  },
  Film: {
    people: ({people}, args, context, info) => {
      return context.dataSources.ghibliApi.getPeopleByUrls(people)
    }
  },
  People: {
    eyeColor: ({eye_color}) => eye_color,
    films: ({films}, _, {dataSources}) => {
      return dataSources.ghibliApi.getFilmsByUrls(films)
    }
  },
  Doctor: {
    addresses: (parent, args, context, info) => {
      return [{
        zipCode: `${parent.id}000`
      }]
    }
  }
 };
