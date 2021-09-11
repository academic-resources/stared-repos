#!/bin/bash

get_pod() {
  if [[ $1 == '-h' ]] || [[ $1 == '--help' ]]; then
    echo 'get_pod NAMESPACE APP_LABEL INDEX'
    return 0
  fi
  echo $(kubectl get pod -n $1 -l app=$2 -o jsonpath={.items[$3].metadata.name})
}
