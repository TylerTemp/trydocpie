yarn build
yarn servergen
ssh "docpie.comes.today" 'mkdir -p release/trydocpieclient'
ssh "docpie.comes.today" 'mkdir -p release/trydocpieserver'
rsync --progress -r build/ "docpie.comes.today:release/trydocpieclient/"
rsync --progress -r server/ --exclude '*.pyc' --exclude '__pycache__' --exclude '*.egg-info' --exclude 'codebase' "docpie.comes.today:release/trydocpieserver/"
