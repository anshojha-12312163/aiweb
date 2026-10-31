import http.server
import socketserver
import os
import urllib.parse
import mimetypes

PORT = int(os.environ.get("PORT", 3000))
ROOT = os.path.dirname(os.path.abspath(__file__))

mimetypes.init()
mimetypes.add_type("application/javascript", ".mjs")
mimetypes.add_type("font/woff2", ".woff2")
mimetypes.add_type("font/woff", ".woff")
mimetypes.add_type("image/webp", ".webp")

class SightworkHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(204)
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        pathname = urllib.parse.unquote(parsed.path)

        # Candidates to check
        candidates = []
        if pathname == '/' or pathname == '':
            candidates.append(os.path.join(ROOT, 'index.html'))
        else:
            rel = pathname.lstrip('/')
            candidates.append(os.path.join(ROOT, rel))
            candidates.append(os.path.join(ROOT, rel, 'index.html'))
            candidates.append(os.path.join(ROOT, rel + '.html'))
            if pathname.startswith('/images/') or pathname.startswith('/sites/'):
                candidates.append(os.path.join(ROOT, 'framerusercontent.com', rel))
                candidates.append(os.path.join(ROOT, 'assets', rel))

        found = None
        for cand in candidates:
            if os.path.isfile(cand):
                found = cand
                break

        if found:
            mime_type, _ = mimetypes.guess_type(found)
            if not mime_type:
                ext = os.path.splitext(found)[1].lower()
                if ext in ['.js', '.mjs']:
                    mime_type = 'application/javascript'
                elif ext == '.woff2':
                    mime_type = 'font/woff2'
                elif ext == '.webp':
                    mime_type = 'image/webp'
                else:
                    mime_type = 'application/octet-stream'

            self.send_response(200)
            self.send_header('Content-Type', mime_type)
            self.send_header('Content-Length', str(os.path.getsize(found)))
            self.end_headers()
            with open(found, 'rb') as f:
                self.copyfile(f, self.wfile)
        else:
            not_found = os.path.join(ROOT, '404.html')
            if os.path.isfile(not_found):
                self.send_response(404)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Content-Length', str(os.path.getsize(not_found)))
                self.end_headers()
                with open(not_found, 'rb') as f:
                    self.copyfile(f, self.wfile)
            else:
                self.send_error(404, "File not found")

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), SightworkHandler) as httpd:
        print("====================================================")
        print("  Sightwork Agent Studio (Clone) is running!")
        print(f"  Local URL: http://localhost:{PORT}")
        print("====================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            pass

