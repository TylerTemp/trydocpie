yarn build
ssh "$1" 'mkdir -p release/trydocpie'
scp -r build/* "$1:release/trydocpie"
