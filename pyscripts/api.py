from __future__ import print_function
from tvTechnicals import get_data as real_get_data
import sys
import zerorpc

class TVApi(object):
    def get_technicals(self, text, text2):
        try:
            return real_get_data(text, text2)
        except Exception as e:
            return 0.0    
    def echo(self, text):
        """echo any text"""
        return text

def parse_port():
    port = 4242
    try:
        port = int(sys.argv[1])
    except Exception as e:
        pass
    return '{}'.format(port)

def main():
    addr = 'tcp://127.0.0.1:' + parse_port()
    s = zerorpc.Server(TVApi())
    s.bind(addr)
    print('start running on {}'.format(addr))
    s.run()

if __name__ == '__main__':
    main()