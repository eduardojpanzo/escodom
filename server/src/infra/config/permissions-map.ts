export const PERMISSIONS = {
  CLASS_VIEW: "view_classes",
  CLASS_MANAGE: "manage_classes",
  LEVEL_VIEW: "view_levels",
  LEVEL_MANAGE: "manage_levels",
  TEACHER_VIEW: "view_teachers",
  TEACHER_MANAGE: "manage_teachers",
  STUDENT_VIEW: "view_students",
  STUDENT_MANAGE: "manage_students",
  USER_VIEW: "view_user",
  USER_MANAGE: "manage_user",
  SCHEDULE_VIEW: "view_schedules",
  SCHEDULE_MANAGE: "manage_schedules",
  MARK_STUDENTS_ATTENDANCE: "mark_students_attendance",
  MARK_TEACHERS_ATTENDANCE: "mark_teachers_attendance",
  MARK_TEACHERS_EVALUATIONS: "mark_teachers_evaluations",
  REPORTS_VIEW: "view_reports",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];
