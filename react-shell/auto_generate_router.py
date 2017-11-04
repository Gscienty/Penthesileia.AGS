import os
import re

prefix_desc = '''
import { HashRouter, Route } from 'react-router-dom';
var React = require('react');

export default <HashRouter>
    <div>
'''
suffix_desc = '''
    </div>
</HashRouter>;
'''

l = []

for root in os.walk('src/pages/'):
    for file_name in root[2]:
        if file_name.startswith('_') or file_name.endswith('.js') == False: continue
        file_content = str(open(os.path.join(root[0], file_name), 'rb').read())
        uri_params = ''
        if re.match(r'.*/\* *params\(\w+(,\w+)*\) *\*/', file_content):
            params = re.match(r'.*/\* *params\((\w+(,\w+)*)*\) *\*/', file_content).group(1)
            for param in params.split(','):
                if uri_params == '':
                    uri_params += '/'
                else:
                    uri_params += '&'
                uri_params += ':' + param

        name = file_name.split('.')[0]
        dir_name = root[0][4:].replace('\\', '/')
        if dir_name.endswith('/'):
            dir_name = dir_name[:-1]
        finally_name = dir_name + '/' + name

        path = finally_name[6:]
        append_exact = ' '
        if path == 'index':
            path = ''
            append_exact = ' exact '

        l.append('        <Route%spath="/%s%s" component={ require("./%s").default } />'%(
             append_exact, path, uri_params, finally_name
        ))
result = prefix_desc

for item in l:
    result += item + '\n'
result = result + suffix_desc

router = open('src/router.js', 'w')
router.write(result)