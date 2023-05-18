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
    rating: Number!
}

type Notice {
    _id: ID!
    teacher: Teacher!
    students: [Student!]!
    createdAt: String!
    updatedAt: String!
    details: String!
    read: Boolean!
}

type Media {
    _id: ID!
    teacher: Teacher!
    student: Student!
    fileName: String!
    createdAt: String!
    updatedAt: String!
}

type ProfileInfo {
    _id: ID!
    student: Student!
    details: String!
    createdAt: String!
    updatedAt: String!
}

type VerificationCode {
    _id: ID!
    student: Student!
    code: String!
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
    teacherById(teacherId: ID!): Teacher!

    students: [Student!]!
    studentById(studentId: ID!): Student!
    studentByStudentNumber(studentNumber: String!): Student!

    classes: [Class!]!
    classById(classId: ID!): Class!
    classByTeacherId(teacherId: ID!): Class!

    logs(studentId: ID!): [Log!]!
    logByDate(studentId: ID!, date: String!): [Log!]!

    noticesForStudent(studentId: ID!): [Notice!]!
    noticesByTeacher(teacherId: ID!): [Notice!]!

    getS3UploadUrl(teacherId: ID!, studentId: ID!): String!
    getS3ViewUrl(fileName: String!): String!
    viewMedia(studentId: ID!): [Media!]!
    viewMediaByDate(studentId: ID!, date: String!):[Media!]!

    getProfileInfo(studentId: ID!): [ProfileInfo!]!

    getLatestProfileInfo(studentId: ID!): [ProfileInfo!]!

    verifyCode(studentId: ID!, code: String!): Boolean!
}


type RootMutation {
    createTeacher(teacherInput: TeacherInput!): Teacher!

    createStudent(studentInput: StudentInput!): Student!

    createClass(teacherId: ID!, details: String): Class!
    addStudentToClass(classId: ID!, studentId: ID!): Class!

    createLog(teacherId: ID!, studentId: ID!, details: String!, rating: Number!): Log!

    createNotice(teacherId: ID!, studentIds: [ID!]!, details: String!): Notice!

    markNoticeAsRead(noticeId: ID!): Notice!

    registerMedia(teacherId: ID!, studentId: ID!, fileName: String!): Media!
    
    addProfileInfo(studentId: ID!, details: String): ProfileInfo!

    sendSMSCode(studentId: ID!): VerificationCode!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
