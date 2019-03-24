yarn build
ssh "docpie.comes.today" 'mkdir -p release/trydocpieclient'
ssh "docpie.comes.today" 'mkdir -p release/trydocpieserver'
rsync --progress build/* "docpie.comes.today:release/trydocpieclient"
rsync --progress server/* "docpie.comes.today:release/trydocpieserver"
