  #! /bin/bash

if [ $# -lt 3 ]
then
    echo "Improper Usage"
    exit 1
fi

old_expr="$1"
new_expr="$2"
shift; shift

for f in $@
do
    echo >&2 "mass_manip: change $f: $old_expr to $new_expr"
    if [ -r "$f" ]
    then
	if sed "s/$old_expr/$new_expr/g" < "$f" > /tmp/ct_temp_file
	then
	    mv /tmp/ct_temp_file "$f"
      #Try a cp instead of mv to see the file in /tmp
	else
	    echo >&2 "mass_manip: could not change file: $f"
	fi
    fi
done