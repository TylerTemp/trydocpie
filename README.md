# trydocpie #

## Start ##

```bash
git submodule init
git submodule update
yarn install
yarn serverinit
```

gen css (optional)

```bash
pygmentize -S default -f html -a .codehilite > public/code-highlight.css
echo -e '
pre {
  padding: 20px;
  -webkit-box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.41);
  -moz-box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.41);
  box-shadow: 0px 0px 11px 0px rgba(0,0,0,0.41);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px; }
code {
  padding: 2px 4px;
  color: #c7254eed;
  background-color: #f8f8f8;
  border-radius: 0;
}
pre > code {
  padding: unset;
  color: unset;
  background-color: unset;
  border-radius: unset;
}
'  >> public/code-highlight.css
```

*   start: `yarn start`
*   build: `yarn servergen; yarn build`
*   lint fix: `./lint.sh` and `./lint.sh --fix`
*   release: `./release.sh`
