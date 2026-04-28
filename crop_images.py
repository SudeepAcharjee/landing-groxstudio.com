from PIL import Image, ImageChops

def trim_transparency(img_path, out_path):
    print(f"Processing {img_path}")
    im = Image.open(img_path)
    if im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info):
        alpha = im.convert('RGBA').split()[-1]
        bbox = alpha.getbbox()
        if bbox:
            # Add a slight padding so it doesn't touch the absolute edges
            pad = int(min(bbox[2]-bbox[0], bbox[3]-bbox[1]) * 0.1)
            padded_bbox = (
                max(0, bbox[0] - pad),
                max(0, bbox[1] - pad),
                min(im.size[0], bbox[2] + pad),
                min(im.size[1], bbox[3] + pad)
            )
            im = im.crop(padded_bbox)
            im.save(out_path)
            print(f"Trimmed transparent borders for {img_path} -> {out_path}")
        else:
            print(f"No transparent bounding box found for {img_path}")
    else:
        # For RGB, we assume the background color is the top-left pixel
        bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
        diff = ImageChops.difference(im, bg)
        diff = ImageChops.add(diff, diff, 2.0, -100)
        bbox = diff.getbbox()
        if bbox:
            pad = int(min(bbox[2]-bbox[0], bbox[3]-bbox[1]) * 0.1)
            padded_bbox = (
                max(0, bbox[0] - pad),
                max(0, bbox[1] - pad),
                min(im.size[0], bbox[2] + pad),
                min(im.size[1], bbox[3] + pad)
            )
            im = im.crop(padded_bbox)
            im.save(out_path)
            print(f"Trimmed background borders for {img_path} -> {out_path}")
        else:
            print(f"No background bounding box found for {img_path}")

trim_transparency('/Users/sudeepacharjee/Desktop/landing-groxstudio.com/public/images/fav.png', '/Users/sudeepacharjee/Desktop/landing-groxstudio.com/public/images/fav.png')
trim_transparency('/Users/sudeepacharjee/Desktop/landing-groxstudio.com/public/logos/gwbe.png', '/Users/sudeepacharjee/Desktop/landing-groxstudio.com/public/logos/gwbe.png')

# Now copy them directly to the app directory
import shutil
shutil.copyfile('/Users/sudeepacharjee/Desktop/landing-groxstudio.com/public/images/fav.png', '/Users/sudeepacharjee/Desktop/landing-groxstudio.com/app/icon.png')
shutil.copyfile('/Users/sudeepacharjee/Desktop/landing-groxstudio.com/public/logos/gwbe.png', '/Users/sudeepacharjee/Desktop/landing-groxstudio.com/app/opengraph-image.png')
shutil.copyfile('/Users/sudeepacharjee/Desktop/landing-groxstudio.com/public/logos/gwbe.png', '/Users/sudeepacharjee/Desktop/landing-groxstudio.com/app/twitter-image.png')
