import { Role, Gender, StudentStatus, LessonCategory, AssessmentType, TaskStatus, TaskPriority } from '@prisma/client';
import { faker } from '@faker-js/faker';
import Decimal from 'decimal.js';



export function fakeUser() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: undefined,
    image: undefined,
    password: undefined,
    gender: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeUserComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email(),
    emailVerified: undefined,
    image: undefined,
    password: undefined,
    role: Role.STUDENT,
    gender: undefined,
    status: StudentStatus.ACTIVE,
    isTwoFactorEnabled: false,
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeAccount() {
  return {
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
  };
}
export function fakeAccountComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
    type: faker.lorem.words(5),
    provider: faker.lorem.words(5),
    providerAccountId: faker.lorem.words(5),
    refresh_token: undefined,
    access_token: undefined,
    expires_at: undefined,
    token_type: undefined,
    scope: undefined,
    id_token: undefined,
    session_state: undefined,
  };
}
export function fakeVerificationToken() {
  return {
    email: faker.internet.email(),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeVerificationTokenComplete() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakePasswordResetToken() {
  return {
    email: faker.internet.email(),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakePasswordResetTokenComplete() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeTwoFactorToken() {
  return {
    email: faker.internet.email(),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeTwoFactorTokenComplete() {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    token: faker.lorem.words(5),
    expires: faker.date.anytime(),
  };
}
export function fakeTwoFactorConfirmationComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
  };
}
export function fakeTeacherComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
  };
}
export function fakeStudentComplete() {
  return {
    id: faker.string.uuid(),
    userId: faker.string.uuid(),
  };
}
export function fakeEvent() {
  return {
    title: faker.lorem.words(5),
    description: undefined,
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    location: undefined,
    updatedAt: faker.date.anytime(),
  };
}
export function fakeEventComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: undefined,
    startDate: faker.date.anytime(),
    endDate: faker.date.anytime(),
    location: undefined,
    calendarId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCalendar() {
  return {
    name: faker.person.fullName(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCalendarComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    studentId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeClassroom() {
  return {
    name: faker.person.fullName(),
    capacity: faker.number.int(),
  };
}
export function fakeClassroomComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    capacity: faker.number.int(),
  };
}
export function fakeEnrollmentComplete() {
  return {
    id: faker.string.uuid(),
    studentId: faker.string.uuid(),
    courseId: faker.string.uuid(),
    enrolledAt: new Date(),
  };
}
export function fakeSchedule() {
  return {
    dayOfWeek: faker.number.int(),
    startTime: faker.date.anytime(),
    endTime: faker.date.anytime(),
  };
}
export function fakeScheduleComplete() {
  return {
    id: faker.string.uuid(),
    moduleId: faker.string.uuid(),
    classroomId: faker.string.uuid(),
    dayOfWeek: faker.number.int(),
    startTime: faker.date.anytime(),
    endTime: faker.date.anytime(),
  };
}
export function fakeTask() {
  return {
    title: faker.lorem.words(5),
    description: undefined,
    dueDate: faker.date.anytime(),
    taskableType: faker.lorem.words(5),
    taskableId: faker.lorem.words(5),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeTaskComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: undefined,
    dueDate: faker.date.anytime(),
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    studentId: faker.string.uuid(),
    taskableType: faker.lorem.words(5),
    taskableId: faker.lorem.words(5),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeAssignment() {
  return {
    title: faker.lorem.words(5),
    description: undefined,
    deadline: faker.date.anytime(),
    fileUrl: undefined,
  };
}
export function fakeAssignmentComplete() {
  return {
    id: faker.string.uuid(),
    moduleId: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: undefined,
    deadline: faker.date.anytime(),
    fileUrl: undefined,
  };
}
export function fakeAssignmentSubmission() {
  return {
    fileUrl: faker.lorem.words(5),
    grade: undefined,
  };
}
export function fakeAssignmentSubmissionComplete() {
  return {
    id: faker.string.uuid(),
    assignmentId: faker.string.uuid(),
    studentId: faker.string.uuid(),
    fileUrl: faker.lorem.words(5),
    submittedAt: new Date(),
    grade: undefined,
  };
}
export function fakeCourse() {
  return {
    title: faker.lorem.words(5),
    description: undefined,
    category: faker.helpers.arrayElement([LessonCategory.LANGUAGES, LessonCategory.ART, LessonCategory.SCIENCE, LessonCategory.SOCIAL_SCIENCES] as const),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeCourseComplete() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(5),
    description: undefined,
    teacherId: faker.string.uuid(),
    category: faker.helpers.arrayElement([LessonCategory.LANGUAGES, LessonCategory.ART, LessonCategory.SCIENCE, LessonCategory.SOCIAL_SCIENCES] as const),
    createdAt: new Date(),
    updatedAt: faker.date.anytime(),
  };
}
export function fakeModule() {
  return {
    name: faker.person.fullName(),
    category: faker.helpers.arrayElement([LessonCategory.LANGUAGES, LessonCategory.ART, LessonCategory.SCIENCE, LessonCategory.SOCIAL_SCIENCES] as const),
  };
}
export function fakeModuleComplete() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    teacherId: faker.string.uuid(),
    category: faker.helpers.arrayElement([LessonCategory.LANGUAGES, LessonCategory.ART, LessonCategory.SCIENCE, LessonCategory.SOCIAL_SCIENCES] as const),
  };
}
export function fakeContentPage() {
  return {
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    videoUrl: undefined,
    order: faker.number.int(),
  };
}
export function fakeContentPageComplete() {
  return {
    id: faker.string.uuid(),
    moduleId: faker.string.uuid(),
    title: faker.lorem.words(5),
    content: faker.lorem.words(5),
    videoUrl: undefined,
    order: faker.number.int(),
  };
}
export function fakeQuiz() {
  return {
    title: faker.lorem.words(5),
  };
}
export function fakeQuizComplete() {
  return {
    id: faker.string.uuid(),
    moduleId: faker.string.uuid(),
    title: faker.lorem.words(5),
  };
}
export function fakeQuestion() {
  return {
    text: faker.lorem.words(5),
    options: faker.lorem.words(5).split(' '),
    answer: faker.lorem.words(5),
  };
}
export function fakeQuestionComplete() {
  return {
    id: faker.string.uuid(),
    quizId: faker.string.uuid(),
    text: faker.lorem.words(5),
    options: faker.lorem.words(5).split(' '),
    answer: faker.lorem.words(5),
  };
}
export function fakeQuizAttempt() {
  return {
    score: faker.number.int(),
    endedAt: undefined,
  };
}
export function fakeQuizAttemptComplete() {
  return {
    id: faker.string.uuid(),
    quizId: faker.string.uuid(),
    studentId: faker.string.uuid(),
    score: faker.number.int(),
    startedAt: new Date(),
    endedAt: undefined,
  };
}
export function fakeAssessment() {
  return {
    type: faker.helpers.arrayElement([AssessmentType.HOLIDAY_ASSIGNMENT, AssessmentType.FIRST_TEST, AssessmentType.SECOND_TEST, AssessmentType.EXAMINATION, AssessmentType.MOCK] as const),
    title: faker.lorem.words(5),
    dueDate: faker.date.anytime(),
    maxScore: faker.number.int(),
  };
}
export function fakeAssessmentComplete() {
  return {
    id: faker.string.uuid(),
    moduleId: faker.string.uuid(),
    type: faker.helpers.arrayElement([AssessmentType.HOLIDAY_ASSIGNMENT, AssessmentType.FIRST_TEST, AssessmentType.SECOND_TEST, AssessmentType.EXAMINATION, AssessmentType.MOCK] as const),
    title: faker.lorem.words(5),
    dueDate: faker.date.anytime(),
    maxScore: faker.number.int(),
  };
}
export function fakeAssessmentResult() {
  return {
    score: faker.number.float(),
  };
}
export function fakeAssessmentResultComplete() {
  return {
    id: faker.string.uuid(),
    assessmentId: faker.string.uuid(),
    studentId: faker.string.uuid(),
    score: faker.number.float(),
    submittedAt: new Date(),
  };
}
