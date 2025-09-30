if (-not $env:RAWG_TOKEN) {
  Write-Error "Error: RAWG_TOKEN is not set"
  exit 1
}

@"
window.__env = {
  RAWG_TOKEN: "$env:RAWG_TOKEN"
};
"@ | Out-File -Encoding utf8 src/assets/env.js
