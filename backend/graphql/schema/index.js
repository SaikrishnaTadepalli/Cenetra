const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type Teacher {
    _id: ID!
    teacherNumber: String!
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

type Admin {
    _id: ID!
    adminNumber: String!
    firstName: String!
    lastName: String!
    phoneNumber: String!
    permissionLevel: Int!
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
    rating: Int!
}

type Notice {
    _id: ID!
    teacher: Teacher!
    students: [Student!]!
    createdAt: String!
    updatedAt: String!
    details: String!
    noticeType: String!
    read: Boolean
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
    approverName: String
}

union User = Student | Teacher | Admin

type VerificationCode {
    _id: ID!
    userId: ID!
    userType: String!
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
    firstName: String!
    lastName: String!
    primaryContactNumber: String!
}

input AdminInput {
    firstName: String!
    lastName: String!
    phoneNumber: String!
    permissionLevel: Int!
}

type RootQuery {
    teachers: [Teacher!]!
    teacherById(teacherId: ID!): Teacher!
    teacherByTeacherNumber(teacherNumber: String!): Teacher!

    students: [Student!]!
    studentById(studentId: ID!): Student!
    studentByStudentNumber(studentNumber: String!): Student!

    admins: [Admin!]!
    adminById(adminId: ID!): Admin!
    adminByAdminNumber(adminNumber: String!): Admin!

    classes: [Class!]!
    classById(classId: ID!): Class!
    classByTeacherId(teacherId: ID!): Class!

    logs(studentId: ID!): [Log!]!
    logByDate(studentId: ID!, date: String!): [Log!]!

    noticesForStudent(studentId: ID!): [[Notice!]!]!
    noticesByTeacher(teacherId: ID!): [[Notice!]!]!

    getS3UploadUrl(teacherId: ID!, studentId: ID!): String!
    getS3ViewUrl(fileName: String!): String!
    viewMedia(studentId: ID!): [Media!]!
    getS3ViewURLs(studentId: ID!): [String!]!
    viewMediaByDate(studentId: ID!, date: String!):[Media!]!
    getS3ViewURLByDate(studentId: ID!, date: String!): [String!]!

    getProfileInfo(studentId: ID!): [ProfileInfo!]!
    getLatestProfileInfo(studentId: ID!): ProfileInfo!
    getPendingProfileInfo(studentId: ID!): ProfileInfo
    getAllMatchedPendingProfileInfos: [[ProfileInfo]!]!

    verifyCode(userId: ID!, code: String!): Boolean!
}

type RootMutation {
    createTeacher(teacherInput: TeacherInput!): Teacher!

    createStudent(studentInput: StudentInput!): Student!

    createAdmin(adminInput: AdminInput!): Admin!

    createClass(teacherId: ID!, details: String, className: String!): Class!
    addStudentToClass(classId: ID!, studentId: ID!): Class!

    createLog(teacherId: ID!, studentId: ID!, details: String!, rating: Int!): Log!
    editLog(logId: ID!, details: String!, rating: Int!, editorName: String!): Log!

    createNotice(teacherId: ID!, studentIds: [ID!]!, details: String!, noticeType: String!): Notice!
    editNotice(noticeId: ID!, studentIds: [ID!]!, details: String!, noticeType: String!, editorName: String!): Notice!
    deleteNotice(teacherId: ID!, noticeId: ID!): Notice!
    markNoticeAsRead(studentId: ID!, noticeId: ID!): Notice!

    registerMedia(teacherId: ID!, studentId: ID!, fileName: String!): Media!
    
    addProfileInfo(studentId: ID!, details: String): ProfileInfo!
    editProfileInfo(studentId: ID!, details: String): ProfileInfo!
    approveProfileInfo(profileId: ID!, adminId: ID!): ProfileInfo!

    sendSMSCode(userNumber: String!): VerificationCode!
    sendSMSCodeStudent(studentId: ID!): VerificationCode!
    sendSMSCodeTeacher(teacherId: ID!): VerificationCode!
    sendSMSCodeAdmin(adminId: ID!): VerificationCode!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
