import os
import functools

package_content = '''{
    "name": "donysus",
    "version": "0.1.0",
    "private": true,
    "dependencies": {
        "antd": "^2.13.4",
        "locales": "^0.0.2",
        "moment": "2.18.1",
        "react": "^16.0.0",
        "react-dom": "^16.0.0",
        "react-redux": "^5.0.6",
        "react-router": "^4.2.0",
        "react-router-dom": "^4.2.2",
        "react-scripts": "1.0.14",
        "redux": "^3.7.2"
    },
    "scripts": {
        "start": "react-scripts start",
        "build": "react-scripts build",
        "test": "react-scripts test --env=jsdom",
        "eject": "react-scripts eject"
    },
    "proxy": {
        "^/api": {
        "target": "http://localhost:5000"
        }
    }
}
'''


router = open('package.json', 'w')
router.write(package_content)
router.close()

#os.system('cnpm install')

for folder in [ 'src', 'public', 'src\\components', 'src\\pages', 'src\\utils' ]:
    print('mkdir %s'%folder)
    os.system('mkdir %s'%folder)
