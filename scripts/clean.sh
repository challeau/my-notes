#!/bin/bash

echo "Standardizing notes..."
find ./note-files -type f -name '*.md' | xargs sed -i "s/’/'/g" && find ./resources -type f -name '*.md' | xargs sed -i 's/”/\"/g' && find ./resources -type f -name '*.md' | xargs sed -i 's/“/\"/g'

confirm() {
    # call with a prompt string or use a default
    read -r -p "${1:-Do you want to remove emacs backup files? [y/N]} " response
    case "$response" in
        [yY][eE][sS]|[yY]) 
            true
            ;;
        *)
            false
            ;;
    esac
}

confirm && echo "Removing emacs generated files..." ; find . -name '*~' -exec rm {} \;