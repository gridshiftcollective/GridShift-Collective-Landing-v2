#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
REPO_DIR="/home/GridShift-Collective-Landing-v2"
# Read PAT from .github_pat alongside this notes folder (resolve script location reliably)
PAT_FILE="$(dirname "$(readlink -f "$0")")/.github_pat"
GITHUB_PAT=
if [ -f "$PAT_FILE" ]; then
    GITHUB_PAT=$(head -n 1 "$PAT_FILE" | tr -d '\r\n')
fi
# GitHub username to use for this repo
GITHUB_USER="gridshiftcollective"
# Prepare basic auth header (base64 of user:pat) for use with http.extraheader
AUTH_HEADER=
if [ -n "$GITHUB_PAT" ]; then
    if command -v base64 >/dev/null 2>&1; then
        AUTH_HEADER=$(printf '%s:%s' "$GITHUB_USER" "$GITHUB_PAT" | base64 | tr -d '\r\n')
    fi
fi


# Usage: ./git_push_subproject.sh <branch> [commit_message] [remote]
# Example: ./git_push_subproject.sh main "autocommit" origin

BRANCH="${1:-main}"
COMMIT_MSG="${2:-autocommit}"
REMOTE="${3:-origin}"

if [ -z "$BRANCH" ]; then
    echo "Error: Branch name not provided."
    echo "Usage: $0 <branch> <commit_message> [remote]"
    exit 1
fi

if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update from git_push_subproject.sh on branch $BRANCH"
fi

cd "$REPO_DIR" || { echo "Error: Repository directory $REPO_DIR not found."; exit 1; }

echo "Staging changes..."
git add -A

echo "Fetching latest changes from $REMOTE..."
if [ -n "$AUTH_HEADER" ]; then
    git -c http.extraheader="AUTHORIZATION: basic $AUTH_HEADER" fetch "$REMOTE" 2>fetch_error.log || true
else
    git fetch "$REMOTE" 2>fetch_error.log || true
fi

echo "Switching to and updating branch '$BRANCH'..."
git checkout "$BRANCH" 2>/dev/null || git checkout -b "$BRANCH" "$REMOTE/$BRANCH" || true
if [ -n "$AUTH_HEADER" ]; then
    git -c http.extraheader="AUTHORIZATION: basic $AUTH_HEADER" pull "$REMOTE" "$BRANCH"
else
    git pull "$REMOTE" "$BRANCH"
fi

echo "Current branch in submodule:"
git branch --show-current

echo "Checking for changes to commit in repository..."
if git diff-index --quiet HEAD --; then
  echo "No changes to commit."
else
  echo "Committing with message: '$COMMIT_MSG'"
  git commit -m "$COMMIT_MSG"
fi

echo "Pushing changes to $REMOTE $BRANCH..."
if [ -n "$AUTH_HEADER" ]; then
    git -c http.extraheader="AUTHORIZATION: basic $AUTH_HEADER" push "$REMOTE" "$BRANCH" 2>push_error.log || true
else
    git push "$REMOTE" "$BRANCH" 2>push_error.log || true
fi

# If push failed due to authentication, try a temporary URL-with-PAT fallback (will not persist remote change)
PUSH_STATUS=0
if [ -f push_error.log ]; then
    if grep -q -i "authentication failed" push_error.log || grep -q -i "invalid username or token" push_error.log || grep -q -i "write access to repository not granted" push_error.log || grep -q -i "403" push_error.log; then
        echo "Push failed due to authentication. Attempting fallback with temporary URL containing PAT (temporary, not persisted)."
        if [ -n "$GITHUB_PAT" ]; then
            # Construct temporary remote URL
            REMOTE_URL_WITH_PAT="https://${GITHUB_USER}:${GITHUB_PAT}@github.com/${GITHUB_USER}/$(basename "$REPO_DIR").git"
            # Attempt push with embedded credentials (temporary)
            GIT_TRACE=1 GIT_CURL_VERBOSE=1 git push "$REMOTE_URL_WITH_PAT" "$BRANCH" 2>>push_error.log || true
        else
            echo "No GITHUB_PAT available for fallback."
        fi
    fi
fi

# Determine final push status
if git rev-parse --verify --quiet "$BRANCH" >/dev/null 2>&1; then
    # Check if remote branch has progressed - attempt to probe remote
    git ls-remote --exit-code "$REMOTE" refs/heads/"$BRANCH" >/dev/null 2>&1 || true
fi

if [ -s push_error.log ]; then
    cat push_error.log
    PUSH_STATUS=1
else
    PUSH_STATUS=0
fi
PUSH_STATUS=$?
if [ $PUSH_STATUS -ne 0 ]; then
    if grep -q "Authentication failed" push_error.log || grep -q "Repository not found" push_error.log; then
        echo "Error: Authentication failed when pushing to $REMOTE."
        echo "Please check your git credentials or GITHUB_PAT."
        rm -f push_error.log
        exit 1
    else
        cat push_error.log
        rm -f push_error.log
        echo "Error: Failed to push to $REMOTE."
        exit 1
    fi
fi
rm -f push_error.log

if [ "$SYNC_MAIN_REPO" = "true" ]; then
    echo "--- Processing Main Repository: $MAIN_REPO_DIR ---"
    cd "$MAIN_REPO_DIR"

    echo "Staging submodule update in main repository..."
    git add "user_data/Subproject-HMM"

    echo "Checking for submodule pointer changes to commit in main repository..."
    if git diff-index --quiet --cached HEAD -- "user_data/Subproject-HMM"; then
        echo "No submodule pointer changes to commit in main repository."
    else
        echo "Committing submodule update in main repository with message: 'Update submodule pointer after push to $BRANCH'"
        git commit -m "Update submodule pointer after push to $BRANCH"
    fi

    echo "Pushing main repository changes..."
    git push $REMOTE

    echo "--- Push Operations Complete ---"
else
    echo "--- Submodule Push Complete ---"
    echo "Skipping main repository update as SYNC_MAIN_REPO is not 'true'."
fi