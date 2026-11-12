"""Original procedural loops, reproducible with Pillow. No external media."""
from PIL import Image, ImageDraw
from pathlib import Path
import math
root=Path(__file__).resolve().parents[1]/'public/assets/loops'
root.mkdir(parents=True,exist_ok=True)
colors=['#d5e88a','#bdceff','#d9bff3','#f0ad8f','#8bdac6','#e8dcad']
for mode,name in enumerate(['wave','sort','grid','orbit','film','flow']):
    frames=[]
    for f in range(40):
        t=f/40*math.tau
        im=Image.new('RGB',(400,240),'#132428');d=ImageDraw.Draw(im)
        for x in range(0,400,40):d.line((x,0,x,240),fill='#203438')
        for y in range(0,240,40):d.line((0,y,400,y),fill='#203438')
        color=colors[mode]
        if mode==0:
            for j in range(3):
                pts=[(x,120+math.sin(x/45+t+j*.7)*(25+j*12)) for x in range(15,385,3)]
                d.line(pts,fill=[color,'#7b977e','#eaf4c4'][j],width=3)
        elif mode==1:
            for j in range(10):
                h=30+(math.sin(t+j*.55)+1)*65
                d.rounded_rectangle((25+j*35,210-h,47+j*35,210),radius=5,fill=color if j%2 else '#7191cd')
        elif mode==2:
            for j in range(24):
                x=45+j%6*60;y=35+j//6*55;rad=5+(math.sin(t-j*.35)+1)*7
                d.rounded_rectangle((x-rad,y-rad,x+rad,y+rad),radius=4,fill=color)
        elif mode==3:
            d.ellipse((105,25,295,215),outline='#608173',width=2)
            for j in range(6):
                a=t+j*math.tau/6;x=200+95*math.cos(a);y=120+95*math.sin(a)
                d.ellipse((x-8,y-8,x+8,y+8),fill=color)
            d.ellipse((180,100,220,140),outline=color,width=3)
        elif mode==4:
            for j in range(7):
                x=(j*75+f*3)%525-75
                d.rounded_rectangle((x,40,x+62,200),radius=4,outline=color,width=2)
                for y in range(48,195,24):
                    d.rectangle((x+4,y,x+10,y+12),fill=color);d.rectangle((x+52,y,x+58,y+12),fill=color)
                d.rectangle((x+17,80,x+46,150),fill='#536461')
        else:
            for j in range(5):
                y=40+j*40;d.line((35,y,365,y),fill='#5a766d',width=2)
                for k in range(3):
                    x=35+((f/40+k/3+j*.12)%1)*330
                    d.rounded_rectangle((x-8,y-5,x+8,y+5),radius=3,fill=color)
        frames.append(im)
    frames[0].save(root/f'{name}.png',optimize=True)
    frames[0].save(root/f'{name}.gif',save_all=True,append_images=frames[1:],duration=75,loop=0,optimize=True)
print('6 GIF et 6 images fixes générés.')
