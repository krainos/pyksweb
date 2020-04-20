import numpy as np
import cv2
from PIL import Image, ImageDraw,ImageFont
def paint_chinese_opencv(im, chinese, pos, color):
    img_PIL = Image.fromarray(cv2.cvtColor(im, cv2.COLOR_BGR2RGB))
    font = ImageFont.truetype('simsun.ttc', 35)
    fillColor = color # 颜色
    position = pos # 位置
    if not isinstance(chinese, str):
        chinese = chinese.decode('utf-8')
    draw = ImageDraw.Draw(img_PIL)
    draw.text(position, chinese, font=font, fill=fillColor)
    img = cv2.cvtColor(np.asarray(img_PIL), cv2.COLOR_RGB2BGR)
    return img
#Create a black image

img = np.zeros((600,600,3),dtype="uint8")
img = paint_chinese_opencv(img, '纽约', (500, 200), (255, 255, 255))
img = paint_chinese_opencv(img, '上海', (100, 200), (255, 255, 255))
cv2.line(img, (190, 220), (490, 220), (255, 255, 255), thickness = 1,lineType = 4)
cv2.ellipse(img, (320, 250), (200, 200), 0, 0, 180, (255, 0, 0), -1)
cv2.ellipse(img, (320, 250), (198, 198), 0, 0, 180, (0, 0, 0), -1)
cv2.imshow('image', img)
cv2.waitKey(0)
cv2.destroyAllWindows()