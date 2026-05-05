#!/bin/bash
# Generates SVG placeholder avatars for team members
make_svg() {
  local filename="$1"
  local initials="$2"
  local name="$3"
  cat > "$filename" << EOF
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400">
  <rect width="400" height="400" fill="#F2F2F3"/>
  <circle cx="200" cy="155" r="72" fill="#DCDCDF"/>
  <ellipse cx="200" cy="340" rx="110" ry="80" fill="#DCDCDF"/>
  <text x="200" y="175" font-family="Helvetica Neue,Helvetica,Arial,sans-serif" font-size="64" font-weight="800" fill="#D20A11" text-anchor="middle" dominant-baseline="middle" letter-spacing="4">$initials</text>
  <text x="200" y="385" font-family="Helvetica Neue,Helvetica,Arial,sans-serif" font-size="13" font-weight="600" fill="#888" text-anchor="middle">$name</text>
</svg>
EOF
}

DIR="$(dirname "$0")"
make_svg "$DIR/team-merlee-walker.svg"    "MW" "Merlee S. Walker"
make_svg "$DIR/team-lowell-walker.svg"    "LW" "Lowell S. Walker"
make_svg "$DIR/team-david-escobar.svg"    "DE" "David A. Escobar"
make_svg "$DIR/team-david-marroquin.svg"  "DM" "M. David Marroquin"
make_svg "$DIR/team-marissa-marroquin.svg" "MM" "Marissa Marroquin"
make_svg "$DIR/team-sean-cannon.svg"      "SC" "Sean J. Cannon"
make_svg "$DIR/team-cristina-marroquin.svg" "CM" "Cristina Marroquin"
make_svg "$DIR/team-raul-escobar.svg"     "RE" "Raul A. Escobar"
make_svg "$DIR/team-joshua-cannon.svg"    "JC" "Joshua Cannon"
echo "Done — 9 SVG placeholders created."
