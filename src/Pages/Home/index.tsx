import readmePreHtml from './ReadmePreBlock.html';
import readmePostHtml from './ReadmePostBlock.html';
import TerminalWrapper from '~/Pages/TryDocpie/TerminalWrapper';

export default () => <>
    <div dangerouslySetInnerHTML={{__html: readmePreHtml}} />
    <TerminalWrapper />
    <hr />
    <div dangerouslySetInnerHTML={{__html: readmePostHtml}} />
</>
