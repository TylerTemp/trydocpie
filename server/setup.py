# from distutils.core import setup
from setuptools import setup
import os

from version import VERSION as __version__

setup(
    name="trydocpie",
    # packages=["trydocpiedocpie"],
    # package_data={
    #     '': [
    #         'README.rst',
    #         'LICENSE',
    #         'CHANGELOG.md'
    #     ],
    #     'docpie': [
    #         'example/*.py',
    #         'example/git/*.py'
    #         ],
    # },
    version=__version__,
    py_modules=[],
    install_requires=[
        'flask',
        'docpie',
        'markdown',
        'docutils',
        'bs4',
        'html5lib',
        'pygments',
        'waitress',
    ],
    author="TylerTemp",
    author_email="tylertempdev@gmail.com",
    url="http://docpie.comes.today/",
    download_url="https://github.com/TylerTemp/trydocpie/tarball/%s/" % __version__,
    license='MIT',
    description=("Test server for docpie"),
    keywords='docopt',
    long_description="Test server for docpie",
    platforms='any',
    classifiers=[
        'Development Status :: 2 - Pre-Alpha',
        'License :: OSI Approved :: MIT License',
        'Topic :: Utilities',
        'Operating System :: OS Independent',
        'Programming Language :: Python :: 2',
        'Programming Language :: Python :: 2.6',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Programming Language :: Python :: 3.2',
        'Programming Language :: Python :: 3.3',
        'Programming Language :: Python :: 3.4',
        'Programming Language :: Python :: 3.5',
        'Programming Language :: Python :: Implementation :: PyPy',
    ],
)
