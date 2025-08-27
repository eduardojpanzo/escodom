-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "public"."attendances" (
    "attendance_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "teacher_id" UUID,
    "student_id" UUID,
    "class_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "status" VARCHAR(10) NOT NULL DEFAULT 'absent',

    CONSTRAINT "attendances_pkey" PRIMARY KEY ("attendance_id")
);

-- CreateTable
CREATE TABLE "public"."classes" (
    "class_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "level_id" UUID NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classes_pkey" PRIMARY KEY ("class_id")
);

-- CreateTable
CREATE TABLE "public"."levels" (
    "level_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "levels_pkey" PRIMARY KEY ("level_id")
);

-- CreateTable
CREATE TABLE "public"."people" (
    "person_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(100) NOT NULL,
    "bi" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(20),
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "people_pkey" PRIMARY KEY ("person_id")
);

-- CreateTable
CREATE TABLE "public"."schedules" (
    "schedule_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "teacher_id" UUID NOT NULL,
    "class_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schedules_pkey" PRIMARY KEY ("schedule_id")
);

-- CreateTable
CREATE TABLE "public"."students" (
    "student_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "access_key" VARCHAR(100) NOT NULL,
    "person_id" UUID NOT NULL,
    "user_id" UUID,
    "birth_date" DATE NOT NULL,
    "class_id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("student_id")
);

-- CreateTable
CREATE TABLE "public"."teacher_evaluations" (
    "evaluation_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "teacher_id" UUID NOT NULL,
    "date" DATE NOT NULL,
    "score" INTEGER NOT NULL,
    "comment" TEXT,

    CONSTRAINT "teacher_evaluations_pkey" PRIMARY KEY ("evaluation_id")
);

-- CreateTable
CREATE TABLE "public"."teachers" (
    "teacher_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "person_id" UUID NOT NULL,
    "user_id" UUID,
    "position" VARCHAR(100) NOT NULL,
    "training_year" DATE NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacher_id")
);

-- CreateTable
CREATE TABLE "public"."users" (
    "user_id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" VARCHAR(255) NOT NULL,
    "password_hash" VARCHAR(255) NOT NULL,
    "role" VARCHAR(10) NOT NULL DEFAULT 'teacher',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateIndex
CREATE INDEX "idx_attendances_date_class_id" ON "public"."attendances"("date", "class_id");

-- CreateIndex
CREATE INDEX "idx_attendances_student_id" ON "public"."attendances"("student_id");

-- CreateIndex
CREATE INDEX "idx_attendances_teacher_id" ON "public"."attendances"("teacher_id");

-- CreateIndex
CREATE INDEX "idx_classes_level_id" ON "public"."classes"("level_id");

-- CreateIndex
CREATE UNIQUE INDEX "classes_level_id_name_key" ON "public"."classes"("level_id", "name");

-- CreateIndex
CREATE INDEX "idx_levels_name" ON "public"."levels"("name");

-- CreateIndex
CREATE UNIQUE INDEX "people_bi_key" ON "public"."people"("bi");

-- CreateIndex
CREATE INDEX "idx_people_person_id" ON "public"."people"("person_id");

-- CreateIndex
CREATE INDEX "idx_schedules_date_class_id" ON "public"."schedules"("date", "class_id");

-- CreateIndex
CREATE UNIQUE INDEX "schedules_class_id_date_key" ON "public"."schedules"("class_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "idx_students_access_key" ON "public"."students"("access_key");

-- CreateIndex
CREATE UNIQUE INDEX "students_person_id_key" ON "public"."students"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "students_user_id_key" ON "public"."students"("user_id");

-- CreateIndex
CREATE INDEX "idx_students_class_id" ON "public"."students"("class_id");

-- CreateIndex
CREATE INDEX "idx_teacher_evaluations_teacher_id_date" ON "public"."teacher_evaluations"("teacher_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_person_id_key" ON "public"."teachers"("person_id");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_user_id_key" ON "public"."teachers"("user_id");

-- CreateIndex
CREATE INDEX "idx_teachers_teacher_id" ON "public"."teachers"("teacher_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE INDEX "idx_users_user_id" ON "public"."users"("user_id");

-- AddForeignKey
ALTER TABLE "public"."attendances" ADD CONSTRAINT "attendances_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."attendances" ADD CONSTRAINT "attendances_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "public"."students"("student_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."attendances" ADD CONSTRAINT "attendances_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."classes" ADD CONSTRAINT "classes_level_id_fkey" FOREIGN KEY ("level_id") REFERENCES "public"."levels"("level_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."schedules" ADD CONSTRAINT "schedules_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."schedules" ADD CONSTRAINT "schedules_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_class_id_fkey" FOREIGN KEY ("class_id") REFERENCES "public"."classes"("class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."students" ADD CONSTRAINT "students_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."teacher_evaluations" ADD CONSTRAINT "teacher_evaluations_teacher_id_fkey" FOREIGN KEY ("teacher_id") REFERENCES "public"."teachers"("teacher_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."teachers" ADD CONSTRAINT "teachers_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "public"."people"("person_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."teachers" ADD CONSTRAINT "teachers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

