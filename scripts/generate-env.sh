#!/usr/bin/env bash

# fail if RAWG_TOKEN not set
if [ -z "$RAWG_TOKEN" ]; then
  echo "Error: RAWG_TOKEN is not set"
  exit 1
fi

# generate env.js file used by Angular
cat > src/assets/env.js <<EOF
window.__env = {
  RAWG_TOKEN: "${RAWG_TOKEN}"
};
EOF
