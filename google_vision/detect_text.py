import sys, os
import pandas as pnd
from google.cloud import vision

# set up the auth credentials so we can access the OCR endpoints
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'culina-key.json'

# start up a client
client = vision.ImageAnnotatorClient()

def detect_text_from_uri(uri):
    """Detects text in the file located in Google Cloud Storage or on the Web.
    """
    
    image = vision.Image()
    image.source.image_uri = uri

    response = client.text_detection(image=image)
    texts = response.text_annotations

    data_frame = pnd.DataFrame(columns = ['locale', 'description'])

    for text in texts:
        # print('\n"{}"'.format(text.description))
        data_frame = data_frame.append( 
            dict( locale=text.locale, description = text.description),
            ignore_index = True
        )

        # don't think we need any of this, but I'll keep it around for now just in case
        """
        vertices = (['({},{})'.format(vertex.x, vertex.y)
                    for vertex in text.bounding_poly.vertices])

        print('bounds: {}'.format(','.join(vertices)))
        """

    if response.error.message:
        raise Exception(
            '{}\nFor more info on error messages, check: '
            'https://cloud.google.com/apis/design/errors'.format(
                response.error.message))
    else:
        return data_frame

if __name__ == "__main__":
    print(sys.argv[0])
    print( detect_text_from_uri(sys.argv[1])['description'][0] )