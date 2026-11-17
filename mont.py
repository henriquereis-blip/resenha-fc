import sys
from PIL import Image
out=sys.argv[1];fs=sys.argv[2:]
ims=[Image.open(f).resize((400,820)) for f in fs]
W=Image.new('RGB',(400*len(ims),820));[W.paste(im,(i*400,0)) for i,im in enumerate(ims)];W.save(out)
