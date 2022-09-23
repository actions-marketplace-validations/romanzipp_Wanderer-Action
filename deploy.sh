#!/bin/bash

generate_post_data() {
  cat <<EOF
  {
  	"server": $SERVER,
  	"job": "$JOB",
  	"selector": "$SELECTOR",
  	"version": "$VERSION"
  }
EOF
}

curl --request POST \
  --url $ENDPOINT/api/deploy \
  --header "Authorization: $TOKEN" \
  --header 'Content-Type: application/json' \
  --data "$(generate_post_data)"

exit 0
