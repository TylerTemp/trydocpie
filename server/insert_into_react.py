#!/usr/bin/env python3
#-*- coding: utf-8 -*-

import logging
# import time
import json
import shlex
import sys
import os
import re
import textwrap
# import inspect
import html
try:
    from io import StringIO
except ImportError:
    try:
        from cStringIO import StringIO
    except ImportError:
        from StringIO import StringIO
try:
    from urllib.parse import urlparse, urlunparse
except ImportError:
    from urlparse import urlparse, urlunparse

from bs4 import BeautifulSoup, Comment


logging.getLogger('docpie').setLevel(logging.CRITICAL)

logger = logging.getLogger('trydocpie')


def main():
    project = os.path.normpath(os.path.join(__file__, '..', '..'))
    static = os.path.join(project, 'build', 'static')
    readme = os.path.join(static, 'docpie', 'README.html')
    with open(readme, 'r', encoding='utf-8') as f:
        readme_bs4 = BeautifulSoup(f.read(), 'html5lib')

    # print(readme_bs4.find('body'))
    pre_block = []
    post_block = []
    found_contents = False
    for node in readme_bs4.find(id='docpie').children:
        if isinstance(node, Comment):
            continue

        # if hasattr(node, 'id'):
        #     print(node.id)
        if hasattr(node, 'get') and node.get('id', None) == 'contents':
            found_contents = True

        to_block = post_block if found_contents else pre_block
        # print(node)
        # print('----')
        to_block.append(node)

    react_home_folder = os.path.join(project, 'src', 'Pages', 'Home')
    with open(os.path.join(react_home_folder, 'ReadmePreBlock.html'), 'w', encoding='utf-8') as f:
        for each in pre_block:
            f.write(str(each))

    with open(os.path.join(react_home_folder, 'ReadmePostBlock.html'), 'w', encoding='utf-8') as f:
            for each in post_block:
                f.write(str(each))


if __name__ == '__main__':
    main()