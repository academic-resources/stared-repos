/* ts_json/ts_json--1.0.sql */

-- complain if script is sourced in psql, rather than via CREATE EXTENSION
\echo Use "CREATE EXTENSION ts_json" to load this file. \quit

CREATE OR REPLACE FUNCTION json_values(json, text)
RETURNS text
AS 'MODULE_PATHNAME'
LANGUAGE C;

CREATE OR REPLACE FUNCTION jsonb_values(jsonb, text)
RETURNS text
AS 'MODULE_PATHNAME'
LANGUAGE C;
