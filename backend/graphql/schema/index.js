const { buildSchema } = require("graphql");
const { GraphQLUpload } = require("graphql-upload");

module.exports = buildSchema(`
scalar Upload

type Teacher {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
}

type Student {
    _id: ID!
    studentNumber: String!
    firstName: String!
    lastName: String!
    primaryContactNumber: String!
}

type Class {
    _id: ID!
    teacher: Teacher!
    students: [Student!]!
    details: String
}

type Log {
    _id: ID!
    teacher: Teacher!
    student: Student!
    createdAt: String!
    updatedAt: String!
    details: String!
}

type Notice {
    _id: ID!
    teacher: Teacher!
    students: [Student!]!
    createdAt: String!
    updatedAt: String!
    details: String!
}

type Media {
    _id: ID!
    teacher: Teacher!
    student: Student!
    fileName: String!
    createdAt: String!
    updatedAt: String!
}

input TeacherInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String!
}

input StudentInput {
    studentNumber: String!
    firstName: String!
    lastName: String!
    primaryContactNumber: String!
}

type RootQuery {
    teachers: [Teacher!]!
    students: [Student!]!
    classes: [Class!]!
    logs(studentId: ID!): [Log!]!
    notices(studentId: ID!): [Notice!]!
    getS3UploadUrl(teacherId: ID!, studentId: ID!): String!
    getS3ViewUrl(fileName: String!): String!
    viewMedia(studentId: ID!): [Media!]!
}

type RootMutation {
    createTeacher(teacherInput: TeacherInput!): Teacher!

    createStudent(studentInput: StudentInput!): Student!

    createClass(teacherId: ID!, details: String): Class!
    addStudentToClass(classId: ID!, studentId: ID!): Class!

    createLog(teacherId: ID!, studentId: ID!, details: String!): Log!

    createNotice(teacherId: ID!, studentIds: [ID!]!, details: String!): Notice!
    
    registerMedia(teacherId: ID!, studentId: ID!, fileName: String!): Media!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
