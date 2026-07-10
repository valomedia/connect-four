#!/usr/bin/env bash
set -euo pipefail

if [ "$(id -u)" -ne 0 ]; then
  echo "This setup helper must run as root." >&2
  exit 1
fi

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <writable-path> [<writable-path> ...]" >&2
  exit 1
fi

for writable_path in "$@"; do
  mkdir -p "$writable_path"
  chown -R node:node "$writable_path"
done

remove_passwordless_sudo() {
  local sudoers_file="$1"

  if grep -Eq '(^|[[:space:]])(node|%sudo)[[:space:]].*NOPASSWD' "$sudoers_file"; then
    sed -i -E '/(^|[[:space:]])(node|%sudo)[[:space:]].*NOPASSWD/d' "$sudoers_file"

    if [ "$sudoers_file" != /etc/sudoers ] && [ ! -s "$sudoers_file" ]; then
      rm -f "$sudoers_file"
    fi
  fi
}

if [ -f /etc/sudoers ]; then
  remove_passwordless_sudo /etc/sudoers
fi

if [ -d /etc/sudoers.d ]; then
  while IFS= read -r -d '' sudoers_file; do
    remove_passwordless_sudo "$sudoers_file"
  done < <(find /etc/sudoers.d -type f -print0)
fi

if getent group sudo >/dev/null && id -nG node | tr ' ' '\n' | grep -qx sudo; then
  gpasswd --delete node sudo >/dev/null 2>&1 || true
fi

passwd --lock node >/dev/null 2>&1 || true

if command -v visudo >/dev/null 2>&1; then
  visudo -cf /etc/sudoers >/dev/null
fi
