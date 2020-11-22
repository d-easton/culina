import sys, os, string
# import pandas as pnd
from google.cloud import vision
from google.cloud import storage
from google.cloud import firestore

# set up the auth credentials so we can access the OCR endpoints
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'culina-key.json'

# firestore document where OCR output will be tempoararily written
ocr_destination = "OCR_CACHE"

# start up clients
image_client = vision.ImageAnnotatorClient()
storage_client = storage.Client()
firestore_client = firestore.Client()


def detect_text_from_uri(uri):
    """Detects text in the file located in Google Cloud Storage or on the Web.
    """
    
    image = vision.Image()
    image.source.image_uri = uri

    response = image_client.document_text_detection(image=image)
    null_string = ''
    # texts = response.text_annotations

    # data_frame = pnd.DataFrame(columns = ['locale', 'description'])

    output = {
        "text_blocks": []
    }

    pages = response.full_text_annotation.pages
    for page in pages:
        for block in page.blocks:
            # print('block confidence: ', block.confidence)
            for paragraph in block.paragraphs:
                # print('paragraph confidence: ', paragraph.confidence)
                # paragraph_contents = null_string.join([word.symbols for word in paragraph.words])
              
                contents = ""
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    if word_text not in string.punctuation:
                        contents +=" "
                    contents += word_text
                    
                output["text_blocks"].append(contents)
    
    if len(output["text_blocks"]) != 0:
        return output
    else:
        return 1

# def write_content_to_bucket(bucket_name, payload):
#     bucket = storage_client.bucket(bucket_name)

def write_content_to_firestore(payload, context):
    path_parts = context.resource.split('/documents/')[1].split('/')
    collection_path = path_parts[0]
    document_path = '/'.join(path_parts[1:])
    print("EXAMINE PATH: "+document_path)

    ocr_cache = client.collection(collection_path).document(document_path)
    # db.collection(u''+user_id).document(u''+ocr_destination).set(payload)

    if payload:
        print(f'Inserting payload: {payload}')
        ocr_cache.set({
            u'output': payload
        })
    # send confirmation back to client
    
def parse_image(event, context):
    print("PARSE ACTIVE!")
    output = detect_text_from_uri("null")
    print(write_content_to_firestore(output, context))
    


    # for text in texts:
    #     # print('\n"{}"'.format(text.description))
    #     data_frame = data_frame.append( 
    #         dict( locale=text.locale, description = text.description),
    #         ignore_index = True
    #     )

    #     # don't think we need any of this, but I'll keep it around for now just in case
    #     """
    #     vertices = (['({},{})'.format(vertex.x, vertex.y)
    #                 for vertex in text.bounding_poly.vertices])

    #     print('bounds: {}'.format(','.join(vertices)))
    #     """

    # if response.error.message:
    #     raise Exception(
    #         '{}\nFor more info on error messages, check: '
    #         'https://cloud.google.com/apis/design/errors'.format(
    #             response.error.message))
    # else:
    #     return data_frame

# if __name__ == "__main__":
#     print(sys.argv[0])
#     bucket_name = "recipe_storage"
#     print( detect_text_from_uri(sys.argv[1]) )