#!/bin/bash

# Download and install dictionaries
git clone https://github.com/postgrespro/hunspell_dicts.git
make -C hunspell_dicts/hunspell_en_us USE_PGXS=1 install
make -C hunspell_dicts/hunspell_ru_ru USE_PGXS=1 install

# Install ts_parser module
make -C modules/ts_parser USE_PGXS=1 install

# Create configuration
psql -d apod -f scripts/01-create-configuration.sql