CREATE DATABASE user-auth;

USE user-auth;

CREATE TABLE Client (
    name character varying(25) NOT NULL,
    address character varying(50) DEFAULT ''::character varying NOT NULL,
    password character varying(60) NOT NULL,
    email character varying(50) NOT NULL
);

CREATE TABLE Session (
    sid character varying(60) NOT NULL,
    sessdata json NOT NULL
);

ALTER TABLE ONLY Client
    ADD CONSTRAINT client_pkey PRIMARY KEY (email);

ALTER TABLE ONLY Session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);
