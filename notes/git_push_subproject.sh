#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# --- Configuration ---
REPO_DIR="/home/GridShift-Collective-Landing-v2"
# Read PAT from .github_pat alongside this notes folder
PAT_FILE="$(dirname "$0")/.github_pat"
GITHUB_PAT=
if [ -f "$PAT_FILE" ]; then
    GITHUB_PAT=$(head -n 1 "$PAT_FILE" | tr -d '\r\n')
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

# If .github_pat exists, use it only for this push via a one-off credential helper
if [ -n "$GITHUB_PAT" ]; then
    echo "Using PAT from $PAT_FILE for this push (temporary credential helper)."
    git -c credential.helper="!f() { echo username=\"x-access-token\"; echo password=\"$GITHUB_PAT\"; }; f" \
        add -A
else
    git add -A
fi

echo "Fetching latest changes from $REMOTE..."
git fetch $REMOTE

echo "Switching to and updating branch '$BRANCH'..."
git checkout "$BRANCH" || git checkout -b "$BRANCH" "$REMOTE/$BRANCH"
git pull "$REMOTE" "$BRANCH"

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
if [ -n "$GITHUB_PAT" ]; then
    git -c credential.helper="!f() { echo username=\"x-access-token\"; echo password=\"$GITHUB_PAT\"; }; f" \
        push $REMOTE "$BRANCH" 2>push_error.log
else
    git push $REMOTE "$BRANCH" 2>push_error.log
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