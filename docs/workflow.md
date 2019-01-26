cd movies-catalog
git status
git add .
git commit -n -m "Commit message"
git push origin master

npm run build
npm run deploy

cd ../paratagas.github.io
git status
git add .
git commit -m "Deploy"
git push origin master