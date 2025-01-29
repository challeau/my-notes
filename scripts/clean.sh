#!/bin/bash

echo "Standardizing notes..."
find notes -type f -name '*.md' \
| xargs sed -i '' "s/’/'/g" && find notes -type f -name '*.md' \
| xargs sed -i '' 's/”/\"/g' && find notes -type f -name '*.md' \
| xargs sed -i '' 's/“/\"/g' \
&& echo "Replaced non-ASCII quotations"

confirm() {
    # call with a prompt string or use a default
    read -r -p "${1:-Do you want to remove emacs backup files? [y/n]} " response
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