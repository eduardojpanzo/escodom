-- CreateEnum
CREATE TYPE "ebd"."status" AS ENUM ('present', 'absent');

-- CreateEnum
CREATE TYPE "ebd"."baptized" AS ENUM ('yes', 'no');

-- CreateEnum
CREATE TYPE "ebd"."role" AS ENUM ('teacher', 'student');

-- CreateTable
CREATE TABLE "ebd"."attendances" (
    "attendance_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "teacher_id" UUID,
    "student_id" UUID,
    "class_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "ebd"."status" NOT NULL DEFAULT 'absent',

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "ebd"."classes" (
    "class_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "level_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "ebd"."levels" (
    "level_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "description" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("level_id")
);

-- CreateTable
CREATE TABLE "ebd"."people" (
    "person_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "bi" VARCHAR(100) NOT NULL,
    "birth_date" DATE NOT NULL,
    "baptized" "ebd"."baptized" NOT NULL DEFAULT 'no',
    "profession" VARCHAR(100),
    "phone" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "people_pkey" PRIMARY KEY ("person_id")
);

-- CreateTable
CREATE TABLE "ebd"."schedules" (
    "schedule_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "teacher_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "ebd"."students" (
    "student_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "access_key" VARCHAR(100) NOT NULL,
    "person_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "ebd"."teacher_evaluations" (
    "evaluation_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "teacher_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teacher_evaluations_pkey" PRIMARY KEY ("evaluation_id")
);

-- CreateTable
CREATE TABLE "ebd"."teachers" (
    "teacher_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "person_id" UUID NOT NULL,
    "user_id" UUID,
    "position" VARCHAR(100) NOT NULL,
    "training_year" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "ebd"."users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "person_id" UUID NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" "ebd"."role" NOT NULL DEFAULT 'teacher',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "idx_attendances_date_class_id" ON "ebd"."attendances"("date", "class_id");

-- CreateIndex
CREATE INDEX "idx_attendances_student_id" ON "ebd"."attendances"("student_id");

-- CreateIndex
CREATE INDEX "idx_attendances_teacher_id" ON "ebd"."attendances"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "classes_name_key" ON "ebd"."classes"("name");

-- CreateIndex
CREATE INDEX "idx_classes_level_id" ON "ebd"."classes"("level_id");

-- CreateIndex
CREATE UNIQUE INDEX "classes_level_id_name_key" ON "ebd"."classes"("level_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "levels_name_key" ON "ebd"."levels"("name");

-- CreateIndex
CREATE INDEX "idx_levels_name" ON "ebd"."levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "people_bi_key" ON "ebd"."people"("bi");

-- CreateIndex
CREATE INDEX "idx_people_person_id" ON "ebd"."people"("person_id");

-- CreateIndex
CREATE INDEX "idx_schedules_date_class_id" ON "ebd"."schedules"("date", "class_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_class_id_date_key" ON "ebd"."schedules"("class_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "idx_students_access_key" ON "ebd"."students"("access_key");

-- CreateIndex
CREATE UNIQUE INDEX "students_person_id_key" ON "ebd"."students"("person_id");

-- CreateIndex
CREATE INDEX "idx_students_class_id" ON "ebd"."students"("class_id");

-- CreateIndex
CREATE INDEX "idx_teacher_evaluations_teacher_id_date" ON "ebd"."teacher_evaluations"("teacher_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_person_id_key" ON "ebd"."teachers"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_user_id_key" ON "ebd"."teachers"("user_id");

-- CreateIndex
CREATE INDEX "idx_teachers_teacher_id" ON "ebd"."teachers"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_person_id_key" ON "ebd"."users"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "ebd"."users"("email");

-- CreateIndex
CREATE INDEX "idx_users_user_id" ON "ebd"."users"("user_id");

-- AddForeignKey
ALTER TABLE "ebd"."attendances" ADD CONSTRAINT "attendances_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ebd"."classes"("class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."attendances" ADD CONSTRAINT "attendances_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "ebd"."students"("student_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."attendances" ADD CONSTRAINT "attendances_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "ebd"."teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."classes" ADD CONSTRAINT "classes_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "ebd"."levels"("level_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."schedules" ADD CONSTRAINT "schedules_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ebd"."classes"("class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."schedules" ADD CONSTRAINT "schedules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "ebd"."teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "ebd"."classes"("class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."students" ADD CONSTRAINT "students_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."teacher_evaluations" ADD CONSTRAINT "teacher_evaluations_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "ebd"."teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."teachers" ADD CONSTRAINT "teachers_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ebd"."users" ADD CONSTRAINT "users_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "ebd"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
