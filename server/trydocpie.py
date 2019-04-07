#!/usr/bin/env python3
#-*- coding: utf-8 -*-
"""
Usage:
    trydocpie web [<port>]
    trydocpie gen <folder>
"""

import logging
# import time
import json
import shlex
import sys
import os
import re
# import inspect
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

import flask
import markdown
# import markdown2
from docutils import core
from docutils.writers.html4css1 import Writer,HTMLTranslator
from bs4 import BeautifulSoup
import docpie


logging.getLogger('docpie').setLevel(logging.CRITICAL)

logger = logging.getLogger('trydocpie')


app = flask.Flask(__name__)


class StdoutRedirect(StringIO):

    if sys.hexversion >= 0x03000000:
        def u(self, string):
            return string
    else:
        def u(self, string):
            return unicode(string)

    def write(self, s):
        super(StdoutRedirect, self).write(self.u(s))

    def __enter__(self):
        self.real_out = sys.stdout
        sys.stdout = self
        return super(StdoutRedirect, self).__enter__()

    def __exit__(self, exc_type, exc_val, exc_tb):
        sys.stdout = self.real_out
        return super(StdoutRedirect, self).__exit__(exc_type, exc_val, exc_tb)


def trydocpie(doc, argv, *a, **k):

    with StdoutRedirect() as stdout:
        error = False
        try:
            pie = docpie.docpie(doc, argv, *a, **k)
        except (docpie.DocpieExit, SystemExit) as e:
            error = True
            output = str(e)
        else:
            output = str(pie)

        if not output.strip():
            output = stdout.getvalue()

    return error, output


@app.route('/', methods=('POST',))
def trydocpiehandler():
    body = flask.request.get_data().decode('utf-8')
    args = json.loads(body)
    argvstr = args.pop('argvnofilestr')
    argv = shlex.split('pie.py ' + argvstr)
    args['argv'] = argv
    unexpected_error = False
    try:
        expected_error, output = trydocpie(**args)
    except BaseException as e:
        logger.error(e, exc_info=True)
        unexpected_error = True
        output = '{}: {}'.format(e.__class__.__name__, (e.args[0] if e.args else '') or '')

    if unexpected_error:
        code = 500
        resp = {
            'message': output
        }
    else:
        code = 200
        resp = {
            'ok': (not expected_error),
            'result': output
        }

    return flask.Response(json.dumps(resp), status=code, mimetype='application/json')


@app.route('/', methods=('GET',))
def trydocpieinfohandler():
    info = {
        'version_time': docpie.__timestamp__,
        'version': docpie.__version__,
    }
    return flask.Response(json.dumps(info), mimetype='application/json')


class HTMLFragmentTranslator( HTMLTranslator ):
    def __init__( self, document ):
        HTMLTranslator.__init__( self, document )
        self.head_prefix = ['','','','','']
        self.body_prefix = []
        self.body_suffix = []
        self.stylesheet = []
    def astext(self):
        return ''.join(self.body)


def gen_folder(folder):
    project_root = os.path.normpath(os.path.join(__file__, '..', '..'))
    codebase = os.path.join(project_root, 'server', 'codebase')
    configs = (
        {
            'source': os.path.join(codebase, 'docpie'),
            'target': os.path.join(project_root, 'build', 'static', 'docpie'),
        },
        {
            'source': os.path.join(codebase, 'docpie.wiki'),
            'target': os.path.join(project_root, 'build', 'static', 'docpie-wiki'),
        },
    )
    for config in configs:
        source_folder = config['source']
        target_folder = config['target']
        if not os.path.isdir(target_folder):
            os.makedirs(target_folder)

        _dirpath, _dirnames, filenames = next(os.walk(source_folder))
        for filename in filenames:
            filebase, fileext = os.path.splitext(filename)
            fileext_lower = fileext.lower()
            if fileext_lower == '.md':
                filetype = 'md'
            elif fileext_lower == '.rst':
                filetype = 'rst'
            else:
                continue
            with open(os.path.join(source_folder, filename), 'r', encoding='utf-8') as f:
                content = f.read()

            if filetype == 'md':
                if filebase == 'Usage-Format':
                    # content = content.replace('\\<argument\\>', '&lt;argument&gt;')
                    content_body = content.split('\n\n', 1)[1].replace('\\<argument\\>', '&lt;argument&gt;')
                    content = '[TOC]\n\n' + content_body

                html = markdown.markdown(content, extensions=[
                    'markdown.extensions.fenced_code',
                    'markdown.extensions.footnotes',
                    'markdown.extensions.codehilite',
                    'markdown.extensions.toc',
                ])
                # html = markdown2.markdown(content, extras=[
                #     'toc',
                #     'fenced-code-blocks',
                #     'footnotes',
                # ])
            elif filetype == 'rst':
                html_fragment_writer = Writer()
                html_fragment_writer.translator_class = HTMLFragmentTranslator
                html = core.publish_string(content, writer=html_fragment_writer).decode('utf-8')
            if filebase in ('Home', '_Sidebar'):
                html = re.sub('\\[\\[(.*?)\\]\\]', lambda matchobj: '<a href="/document/{link}">{linkname}</a>'.format(link=matchobj.group(1).replace(' ', '-'), linkname=matchobj.group(1)), html)

            soup = BeautifulSoup(html, 'html5lib')
            for link in soup.find_all('a'):
                href = link.get('href')
                if href and (href.startswith('http://') or href.startswith('https://')):
                    url_obj = urlparse(href)
                    if url_obj.hostname in ('docpie.comes.today', 'docpie.notexists.top'):
                        url = urlunparse(('', '', url_obj.path, url_obj.params, url_obj.query, url_obj.fragment))
                        link['href'] = url

            for pre in soup.find_all('pre'):
                inner_pre = pre.decode_contents()
                pre_class = pre.get('class') or []
                inner_break = inner_pre.replace('\n', '<br />')
                pre_soup = BeautifulSoup('<pre class="{classes}">{content}</pre>'.format(classes=' '.join(pre_class), content=inner_break), 'html5lib')
                pre.replace_with(pre_soup.find('pre'))

            body = soup.body.decode_contents()

            target_filename = filebase + '.html'
            logger.info('saving %s', target_filename)
            with open(os.path.join(target_folder, target_filename), 'w', encoding='utf-8') as t:
                t.write(body)


if __name__ == '__main__':
    args = docpie.docpie(__doc__)
    logging.basicConfig()
    logger.setLevel(logging.DEBUG)
    if args['web']:
        args_port = args['<port>']
        port = int(args_port) if args_port is not None else 8080
        app.run(debug=False, port=port)
    elif args['gen']:
        folder = args['<folder>']
        gen_folder(folder)
