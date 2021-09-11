Strip title and subtext from input. Put inside [JSON utility](https://www.alfredapp.com/help/workflows/utilities/json/). Useful to get clean prompts in Alfred (i.e. it's used in [web-searches](https://github.com/nikitavoloboev/alfred-web-searches) workflow)

```json
{
  "alfredworkflow": {
    "arg": "{query}",
    "config": {
      "title": "",
      "runningsubtext": "",
      "subtext": ""
    },
    "variables": {}
  }
}
```

Export workflow to a location with version number in clipboard.

```bash
readonly workflow_dir="{query}"

if [[ ! "${workflow_dir}" == *'Alfred.alfredpreferences/workflows/user.workflow.'* ]]
then
  echo "You need to be inside the workflow’s directory in Alfred’s preferences directory." >&2
  exit 1
fi

readonly workflow_name="$(/usr/libexec/PlistBuddy -c 'print name' "${workflow_dir}/info.plist")"
readonly workflow_version="$(/usr/libexec/PlistBuddy -c 'print version' "${workflow_dir}/info.plist")"
readonly workflow_file="${HOME}/Desktop/${workflow_name}-${workflow_version}.alfredworkflow"

find "${workflow_dir}" -iname '.DS_Store' -delete

if /usr/libexec/PlistBuddy -c 'Print variablesdontexport' "${workflow_dir}/info.plist" &> /dev/null
then
  readonly workflow_dir_to_package="$(mktemp -d)"
  cp -R "${workflow_dir}/"* "${workflow_dir_to_package}"
  readonly tmp_info_plist="${workflow_dir_to_package}/info.plist"
  /usr/libexec/PlistBuddy -c 'print variablesdontexport' "${tmp_info_plist}" | grep '    ' | sed -E 's/ {4}//' | xargs -I {} /usr/libexec/PlistBuddy -c "set variables:'{}' ''" "${tmp_info_plist}"
else
  readonly workflow_dir_to_package="${workflow_dir}"
fi

if ditto -ck "${workflow_dir_to_package}" "${workflow_file}"
then
  echo "Created ${workflow_file}"
  exit 0
else
  echo "There was and error creating ${workflow_file}"
  exit 1
fi
```
