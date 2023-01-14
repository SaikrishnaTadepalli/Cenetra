const { buildSchema } = require("graphql");

module.exports = buildSchema(`
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
}

type RootMutation {
    createTeacher(teacherInput: TeacherInput!): Teacher!

    createStudent(studentInput: StudentInput!): Student!

    createClass(teacherId: ID!, details: String): Class!
    addStudentToClass(classId: ID!, studentId: ID!): Class!

    createLog(teacherId: ID!, studentId: ID!, details: String!): Log!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
