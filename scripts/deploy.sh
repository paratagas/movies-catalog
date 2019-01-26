echo 'Starting deploy...'

rm -rf ../paratagas.github.io/*
cp -r ./build/. ../paratagas.github.io
cp ./README.md ../paratagas.github.io/README.md
mkdir ../paratagas.github.io/home
cp ./google6791230e8966e716.html ../paratagas.github.io/home/google6791230e8966e716.html
rm ../paratagas.github.io/favicon.ico
cp ./favicon.ico ../paratagas.github.io/favicon.ico

echo 'Deploy finished'
