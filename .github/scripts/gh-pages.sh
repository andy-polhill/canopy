# get storybook to generate static output
npm run build-storybook

git remote -v

# move to gh-pages branch create it if it doesn't exist
git checkout -B gh-pages

# configure git to the currect user.
# - The default token has access to commit to gh-pages
git config user.name GitHub Action
git config user.email github-action@users.noreply.github.com

# get the current tag for use in the commit
git describe --abbrev=0 --tags

# hide the static changes
git stash save -u

# delete everything in the directory except the build
shopt -s extglob
rm -rf !(storybook-static)

echo "clear"
ls

# move the build files to root
mv  storybook-static/ ../

echo "mpvebacl"
ls


# stage all of the files
git add .

# commit them with the release number
git commit -m "docs(gh-pages): release ${TAG}"

# push them to gh-pages
git push --set-upstream origin gh-pages -f
