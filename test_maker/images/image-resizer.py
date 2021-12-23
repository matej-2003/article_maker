#Import required Image library
from PIL import Image
import time

dir = "small/"

for i in range(10):
    name = f"image_{i}.jpg"
    #Create an Image Object from an Image
    im = Image.open(dir + name)

    max_w = 500
    max_h = 500

    #Display actual image
    # im.show()

    w, h = im.size[0], im.size[1]

    if w > max_w:
        new_h = h * 500 / w
        resized_im = im.resize((round(max_w), round(new_h)))
        resized_im.save('small_min/' + name)
    elif h > max_h:
        new_w = w * 500 / h
        resized_im = im.resize((round(new_w), round(max_h)))
        resized_im.save('small_min/' + name)

    print(f"{i} {name} saving...")
    time.sleep(0.5)