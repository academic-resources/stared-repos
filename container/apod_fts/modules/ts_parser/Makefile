# ts_parser/Makefile

MODULE_big = ts_parser
OBJS = ts_parser.o $(WIN32RES)

EXTENSION = ts_parser
DATA = ts_parser--1.0.sql
PGFILEDESC = "ts_parser - parser for text search"

REGRESS = ts_parser

ifdef USE_PGXS
PG_CONFIG = pg_config
PGXS := $(shell $(PG_CONFIG) --pgxs)
include $(PGXS)
else
subdir = contrib/ts_parser
top_builddir = ../..
include $(top_builddir)/src/Makefile.global
include $(top_srcdir)/contrib/contrib-global.mk
endif
