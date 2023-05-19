yarn build
# yarn servergen
ssh "tyler@docpie.comes.today" 'mkdir -p release/trydocpieclient'
ssh "tyler@docpie.comes.today" 'mkdir -p release/trydocpieserver'
rsync --progress -r build/ "tyler@docpie.comes.today:release/trydocpieclient/"
rsync --progress -r server/ --exclude '*.pyc' --exclude '__pycache__' --exclude '*.egg-info' --exclude 'codebase' "tyler@docpie.comes.today:release/trydocpieserver/"
