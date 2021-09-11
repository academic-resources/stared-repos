movie_name="$*"
movie_name=$(echo "$movie_name" | sed 's/ \+/+/g')
json_url=http://www.omdbapi.com/?t=
json_data=$(curl -s "${json_url}${movie_name}")
echo "Plot"
echo "${json_data}" | jq '.Plot'
echo "IMDb Rating"
echo "${json_data}" | jq '.imdbRating'
echo "Director"
echo "${json_data}" | jq '.Director'
echo "Actors"
echo "${json_data}" | jq '.Actors'
echo "Awards"
echo "${json_data}" | jq '.Awards'
