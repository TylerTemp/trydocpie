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
# import inspect
try:
    from io import StringIO
except ImportError:
    try:
        from cStringIO import StringIO
    except ImportError:
        from StringIO import StringIO

import flask
import docpie


__version__ = '0.0.1'
logging.getLogger('docpie').setLevel(logging.CRITICAL)

logger = logging.getLogger('trydocpie')
logger.setLevel(logging.DEBUG)


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


def gen_folder(folder):
    pass

if __name__ == '__main__':

    args = docpie.docpie(__doc__)
    if args['web']:
        args_port = args['<port>']
        port = int(args_port) if args_port is not None else 8080
        app.run(debug=False, port=port)
    elif args['gen']:
        folder = args['<folder>']
        gen_folder(folder)