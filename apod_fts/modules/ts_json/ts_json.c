/*-------------------------------------------------------------------------
*
* ts_json.c
*		Functions to full text search with json[b]
*
* Copyright (c) 2015-2017, Postgres Professional
*
*-------------------------------------------------------------------------
*/

#include "postgres.h"
#include "fmgr.h"

#include "utils/builtins.h"
#include "utils/jsonapi.h"
#include "utils/jsonb.h"
#include "utils/numeric.h"

PG_MODULE_MAGIC;

PG_FUNCTION_INFO_V1(json_values);
PG_FUNCTION_INFO_V1(jsonb_values);

/* Used in json_values to parse json values */
typedef struct JsonValuesState
{
	text	   *res;
	int			length;
	int			allocated;

	char	   *delim;
	int			delim_length;
} JsonValuesState;

static void append_jsonb_value(JsonValuesState *state,
							   const char *str, int len);
static void json_values_scalar(void *pstate, char *token,
							   JsonTokenType tokentype);

/*
 * Extract all values from json.
 */
Datum
json_values(PG_FUNCTION_ARGS)
{
	text	   *json;
	text	   *delim;
	JsonLexContext *lex;
	JsonValuesState state;
	JsonSemAction sem;

	if (PG_ARGISNULL(0))
		PG_RETURN_NULL();

	json = PG_GETARG_TEXT_P(0);

	lex = makeJsonLexContext(json, true);
	memset(&state, 0, sizeof(state));
	memset(&sem, 0, sizeof(sem));

	if (!PG_ARGISNULL(1))
	{
		delim = PG_GETARG_TEXT_P(1);

		state.delim = VARDATA(delim);
		state.delim_length = VARSIZE(delim) - VARHDRSZ;
	}

	sem.semstate = (void *) &state;
	sem.scalar = json_values_scalar;

	pg_parse_json(lex, &sem);

	if (state.length == 0)
		PG_RETURN_NULL();
	else
	{
		SET_VARSIZE(state.res, state.length + VARHDRSZ);
		PG_RETURN_TEXT_P(state.res);
	}
}

/*
 * Extract all values from jsonb.
 */
Datum
jsonb_values(PG_FUNCTION_ARGS)
{
	Jsonb	   *jsonb;
	JsonValuesState state;
	JsonbIterator *it;
	JsonbValue	v;
	JsonbIteratorToken r;

	if (PG_ARGISNULL(0))
		PG_RETURN_NULL();

	jsonb = PG_GETARG_JSONB(0);
	memset(&state, 0, sizeof(state));

	if (!PG_ARGISNULL(1))
	{
		text	   *delim_t = PG_GETARG_TEXT_P(1);

		state.delim = VARDATA(delim_t);
		state.delim_length = VARSIZE(delim_t) - VARHDRSZ;
	}

	it = JsonbIteratorInit(&jsonb->root);

	while ((r = JsonbIteratorNext(&it, &v, false)) != WJB_DONE)
	{
		if ((r == WJB_ELEM || r == WJB_VALUE) &&
			(v.type == jbvString || v.type == jbvNull || v.type == jbvNumeric ||
			 v.type == jbvBool))
		{
			switch (v.type)
			{
				case jbvNull:
					append_jsonb_value(&state, "null", 4);
					break;
				case jbvBool:
					append_jsonb_value(&state,
									   v.val.boolean ? "true" : "false",
									   v.val.boolean ? 4 : 5);
					break;
				case jbvNumeric:
					{
						char	   *num = numeric_normalize(v.val.numeric);

						append_jsonb_value(&state, num, strlen(num));

						pfree(num);
						break;
					}
				case jbvString:
					append_jsonb_value(&state,
									   v.val.string.val, v.val.string.len);
					break;
				default:
					/* Make compiler quite */
					break;
			}
		}
	}

	if (state.length == 0)
		PG_RETURN_NULL();
	{
		SET_VARSIZE(state.res, state.length + VARHDRSZ);
		PG_RETURN_TEXT_P(state.res);
	}
}

static void
append_jsonb_value(JsonValuesState *state, const char *str, int len)
{
	if (state->allocated == 0)
	{
		/* Use Max() for long texts */
		state->allocated = Max(1024, len * 2);

		state->res = (text *) palloc(state->allocated + VARHDRSZ);
		memcpy(VARDATA(state->res), str, len);
	}
	else
	{
		if (state->length + len + state->delim_length > state->allocated)
		{
			/* Use Max() for long texts */
			state->allocated = Max(state->allocated * 2,
								   state->allocated + len * 2);

			state->res = (text *) repalloc(state->res,
										   state->allocated + VARHDRSZ);
		}

		if (state->delim_length)
		{
			memcpy(VARDATA(state->res) + state->length,
				   state->delim, state->delim_length);
			state->length += state->delim_length;
		}

		memcpy(VARDATA(state->res) + state->length, str, len);
	}

	state->length += len;
}

static void
json_values_scalar(void *pstate, char *token, JsonTokenType tokentype)
{
	JsonValuesState *state = (JsonValuesState *) pstate;
	int			len;

	/* We extract only string values */
	if (tokentype != JSON_TOKEN_STRING &&
		tokentype != JSON_TOKEN_TRUE &&
		tokentype != JSON_TOKEN_FALSE &&
		tokentype != JSON_TOKEN_NULL &&
		tokentype != JSON_TOKEN_NUMBER)
		return;

	len = strlen(token);

	if (state->allocated == 0)
	{
		/* Use Max() for long texts */
		state->allocated = Max(1024, len * 2);

		state->res = (text *) palloc(state->allocated + VARHDRSZ);
		memcpy(VARDATA(state->res), token, len);
	}
	else
	{
		if (state->length + len + state->delim_length > state->allocated)
		{
			/* Use Max() for long texts */
			state->allocated = Max(state->allocated * 2,
								   state->allocated + len * 2);

			state->res = (text *) repalloc(state->res, state->allocated +
										   VARHDRSZ);
		}

		if (state->delim_length)
		{
			memcpy(VARDATA(state->res) + state->length,
				   state->delim, state->delim_length);
			state->length += state->delim_length;
		}

		memcpy(VARDATA(state->res) + state->length, token, len);
	}

	state->length += len;
}
