#!/bin/bash
export VAULT_ADDR=https://secrets.scottylabs.org

usage() {
  echo
  echo -e "\tUsage: $0 APPLICATION ENVIRONMENT\n"
  echo -e "\t\tENVIRONMENT: The environment to pull from, one of dev | prod | all\n"
  echo -e "\tOptions:"
  echo -e "\t\t-h, --help    Show this help message and exit\n"
}

# Parse arguments
while [[ "$#" -gt 0 ]]; do
  case "$1" in
  -h | --help)
    usage
    exit 0
    ;;
  *)
    ENVIRONMENT="$1"
    ;;
  esac
  shift
done

# Sanitizing the Environment argument
if [ "$ENVIRONMENT" == "all" ]; then
  ENVIRONMENT=("dev" "prod")
else
  case "$ENVIRONMENT" in
  "dev" | "prod")
    ENVIRONMENT=("$ENVIRONMENT")
    ;;
  *)
    echo "Error: Invalid environment: '$ENVIRONMENT'" >&2
    usage
    exit 1
    ;;
  esac
fi

# Pulling from vault
for ENV in "${ENVIRONMENT[@]}"; do
  ENV_FILE_SUFFIX=""
  if [ "$ENV" == "prod" ]; then
    ENV_FILE_SUFFIX=".prod"
  fi

  vault kv get -format=json ScottyLabs/lostandfound/$ENV |
    jq -r '.data.data | to_entries[] | "\(.key)=\"\(.value)\""' >.env$ENV_FILE_SUFFIX
done
