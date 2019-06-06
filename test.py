import re
content_raw = """
Don't pass `str` directly to `argv`, otherwise `docpie`
will split the `str` into a list by the white spaces,
which can be wrong. You may use `shlex` instead:

```python-interpreter
>>> import shlex
>>> cmd = input()
prog --config="/path/to/my config.json"
>>> shlex.split(cmd)
['prog', '--config=/path/to/my config.json']
```

help
----
"""
