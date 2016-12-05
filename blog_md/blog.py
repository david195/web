from os import listdir
import mistune

def post():
    posts=[];
    for dir in listdir("entradas"):
        file = open("templates/blog.html")
        index = file.read()
        index = index.split("<blog>")
        file.close()
        file = open("entradas/"+dir)
        md = file.read()
        md = mistune.markdown(md)
        html = index[0]+md+index[1]
        file.close()
        file = open("building/post/"+dir.split(".")[0]+".html","w")
        file.write(html)
        file.close()
        posts.append([md,dir.split(".")[0]+".html"]);
    return posts;

def blog():
    posts =post()
    file = open("templates/index.html")
    index = file.read()
    index = index.split("<blog>")
    file.close()
    html = ""
    for p in posts:
        if len(p) > 250:
            p=p[0:250]
        html+="<article>"+p[0]+"<br><a href='post/"+p[1]+"'>Leer mas...</a></article>"
    html = index[0]+html+index[1]
    file = open("building/index.html","w")
    file.write(html)
    file.close()

blog()
print("Finished.");
