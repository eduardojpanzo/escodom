--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: ebd; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA ebd;


ALTER SCHEMA ebd OWNER TO postgres;

--
-- Name: role; Type: TYPE; Schema: ebd; Owner: postgres
--

CREATE TYPE ebd.role AS ENUM (
    'teacher',
    'student'
);


ALTER TYPE ebd.role OWNER TO postgres;

--
-- Name: status; Type: TYPE; Schema: ebd; Owner: postgres
--

CREATE TYPE ebd.status AS ENUM (
    'present',
    'absent'
);


ALTER TYPE ebd.status OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE ebd._prisma_migrations OWNER TO postgres;

--
-- Name: attendances; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.attendances (
    attendance_id uuid DEFAULT gen_random_uuid() NOT NULL,
    teacher_id uuid,
    student_id uuid,
    class_id uuid NOT NULL,
    date date NOT NULL,
    status ebd.status DEFAULT 'absent'::ebd.status NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE ebd.attendances OWNER TO postgres;

--
-- Name: classes; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.classes (
    class_id uuid DEFAULT gen_random_uuid() NOT NULL,
    level_id uuid NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text
);


ALTER TABLE ebd.classes OWNER TO postgres;

--
-- Name: levels; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.levels (
    level_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(50) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    description text
);


ALTER TABLE ebd.levels OWNER TO postgres;

--
-- Name: people; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.people (
    person_id uuid DEFAULT gen_random_uuid() NOT NULL,
    name character varying(100) NOT NULL,
    bi character varying(100) NOT NULL,
    phone character varying(20),
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE ebd.people OWNER TO postgres;

--
-- Name: schedules; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.schedules (
    schedule_id uuid DEFAULT gen_random_uuid() NOT NULL,
    teacher_id uuid NOT NULL,
    class_id uuid NOT NULL,
    date date NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE ebd.schedules OWNER TO postgres;

--
-- Name: students; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.students (
    student_id uuid DEFAULT gen_random_uuid() NOT NULL,
    access_key character varying(100) NOT NULL,
    person_id uuid NOT NULL,
    birth_date date NOT NULL,
    class_id uuid NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE ebd.students OWNER TO postgres;

--
-- Name: teacher_evaluations; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.teacher_evaluations (
    evaluation_id uuid DEFAULT gen_random_uuid() NOT NULL,
    teacher_id uuid NOT NULL,
    date date NOT NULL,
    score integer NOT NULL,
    comment text,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE ebd.teacher_evaluations OWNER TO postgres;

--
-- Name: teachers; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.teachers (
    teacher_id uuid DEFAULT gen_random_uuid() NOT NULL,
    person_id uuid NOT NULL,
    user_id uuid,
    "position" character varying(100) NOT NULL,
    training_year date NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE ebd.teachers OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: ebd; Owner: postgres
--

CREATE TABLE ebd.users (
    user_id uuid DEFAULT gen_random_uuid() NOT NULL,
    email character varying(255) NOT NULL,
    password_hash character varying(255) NOT NULL,
    created_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp(6) with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    role ebd.role DEFAULT 'teacher'::ebd.role NOT NULL,
    person_id uuid NOT NULL
);


ALTER TABLE ebd.users OWNER TO postgres;

--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
9515089f-4dd1-4fd7-9255-06973284e727	a68b99303ff4e0207989196454b563f6907b498d586b7ffb072302db826958cf	2025-08-27 11:55:54.2791+00	0_init	\N	\N	2025-08-27 11:55:54.234081+00	1
782705b5-f8d7-4bff-847e-8e40b9f22c1d	710191e482bab3b3ad308a958b4d9a948522e6c19941737416de6c672b0e9c76	2025-08-27 11:56:36.080258+00	20250827115635_enum_role_and_status	\N	\N	2025-08-27 11:56:36.016602+00	1
6a741ca5-b3cf-461d-9fb9-9040080ee9ed	28cc1045a31f5633373cd7049928b9935cd914e48faf614291f814e349a9c3dd	2025-08-27 11:58:49.3957+00	20250827115849_enum_role_and_status_up	\N	\N	2025-08-27 11:58:49.37133+00	1
2e78c2f5-a1e7-41fe-b5b7-aa97b38a4327	9a9f39a2780876bc976a5f117e9fb394884dcad7a0eb29f27052e36d252bc568	2025-08-30 13:53:06.072252+00	20250830135306_relation_user_person_add	\N	\N	2025-08-30 13:53:06.03681+00	1
37e5bac2-d991-4e25-9740-aad087733f54	8b0231ad1b0eb51c6b340d01db7fe59219e576b761ac0f9fee178e4f2c168f9e	2025-08-30 16:25:12.642149+00	20250830162512_nama_unique_class_level	\N	\N	2025-08-30 16:25:12.613573+00	1
9b4a4aac-2b08-48a0-b493-2b029e0e8e21	e54977bb93fd8e134256ff63489dec5517e60f4ebc7657bd24b612293f39c31a	2025-08-30 16:40:29.041203+00	20250830164029_add_description_level_classes	\N	\N	2025-08-30 16:40:29.019811+00	1
\.


--
-- Data for Name: attendances; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.attendances (attendance_id, teacher_id, student_id, class_id, date, status, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: classes; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.classes (class_id, level_id, name, created_at, updated_at, description) FROM stdin;
\.


--
-- Data for Name: levels; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.levels (level_id, name, created_at, updated_at, description) FROM stdin;
\.


--
-- Data for Name: people; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.people (person_id, name, bi, phone, created_at, updated_at) FROM stdin;
2132dec9-5514-4567-8347-941e565dd13e	Eduardo Martins	00348374LA043	934298870	2025-09-04 15:24:39.944+00	2025-09-04 15:24:39.944+00
\.


--
-- Data for Name: schedules; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.schedules (schedule_id, teacher_id, class_id, date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: students; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.students (student_id, access_key, person_id, birth_date, class_id, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: teacher_evaluations; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.teacher_evaluations (evaluation_id, teacher_id, date, score, comment, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: teachers; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.teachers (teacher_id, person_id, user_id, "position", training_year, created_at, updated_at) FROM stdin;
5b08ef19-dfac-4b2f-9166-09eed6f0aae8	2132dec9-5514-4567-8347-941e565dd13e	\N	apenas monitor	2019-12-12	2025-09-04 15:24:39.961+00	2025-09-04 15:24:39.961+00
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: ebd; Owner: postgres
--

COPY ebd.users (user_id, email, password_hash, created_at, updated_at, role, person_id) FROM stdin;
80f846ce-e494-407e-aeba-376dd2c9042d	eduardo@escodom.com	$2b$10$WZmCzrmZEDqlDEx2g0DZJepgOybW9ftr/n7HYF.DPasPasxBcB3Ca	2025-09-04 15:28:11.905+00	2025-09-04 15:28:11.905+00	teacher	2132dec9-5514-4567-8347-941e565dd13e
\.


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: attendances attendances_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.attendances
    ADD CONSTRAINT attendances_pkey PRIMARY KEY (attendance_id);


--
-- Name: classes classes_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.classes
    ADD CONSTRAINT classes_pkey PRIMARY KEY (class_id);


--
-- Name: levels levels_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.levels
    ADD CONSTRAINT levels_pkey PRIMARY KEY (level_id);


--
-- Name: people people_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (person_id);


--
-- Name: schedules schedules_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.schedules
    ADD CONSTRAINT schedules_pkey PRIMARY KEY (schedule_id);


--
-- Name: students students_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.students
    ADD CONSTRAINT students_pkey PRIMARY KEY (student_id);


--
-- Name: teacher_evaluations teacher_evaluations_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.teacher_evaluations
    ADD CONSTRAINT teacher_evaluations_pkey PRIMARY KEY (evaluation_id);


--
-- Name: teachers teachers_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.teachers
    ADD CONSTRAINT teachers_pkey PRIMARY KEY (teacher_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: classes_level_id_name_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX classes_level_id_name_key ON ebd.classes USING btree (level_id, name);


--
-- Name: classes_name_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX classes_name_key ON ebd.classes USING btree (name);


--
-- Name: idx_attendances_date_class_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_attendances_date_class_id ON ebd.attendances USING btree (date, class_id);


--
-- Name: idx_attendances_student_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_attendances_student_id ON ebd.attendances USING btree (student_id);


--
-- Name: idx_attendances_teacher_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_attendances_teacher_id ON ebd.attendances USING btree (teacher_id);


--
-- Name: idx_classes_level_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_classes_level_id ON ebd.classes USING btree (level_id);


--
-- Name: idx_levels_name; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_levels_name ON ebd.levels USING btree (name);


--
-- Name: idx_people_person_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_people_person_id ON ebd.people USING btree (person_id);


--
-- Name: idx_schedules_date_class_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_schedules_date_class_id ON ebd.schedules USING btree (date, class_id);


--
-- Name: idx_students_access_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX idx_students_access_key ON ebd.students USING btree (access_key);


--
-- Name: idx_students_class_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_students_class_id ON ebd.students USING btree (class_id);


--
-- Name: idx_teacher_evaluations_teacher_id_date; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_teacher_evaluations_teacher_id_date ON ebd.teacher_evaluations USING btree (teacher_id, date);


--
-- Name: idx_teachers_teacher_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_teachers_teacher_id ON ebd.teachers USING btree (teacher_id);


--
-- Name: idx_users_user_id; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE INDEX idx_users_user_id ON ebd.users USING btree (user_id);


--
-- Name: levels_name_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX levels_name_key ON ebd.levels USING btree (name);


--
-- Name: people_bi_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX people_bi_key ON ebd.people USING btree (bi);


--
-- Name: schedules_class_id_date_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX schedules_class_id_date_key ON ebd.schedules USING btree (class_id, date);


--
-- Name: students_person_id_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX students_person_id_key ON ebd.students USING btree (person_id);


--
-- Name: teachers_person_id_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX teachers_person_id_key ON ebd.teachers USING btree (person_id);


--
-- Name: teachers_user_id_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX teachers_user_id_key ON ebd.teachers USING btree (user_id);


--
-- Name: users_email_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX users_email_key ON ebd.users USING btree (email);


--
-- Name: users_person_id_key; Type: INDEX; Schema: ebd; Owner: postgres
--

CREATE UNIQUE INDEX users_person_id_key ON ebd.users USING btree (person_id);


--
-- Name: attendances attendances_class_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.attendances
    ADD CONSTRAINT attendances_class_id_fkey FOREIGN KEY (class_id) REFERENCES ebd.classes(class_id);


--
-- Name: attendances attendances_student_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.attendances
    ADD CONSTRAINT attendances_student_id_fkey FOREIGN KEY (student_id) REFERENCES ebd.students(student_id);


--
-- Name: attendances attendances_teacher_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.attendances
    ADD CONSTRAINT attendances_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES ebd.teachers(teacher_id);


--
-- Name: classes classes_level_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.classes
    ADD CONSTRAINT classes_level_id_fkey FOREIGN KEY (level_id) REFERENCES ebd.levels(level_id);


--
-- Name: schedules schedules_class_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.schedules
    ADD CONSTRAINT schedules_class_id_fkey FOREIGN KEY (class_id) REFERENCES ebd.classes(class_id);


--
-- Name: schedules schedules_teacher_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.schedules
    ADD CONSTRAINT schedules_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES ebd.teachers(teacher_id);


--
-- Name: students students_class_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.students
    ADD CONSTRAINT students_class_id_fkey FOREIGN KEY (class_id) REFERENCES ebd.classes(class_id);


--
-- Name: students students_person_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.students
    ADD CONSTRAINT students_person_id_fkey FOREIGN KEY (person_id) REFERENCES ebd.people(person_id);


--
-- Name: teacher_evaluations teacher_evaluations_teacher_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.teacher_evaluations
    ADD CONSTRAINT teacher_evaluations_teacher_id_fkey FOREIGN KEY (teacher_id) REFERENCES ebd.teachers(teacher_id);


--
-- Name: teachers teachers_person_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.teachers
    ADD CONSTRAINT teachers_person_id_fkey FOREIGN KEY (person_id) REFERENCES ebd.people(person_id);


--
-- Name: users users_person_id_fkey; Type: FK CONSTRAINT; Schema: ebd; Owner: postgres
--

ALTER TABLE ONLY ebd.users
    ADD CONSTRAINT users_person_id_fkey FOREIGN KEY (person_id) REFERENCES ebd.people(person_id);


--
-- PostgreSQL database dump complete
--

