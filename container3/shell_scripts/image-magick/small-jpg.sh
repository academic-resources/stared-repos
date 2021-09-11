for f in /Users/raphael/projects/ae-randomizer/www/img/*.jpg
# for f in *
do
	 #echo "${f%.*}.jpg" # uses 'parameter expansion'
	convert "$f" -define jpeg:extent=60kb "${f%.*}.jpg"

done
